import {getHashItems} from 'app/helpers/keys'

it('Should items pass type test', () => {
  const masterKey = '3:QM4WC5Q5-SCLZQRIGDY-HSSJYJ2D:1'
  const result = getHashItems(masterKey)
  const {secretKeyInterval, ivKeyInterval, hashOne, hashTwo, hashThree, original} = result

  expect(typeof secretKeyInterval).toBe('number')
  expect(typeof ivKeyInterval).toBe('number')
  expect(typeof hashOne).toBe('string')
  expect(typeof hashTwo).toBe('string')
  expect(typeof hashThree).toBe('string')
  expect(typeof original).toBe('string')
})

it('Should return items from master key', () => {
  const masterKey = '3:QM4WC5Q5-SCLZQRIGDY-HSSJYJ2D:1'
  const result = getHashItems(masterKey)

  expect(result).toEqual({
    secretKeyInterval: 3,
    ivKeyInterval: 1,
    hashOne: 'QM4WC5Q5',
    hashTwo: 'SCLZQRIGDY',
    hashThree: 'HSSJYJ2D',
    original: '3:QM4WC5Q5-SCLZQRIGDY-HSSJYJ2D:1'
  })
})
