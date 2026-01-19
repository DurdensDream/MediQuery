describe("MediQuery home", () => {
  it("loads the home page", () => {
    cy.visit("/");
    cy.contains("MediQuery");
  });
});
