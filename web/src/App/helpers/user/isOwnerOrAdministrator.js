export default credentials => {
  const { credential, role } = credentials

  if (!credential) return

  if (credential === 'owner') return true

  if (!role) return

  if (role === 'admin') return true
}
