import {generateId} from '@orion-js/app'

export default function() {
  return {
    token: `${generateId()}-${generateId()}-${generateId()}`,
    date: new Date()
  }
}
