describe('Creating entries', () => {
  beforeEach(() => {
    cy.task('db:reset');
    cy.clearCookies();
  });

  it('saves when you click save', () => {
    cy.login()
      .then(() => {
        cy.visit('/workspace');
        cy.contains('new').click();
        cy.contains('(untitled)');
        cy.get('textarea[name=text]').type('This is a new entry\n\nWith a new line.');
        cy.contains('saving...');
        cy.contains('save').click();
        cy.get('nav').contains('This is a new entry');
        cy.contains('saved');
      });
  });

  it('autosaves without clicking save', () => {
    cy.login()
      .then(() => {
        cy.visit('/workspace');
        cy.contains('new').click();
        cy.contains('(untitled)');
        cy.get('textarea[name=text]').type('This is a new entry\n\nWith a new line.');
        cy.get('nav').contains('This is a new entry');
        cy.contains('saved');
      });
  });
});
