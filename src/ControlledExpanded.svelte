<script lang="ts">
  import {
    createExpandedRowModel,
    createTable,
    createTableState,
    rowExpandingFeature,
    tableFeatures,
    type ExpandedState,
  } from '@tanstack/svelte-table'

  const features = tableFeatures({
    rowExpandingFeature,
    expandedRowModel: createExpandedRowModel(),
  })
  const data = [{ name: 'Ada' }, { name: 'Grace' }]
  const columns = [{ accessorKey: 'name' }]
  const [expanded, setExpanded] = createTableState<ExpandedState>({})

  const table = createTable({
    features,
    columns,
    data,
    getRowCanExpand: () => true,
    state: {
      get expanded() {
        return expanded()
      },
    },
    onExpandedChange: setExpanded,
  })
</script>

{#each table.getRowModel().rows as row (row.id)}
  <button onclick={() => row.toggleExpanded()}>
    {row.original.name}: {row.getIsExpanded() ? 'open' : 'closed'}
  </button>
{/each}
<p>same data: {table.options.data === data}</p>
