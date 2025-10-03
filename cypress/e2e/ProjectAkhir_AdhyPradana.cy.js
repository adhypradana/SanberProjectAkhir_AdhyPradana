const loginPages = require('../pages/loginPages')
const forgotPassword = require('../pages/forgotPassword')
const dashboard = require('../pages/dashboard')

describe('Project Akhir OrangeHRM Adhy Pradana', () => {

  it('TC01 - Login dengan username dan password yang valid', () => {
    cy.fixture('user').then((userData) => {
      cy.clearCookies()
      cy.clearLocalStorage()
      loginPages.visit()
      cy.get('input[placeholder="Username"]', { timeout: 10000 }).should('be.visible')
      loginPages.login(userData.validUser.username, userData.validUser.password)
      cy.url().should('include', '/dashboard/index')
    })
  })

  it('TC02 - Login dengan username yang salah', () => {
    cy.fixture('user').then((userData) => {
      cy.clearCookies()
      cy.clearLocalStorage()
      loginPages.visit()
      loginPages.login(userData.invalidUser.username, userData.validUser.password)
      loginPages.getErrorMessage().should('contain', 'Invalid credentials')
    })
  })

  it('TC03 - Login dengan password yang salah', () => {
    cy.fixture('user').then((userData) => {
      cy.clearCookies()
      cy.clearLocalStorage()
      loginPages.visit()
      loginPages.login(userData.validUser.username, userData.invalidUser.password)
      loginPages.getErrorMessage().should('contain', 'Invalid credentials')
    })
  })

  it('TC04 - Login dengan semua field kosong', () => {
    cy.clearCookies()
    cy.clearLocalStorage()
    loginPages.visit()
    cy.get('input[placeholder="Username"]').should('be.visible')
    loginPages.getLoginButton().click()
    loginPages.getEmptyFieldError().should('contain', 'Required')
  })

  it('TC05 - Login dengan username input spesial karakter', () => {
    cy.fixture('user').then((userData) => {
      cy.clearCookies()
      cy.clearLocalStorage()
      loginPages.visit()
      loginPages.login(userData.specialCharUser.username, userData.specialCharUser.password)
      loginPages.getErrorMessage().should('exist')
    })
  })

  it('TC06 - Login dengan password yang invalid', () => {
    cy.fixture('user').then((userData) => {
      cy.clearCookies()
      cy.clearLocalStorage()
      loginPages.visit()
      loginPages.login(userData.longPasswordUser.username, userData.longPasswordUser.password)
      loginPages.getErrorMessage().should('contain', 'Invalid credentials')
    })
  })


  it('TC07 - Forgot password dengan username valid', () => {
    cy.fixture('user').then((userData) => {
      forgotPassword.visit()
      forgotPassword.resetPassword(userData.validUser.username)
      forgotPassword.getConfirmationMessage().should('contain', 'Reset Password link sent successfully')
    })
  })

  it('TC08 - Forgot password dengan username invalid', () => {
    cy.fixture('user').then((userData) => {
      forgotPassword.visit()
      forgotPassword.resetPassword(userData.validUser.username)
      forgotPassword.getConfirmationMessage().should('contain', 'Reset Password link sent successfully')
    })
  })

  it('TC09 - Cancel dari page forgot password kembali ke page login', () => {
    cy.clearCookies()
    cy.clearLocalStorage()
    forgotPassword.visit()
    forgotPassword.getCancelButton().click()
    cy.url().should('include', '/auth/login')
  })

  beforeEach(() => {
    cy.fixture('user').then((userData) => {
      loginPages.visit()
      loginPages.login(userData.validUser.username, userData.validUser.password)
    })
  })

  it('TC10 - Page Dashboard tampil setelah login', () => {
    cy.url().should('include', '/dashboard')
    dashboard.getDashboardHeader().should('be.visible')
  })

  it('TC11 - Buka menu Admin dan intercept API untuk users', () => { 
    dashboard.clickMenu('Admin')
    dashboard.interceptAdminUsers()
    cy.url().should('include', '/admin/viewSystemUsers')
  })

  it('TC12 - Buka menu PIM (Employee Management)', () => {
    dashboard.clickMenu('PIM')
    cy.url().should('include', '/pim/viewEmployeeList')
  })

  it('TC13 - Buka menu Leave', () => {
    dashboard.clickMenu('Leave')
    cy.url().should('include', '/leave/viewLeaveList')
  })

  it('TC14 - Buka menu Time', () => {
    dashboard.clickMenu('Time')
    cy.url().should('include', '/time/viewEmployeeTimesheet')
  })

  it('TC15 - Buka menu Recruitment dengan menggunakan intercept API', () => {
    dashboard.interceptRecruitment()
    dashboard.clickMenu('Recruitment')
    cy.wait('@getCandidates').its('response.statusCode').should('eq', 200)
  })

  it('TC16 - Buka menu My Info', () => {
    dashboard.clickMenu('My Info')
    cy.url().should('include', '/pim/viewPersonalDetails')
  })

  it('TC17 - Buka menu Performance', () => {
    dashboard.clickMenu('Performance')
    cy.url().should('include', '/performance/searchEvaluatePerformanceReview')
  })

  it('TC18 - Buka menu Dashboard sidebar', () => {
    dashboard.clickMenu('Dashboard')
    dashboard.getDashboardHeader().should('contain', 'Dashboard')
  })

  it('TC19 - Buka menu Directory dengan menggunakan intercept API', () => {
    dashboard.interceptDirectory()
    dashboard.clickMenu('Directory')
    cy.wait('@getEmployees').its('response.statusCode').should('eq', 200)
  })

  it('TC20 - Buka menu Maintenance yang restricted', () => {
    dashboard.clickMenu('Maintenance')
    cy.url().should('include', '/maintenance/purgeEmployee')
  })

})