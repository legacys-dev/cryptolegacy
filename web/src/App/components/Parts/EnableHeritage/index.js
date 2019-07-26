import React from 'react'
import styles from './styles.module.css'
import MutationButton from 'App/components/MutationButton'
import translate from 'App/i18n/translate'
const EnableHeritage = ({vaultPolicyId, onEnableSuccess}) => {
  return (
    <div className={styles.container}>
      <MutationButton
        title={translate('enableHeritage.enableHeritageTitle')}
        message={translate('enableHeritage.confirmHeritageMessage')}
        confirmText={translate('enableHeritage.enableConfirmText')}
        mutation="releaseHeritage"
        danger
        params={{vaultPolicyId: vaultPolicyId}}
        onSuccess={() => onEnableSuccess()}>
        <div className={styles.enable}>{translate('enableHeritage.enable')}</div>
      </MutationButton>
    </div>
  )
}

export default EnableHeritage
