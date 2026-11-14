import { spawn } from "node:child_process";

const DEFAULT_PORT = 4317;

async function waitForServer(baseUrl, child) {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (child && child.exitCode !== null) throw new Error(`next start exited with code ${child.exitCode}`);
    try {
      const response = await fetch(baseUrl, { redirect: "manual" });
      if (response.status > 0) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Timed out waiting for production server at ${baseUrl}`);
}

export async function openProductionServer() {
  const configured = process.env.SMARTIFLIX_VERIFY_BASE_URL;
  if (configured) {
    const baseUrl = new URL(configured).origin;
    await waitForServer(baseUrl);
    return { baseUrl, close: async () => {} };
  }

  const port = Number(process.env.SMARTIFLIX_VERIFY_PORT || DEFAULT_PORT);
  const baseUrl = `http://127.0.0.1:${port}`;
  const child = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port)], {
    cwd: process.cwd(),
    env: process.env,
    stdio: ["ignore", "pipe", "pipe"],
  });
  let output = "";
  child.stdout.on("data", (chunk) => { output += chunk.toString(); });
  child.stderr.on("data", (chunk) => { output += chunk.toString(); });

  try {
    await waitForServer(baseUrl, child);
  } catch (error) {
    child.kill("SIGTERM");
    throw new Error(`${error instanceof Error ? error.message : String(error)}\n${output}`);
  }

  return {
    baseUrl,
    close: async () => {
      if (child.exitCode !== null) return;
      child.kill("SIGTERM");
      await Promise.race([
        new Promise((resolve) => child.once("exit", resolve)),
        new Promise((resolve) => setTimeout(resolve, 3_000)),
      ]);
      if (child.exitCode === null) child.kill("SIGKILL");
    },
  };
}
