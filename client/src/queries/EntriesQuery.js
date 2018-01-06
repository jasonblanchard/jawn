import { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const QUERY = gql(`query {
  entries {
    id
    text
    timeCreated
    timeUpdated
  }
}`);

class EntriesQuery extends Component {
  static propTypes = {
    children: PropTypes.func,
    data: PropTypes.object,
  }

  render() {
    console.log(this.props.data);
    return this.props.children(this.props.data);
  }
}

export default graphql(QUERY)(EntriesQuery);
