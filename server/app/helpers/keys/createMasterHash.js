import {generateId} from '@orion-js/app'
import cloneDeep from 'lodash/cloneDeep'

export default function() {
  const characters = 1000
  let newIdentificator = cloneDeep(generateId(characters))

  const randomOne = Math.floor(Math.random() * 11)
  const randomTwo = Math.floor(Math.random() * 13)
  const randomThree = Math.floor(Math.random() * 17)

  let rangeOne
  let rangeTwo
  let rangeThree

  let acceptedRange

  do {
    acceptedRange = true

    rangeOne = Math.floor(Math.random() * 250) + randomOne
    rangeTwo = Math.floor(Math.random() * 550) + randomTwo
    rangeThree = Math.floor(Math.random() * 850) + randomThree

    if (Math.abs(rangeOne - rangeTwo) < 11) acceptedRange = false
    if (Math.abs(rangeTwo - rangeThree) < 11) acceptedRange = false
    if (Math.abs(rangeOne - rangeThree) < 11) acceptedRange = false
  } while (!acceptedRange)

  const hashOne = cloneDeep(newIdentificator.slice(rangeOne, rangeOne + 8))
  const hashTwo = cloneDeep(newIdentificator.slice(rangeTwo, rangeTwo + 10))
  const hashThree = cloneDeep(newIdentificator.slice(rangeThree, rangeThree + 8))

  const secretkeyInterval = Math.floor(Math.random() * 10)
  const secretIvInterval = Math.floor(Math.random() * 10)

  const masterKey = `${secretkeyInterval}:${hashOne}-${hashTwo}-${hashThree}:${secretIvInterval}`

  if (masterKey.length !== 32) throw new Error('Error creating new master key')

  const masterKeyItems = masterKey.split(':')

  const resultObject = {
    masterKey,
    secretKeyInterval: masterKeyItems[0],
    ivKeyInterval: masterKeyItems[2],
    rest: masterKeyItems[1],
    range: masterKey.length
  }

  return resultObject
}
