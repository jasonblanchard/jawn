import { frame } from 'redux-frame';
import gql from 'graphql-tag';


// TODO: Alias this to `entry` key
const UpdateEntryQuery = gql`
  mutation updateEntry($id: ID!, $input: EntryInput){
    entry: updateEntry(id: $id, input: $input) {
      id
      text
      timeUpdated
    }
  }
`;

function udpateEntry(values) {
  return {
    type: frame('UPDATE_ENTRY'),
    values,
    interceptors: [
      ['effect', { effectId: 'debug' }],
      ['injectCoeffects', { coeffectId: 'accessToken' }],
      ['graphqalVariables', { input: { text: values.text } }],
      ['path', { from: 'state.params.entryId', to: 'graphqalVariables.id' }], // TODO: Weird coupling
      ['effect', {
        effectId: 'graphql',
        args: {
          query: UpdateEntryQuery,
          onSuccessAction: {
            type: frame('UPDATE_ENTRY_COMPLETE'),
            interceptors: [
              ['effect', { effectId: 'debug' }],
              'normalizeBody',
              ['path', { from: 'normalizedBody.entities', to: 'action.entities' }],
              ['path', { from: 'normalizedBody.results', to: 'action.entityIds' }],
              ['effect', { effectId: 'dispatch' }],
            ],
          },
          onFailureAction: {
            type: frame('UPDATE_ENTRY_FAILED'),
            interceptors: [
              ['effect', { effectId: 'dispatch' }],
            ],
          },
        },
      }],
    ],
  };
}

export default {
  resolveLocation: () => {
    return {
      type: frame('RESOLVE_LOCATION'),
      interceptors: [
        ['effect', { effectId: 'debug' }],
        ['injectCoeffects', { coeffectId: 'registry' }],
        ['injectCoeffects', { coeffectId: 'location' }],
        'locationToRouteId',
        ['injectCoeffects', { coeffectId: 'params' }],
        ['path', { from: 'routeId', to: 'action.routeId' }],
        ['path', { from: 'params', to: 'action.params' }],
        ['effect', { effectId: 'dispatch' }],
        ['effect', { effectId: 'dispatchPageOnEnter' }],
      ],
    };
  },

  entryFormSubmitted: values => ({
    type: frame('ENTRY_FORM_SUBMITTED'),
    values,
    interceptors: [
      ['effect', { effectId: 'debug' }],
      ['action', { action: udpateEntry(values) }],
      ['effect', { effectId: 'dispatch' }],
    ],
  }),
};
