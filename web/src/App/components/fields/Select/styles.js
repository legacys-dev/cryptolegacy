export default {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'white' : '#616161',
    fontSize: 15,
    padding: 10,
    '&:hover': {
      cursor: 'pointer'
    }
  }),
  control: base => ({
    ...base,
    fontSize: 15,
    margin: '10px 0',
    height: '40px',
    borderRadius: '5px',
    minWidth: '30px',
    transition: 'all 0.5s ease',
    '&:hover': {
      cursor: 'pointer',
      border: '1px solid #045EFC'
    }
  })
}
