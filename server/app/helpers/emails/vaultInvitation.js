import React from 'react'
import sendEmailWithMessage from 'app/helpers/createEmail/sendEmailWithMessage'
import setReceptor from './setReceptor'

export default async function({ owner, user, code, vaultName }) {
  const { email, name, lastName } = user
  const { ownerEmail, ownerName, ownerLastName } = owner
  const hasAccount = name && lastName

  const emailContent = (
    <div>
      <p className="title">Hola {hasAccount ? name + lastName : ''}</p>
      <p className="space">Se te comunica que se te ha invitado a una bóveda en CryptoLegacy.</p>
      <p className="space">
        La persona de nombre {ownerName} {ownerLastName} de email {ownerEmail} te ha seleccionado
        para darte acceso.
      </p>
      <p className="space" />
      <p className="space">
        Nombre de la bóveda: <strong>{vaultName}</strong>
      </p>
      <p className="space" />
    </div>
  )

  await sendEmailWithMessage({
    to: setReceptor(email),
    subject: 'Se te ha invitado a una bóveda',
    content: emailContent
  })
}
