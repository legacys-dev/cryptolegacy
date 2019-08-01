import React from 'react'
import styles from './styles.module.css'
import {MdMoreVert} from 'react-icons/md'
import translate from 'App/i18n/translate'

const VaultCard = ({heirsData, numberFiles, size, vaultName, owner}) => {
  const renderHeader = () => {
    return (
      <div className={styles.header}>
        <p className={styles.title}>{vaultName}</p>
        <span>
          <MdMoreVert className={styles.icon} />
        </span>
      </div>
    )
  }

  const renderAvatar = () => {
    return (
      <div>
        <div className={styles.administrator}>
          <p>{owner.role}</p>
        </div>

        <div className={styles.avatarContainer}>
          <img src={owner.image} />
          <p>{owner.name}</p>
        </div>
      </div>
    )
  }

  const renderHeirsAvatar = () => {
    return heirsData.map((heir, index) => {
      return (
        <img
          key={index}
          className={styles.avatar}
          src={heir.image}
          // style={{ position: 'absolute', marginLeft: `${offset}`, border: '1.5px solid white', borderRadius: '50%' }}
        />
      )
    })
  }

  const renderHeirsList = () => {
    return heirsData.map((heir, index) => {
      return (
        <div key={index} className={styles.listiItem}>
          <p>{heir.name}</p>
          <hr className={styles.separateLine} />
        </div>
      )
    })
  }

  const renderFooter = () => {
    return (
      <div className={styles.footer}>
        <h2>{numberFiles} Files</h2>
        <h2>{size}</h2>
      </div>
    )
  }

  const vaultCard = () => {
    return (
      <div className={styles.card}>
        <div className={styles.upSide}>
          {renderHeader()}
          {renderAvatar()}
        </div>
        <div className={styles.downSide}>
          <div className={styles.title2}>
            <p>{translate('vaults.heirs')}</p>
            <div className={styles.images}>{renderHeirsAvatar()}</div>
          </div>
          <div className={styles.containerList}>{renderHeirsList()}</div>
          {renderFooter()}
        </div>
      </div>
    )
  }
  return <div className={styles.container}>{vaultCard()}</div>
}

export default VaultCard
