import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import {MdClose} from 'react-icons/md'
import IconButton from 'orionsoft-parts/lib/components/IconButton'
import getSize from 'App/helpers/files/getSize'
import {Line} from '../../LoadProgress'

export default class Progress extends React.Component {
  static propTypes = {
    total: PropTypes.number,
    loaded: PropTypes.number,
    close: PropTypes.func
  }

  renderProgress() {
    const {loaded, total} = this.props
    const totalProgress = loaded ? Number(((loaded * 100) / total).toFixed(3)) : 0
    return (
      <div>
        <div className={styles.loading}>
          Downloading file ({totalProgress.toFixed(2)}%)
          <br />
          {getSize(loaded)} of {getSize(total)}
        </div>
        <div className={styles.progressLine}>
          <Line percent={totalProgress} />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.title}>Download archive</div>
            <div className={styles.close}>
              <IconButton tooltip="Cerrar" icon={MdClose} onPress={this.props.close} />
            </div>
          </div>
          {this.renderProgress()}
        </div>
      </div>
    )
  }
}
