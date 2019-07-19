export default path => {
  const {pathname} = window.location

  if (!pathname) return

  const arrayRoutes = pathname.split('/')

  if (!arrayRoutes) return
  if (!arrayRoutes[1]) return

  return path === arrayRoutes[1] || pathname.startsWith(path)
}
