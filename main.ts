// One Star for Monday — u-clever-harbor-75-one-star-for-monday-9ead4a61
//
// The program drafts a shortlist of one-star reviews of Monday written as
// if Monday were a restaurant, grades each one against the judge's own
// published brief (in the brief's order), and writes the winner to
// /output/entry.txt. No network, no randomness: the same run always
// produces the same line, so the entry is reproducible byte for byte.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUT = "/output/entry.txt";
const MAX_WORDS = 25;
const MAX_CHARS = 180;

type DinerLine = { text: string };

// Every line below was drafted for this bounty: a diner's complaint with a
// table, a server, a dish or a bill that went wrong, and a joke that only
// works on Monday — the day the weekend ends and the whole week gets billed.
const MENU: DinerLine[] = [
  {
    text: "One star. Monday's waiter forgot my order, served me a cold alarm clock, and charged extra for the week ahead.",
  },
  {
    text: "One star. The server brought Monday out still half-asleep, dropped the weekend on the floor, and billed me for the whole week anyway.",
  },
  {
    text: "One star. The waiter sat me at a wobbly table, served cold leftover weekend, then handed me the bill before I'd even had coffee.",
  },
  {
    text: "One star. I booked a table for the weekend; Monday showed up instead, cold coffee, no waiter, and the bill came before breakfast.",
  },
  {
    text: "One star. Monday's kitchen sent out the week undercooked, the waiter vanished, and the bill arrived before the coffee did.",
  },
  {
    text: "One star. Monday seated me next to the draughty door, served yesterday's weekend reheated, and charged me for all seven days.",
  },
  {
    text: "One star. Monday's waiter took my weekend away before dessert, brought the alarm instead, and billed the whole week to my table.",
  },
];

const words = (line: string): string[] => line.split(/\s+/).filter(Boolean);

// Restaurant props a real diner's complaint names: the people, the furniture,
// the order and the bill. Each distinct prop found is worth one point, to 3.
const PROPS = [
  "waiter",
  "server",
  "table",
  "bill",
  "billed",
  "charged",
  "order",
  "kitchen",
  "menu",
  "coffee",
];

// Hooks that only Monday can carry: the alarm, the week ahead, the weekend
// just eaten. Each distinct hook is worth two points, to 4.
const MONDAY_HOOKS = [
  "alarm",
  "week ahead",
  "whole week",
  "all seven days",
  "weekend",
  "leftover weekend",
];

// Grade one line on the judge's brief, most important first:
// 1. on-subject one-star review of Monday-as-restaurant (3 pts)
// 2. real diner complaint with props (up to 3 pts)
// 3. joke that only Monday can carry (up to 4 pts)
// 4. short and quotable: fewer words score higher (up to 2 pts)
// 5. plain single-line text inside the caps (2 pts, or disqualified)
function grade(line: string): number {
  const wc = words(line).length;
  if (wc > MAX_WORDS || line.length > MAX_CHARS) return -100;
  if (line.includes("\n") || /[#@*_`]/.test(line)) return -100;

  let score = 0;
  const lower = line.toLowerCase();

  if (lower.includes("monday")) score += 3;
  if (/one star/i.test(line)) score += 1;

  const props = PROPS.filter((p) => lower.includes(p));
  score += Math.min(3, props.length);

  const hooks = MONDAY_HOOKS.filter((h) => lower.includes(h));
  score += Math.min(4, hooks.length * 2);

  score += ((MAX_WORDS - wc) / MAX_WORDS) * 2;
  score += 1; // plain text, single line, inside the caps
  return score;
}

function pickBest(): DinerLine {
  let best = MENU[0];
  let bestScore = grade(best.text);
  for (const cand of MENU.slice(1)) {
    const s = grade(cand.text);
    // Tie-break: fewer words, then the earlier draft — shorter is more quotable.
    if (s > bestScore || (s === bestScore && words(cand.text).length < words(best.text).length)) {
      best = cand;
      bestScore = s;
    }
  }
  return best;
}

const winner = pickBest();
const line = winner.text.trim();
const wc = words(line).length;
if (wc > MAX_WORDS || line.length > MAX_CHARS) {
  throw new Error(`winner breaks the caps: ${wc} words, ${line.length} chars`);
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, line + "\n", "utf8");
console.log(`wrote ${line.length} chars, ${wc} words to ${OUT}`);
console.log(line);
