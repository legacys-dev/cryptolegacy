import React from 'react'
import sendEmailWithMessage from 'app/helpers/createEmail/sendEmailWithMessage'
import setReceptor from './setReceptor'

export default async function({userInformation}) {
  const {email, name, lastName} = userInformation

  const emailContent = (
    <div>
      <p className="title">
        Hola {name} {lastName}
      </p>
      <p className="space">Has finalizado con la creación de tu cuenta de CryptoLegacy</p>
    </div>
  )

  await sendEmailWithMessage({
    to: setReceptor(email),
    subject: 'Cuenta creada correctamente',
    content: emailContent
  })
}
