import {generateId} from '@orion-js/app'

export default function() {
  return {
    token: generateId(151),
    date: new Date()
  }
}
