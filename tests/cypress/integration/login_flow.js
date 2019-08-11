describe('Login', () => {
  beforeEach(() => {
    cy.clearCookies();
  });

  it('failed login', () => {
    cy.visit('/auth/login');
    cy.injectAxe();
    cy.contains('Username');
    cy.contains('password');
    cy.get('input[name=username]').type('asdf');
    cy.get('input[name=password]').type('asdf');
    cy.contains('login').click();
    cy.contains('nope');
    // cy.checkA11y();
  });

  it('visiting workspace page without logging in redirects to login page', () => {
    cy.visit('/workspace/');
    cy.url().should('include', '/auth/login');
  });

  it('successful login', () => {
    cy.visit('/auth/login');
    cy.injectAxe();
    cy.get('input[name=username]').type('test');
    cy.get('input[name=password]').type('testpass');
    cy.contains('login').click();
    cy.url().should('include', '/workspace');
    // cy.checkA11y();
  });

  it('successful login bypassing page', () => {
    cy.login()
      .then(() => {
        cy.visit('/workspace/');
        cy.url().should('include', '/workspace');
        cy.contains('new');
      });
  });
});
