import { assertProductionOrigin } from "@/lib/site";

try {
  const origin = assertProductionOrigin();
  console.log(`Production origin validation: PASS (${origin})`);
} catch (error) {
  console.error(`Production origin validation: BLOCKED — ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}
