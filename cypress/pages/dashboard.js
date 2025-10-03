class Dashboard {
  getDashboardHeader() {
    return cy.contains('h6', 'Dashboard', { timeout: 10000 })
  }

  clickMenu(menuName) {
    cy.contains('.oxd-main-menu-item', menuName, { timeout: 10000 }).should('be.visible').click()
  }

  interceptAdminUsers() {
    cy.intercept('GET', '**/api/v2/admin/users*').as('getUsers')
  }

  interceptRecruitment() {
    cy.intercept('GET', '**/api/v2/recruitment/candidates*').as('getCandidates')
  }

  interceptDirectory() {
    cy.intercept('GET', '**/api/v2/directory/employees*').as('getEmployees')
  }
}

module.exports = new Dashboard()