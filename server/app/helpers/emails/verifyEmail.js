import React from 'react'
import sendEmailWithMessage from 'app/helpers/createEmail/sendEmailWithMessage'

export default async function({email, name, lastName, code}) {
  await sendEmailWithMessage({
    to: email,
    subject: 'Código de verificación de email',
    content: (
      <div>
        <p>
          Hola {name} {lastName}
        </p>
        <p>
          Escribe este código de verificación para continuar con el registro de tu cuenta en
          Cryptolegacy:
        </p>
        <p>{code}</p>
        <p>Si tienes problemas, contacta al elquipo de soporte de Cryptolegacy.</p>
        <p>Footer</p>
      </div>
    )
  })
}
