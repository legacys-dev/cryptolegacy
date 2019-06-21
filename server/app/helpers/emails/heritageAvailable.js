import React from 'react'
import sendEmailWithMessage from 'app/helpers/createEmail/sendEmailWithMessage'

export default async function({user, accessToken, vaultName}) {
  const {email, name, lastName} = user

  const local = process.env.ORION_LOCAL

  const link = local
    ? `http://localhost:3010/heritage/${accessToken}`
    : `https://dev.cryptolegacy.io/heritage/${accessToken}`

  const emailContent = (
    <div>
      <p className="title">
        Hola {name} {lastName}
      </p>
      <p className="space">
        Se te comunica que tu herencia de la bóveda <strong>#{vaultName}</strong> está lista para
        completarse.
      </p>
      <p className="space">
        Solo debes ingresar al siguiente link e ingresar el código de seguridad que se te envió en
        algún momento a tu email.
      </p>
      <p>
        <a href={link}>
          <strong>Reclamar mi herencia</strong>
        </a>
      </p>
    </div>
  )

  await sendEmailWithMessage({
    to: email,
    subject: 'Reclamar herencia',
    content: emailContent
  })
}
