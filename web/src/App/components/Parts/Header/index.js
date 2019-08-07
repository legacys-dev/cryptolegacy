import React from 'react'
import styles from './styles.module.css'
import {Link} from 'react-router-dom'
import {MdKeyboardArrowRight, MdArrowBack} from 'react-icons/md'

const Header = ({past,title, description, right}) => {

  const renderPast = () => {
      const renderLink = !!past;
      let last = null;
      let history = null;
      if(renderLink){
        history = Object.keys(past)
        last = history[history.length -1]
      }
      return (
        <span key={last} className={styles.backContainer}>
          {renderLink ? [
                <div className={styles.pastContainer} key={`link_${description}`}>
            <Link to={last} id={styles.arrowBack}>
                <MdArrowBack / >
            </Link>
            <div className={styles.titleHeader}>{title}</div>
              </div>,
            <div key={`description_${description}`} className={styles.descriptionHeaderBack}>{description}</div>
           ] : (
            <div>
              <div className={styles.titleHeader}>{title}</div>
            <div className={styles.descriptionHeader}>{description}</div>
            </div>
          )}{' '}
        </span>
      )
    }
  

  const renderRight = () => {
    if (!right) return
    return <div className={styles.right}>{right}</div>
  }
  return (
    <div className={styles.container}>
      <div className={styles.all}>
        <div className={styles.content}>
          {renderPast()}
        </div>
        <div className={styles.right}>{renderRight()}</div>
      </div>
      <div className={styles.divider} />
    </div>
  )
}

export default Header
