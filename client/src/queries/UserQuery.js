import { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

// TODO: Change this to accept arg.
const QUERY = gql(`query {
  user(id: "5a400afebf5614778f41f62a") {
    username
  }
}`);

class UserQuery extends Component {
  static propTypes = {
    children: PropTypes.func,
    data: PropTypes.object,
    userId: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  }

  render() {
    console.log(this.props.data);
    return this.props.children(this.props.data);
  }
}

export default graphql(QUERY, {
  options: ({ userId }) => ({
    variables: { userId },
  }),
})(UserQuery);
