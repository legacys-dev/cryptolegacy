import React from 'react'
import sendEmailWithMessage from 'app/helpers/createEmail/sendEmailWithMessage'
import setReceptor from './setReceptor'
import getUrl from './getUrl'

export default async function({user, accessToken, vaultName}) {
  const {email, name, lastName} = user
  const link = getUrl() + `/heritage/${accessToken}`

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
    to: setReceptor(email),
    subject: 'Reclamar herencia',
    content: emailContent
  })
}
