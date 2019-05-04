import React from 'react'
import PropTypes from 'prop-types'
// import styles from './styles.css'
import S3Download from './S3Download'
import B2Download from './B2Download'

export default class DownloadButton extends React.Component {
  static propTypes = {
    file: PropTypes.object,
    button: PropTypes.bool
  }

  renderS3Download() {
    const {getFromS3, data} = this.props.file
    return <S3Download downloadUrl={getFromS3} fileName={data.name} button={this.props.button} />
  }

  renderB2Download() {
    const {getFromB2, data} = this.props.file
    return <B2Download downloadUrl={getFromB2} fileName={data.name} button={this.props.button} />
  }

  render() {
    const {file} = this.props
    if (file.getFromS3) return this.renderS3Download()
    if (file.data.storageType === 'b2') return this.renderB2Download()
    return <span />
  }
}
