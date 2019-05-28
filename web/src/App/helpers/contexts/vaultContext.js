import React from 'react'

const vaultContext = React.createContext('personal-vault-data')
const VaultProvider = vaultContext.Provider
const VaultConsumer = vaultContext.Consumer

export {VaultProvider, VaultConsumer}
