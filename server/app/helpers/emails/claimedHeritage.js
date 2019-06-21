import React from 'react'
import sendEmailWithMessage from 'app/helpers/createEmail/sendEmailWithMessage'

export default async function({user, vaultName}) {
  const {email, name, lastName} = user

  const emailContent = (
    <div>
      <p className="title">
        Hola {name} {lastName}
      </p>
      <p className="space">
        Has completado el proceso de herencia de la bóveda <strong>#{vaultName}</strong>
      </p>
    </div>
  )

  await sendEmailWithMessage({
    to: email,
    subject: 'Proceso de herencia completado',
    content: emailContent
  })
}
