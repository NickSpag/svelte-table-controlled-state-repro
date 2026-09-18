import { fireEvent, render, screen } from '@testing-library/svelte'
import { tick } from 'svelte'
import { expect, it } from 'vitest'
import ControlledExpanded from './ControlledExpanded.svelte'
import ControlledPagination from './ControlledPagination.svelte'

// Let the auto-reset microtask and effects run.
const settle = async () => {
  for (let i = 0; i < 5; i++) {
    await new Promise((r) => setTimeout(r, 0))
    await tick()
  }
}

it('table.options.data is the array passed in', () => {
  render(ControlledExpanded)
  expect(screen.getByText(/same data/).textContent).toBe('same data: true')
})

it('controlled expanded: toggleExpanded opens the row', async () => {
  render(ControlledExpanded)
  await fireEvent.click(screen.getByText(/Ada:/))
  await settle()
  expect(screen.getByText(/Ada:/).textContent?.trim()).toBe('Ada: open')
})

it('controlled pagination: nextPage shows the second page', async () => {
  render(ControlledPagination)
  await fireEvent.click(screen.getByText('next'))
  await settle()
  expect(screen.getByText(/^page/).textContent).toBe('page 1: Grace')
})
