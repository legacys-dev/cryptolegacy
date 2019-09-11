import React from 'react'
import dot from 'dot-object'
import Sort from './Sort'

const Table = ({items, fields, onSelect, sortBy, sortType, setSort, selectedItemId, footer}) => {
  const getSortProps = ({field}) => {
    const isActive = sortBy === field.name
    const isUp = sortType === 'ASC'
    return {
      isActiveUp: isActive && isUp,
      isActiveDown: isActive && !isUp
    }
  }

  const toggleSort = ({field}) => {
    const isActive = sortBy === field.name
    const isUp = sortType === 'ASC'
    const type = isActive
      ? isUp
        ? 'DESC'
        : 'ASC'
      : typeof field.sort === 'string'
      ? field.sort
      : 'ASC'
    setSort(field.name, type)
  }

  const renderHead = () => {
    const cols = fields.map((field, index) => {
      const sort = field.sort ? <Sort {...getSortProps(field)} /> : null
      const style = field.sort ? 'paginated-th-sort' : ''
      const onClick = field.sort ? () => toggleSort(field) : undefined
      return (
        <th key={index} className={style} onClick={onClick}>
          {sort}
          {field.title}
        </th>
      )
    })
    return <tr>{cols}</tr>
  }

  const renderValue = ({item, field, index}) => {
    const value = dot.pick(field.name, item)
    if (field.render) {
      try {
        return field.render(item, value, index)
      } catch (error) {
        console.error(`Error rendering field "${field.name}":`, error)
        return (
          <span>
            <i>Error</i>
          </span>
        )
      }
    }

    return value
  }

  const renderBody = () => {
    return items.map((item, index) => {
      const isSelected = selectedItemId === item._id
      const cols = fields.map((field, fieldIndex) => {
        return <td key={fieldIndex}>{renderValue(item, field, index)}</td>
      })
      return (
        <tr
          key={item._id}
          className={isSelected ? 'paginated-table-row selected' : 'paginated-table-row'}
          onClick={() => onSelect(item, index)}>
          {cols}
        </tr>
      )
    })
  }
  return (
    <div className="paginated-table table hoverable">
      <table>
        <thead>{renderHead()}</thead>
        <tbody>{renderBody()}</tbody>
        <tfoot>{footer}</tfoot>
      </table>
    </div>
  )
}

export default Table
