import jwt from 'jsonwebtoken';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('createAccessToken', id => {
  const secret = '$2a$10$HuxYWte8dvZJM9UHBMEFZO'; // TODO: Figure out how to share with docker-compose.ci.tml
  return new Cypress.Promise(resolve => {
    jwt.sign({ id }, secret, {}, (error, token) => {
      if (error) return null;
      resolve(token);
    });
  });
});

Cypress.Commands.add('login', () => {
  const context = {};

  return cy.task('db:create:user', {
    type: 'user',
    fields: {
      username: 'test',
      email: 'test@example.com',
      password: 'realtestpass',
    },
  }).then(user => {
    context.user = user;
    return cy.createAccessToken(user.id);
  }).then(token => {
    return cy.setCookie('token', token);
  })
    .then(() => {
      return context.user;
    });
});

Cypress.Commands.overwrite('injectAxe', (orig) => {
  orig();
  // FIXME: `orig` here is async, so this is probably a race condition...
  cy.window()
    .then(window => {
      window.axe.configure({
        rules: [
          {
            id: 'color-contrast',
            enabled: false,
          },
        ],
      });
    });
});
