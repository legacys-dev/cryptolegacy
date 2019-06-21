import {generateId} from '@orion-js/app'
import {createMasterKey, decomposeMasterKey} from 'app/helpers/keys'

it('Should descompose master key items pass content type', () => {
  const masterKey = '3:QM4WC5Q5-SCLZQRIGDY-HSSJYJ2D:1'
  const userId = generateId(11)
  const result = decomposeMasterKey({masterKey, userId})

  expect(result).toEqual({
    sInterval: 3,
    iInterval: 1,
    initial: 'QM4WC5Q5',
    central: 'SCLZQRIGDY',
    latest: 'HSSJYJ2D',
    secret: result.secret
  })
})

it('Should descompose master key items pass type test', () => {
  const {original} = createMasterKey()
  const userId = generateId(11)

  const result = decomposeMasterKey({masterKey: original, userId})
  const {sInterval, iInterval, initial, central, latest, secret} = result

  expect(typeof result).toBe('object')
  expect(typeof sInterval).toBe('number')
  expect(typeof iInterval).toBe('number')
  expect(typeof initial).toBe('string')
  expect(typeof central).toBe('string')
  expect(typeof latest).toBe('string')
  expect(initial.length).toBe(8)
  expect(central.length).toBe(10)
  expect(latest.length).toBe(8)
  expect(typeof secret).toBe('string')
})
