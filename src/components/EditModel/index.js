import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

/* ----------  ACTION THUNK CREATORS  ---------- */
import {
  thunks as modelsThunks,
  actionCreators as modelsActions
} from '../../redux/models'
import {
  actionCreators as currentModelActions,
  thunks as currentModelThunks
} from '../../redux/currentModel'
import { actionCreators as uiActions } from '../../redux/ui'

/* ----------  APP COMPONENTS  ---------- */
import ModelToolBar from './ModelToolBar'
import Fields from './Fields'
import Configuration from './Configuration'
import Associations from './Associations'

/* ----------  UI LIBRARY COMPONENTS  ---------- */
import { Tab } from 'semantic-ui-react'

class EditModel extends React.Component {
  componentDidMount () {
    this.props.currentModelThunks.setModel(this.props.match.params.id)
  }

  componentDidUpdate () {
    if (this.props.match.params.id !== this.props.currentModel.id) {
      this.props.currentModelThunks.setModel(this.props.match.params.id)
      this.props.uiActions.closeAllFields()
    }
  }

  createModel = () => {
    const { uiActions, modelsThunks, currentModel, models, router } = this.props
    modelsThunks
      .saveModel(currentModel, models, true)
      .then(() => router.push('/models'))
      .catch(error => uiActions.openDialog('Validation Error', error))
  }

  saveModel = () => {
    const { uiActions, modelsThunks, currentModel, models, router } = this.props
    modelsThunks
      .saveModel(currentModel, models, false)
      .then(() => router.push('/models'))
      .catch(error => uiActions.openDialog('Validation Error', error))
  }

  componentWillUnmount () {
    this.props.currentModelActions.resetModel()
    this.props.uiActions.closeAllFields()
  }

  render () {
    const {
      // State
      tabIdx,
      models,
      currentModel,
      fieldsToggle,
      // Actions
      uiActions,
      currentModelActions,
      modelsActions: { removeModel }
    } = this.props

    const isNew = !models.find(({ id }) => id === currentModel.id)

    return (
      <React.Fragment>
        {isNew ? <h3>Create a Model</h3> : <h3>Edit a Model</h3>}
        <ModelToolBar
          isNew={isNew}
          name={currentModel.name}
          setModelName={currentModelActions.setModelName}
          createModel={this.createModel}
          saveModel={this.saveModel}
          removeModel={removeModel.bind(null, currentModel.id)}
        />
        <Tab
          index={tabIdx}
          onChange={uiActions.setCurrentModelTabIdx}
          panes={[
            {
              menuItem: 'Fields',
              render: () =>
                <Tab.Pane>
                  <Fields
                    fields={currentModel.fields}
                    fieldsToggle={fieldsToggle}
                    currentModelActions={currentModelActions}
                    uiActions={uiActions}
                  />
                </Tab.Pane>
            },
            {
              menuItem: 'Configuration',
              render: () =>
                <Tab.Pane>
                  <Configuration
                    config={currentModel.config}
                    methods={currentModel.methods}
                    currentModelActions={currentModelActions}
                  />
                </Tab.Pane>
            },
            {
              menuItem: 'Associations',
              render: () =>
                <Tab.Pane>
                  <Associations
                    models={models}
                    associations={currentModel.associations}
                    currentModelActions={currentModelActions}
                  />
                </Tab.Pane>
            }
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ currentModel, models, ui }) => ({
  tabIdx: ui.currentModelTabIdx,
  fieldsToggle: ui.fieldsToggle,
  currentModel,
  models
})

const mapDispatchToProps = dispatch => ({
  uiActions: bindActionCreators(uiActions, dispatch),
  currentModelActions: bindActionCreators(currentModelActions, dispatch),
  modelsActions: bindActionCreators(modelsActions, dispatch),
  modelsThunks: bindActionCreators(modelsThunks, dispatch),
  currentModelThunks: bindActionCreators(currentModelThunks, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(EditModel)