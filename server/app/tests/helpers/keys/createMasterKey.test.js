import {createMasterKey} from 'app/helpers/keys'

it('Should return a master key', () => {
  const {original, secretKeyInterval, ivKeyInterval, rest, range} = createMasterKey()

  expect(typeof original).toBe('string')
  expect(typeof secretKeyInterval).toBe('number')
  expect(typeof ivKeyInterval).toBe('number')
  expect(typeof rest).toBe('string')
  expect(typeof range).toBe('number')
  expect(range).toBe(32)
})
