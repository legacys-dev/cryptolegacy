export default {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'white' : '#616161',
    padding: 10
  }),
  control: base => ({
    ...base,
    height: '48px',
    borderRadius: '5px'
  })
}
