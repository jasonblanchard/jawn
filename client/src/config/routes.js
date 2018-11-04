import React from 'react';
import { frame } from 'redux-frame';

import AboutPage from 'pages/AboutPage';
import LoginPage from 'pages/LoginPage';
import WorkspacePage from 'pages/WorkspacePage';

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
        ['graphqalVariables', { since: '2018-01-01T05:00:00.000Z' }],
        ['injectCoeffects', { coeffectId: 'currentUserId' }],
        ['path', { from: 'currentUserId', to: 'graphqalVariables.userId' }],
        ['effect', {
          effectId: 'graphql',
          args: {
            query: WorkspacePage.query,
            onSuccessAction: {
              type: frame('LOAD_WORKSPACE_PAGE_COMPLETE'),
              interceptors: [
                ['effect', { effectId: 'debug' }],
                'normalizeBody',
                ['path', { from: 'normalizedBody.entities', to: 'action.entities' }],
                ['path', { from: 'normalizedBody.results', to: 'action.entityIds' }],
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
