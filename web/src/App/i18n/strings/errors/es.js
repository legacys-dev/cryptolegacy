import translate from 'App/i18n/translate'

const message = (label, placeholder) => {
  if (label !== 'This field') return translate(label)
  return translate(placeholder)
}

export default {
  stringTooShort: ({label, placeholder}) =>
    `${message(label, placeholder)} no tiene el largo suficiente`,
  notInSchema: ({label, placeholder}) => `${message(label, placeholder)} no esta permitido`,
  required: ({label, placeholder}) => `${message(label, placeholder)} no es opcional`,
  unknownFieldType: ({label, placeholder}) =>
    `${message(label, placeholder)} tiene un tipo desconocido`,
  notAnArray: ({label, placeholder}) => `${message(label, placeholder)} no es un arreglo`,
  notAnObject: ({label, placeholder}) => `${message(label, placeholder)} no es un objeto`,
  notAString: ({label, placeholder}) => `${message(label, placeholder)} no es un texto`,
  notADate: ({label, placeholder}) => `${message(label, placeholder)} no es una fecha valida`,
  notAnInteger: ({label, placeholder}) => `${message(label, placeholder)} no es un nuúmero entero`,
  notANumber: ({label, placeholder}) => `${message(label, placeholder)} no es un número`,
  notAnId: ({label, placeholder}) => `${message(label, placeholder)} no es un ID válido`,
  stringTooLong: `El largo es mayor al permitido`,
  numberTooSmall: ({label, placeholder}) =>
    `${message(label, placeholder)} es un número muy pequeño`,
  numberTooBig: ({label, placeholder}) => `${message(label, placeholder)} es un número muy grande`,
  notABoolean: ({label, placeholder}) =>
    `${message(label, placeholder)} no es un valor verdadero o falso`,
  notAnEmail: ({label, placeholder}) => `${message(label, placeholder)} no es válido`,
  notUnique: ({label, placeholder}) => `${message(label, placeholder)} no es único`,
  notFound: ({label, placeholder}) => `${message(label, placeholder)} no se encontró`,
  mustStartWithPlus: 'El teléfono debe empezar con +',
  gmailRequired: ({label, placeholder}) => `Un email es requerido`,
  gmailStructureRequired: ({label, placeholder}) => `El email debe tener la estructura de gmail`,
  userNotFound: ({label, placeholder}) => `No se encontró un usuario registrado con este email`,
  noPassword: ({label, placeholder}) => `El email ingresado no posee contraseña`,
  incorrectPassword: ({label, placeholder}) => `La contraseña es incorrecta`,
  masterKeyNotFound: ({label, placeholder}) => `La master key es necesaria`,
  invalidMasterKey: ({label, placeholder}) => `La master key ingresada es inválida`,
  errorKeysFoundOnLogin: ({label, placeholder}) => `Usuario inhabilitado`,
  incorrectMasterKey: ({label, placeholder}) => `La master key ingresada es incorrecta`,
  invalidCode: ({label, placeholder}) => `El código ingresado es inválido`,
  invalidEmail: ({label, placeholder}) => `${message(label, placeholder)} no es válido`,
  passwordNotMatch: ({label, placeholder}) => `Contraseña de confirmación incorrecta`,
  driveFolderRequired: ({label, placeholder}) => `Error al conectar con google drive`,
  passwordInvalidLength: ({label, placeholder}) =>
    `La contraseña debe tener un largo de al menos 8 caracteres`,
  passwordLowerCaseRequired: ({label, placeholder}) =>
    `La contraseña debe tener al menos una letra en minúscula`,
  passwordUpperCaseRequired: ({label, placeholder}) =>
    `La contraseña debe tener al menos una letra en mayúscula`,
  passwordNumberRequired: ({label, placeholder}) => `La contraseña debe tener al menos un número`,
  emailAlreadyExists: ({label, placeholder}) => `Este email ya está registrado en la plataforma`
}
