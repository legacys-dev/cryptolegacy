const message = (label, placeholder) => {
  if (label !== 'This field') return label
  return placeholder
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
  mustStartWithPlus: 'The phone must start with +'
}
