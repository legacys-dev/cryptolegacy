import { emailRegistration } from 'app/helpers/registration'
import { generateId } from '@orion-js/app'
import bcrypt from 'bcryptjs'

it('Should return object with user information', () => {
  const registerParams = {
    email: generateId(11) + '@example.com',
    name: 'ExampleName',
    lastName: 'ExampleLastName'
  }

  const result = emailRegistration(registerParams)
  const { userRegisterData, verifyCode } = result
  const { confirmEmail } = userRegisterData

  expect(typeof result).toBe('object')
  expect(typeof userRegisterData).toBe('object')
  expect(typeof verifyCode).toBe('string')
  expect(verifyCode.length).toBe(9)
  expect(confirmEmail.confirm).toBe(false)
  expect(confirmEmail.token.length).toBe(201)
  expect(bcrypt.compareSync(verifyCode, confirmEmail.code.bcrypt)).toBe(true)
})

it('Should return error by email', () => {
  const registerParams = {
    email: undefined,
    name: 'ExampleName',
    lastName: 'ExampleLastName'
  }

  let hasError
  try {
    emailRegistration(registerParams)
  } catch (error) {
    hasError = error
  }

  expect(hasError).toBeInstanceOf(Error)
})

it('Should return error by name', () => {
  const registerParams = {
    email: generateId(10) + '@example.com',
    name: undefined,
    lastName: 'ExampleLastName'
  }

  let hasError
  try {
    emailRegistration(registerParams)
  } catch (error) {
    hasError = error
  }

  expect(hasError).toBeInstanceOf(Error)
})

it('Should return error by lastName', () => {
  const registerParams = {
    email: 'ExampleName',
    name: 'ExampleName',
    lastName: undefined
  }

  let hasError
  try {
    emailRegistration(registerParams)
  } catch (error) {
    hasError = error
  }

  expect(hasError).toBeInstanceOf(Error)
})
