describe('Deleting entries', () => {
  beforeEach(() => {
    cy.task('db:reset');
    cy.clearCookies();
  });

  it('can delete an entry after confirmation', () => {
    cy.login()
      .then(user => {
        return cy.task('db:create', {
          type: 'entry',
          fields: {
            text: 'Blah dee blah some entry',
            userId: user.id,
          },
        });
      }).then(entry => {
        cy.visit('/workspace');
        cy.contains(entry.text).click();
        cy.contains('delete').click();
        cy.contains('Are you sure?');
        cy.contains('yup').click();
      });
  });

  it('can can cancel deleting an entry', () => {
    cy.login()
      .then(user => {
        return cy.task('db:create', {
          type: 'entry',
          fields: {
            text: 'Blah dee blah some entry',
            userId: user.id,
          },
        });
      }).then(entry => {
        cy.visit('/workspace');
        cy.contains(entry.text).click();
        cy.contains('delete').click();
        cy.contains('Are you sure?');
        cy.contains('nope').click();
        cy.contains('delete');
      });
  });
});
