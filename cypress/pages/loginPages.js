class loginPages {
  visit() {
    cy.visit('/web/index.php/auth/login')
  }

  loginEmpty() {
    this.getLoginButton().click()
  }

  getUsernameField() {
    return cy.get('input[placeholder="Username"]')
  }

  getPasswordField() {
    return cy.get('input[placeholder="Password"]')
  }

  getLoginButton() {
    return cy.get('button[type="submit"]')
  }

  getErrorMessage() {
    return cy.get('.oxd-alert-content-text')
  }

  getEmptyFieldError() {
    return cy.get('span.oxd-input-field-error-message')
  }

  login(username, password) {
    if (username) this.getUsernameField().type(username)
    if (password) this.getPasswordField().type(password)
    this.getLoginButton().click()
  }
}

module.exports = new loginPages()