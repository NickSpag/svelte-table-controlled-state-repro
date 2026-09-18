<script lang="ts">
  import {
    createPaginatedRowModel,
    createTable,
    createTableState,
    rowPaginationFeature,
    tableFeatures,
    type PaginationState,
  } from '@tanstack/svelte-table'

  const features = tableFeatures({
    rowPaginationFeature,
    paginatedRowModel: createPaginatedRowModel(),
  })
  const data = [{ name: 'Ada' }, { name: 'Grace' }, { name: 'Edsger' }]
  const columns = [{ accessorKey: 'name' }]
  const [pagination, setPagination] = createTableState<PaginationState>({
    pageIndex: 0,
    pageSize: 1,
  })

  const table = createTable({
    features,
    columns,
    data,
    state: {
      get pagination() {
        return pagination()
      },
    },
    onPaginationChange: setPagination,
  })
</script>

<button onclick={() => table.nextPage()}>next</button>
<p>page {pagination().pageIndex}: {table.getRowModel().rows.map((r) => r.original.name).join(',')}</p>
