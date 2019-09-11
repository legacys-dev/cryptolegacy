export default (filter, allItems) => {
  const slug = filter.toLowerCase()
  const result = allItems.filter(item => item.name.toLowerCase().search(slug) !== -1)

  return result
}
