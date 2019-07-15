import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import {MdClose} from 'react-icons/md'
import IconButton from 'orionsoft-parts/lib/components/IconButton'
import {VaultConsumer} from 'App/helpers/contexts/vaultContext'
import Upload from './Upload'
import classnames from 'classnames'
import getEnv from 'App/Root/getEnv'

export default class Manager extends React.Component {
  static propTypes = {
    close: PropTypes.func
  }

  state = {progress: 0}

  onUploadProgressChange = (progress, loaded, total) => {
    this.setState({progress, loaded, total})
  }

  getContentStyles() {
    const envType = getEnv()
    if (envType === 'local' || envType === 'app') return styles.content
    return classnames(styles.content, styles.hasMessage)
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={this.getContentStyles()}>
          <div className={styles.header}>
            <div className={styles.title}>Archivos</div>
            <div className={styles.close}>
              <IconButton tooltip="Cerrar" icon={MdClose} onPress={this.props.close} />
            </div>
          </div>
          <VaultConsumer>
            {providerProps => (
              <Upload
                close={this.props.close}
                progress={this.state.progress}
                loaded={this.state.loaded}
                total={this.state.total}
                vaultId={providerProps.vaultId}
                onUploadProgressChange={this.onUploadProgressChange}
              />
            )}
          </VaultConsumer>
        </div>
      </div>
    )
  }
}
