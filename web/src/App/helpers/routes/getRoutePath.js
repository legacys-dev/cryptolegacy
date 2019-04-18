export default function() {
  const {pathname} = window.location
  const arrayRoutes = pathname.split('/')

  if (!arrayRoutes) return
  if (!arrayRoutes[1]) return

  return arrayRoutes[1]
}
