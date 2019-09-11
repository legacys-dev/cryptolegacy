import React, { useRef, useEffect, useState } from 'react'
import styles from './styles.module.css'
import { MdMoreVert } from 'react-icons/md'
import translate from 'App/i18n/translate'
import Options from './Options'
const VaultCard = ({ heirsData, numberFiles, size, vaultName, owner, vaultId }) => {
  const [showOptions, setShowOptions] = useState(false)

  function useOutsideAlerter(ref) {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowOptions(false)
      }
    }

    useEffect(() => {
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside)
      }
    })
  }

  const renderHeader = () => {
    const wrapRef = useRef(null)
    useOutsideAlerter(wrapRef)
    return (
      <div className={styles.header}>
        <p className={styles.title}>{vaultName}</p>
        <span>
          <div className={styles.dropdown} ref={wrapRef}>
            <MdMoreVert onClick={() => setShowOptions(!showOptions)} className={styles.icon} />
            <Options showOptions = {showOptions} vaultId={vaultId}/>
          </div>
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
    if (!heirsData) {
      return <div>No hay herencias</div>
    }
    return heirsData.map((heir, index) => {
      if (heir.image) <img key={index} className={styles.avatar} src={heir.image} />
    })
  }

  const renderHeirsList = () => {
    if (heirsData.length === 0) {
      return <div>No hay herencias</div>
    }
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
