import React from 'react'
import sendEmailWithMessage from 'app/helpers/createEmail/sendEmailWithMessage'

export default async function({userData}) {
  const {email, name, lastName} = userData

  const emailContent = (
    <div>
      <p className="title">
        Hola {name} {lastName}
      </p>
      <p className="space">Has finalizado con la creación de tu cuenta de CryptoLegacy</p>
    </div>
  )

  await sendEmailWithMessage({
    to: email,
    subject: 'Código de verificación de email',
    content: emailContent
  })
}
