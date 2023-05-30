import testdata from "../fixtures/testdata.json";

describe("login page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("successful login", () => {
    cy.login(testdata.mail, testdata.pass);

    cy.get(".pt-2").should("have.text", `Добро пожаловать ${testdata.mail}`);
    cy.contains("Log out").should("be.visible");
  });

  it("empty login", () => {
    cy.login(null, testdata.pass);

    cy.get("#mail").then((el) => {
      expect(el[0].checkValidity()).to.be.false;
      expect(el[0].validationMessage).to.be.eql("Заполните это поле.");
    });
  });

  it("empty password", () => {
    cy.login(testdata.mail, null);

    cy.get("#pass").then((el) => {
      expect(el[0].checkValidity()).to.be.false;
      expect(el[0].validationMessage).to.be.eql("Заполните это поле.");
    });
  });
});

describe("favorite books", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login(testdata.mail, testdata.pass);
  });

  it("favorites list is empty", () => {
    cy.contains("Favorites").click();
    cy.contains("Please add some book to favorit on home page!").should(
      "be.visible"
    );
  });

  it("add to favorite", () => {
    cy.addNewBook(
      testdata.title,
      testdata.description,
      testdata.fileCover,
      testdata.fileBook,
      testdata.authors
    );
    cy.contains("Favorites").click();
    cy.contains(`${testdata.title}`).should("be.visible");
    cy.contains(`${testdata.authors}`).should("be.visible");
  });

  it("delete from favorite", () => {
    cy.visit("/favorites");
    cy.contains("Delete from favorite").click();
    cy.contains("Please add some book to favorit on home page!").should(
      "be.visible"
    );
    cy.contains("Books list").click();
    cy.contains(`${testdata.title}`).should("be.visible");
    cy.contains(`${testdata.authors}`).should("be.visible");
  });
});
