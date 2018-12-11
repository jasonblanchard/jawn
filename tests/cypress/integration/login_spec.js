describe('Login', () => {
  beforeEach(() => {
    cy.task('db:reset');
    cy.clearCookies();
  });

  it('failed login', () => {
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

  it('visiting workspace page without logging in redirects to login page', () => {
    cy.visit('/workspace');
    cy.url().should('include', '/login');
  });

  it('successful login', () => {
    cy.task('db:create:user', {
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

  it('successful login bypassing page', () => {
    cy.login()
      .then(() => {
        cy.visit('/workspace');
        cy.url().should('include', '/workspace');
        cy.contains('new');
      });
  });
});
