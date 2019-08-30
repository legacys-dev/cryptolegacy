export default function(password) {
  const passwordLength = password.length > 7

  if (!passwordLength) return { message: 'passwordInvalidLength' }

  const lowerCaseLetters = /[a-z]/
  const atLeastOneLowerCaseLetter = lowerCaseLetters.test(String(password))

  if (!atLeastOneLowerCaseLetter) return { message: 'passwordLowerCaseRequired' }

  const upperCaseLetters = /[A-Z]/
  const atLeastOneUpperCaseLetter = upperCaseLetters.test(String(password))

  if (!atLeastOneUpperCaseLetter) return { message: 'passwordUpperCaseRequired' }

  const numbers = /\d+/g
  const atLeastOneNumber = numbers.test(String(password))

  if (!atLeastOneNumber) return { message: 'passwordNumberRequired' }

  // special characters for passwword
  // const specialCharacters = /[ !@#$%^&*()_+\-=\]{};':"\\|,.<>?]/
  // const atLeastSpecialCharacter = specialCharacters.test(String(password))
  return false
}
