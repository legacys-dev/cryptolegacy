import React from 'react'
import sendEmailWithMessage from 'app/helpers/createEmail/sendEmailWithMessage'

export default async function({owner, user, code, vaultName}) {
  const {email, name, lastName} = user
  const {ownerEmail, ownerName, ownerLastName} = owner

  const hasAccount = name && lastName

  const local = process.env.ORION_LOCAL
  const link = local ? `http://localhost:3010/register` : `https://dev.cryptolegacy.io/register`

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
    to: email,
    subject: 'Código de verificación para herencia',
    content: emailContent
  })
}
