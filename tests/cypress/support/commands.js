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

Cypress.Commands.add('login', () => {
  cy.visit('/auth/login');
  cy.get('input[name=username]').type('test');
  cy.get('input[name=password]').type('testpass');
  cy.contains('login').click();
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
