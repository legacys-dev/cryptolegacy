import React from 'react'
import styles from './styles.css'
import Tooltip from 'orionsoft-parts/lib/components/Tooltip'
import {MdInsertDriveFile} from 'react-icons/md'

export default function FileView(props) {
  return (
    <div className={styles.container}>
      <Tooltip content="Información del archivo" place="top">
        <MdInsertDriveFile
          className={styles.icon}
          size={25}
          onClick={() =>
            props.history.push(`/vaults/storage/${props.vaultId}/file/${props.fileId}`)
          }
        />
      </Tooltip>
    </div>
  )
}
