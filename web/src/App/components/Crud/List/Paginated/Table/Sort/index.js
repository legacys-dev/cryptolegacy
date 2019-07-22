import React from 'react'
import {MdArrowDropDown, MdArrowDropUp} from 'react-icons/md'

const Sort = ({isActiveUp, isActiveDown}) => {
  const up = isActiveUp ? 'paginated-sort-arrow-up active' : 'paginated-sort-arrow-up'
  const down = isActiveDown ? 'paginated-sort-arrow-down active' : 'paginated-sort-arrow-down'
  return (
    <span className="paginated-sort">
      <MdArrowDropUp className={up} />
      <MdArrowDropDown className={down} />
    </span>
  )
}

export default Sort
