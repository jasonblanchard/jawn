import { frame } from 'redux-frame';
import gql from 'graphql-tag';


const UpdateEntryQuery = gql`
  mutation updateEntry($id: ID!, $input: EntryInput){
    entry: updateEntry(id: $id, input: $input) {
      id
      text
      timeUpdated
    }
  }
`;

const CreateEntryQuery = gql`
  mutation createEntry($input: EntryInput) {
    entry: createEntry(input: $input) {
      id
      text
      timeUpdated
      timeCreated
    }
  }
`;

const DeletEntryQuery = gql`
  mutation deleteEntry($id: ID!) {
    entry: deleteEntry(id: $id) {
      id
    }
  }
`;

function udpateEntry(id, values) {
  return {
    type: frame('UPDATE_ENTRY'),
    id,
    values,
    interceptors: [
      ['effect', { effectId: 'debug' }],
      ['injectCoeffects', { coeffectId: 'accessToken' }],
      ['graphqalVariables', { id, input: { text: values.text } }],
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
        ['effect', { effectId: 'scrollToTop' }],
      ],
    };
  },

  entryFormSubmitted: (id, values) => {
    return {
      type: frame('ENTRY_FORM_SUBMITTED'),
      values,
      id,
      interceptors: [
        ['effect', { effectId: 'debug' }],
        ['action', { action: udpateEntry(id, values) }],
        ['effect', { effectId: 'dispatch' }],
      ],
    };
  },

  udpateEntry,

  createEntry: () => {
    return {
      type: frame('CREATE_ENTRY'),
      interceptors: [
        ['effect', { effectId: 'debug' }],
        ['injectCoeffects', { coeffectId: 'accessToken' }],
        ['effect', {
          effectId: 'graphql',
          args: {
            query: CreateEntryQuery,
            onSuccessAction: {
              type: frame('CREATE_ENTRY_COMPLETE'),
              interceptors: [
                ['effect', { effectId: 'debug' }],
                ['injectCoeffects', { coeffectId: 'registry' }],
                ['effect', { effectId: 'changeLocation' }],
                'normalizeBody',
                ['path', { from: 'normalizedBody.entities', to: 'action.entities' }],
                ['path', { from: 'normalizedBody.results', to: 'action.entityIds' }],
                'createdEntryPath',
                ['effect', { effectId: 'dispatch' }],
              ],
            },
            onFailureAction: {
              type: frame('CREATE_ENTRY_FAILED'),
              interceptors: [
                ['effect', { effectId: 'dispatch' }],
              ],
            },
          },
        }],
      ],
    };
  },

  deleteEntry: id => ({
    type: frame('DELETE_ENTRY'),
    id,
    interceptors: [
      ['effect', { effectId: 'dispatch' }],
      ['injectCoeffects', { coeffectId: 'accessToken' }],
      ['graphqalVariables', { id }],
      ['effect', {
        effectId: 'graphql',
        args: {
          query: DeletEntryQuery,
          onSuccessAction: {
            type: frame('DELETE_ENTRY_COMPLETE'),
            interceptors: [
              ['effect', { effectId: 'debug' }],
              ['injectCoeffects', { coeffectId: 'registry' }],
              ['effect', { effectId: 'changeLocation', args: { path: '/workspace' } }],
              'normalizeBody',
              ['path', { from: 'normalizedBody.entities', to: 'action.entities' }],
              ['path', { from: 'normalizedBody.results', to: 'action.entityIds' }],
              ['effect', { effectId: 'dispatch' }],
            ],
          },
          onFailureAction: {
            type: frame('DELETE_ENTRY_FAILED'),
            interceptors: [
              ['effect', { effectId: 'dispatch' }],
            ],
          },
        },
      }],
    ],
  }),
};
