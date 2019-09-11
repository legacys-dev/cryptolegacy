import { MdSettingsApplications, MdStorage } from 'react-icons/md'
import translate from 'App/i18n/translate'

export default [
  {
    name: 'files',
    icon: MdStorage,
    route: '/vaults/storage/',
    message: translate('vaults.vaultsFiles')
  },
  {
    name: 'settings',
    icon: MdSettingsApplications,
    route: '/vaults/storage-update/',
    message: translate('vaults.configureVault')
  }
]
