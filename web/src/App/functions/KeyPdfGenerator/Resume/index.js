import React from 'react'
import moment from 'moment'
import {Body, Header, Title, Images, Logo, Picture, Paragraph, Code} from './pdfItems'

const Resume = ({userData}) => {
  const {userName, userLastName, userMasterKey, createdAt} = userData
  if (!userMasterKey) return <span />

  return (
    <Body wrap size="B6">
      <Header fixed>
        Creado para {userName} {userLastName} el {moment(createdAt).format('LL')}
      </Header>
      <Images>
        <Logo src="https://s3-us-west-2.amazonaws.com/cryptolegacy-internal-use/twoColorsBT.png" />
      </Images>
      <Title>Kit de emergencia</Title>
      <Images>
        <Picture src="https://s3-us-west-2.amazonaws.com/cryptolegacy-internal-use/key-42197_960_720.png" />
      </Images>
      <Paragraph>Tu llave maestra es:</Paragraph>
      <Code>{userMasterKey}</Code>
      <Paragraph>
        Recuerda guardar este documento en un lugar seguro. Este documento es de vital importacia
        para que puedas acceder a tu cuenta en la plataforma.
      </Paragraph>
    </Body>
  )
}

export default Resume
