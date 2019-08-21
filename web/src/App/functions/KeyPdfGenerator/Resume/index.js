import React from 'react'
import moment from 'moment'
import {Body, Header, Title, Images, Logo, Picture, Paragraph, Code} from './pdfItems'
import translate from 'App/i18n/translate'

const Resume = ({userData}) => {
  const {userName, userLastName, userMasterKey, createdAt} = userData
  if (!userMasterKey) return <span />
  return (
    <Body wrap size="B6">
      <Header fixed>
        {`${translate('emergencyKit.createTo')} ${userName} ${userLastName} ${translate(
          'emergencyKit.the'
        )} ${moment(createdAt).format('LL')}`}
      </Header>
      <Images>
        <Logo src="https://s3-us-west-2.amazonaws.com/cryptolegacy-internal-use/twoColorsBT.png" />
      </Images>
      <Title>{translate('emergencyKit.emergencyKit')}</Title>
      <Images>
        <Picture src="https://s3-us-west-2.amazonaws.com/cryptolegacy-internal-use/key-42197_960_720.png" />
      </Images>
      <Paragraph>{translate('emergencyKit.yourMasterKey')}</Paragraph>
      <Code>{userMasterKey}</Code>
      <Paragraph>{translate('emergencyKit.rememberSave')}</Paragraph>
    </Body>
  )
}

export default Resume
