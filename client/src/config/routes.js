import React from 'react';
import { frame } from 'redux-frame';

import SettingsPage from 'pages/SettingsPage';
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
              type: frame('LOAD_WORKSPACE_PAGE_FAILED'),
              interceptors: [
                ['injectCoeffects', { coeffectId: 'registry' }],
                ['effect', { effectId: 'changeLocation', args: { path: '/login' } }],
              ],
            },
          },
        }],
      ],
    },
    render: () => {
      return <WorkspacePage />;
    },
  },
  settings: {
    key: 'settings',
    matches: path => Boolean(path.match(/^\/settings$/)),
    onEnterAction: {
      type: frame('LOAD_SETTINGS_PAGE'),
      interceptors: [
        ['effect', { effectId: 'debug' }],
        ['effect', { effectId: 'dispatch' }],
        ['injectCoeffects', { coeffectId: 'accessToken' }],
        ['injectCoeffects', { coeffectId: 'currentUserId' }],
        ['path', { from: 'currentUserId', to: 'graphqalVariables.userId' }],
        ['effect', {
          effectId: 'graphql',
          args: {
            query: SettingsPage.query,
            onSuccessAction: {
              type: frame('LOAD_SETTINGS_PAGE_COMPLETE'),
              interceptors: [
                ['effect', { effectId: 'debug' }],
                'normalizeBody',
                ['path', { from: 'normalizedBody.entities', to: 'action.entities' }],
                ['path', { from: 'normalizedBody.results', to: 'action.entityIds' }],
                ['effect', { effectId: 'dispatch' }],
              ],
            },
            onFailureAction: {
              type: frame('LOAD_SETTINGS_PAGE_FAILED'),
              interceptors: [
                ['injectCoeffects', { coeffectId: 'registry' }],
                ['effect', { effectId: 'changeLocation', args: { path: '/login' } }],
              ],
            },
          },
        }],
      ],
    },
    render: () => {
      return <SettingsPage />;
    },
  },
  login: {
    key: 'login',
    matches: path => Boolean(path.match(/^\/login/)),
    render: () => {
      return <LoginPage />;
    },
  },
};
