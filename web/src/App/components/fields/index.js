import Text from './Text'
import Date from './Date'
import Select from './Select'
import Number from './Number'
import Checkbox from 'orionsoft-parts/lib/components/fields/Checkbox'
import ArrayComponent from 'orionsoft-parts/lib/components/fields/ArrayComponent'
import ObjectField from './ObjectField'
import SixDigitInput from './SixDigitInput'

export default {
  string: Text,
  number: Number,
  array: ArrayComponent,
  plainObject: ObjectField,
  boolean: Checkbox,
  date: Date,
  sixDigit: SixDigitInput,
  select: Select
}
