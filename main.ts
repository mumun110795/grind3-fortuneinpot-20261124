// Fortune in a Pot — writes one fortune-cookie line for a houseplant.
//
// The line is a small prophecy told to the plant itself: the watering can
// comes back on its day, the keeper turns the pot toward the light as the
// seasons shift, and the cat — the windowsill's other tenant — finally
// settles somewhere else. Calm, second person, future stated as fact.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FORTUNE =
  "You will be watered on Sunday, turned toward the light by spring, and the cat will finally nap on the other sill.";

const MIN_LENGTH = 1;
const MAX_LENGTH = 120;

function checkGate(line: string): void {
  const length = [...line].length;
  if (length < MIN_LENGTH || length > MAX_LENGTH) {
    throw new Error(
      `fortune is ${length} characters; the gate allows ${MIN_LENGTH}-${MAX_LENGTH}`,
    );
  }
  if (line.includes("\n")) {
    throw new Error("fortune must be a single line");
  }
}

function main(): void {
  checkGate(FORTUNE);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // Compute the target once so the write and the log line can never
  // disagree about where the fortune actually landed.
  const target = join(outDir, "entry.txt");
  writeFileSync(target, FORTUNE, "utf8");
  console.log(`wrote ${[...FORTUNE].length} characters to ${target}`);
}

main();
