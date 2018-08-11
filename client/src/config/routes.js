import React from 'react';
import AboutPage from 'pages/AboutPage';
import WorkspacePage from 'pages/WorkspacePage';

export default {
  workspace: {
    key: 'home',
    matches: path => Boolean(path.match(/^\/workspace$/)),
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
};
