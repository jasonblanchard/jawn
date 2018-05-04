import PropTypes from 'prop-types';
import React, { Component } from 'react';

const connectToAppProvider = (mapStateToProps = () => {}, mapDispatchToProps = () => {}) => Consumer => (
  class WrappedAppConsumer extends Component {
    static contextTypes = {
      state: PropTypes.object,
      actions: PropTypes.object,
      dispatch: PropTypes.func,
    }

    render() {
      const { state, dispatch } = this.context;
      const mappedState = mapStateToProps(state);
      const mappedDispatchProps = mapDispatchToProps(dispatch);
      return <Consumer {...this.props} {...mappedState} {...mappedDispatchProps} />;
    }
  }
);

export default connectToAppProvider;
