export default {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'white' : '#616161',
    padding: 10
  }),
  control: base => ({
    ...base,
    height: '30px',
    borderRadius: '5px',
    minWidth: '30px'
  })
}
