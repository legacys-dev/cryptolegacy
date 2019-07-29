import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'
import AutoForm from 'App/components/AutoForm'
import WithParams from '../../List/WithParams'
import Button from 'App/components/Parts/Button'
import {withRouter} from 'react-router'
import BackIcon from 'react-icons/lib/md/arrow-back'
import SaveIcon from 'react-icons/lib/md/save'
import DeleteIcon from 'react-icons/lib/md/delete'
import translate from 'App/i18n/translate'

@withRouter
export default class UpdateForm extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    item: PropTypes.object,
    itemId: PropTypes.string,
    fragment: PropTypes.any,
    onSuccess: PropTypes.func,
    singular: PropTypes.string,
    history: PropTypes.object,
    basePath: PropTypes.string
  }

  getDoc({params}) {
    const idField = this.getIdField({params})
    const docField = this.getItemField({params})
    return {
      [idField]: this.props.itemId,
      [docField]: this.props.item
    }
  }

  getIdField({params}) {
    const keys = Object.keys(params)
    return keys.find(key => key.includes('Id'))
  }

  getItemField({params}) {
    const keys = Object.keys(params)
    return keys.find(key => !key.includes('Id'))
  }

  render() {
    return (
      <div className={styles.container}>
        <WithParams name={this.props.name} mutation>
          {queryInfo => (
            <div>
              <AutoForm
                mutation={this.props.name}
                ref={form => (this.form = form)}
                doc={this.getDoc(queryInfo)}
                only={this.getItemField(queryInfo)}
                onSuccess={this.props.onSuccess}
                fragment={this.props.fragment}
              />
              <br />
              <Button icon={BackIcon} onClick={() => this.props.history.push(this.props.basePath)}>
                {translate('components.back')}
              </Button>
              <Button
                icon={DeleteIcon}
                danger
                onClick={() =>
                  this.props.history.push(`${this.props.basePath}/${this.props.itemId}/delete`)
                }>
                {translate('components.delete')}
              </Button>
              <Button icon={SaveIcon} onClick={() => this.form.submit()} primary>
                {translate('components.save')} {this.props.singular}
              </Button>
            </div>
          )}
        </WithParams>
      </div>
    )
  }
}
