import translate from 'App/i18n/translate'

const message = (label, placeholder) => {
  if (label !== 'This field') return translate(label)
  return translate(placeholder)
}

export default {
  stringTooShort: ({label, placeholder}) => `${message(label, placeholder)} is too short`,
  notInSchema: ({label, placeholder}) => `${message(label, placeholder)} is not in the schema`,
  required: ({label, placeholder}) => `${message(label, placeholder)} is required`,
  unknownFieldType: ({label, placeholder}) =>
    `${message(label, placeholder)} is an unkown field type`,
  notAnArray: ({label, placeholder}) => `${message(label, placeholder)} is not an array`,
  notAnObject: ({label, placeholder}) => `${message(label, placeholder)} is not an object`,
  notAString: ({label, placeholder}) => `${message(label, placeholder)} is not a string`,
  notADate: ({label, placeholder}) => `${message(label, placeholder)} is not a date`,
  notAnInteger: ({label, placeholder}) => `${message(label, placeholder)} is not an integer`,
  notANumber: ({label, placeholder}) => `${message(label, placeholder)} is not a number`,
  notAnId: ({label, placeholder}) => `${message(label, placeholder)} is not a valid ID`,
  stringTooLong: ({label, placeholder}) => `${message(label, placeholder)} is too long`,
  numberTooSmall: ({label, placeholder}) => `${message(label, placeholder)} is too small`,
  numberTooBig: ({label, placeholder}) => `${message(label, placeholder)} is too big`,
  notABoolean: ({label, placeholder}) => `${message(label, placeholder)} is not a boolean`,
  notAnEmail: ({label, placeholder}) => `${message(label, placeholder)} is not an email`,
  notUnique: ({label, placeholder}) => `${message(label, placeholder)} is not unique`,
  notFound: ({label, placeholder}) => `${message(label, placeholder)} not found`,
  invalid: ({label, placeholder}) => `${message(label, placeholder)} is not a valid value`,
  mustStartWithPlus: 'The phone must start with +',
  userNotFound: ({label, placeholder}) => `User not found with this email`,
  gmailRequired: ({label, placeholder}) => `Email is required`,
  gmailStructureRequired: ({label, placeholder}) => `The email need a gmail structure`,
  driveFolderRequired: ({label, placeholder}) => `Error connecting with google drive`,
  noPassword: ({label, placeholder}) => `The email hasn't password`,
  incorrectPassword: ({label, placeholder}) => `Incorrect password`,
  masterKeyNotFound: ({label, placeholder}) => `Master key is required`,
  invalidMasterKey: ({label, placeholder}) => `The master key is invalid`,
  errorKeysFoundOnLogin: ({label, placeholder}) => `Disabled user`,
  incorrectMasterKey: ({label, placeholder}) => `The master key is incorrect`,
  invalidCode: ({label, placeholder}) => `Invalid code`,
  invalidEmail: ({label, placeholder}) => `${message(label, placeholder)} in invalid`,
  passwordNotMatch: ({label, placeholder}) => `Incorrect password`,
  passwordInvalidLength: ({label, placeholder}) =>
    `The password must be at least 8 characters long`,
  passwordLowerCaseRequired: ({label, placeholder}) =>
    `The password must be at least one lowercase letter`,
  passwordUpperCaseRequired: ({label, placeholder}) =>
    `The password must be at least one uppercase letter`,
  passwordNumberRequired: ({label, placeholder}) =>
    `The password must be at least one character number`,
  emailAlreadyExists: ({label, placeholder}) => `This email already exists`
}
