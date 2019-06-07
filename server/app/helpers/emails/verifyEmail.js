import React from 'react'
import sendEmailWithMessage from 'app/helpers/createEmail/sendEmailWithMessage'

export default async function({registerData}) {
  const {email, name, lastName} = registerData.userInformation
  const {verifyCode} = registerData

  const emailContent = (
    <div>
      <p className="title">
        Hola {name} {lastName}
      </p>
      <p className="space">
        Escribe este código de verificación para continuar con el registro de tu cuenta en
        Cryptolegacy:
      </p>
      <p>
        <strong>{verifyCode}</strong>
      </p>
    </div>
  )

  await sendEmailWithMessage({
    to: email,
    subject: 'Código de verificación de email',
    content: emailContent
  })
}
