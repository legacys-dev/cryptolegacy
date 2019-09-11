const getTotalCount = items => {
  if (!items) return 0
  return items.length
}

const totalPages = (limit, items) => {
  const count = getTotalCount(items)
  if (!limit) return 1
  return Math.ceil(count / limit)
}

const hasNextPage = (skip, limit, items) => {
  const count = getTotalCount(items)
  if (!limit) return false
  return skip + limit < count
}

const hasPreviousPage = (skip, items) => {
  const count = getTotalCount(items)
  return count && skip !== 0
}

const getItems = (items, page, limit) => {
  page--
  return items.slice(page * limit, (page + 1) * limit)
}

export default (allItems, page, limit) => {
  const skip = limit * (page - 1)

  return {
    items: getItems(allItems, page, limit),
    totalPages: totalPages(limit, allItems),
    hasNextPage: hasNextPage(skip, limit, allItems),
    hasPreviousPage: hasPreviousPage(skip, allItems)
  }
}
