export default {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'white' : '#616161'
  }),
  control: base => ({
    ...base,
    height: '48px',
    borderRadius: '5px',
    minWidth: '60px'
  })
}
