import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import {MdClose} from 'react-icons/md'
import IconButton from 'orionsoft-parts/lib/components/IconButton'
import Upload from './Upload'
import autobind from 'autobind-decorator'

export default class Manager extends React.Component {
  static propTypes = {
    close: PropTypes.func,
    onChange: PropTypes.func
  }

  state = {}

  @autobind
  selectFile(fileId) {
    this.props.onChange({_id: fileId})
    this.props.close()
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.title}>Archivos</div>
            <div className={styles.close}>
              <IconButton tooltip="Cerrar" icon={MdClose} onPress={this.props.close} />
            </div>
          </div>
          <Upload />
        </div>
      </div>
    )
  }
}
