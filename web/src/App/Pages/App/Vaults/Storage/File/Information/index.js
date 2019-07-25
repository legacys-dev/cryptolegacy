import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Section from 'App/components/Section'
import getSize from 'App/helpers/files/getSize'
import mime from 'mime-types'
import moment from 'moment'
import translate from 'App/i18n/translate'

const storage = {
  b2: translate('fileManager.simpleType'),
  glacier: translate('fileManager.highType')
}

export default class Information extends React.Component {
  static propTypes = {
    file: PropTypes.object
  }

  renderInformation(title, info) {
    return (
      <div className={styles.content}>
        <div className="row">
          <div className="col-xs-12 col-sm-3 end-sm" style={{color: '#999999'}}>
            {title}
          </div>
          <div className="col-xs-12 col-sm-9 start-sm">{info}</div>
        </div>
      </div>
    )
  }

  render() {
    const {file} = this.props
    if (!file) return <span />
    return (
      <div className={styles.container}>
        <Section top title={translate('information.infoTitle')} description={translate('information.description')}>
          <div className={styles.file}>
            {this.renderInformation(translate('information.name'), file.data.name)}
            {this.renderInformation(translate('information.type'), mime.extension(file.data.type))}
            {this.renderInformation(translate('information.size'), getSize(file.data.size))}
            {this.renderInformation(translate('information.vault'), file.vaultName)}
            {this.renderInformation(translate('information.storageType'), storage[file.data.storageType])}
            {this.renderInformation(translate('information.createdDate'), moment(file.createdAt).format('LL'))}
          </div>
        </Section>
      </div>
    )
  }
}
