import React from 'react'
import Filter from './Filter'

const Head = ({
  bottomComponent,
  rightComponent,
  leftComponent,
  title,
  centerComponent,
  variables,
  setVariable
}) => {
  return (
    <div className="paginated-head">
      <div className="paginated-head-container">
        <div className="paginated-head-left">
          {leftComponent ? (
            <leftComponent variables={variables} setVariable={setVariable} />
          ) : (
            <div className="paginated-head-title">{title}</div>
          )}
        </div>
        <div className="paginated-head-center">
          <centerComponent variables={variables} setVariable={setVariable} />
        </div>
        <div className="paginated-head-right">
          <rightComponent variables={variables} setVariable={setVariable} />
        </div>
      </div>
      <bottomComponent variables={variables} setVariable={setVariable} />
    </div>
  )
}

Head.defaultProps = {
  rightComponent: Filter
}

export default Head
