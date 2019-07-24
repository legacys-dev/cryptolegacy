import {DataStorage, Options, Trash} from 'App/components/Parts/Icons'
import translate from 'App/i18n/translate'
export default [
  {name: translate('sidebar.vaults'), icon: DataStorage, path: '/vaults'},
  {name: translate('sidebar.actions'), icon: Options, path: '/actions'},
  {name: translate('sidebar.trash'), icon: Trash, path: '/trash'}
]
