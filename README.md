# svelte-table: controlled state resets after every change

Reproduction for a bug in `@tanstack/svelte-table` 9.2.4.

When `expanded` or `pagination` is controlled through `state` and `on*Change`,
`row.toggleExpanded()` and `table.nextPage()` do nothing: the table applies the
change, then resets the slice to its initial value.

The adapter's options store is a deep `$state`, so each options sync wraps the
caller's `data` array in a new proxy. The core row model treats that as new data
and runs its auto-resets, which undo the change.

## Run

```sh
pnpm install
pnpm test
```

Or open it in StackBlitz, which runs the tests on load:
https://stackblitz.com/github/NickSpag/svelte-table-controlled-state-repro

## Result on 9.2.4

```
× table.options.data is the array passed in              expected "same data: true",  received "same data: false"
× controlled expanded: toggleExpanded opens the row      expected "Ada: open",        received "Ada: closed"
× controlled pagination: nextPage shows the second page  expected "page 1: Grace",    received "page 0: Ada"
```

All three pass when `createRuneWritableAtom` in
`packages/svelte-table/src/reactivity.svelte.ts` uses `$state.raw(initialValue)`
instead of `$state(initialValue)`.
