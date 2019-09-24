import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'
import { MdClose } from 'react-icons/md'
import IconButton from 'orionsoft-parts/lib/components/IconButton'
import EncryptLoading from 'App/components/Parts/EncryptLoading'
import getSize from 'App/helpers/files/getSize'
import { Line } from '../../LoadProgress'
import translate from 'App/i18n/translate'

const Progress = ({ total, loaded, close, decrypt }) => {
  const [decrypting, setDecrypting] = useState(decrypt)

  useEffect(() => {
    setDecrypting(decrypt)
  }, [decrypt])

  const renderDecryptingLoader = () => {
    if (!decrypting) return
    return (
      <div className={styles.decrypting}>
        <EncryptLoading />
        <p>{translate('fileManager.decrypting')}...</p>
      </div>
    )
  }

  const renderProgress = () => {
    const totalProgress = loaded ? Number(((loaded * 100) / total).toFixed(3)) : 0
    return (
      <div>
        <div className={styles.loading}>
          {translate('parts.downloading')} ({totalProgress.toFixed(2)}%)
          <br />
          {getSize(loaded)} of {getSize(total)}
        </div>
        <div className={styles.progressLine}>
          <Line percent={totalProgress} />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.title}>{translate('parts.downloadArchiveOption')}</div>
          <div className={styles.close}>
            <IconButton tooltip={translate('global.close')} icon={MdClose} onPress={close} />
          </div>
        </div>
        {renderProgress()}
        {renderDecryptingLoader()}
      </div>
    </div>
  )
}

export default Progress
