import { passwordRegistration } from 'app/helpers/registration'

it('Should return user password registration token', () => {
  const passwordRegisterData = passwordRegistration()
  const { token } = passwordRegisterData

  expect(typeof passwordRegisterData).toBe('object')
  expect(token.length).toBe(201)
})
