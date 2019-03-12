const routes = [
  '/login',
  '/register',
  '/verify-email',
  '/password',
  '/forgot',
  '/reset',
  '/enroll'
].map(path => {
  return `\\${path}`
})

const regex = `^(${routes.join('|')})`

export default new RegExp(regex)
