import React, {useState} from 'react'
import styles from './styles.module.css'
import {MdClose} from 'react-icons/md'
import IconButton from 'orionsoft-parts/lib/components/IconButton'
import {VaultConsumer} from 'App/helpers/contexts/vaultContext'
import Upload from './Upload'
import classnames from 'classnames'
import getEnv from 'App/Root/getEnv'
import translate from 'App/i18n/translate'

const Manager = ({close}) => {
  const [progress, setProgress] = useState(0)
  const [loaded, setLoaded] = useState(0)
  const [total, setTotal] = useState(0)

  const onUploadProgressChange = items => {
    const {progress, loaded, total} = items
    setProgress(progress)
    setLoaded(loaded)
    setTotal(total)
  }

  const getContentStyles = () => {
    const envType = getEnv()
    if (envType === 'local' || envType === 'app') return styles.content
    return classnames(styles.content, styles.hasMessage)
  }

  return (
    <div className={styles.container}>
      <div className={getContentStyles()}>
        <div className={styles.header}>
          <div className={styles.title}>{translate('fileManager.files')}</div>
          <div className={styles.close}>
            <IconButton tooltip={translate('fileManager.close')} icon={MdClose} onPress={close} />
          </div>
        </div>
        <VaultConsumer>
          {providerProps => (
            <Upload
              close={close}
              progress={progress}
              loaded={loaded}
              total={total}
              vaultId={providerProps.vaultId}
              onUploadProgressChange={items => onUploadProgressChange(items)}
            />
          )}
        </VaultConsumer>
      </div>
    </div>
  )
}

export default Manager
