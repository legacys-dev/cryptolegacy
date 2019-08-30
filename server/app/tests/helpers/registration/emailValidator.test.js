import { generateId } from '@orion-js/app'
import { emailValidator } from 'app/helpers/registration'

it('Should return true by a valid email', () => {
  const email = (generateId(10) + '@' + generateId(5) + '.sss').toLowerCase()
  const result = emailValidator(email)

  expect(result).toBe(true)
})

it('Should return false by a invalid email', () => {
  const firstResult = emailValidator('@gmail.com')
  const secondResult = emailValidator('examplegmail.com')
  const thirdResult = emailValidator('example@.com')
  const fourthResult = emailValidator('example@com')
  const fifthResult = emailValidator('example@gmail.')
  const sixthResult = emailValidator('example@gmail')

  expect(firstResult).toBe(false)
  expect(secondResult).toBe(false)
  expect(thirdResult).toBe(false)
  expect(fourthResult).toBe(false)
  expect(fifthResult).toBe(false)
  expect(sixthResult).toBe(false)
})
