import React from 'react'
import sendEmailWithMessage from 'app/helpers/createEmail/sendEmailWithMessage'
import setReceptor from './setReceptor'
import getUrl from './getUrl'

export default async function({ owner, user, code, vaultName }) {
  const { email, name, lastName } = user
  const { ownerEmail, ownerName, ownerLastName } = owner
  const hasAccount = name && lastName
  const link = getUrl() + `/register`

  const emailContent = (
    <div>
      <p className="title">Hola {hasAccount ? name + lastName : ''}</p>
      <p className="space">Se te comunica que se ha realizado la creación de una herencia.</p>
      <p className="space">
        La persona de nombre {ownerName} {ownerLastName} de email {ownerEmail} te ha seleccionado
        para darte acceso en un futuro a una de sus bóvedas.
      </p>
      <p className="space">
        Guarda en un lugar seguro el siguiente código, ya que cuando la herencia se complete,
        deberás ingresarlo en la plataforma para finalizar con el proceso.
      </p>
      <p className="space" />
      <p className="space">
        Nombre de la bóveda: <strong>{vaultName}</strong>
        <br />
        código: <strong>{code}</strong>
      </p>
      <p className="space" />
      {hasAccount && (
        <p className="space">
          Si no tienes una cuenta en CryptoLegacy puedes crearte una haciendo click aca{' '}
          <a href={link}>
            <strong>Crear cuenta</strong>
          </a>
        </p>
      )}
    </div>
  )

  await sendEmailWithMessage({
    to: setReceptor(email),
    subject: 'Código de verificación para herencia',
    content: emailContent
  })
}
