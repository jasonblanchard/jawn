describe('Deleting entries', () => {
  beforeEach(() => {
    cy.task('db:reset');
    cy.clearCookies();
  });

  it('sets things up for dev in the workspace', () => {
    cy.login()
      .then(user => {
        return cy.task('db:create', {
          type: 'entry',
          fields: [ // TODO: Use fixture for these.
            {
              text: 'Blah dee blah some entry',
              userId: user.id,
            },
            {
              text: 'Another entry',
              userId: user.id,
            },
          ],
        });
      }).then(entries => {
        cy.visit('/workspace');
        cy.contains(entries[0].text).click();
        cy.get('textarea[name=text]').focus();
      });
  });
});
