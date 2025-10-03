class forgotPassword {
  visit() {
    cy.visit('/web/index.php/auth/requestPasswordResetCode')
  }

  getUsernameField() {
    return cy.get('input[placeholder="Username"]')
  }

  getResetButton() {
    return cy.get('button[type="submit"]')
  }

  getConfirmationMessage() {
    return cy.get('.oxd-text--h6')
  }

  resetPassword(username) {
    this.getUsernameField().type(username)
    this.getResetButton().click()
  }

  getCancelButton() {
  return cy.contains('button.oxd-button--ghost', 'Cancel')
  }
}

module.exports = new forgotPassword()