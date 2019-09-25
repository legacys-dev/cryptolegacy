import React from 'react'
import sendEmailWithMessage from 'app/helpers/createEmail/sendEmailWithMessage'
import setReceptor from './setReceptor'

export default async function({ user, vaultName }) {
  const { email, name, lastName } = user

  const emailContent = (
    <div>
      <p className="title">
        Hola {name} {lastName}
      </p>
      <p className="space">
        Has aceptado la invitación de la bóveda <strong>#{vaultName}</strong>
      </p>
    </div>
  )

  await sendEmailWithMessage({
    to: setReceptor(email),
    subject: 'Proceso de invitación completado',
    content: emailContent
  })
}
