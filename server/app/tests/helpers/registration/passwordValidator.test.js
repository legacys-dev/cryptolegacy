import {passwordValidator} from 'app/helpers/registration'

it('Should return false, its a valid password', () => {
  const validPassword = 'Cgfsrasdfaf123'
  const result = passwordValidator(validPassword)

  expect(result).toBe(false)
})

it('Should return an object, its an error', () => {
  const firstResult = passwordValidator('Sdsf123')
  const secondResult = passwordValidator('ASDASDDASD123')
  const thirdResult = passwordValidator('asdasdasd123')
  const fourthResult = passwordValidator('ASDasdaasd')

  expect(firstResult.message).toBe('passwordInvalidLength')
  expect(secondResult.message).toBe('passwordLowerCaseRequired')
  expect(thirdResult.message).toBe('passwordUpperCaseRequired')
  expect(fourthResult.message).toBe('passwordNumberRequired')
})
