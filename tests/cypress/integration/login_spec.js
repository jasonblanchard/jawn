describe('Login', () => {
  it('Failed login', () => {
    cy.visit('/login');
    cy.injectAxe();
    cy.contains('Username');
    cy.contains('Password');
    cy.get('input[name=username]').type('asdf');
    cy.get('input[name=password]').type('asdf');
    cy.contains('Submit').click();
    cy.contains('Nope');
    cy.checkA11y();
  });

  // TODO: Seed the database with this user.
  it('Login', () => {
    cy.task('db:reset');
    cy.task('db:create', {
      type: 'user',
      fields: {
        username: 'test',
        email: 'test@example.com',
        password: 'realtestpass',
      },
    });

    cy.visit('/login');
    cy.injectAxe();
    cy.get('input[name=username]').type('test');
    cy.get('input[name=password]').type('realtestpass');
    cy.contains('Submit').click();
    cy.url().should('include', '/workspace');
    cy.checkA11y();
  });
});
