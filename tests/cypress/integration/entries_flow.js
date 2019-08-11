describe('Authoring entries', () => {
  beforeEach(() => {

    cy.login()
      .then(() => {
        cy.visit('/workspace/');

        // TODO: This is stupid, but fixes the case where there aren't any posts yet
        cy.contains('new').click();
        cy.contains('(untitled)');

        cy.get('nav>a').each((value) => {
          if (value) {
            cy.wrap(value).click();
            cy.contains('delete').click();
            cy.contains('Are you sure?');
            cy.contains('yup').click();
          }
        });

        cy.clearCookies();
      });
  });

  it('saves when you click save', () => {
    cy.login()
      .then(() => {
        cy.visit('/workspace/');
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
        cy.visit('/workspace/');
        cy.contains('new').click();
        cy.contains('(untitled)');
        cy.get('textarea[name=text]').type('This is a new entry\n\nWith a new line.');
        cy.get('nav').contains('This is a new entry');
        cy.contains('saved');
      });
  });

  it('can delete an entry after confirmation', () => {
    cy.login()
      .then(() => {
        const rando = Math.random();
        cy.visit('/workspace/');
        cy.contains('new').click();
        cy.contains('(untitled)');
        cy.get('textarea[name=text]').type(`Remove me ${rando}`);
        cy.contains('save').click();
        cy.contains('saved');
        cy.contains('delete').click();
        cy.contains('Are you sure?');
        cy.contains('yup').click();
        cy.get('nav').contains(`Remove me ${rando}`).should('not.exist');
      });
  });

  it('can can cancel deleting an entry', () => {
    cy.login()
      .then(() => {
        cy.visit('/workspace/');
        cy.contains('new').click();
        cy.contains('(untitled)');
        cy.get('textarea[name=text]').type('Keep me');
        cy.contains('save').click();
        cy.contains('delete').click();
        cy.contains('Are you sure?');
        cy.contains('nope').click();
        cy.get('nav').contains('Keep me').should('exist');
      });
  });
});
