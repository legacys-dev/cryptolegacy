import React from 'react'
import sendEmailWithMessage from 'app/helpers/createEmail/sendEmailWithMessage'
import setReceptor from './setReceptor'

export default async function({email, userUrl, name, lastName}) {
  const emailContent = (
    <div>
      <p className="title">
        Hola {name} {lastName}
      </p>
      <p className="space">
        <a href={userUrl}>Ingrese aquí para recuperar su contraseña.</a>
      </p>
    </div>
  )

  await sendEmailWithMessage({
    to: email,
    subject: 'Recuperación de contraseña',
    content: emailContent
  })
}
