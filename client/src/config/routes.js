import React from 'react';
import { frame } from 'redux-frame';

import AboutPage from 'pages/AboutPage';
import LoginPage from 'pages/LoginPage';
import WorkspacePage from 'pages/WorkspacePage';

// TODO: Move this somewhere
const query = `query workspacePageQuery($userId: ID!, $since: String!) {
  entries(since: $since) {
    id
    text
    timeCreated
    timeUpdated
  }
  user(id: $userId) {
    username
    id
  }
}`;

const variables = {
  since: '2018-01-01T05:00:00.000Z',
  userId: '5a5ff714d9f377f85efd0f5a',
};

export default {
  workspace: {
    key: 'home',
    matches: path => Boolean(path.match(/^\/workspace$/)),
    onEnterAction: {
      type: frame('LOAD_WORKSPACE_PAGE'),
      interceptors: [
        ['effect', { effectId: 'debug' }],
        ['effect', { effectId: 'dispatch' }],
        ['injectCoeffects', { coeffectId: 'accessToken' }],
        ['effect', {
          effectId: 'http',
          args: {
            method: 'post',
            path: '/api/graphql',
            body: {
              query,
              variables,
            },
            onSuccessAction: {
              type: frame('LOAD_WORKSPACE_PAGE_COMPLETE'),
              interceptors: [
                ['effect', { effectId: 'debug' }],
                'normalizeBody',
                ['path', { from: 'normalizedBody', to: 'action.entities' }],
                ['effect', { effectId: 'dispatch' }],
              ],
            },
            onFailureAction: {
              type: 'LOAD_WORKSPACE_PAGE_FAILED',
            },
          },
        }],
      ],
    },
    render: () => {
      return <WorkspacePage />;
    },
  },
  about: {
    key: 'about',
    matches: path => Boolean(path.match(/^\/about$/)),
    render: () => {
      return <AboutPage />;
    },
  },
  login: {
    key: 'about',
    matches: path => Boolean(path.match(/^\/login/)),
    render: () => {
      return <LoginPage />;
    },
  },
};
