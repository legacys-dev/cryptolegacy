import { PermissionsError } from '@orion-js/app'
import bcrypt from 'bcryptjs'

export default async (vaultPolicy, user, code) => {
  if (!vaultPolicy) {
    throw new PermissionsError('unauthorized', { message: 'Unauthorized credentials access' })
  }

  if (!user) {
    throw new PermissionsError('unauthorized', { message: 'Unauthorized credentials access' })
  }

  if ((await user.email()) !== vaultPolicy.userEmail) {
    throw new PermissionsError('unauthorized', { message: 'Unauthorized credentials access' })
  }

  if (!bcrypt.compareSync(code, vaultPolicy.transferData.code.bcrypt)) {
    throw new PermissionsError('unauthorized', { message: 'Wrong code' })
  }
}
