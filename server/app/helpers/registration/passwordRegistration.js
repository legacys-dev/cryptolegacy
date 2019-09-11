import { generateId } from '@orion-js/app'

export default function() {
  return {
    token: generateId(201),
    date: new Date()
  }
}
