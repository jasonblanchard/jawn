import { connect } from 'react-redux';
import gql from 'graphql-tag';

import Connector from 'state/Connector';
import selectors from 'state/selectors';

export const fragments = {
  entry: gql`
    fragment EntryEditor_entry on Entry {
      timeCreated
      timeUpdated
    }
  `,
};

function mapStateToProps(state) {
  return {
    entry: selectors.getSelectedEntry(state),
  };
}

export default connect(mapStateToProps)(Connector);
