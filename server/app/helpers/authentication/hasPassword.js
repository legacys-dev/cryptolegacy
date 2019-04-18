export default async function(user) {
  if (!user.services || !user.services.password || !user.services.password.bcrypt) return false
  return true
}
