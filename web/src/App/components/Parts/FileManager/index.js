import React, { useState } from 'react'
import styles from './styles.module.css'
import Manager from './Manager'
import { MdFileUpload } from 'react-icons/md/'
import Button from 'App/components/Parts/Button'
import translate from 'App/i18n/translate'

const FileManager = ({ value, label, errorMessage }) => {
  const [open, setOpen] = useState(false)

  const renderValue = () => {
    return (
      <div className={styles.upload}>
        <Button primary icon={MdFileUpload} onClick={() => setOpen(true)}>
          {translate('fileManager.startUpload')}
        </Button>
      </div>
    )
  }

  const renderManager = () => {
    if (!open) return
    return <Manager close={() => setOpen(false)} />
  }

  return (
    <div className={styles.container}>
      <div className="label">{label}</div>
      {renderManager()}
      {renderValue()}
      <div className={styles.error}>{errorMessage}</div>
    </div>
  )
}

export default FileManager
