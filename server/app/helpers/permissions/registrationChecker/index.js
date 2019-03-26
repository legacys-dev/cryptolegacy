import cloneDeep from 'lodash/cloneDeep'
import emailRegister from './emailRegister'
import creatingUser from './creatingUser'
import confirmingEmail from './confirmingEmail'

export default async function(options, viewer, {params}) {
  params = cloneDeep(params)

  const {emailRegisterPermission, userCreatePermission, confirmEmailPermission} = options

  if (emailRegisterPermission) {
    const {email, name, lastName} = params
    await emailRegister({viewer, email, name, lastName})
  }

  if (confirmEmailPermission) {
    const {code, token} = params
    await confirmingEmail({viewer, code, token})
  }

  if (userCreatePermission) {
    const {password, confirmPassword, token} = params
    await creatingUser({viewer, password, confirmPassword, token})
  }
}
