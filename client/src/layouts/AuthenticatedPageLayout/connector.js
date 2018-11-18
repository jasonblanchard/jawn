import { connect } from 'react-redux';
import gql from 'graphql-tag';

import Connector from 'state/Connector';
import selectors from 'state/selectors';

function mapStateToProps(state) {
  return {
    user: selectors.getAuthenticatedUser(state),
  };
}

export const fragments = {
  user: gql`
    fragment AuthenticatedPageLayout_user on User {
      username
    }
  `,
};

export default connect(mapStateToProps)(Connector);
