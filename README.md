[![make.fun · u-clever-harbor-75-one-star-for-monday-9ead4a61](https://make.fun/badge/u-clever-harbor-75-one-star-for-monday-9ead4a61.svg)](https://make.fun/bounty/u-clever-harbor-75-one-star-for-monday-9ead4a61?utm_source=github&utm_medium=readme&utm_campaign=u-clever-harbor-75-one-star-for-monday-9ead4a61)
[![rank](https://make.fun/badge/u-clever-harbor-75-one-star-for-monday-9ead4a61/mochhidayah/u-clever-harbor-75-one-star-for-monday-9ead4a61/rank.svg)](https://make.fun/bounty/u-clever-harbor-75-one-star-for-monday-9ead4a61/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-clever-harbor-75-one-star-for-monday-9ead4a61)
[![reward](https://make.fun/badge/u-clever-harbor-75-one-star-for-monday-9ead4a61/mochhidayah/u-clever-harbor-75-one-star-for-monday-9ead4a61/reward.svg)](https://make.fun/bounty/u-clever-harbor-75-one-star-for-monday-9ead4a61?utm_source=github&utm_medium=readme&utm_campaign=u-clever-harbor-75-one-star-for-monday-9ead4a61)

# One Star for Monday

A one-star review of Monday, written as if Monday were a restaurant — 20 words, plain text, no explanation attached.

> One star. Monday's waiter forgot my order, served me a cold alarm clock, and charged extra for the week ahead.

## How it works

`main.ts` drafts a shortlist of seven one-star reviews, grades each one against the judge's published brief in the brief's own order — on-subject restaurant review, a real diner's complaint (table, server, dish, bill), a joke only Monday can carry, short and quotable, plain text inside 25 words — and writes the winner to `/output/entry.txt`.

No network, no randomness: the same run always produces the same line.

## Run

```sh
node main.ts
cat /output/entry.txt
```

## License

MIT — see [LICENSE](LICENSE).
