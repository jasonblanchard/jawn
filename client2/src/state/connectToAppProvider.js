import PropTypes from 'prop-types';
import React, { Component } from 'react';

const connectToAppProvider = (mapStateToProps = () => {}, mapActionsToProps = () => {}) => Consumer => (
  class WrappedAppConsumer extends Component {
    static contextTypes = {
      state: PropTypes.object,
      actions: PropTypes.object,
    }

    render() {
      const { state, actions } = this.context;
      const mappedState = mapStateToProps(state);
      const mappedActions = mapActionsToProps(actions);
      return <Consumer {...this.props} {...mappedState} {...mappedActions} />;
    }
  }
);

export default connectToAppProvider;
