import { HotKeys } from 'react-hotkeys';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import moment from 'moment';

import { getCurrentYearStartDate } from 'src/utils/TimeUtils';
import AuthenticatedPageLayout from 'src/components/AuthenticatedPageLayout';
import AutoSaveStatus, { AutoSaveStatusConnector } from 'src/components/AutoSaveStatus';
import connectToAppProvider from 'src/state/connectToAppProvider';
import DeleteEntryPanel, { DeleteEntryPanelConnector } from 'src/components/DeleteEntryPanel';
import EditEntryForm, { EditEntryFormConnector } from 'src/components/EditEntryForm';
import TokenUtils from 'src/utils/TokenUtils';

import css from './WorkspacePage.scss';

class WorkspacePage extends Component {
  static propTypes = {
    createEntry: PropTypes.func,
    didCreateEntryId: PropTypes.string,
    didDeleteEntry: PropTypes.bool,
    entries: PropTypes.array,
    loading: PropTypes.bool,
    redirect: PropTypes.func,
    selectedEntryId: PropTypes.string,
    user: PropTypes.object,
  }

  static defaultProps = {
    entries: [],
  }

  static query = gql`query workspacePageQuery($userId: ID!, $since: String!) {
      entries(since: $since) {
        id
        text
        timeCreated
        timeUpdated
      }
      user(id: $userId) {
        ...AuthenticatedPageLayout_user
      }
    }
    ${AuthenticatedPageLayout.fragments.user}
  `;

  componentWillReceiveProps(nextProps) {
    const { redirect } = this.props;

    if (!this.props.didCreateEntryId && nextProps.didCreateEntryId) {
      redirect(`/workspace/${nextProps.didCreateEntryId}`);
    }

    if (!this.props.didDeleteEntry && nextProps.didDeleteEntry) {
      redirect('/workspace');
    }
  }

  render() {
    const { loading, user, createEntry } = this.props;

    return (
      <AuthenticatedPageLayout user={user} loading={loading}>
        <HotKeys keyMap={this.getHotKeyMap()} handlers={this.getHotKeyHandlers()}>
          <div className={css.container}>
            <div className={css.nav}>
              <div className={css.navCreateButtonContainer}>
                <button onClick={createEntry}>create new entry</button>
              </div>
              {this.renderEntries()}
            </div>
            <div className={css.main}>
              {this.renderForm()}
            </div>
          </div>
        </HotKeys>
      </AuthenticatedPageLayout>
    );
  }

  renderForm() {
    const { selectedEntryId, entries, loading, createEntry } = this.props;
    if (loading) return <div>Loading...</div>;

    if (!selectedEntryId) {
      return (
        <div>
          <button onClick={createEntry}>create new entry</button>
        </div>
      );
    }

    const entry = this.getEntry(selectedEntryId, entries);
    if (!entry) return undefined;

    return (
      <div className={css.formContainer}>
        <AutoSaveStatusConnector>
          {({ isSaving, didFail }) => (
            <AutoSaveStatus timeCreated={entry.timeCreated} timeUpdated={entry.timeUpdated} isSaving={isSaving} didFail={didFail} />
          )}
        </AutoSaveStatusConnector>
        <EditEntryFormConnector>
          {(connectorProps) => (
            <EditEntryForm key={entry.id} focusOnMount onCancel={this.deselect} entry={entry} {...connectorProps}>
              <DeleteEntryPanelConnector>
                {({ deleteEntry }) => (
                  <DeleteEntryPanel entryId={entry.id} handleClickConfirm={deleteEntry} />
                )}
              </DeleteEntryPanelConnector>
            </EditEntryForm>
          )}
        </EditEntryFormConnector>
      </div>
    );
  }

  renderEntries() {
    const { entries, loading } = this.props;
    if (loading) return <div>Loading...</div>;
    return this.getEntries(entries).map(this.renderEntry, this);
  }

  renderEntry(entry) {
    const preview = entry.text.split('\n')[0] || '(untitled)';

    return (
      <Link key={entry.id} className={classNames(css.navBarLink, { isActive: entry.id === this.props.selectedEntryId })} to={`/workspace/${entry.id}`}>{preview}</Link>
    );
  }

  getEntries(entries) {
    return [...entries].sort((entry1, entry2) => (moment(entry1.timeCreated).isBefore(entry2.timeCreated) ? 1 : -1));
  }

  getEntry(id, entries) {
    return entries.find(entry => entry.id === id);
  }

  getHotKeyMap() {
    return {
      createEntry: 'shift+option+meta+n',
    };
  }

  getHotKeyHandlers() {
    return {
      createEntry: this.props.createEntry,
    };
  }
}

export default class ConnectedWorkspacePage extends Component {
  render() {
    return (
      <Query query={WorkspacePage.query} variables={{ userId: TokenUtils.decodeUserId(TokenUtils.getAccessToken()), since: getCurrentYearStartDate() }}>
        {({ data, loading }) => (
          <WorkspacePage
            entries={data.entries}
            loading={loading}
            user={data.user}
            {...this.props}
          />
        )}
      </Query>
    );
  }
}

function mapStateToProps(state) {
  return {
    didCreateEntryId: state.didCreateEntryId,
    didDeleteEntry: state.didDeleteEntry,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createEntry: () => dispatch({ type: 'CREATE_ENTRY' }),
  };
}

export const WorkspacePageContainer = connectToAppProvider(mapStateToProps, mapDispatchToProps)(ConnectedWorkspacePage);
