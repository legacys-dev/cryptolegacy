import React from 'react'

const personalVaultContext = React.createContext('personal-vault-data')
const VaultProvider = personalVaultContext.Provider
const VaultConsumer = personalVaultContext.Consumer

export {VaultProvider, VaultConsumer}
