import React from 'react'
import './vaulcard.css'

const VaultCard = props => {
  const renderHeader = title => {
    return (
      <div className="header">
        <p className="title">{title}</p>
      </div>
    )
  }

  const renderAvatar = (role, name) => {
    return (
      <div>
        <div className="administrator">
          <p>{role}</p>
        </div>

        <div className="avatar-container">
          <img
            className="avatar"
            src="https://www.drain1.ca/wp-content/uploads/2018/01/flat-faces-icons-circle-3-300x300.png"
          />
          <p>{name}</p>
        </div>
      </div>
    )
  }

  const renderHeirsAvatar = heirs => {
    return heirs.map((heir, index) => {
      return (
        <img
          key={index}
          className="avatar"
          src={heir.image}
          // "https://www.drain1.ca/wp-content/uploads/2018/01/flat-faces-icons-circle-3-300x300.png"
        />
      )
    })
  }

  const heirs = [
    {
      name: 'Diego Mellis',
      image:
        'https://www.drain1.ca/wp-content/uploads/2018/01/flat-faces-icons-circle-3-300x300.png'
    },

    {
      name: 'Michael Castillo',
      image:
        'https://www.drain1.ca/wp-content/uploads/2018/01/flat-faces-icons-circle-3-300x300.png'
    },
    {
      name: 'Nicolas',
      image:
        'https://www.drain1.ca/wp-content/uploads/2018/01/flat-faces-icons-circle-3-300x300.png'
    }
  ]

  return (
    <div className="container">
      <div className="up-side">
        {renderHeader('Asseurance Vault')}
        {renderAvatar('Administrador', 'Diego Mellis')}
      </div>
      <div className="down-side">
        <div className="title2">
          <p> HEIRS</p>
          <div className="images">{renderHeirsAvatar(heirs)}</div>
        </div>
        <div className="container-list">
          {['Julio', 'Diego', 'Michael', 'Andrés', 'Rusio'].map((item, index) => (
            <div key={index} className="list-item">
              <p>{item}</p>
              <hr className="separate-line" />
            </div>
          ))}
        </div>

        <div className="footer">
          <h2>2 Files</h2>
          <h2>10 GB</h2>
        </div>
      </div>
    </div>
  )
}
export default VaultCard
