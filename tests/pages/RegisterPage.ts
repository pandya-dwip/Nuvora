import { Page, Locator } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly container: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.getByTestId('register-container');
    this.nameInput = page.getByTestId('register-name-input');
    this.emailInput = page.getByTestId('register-email-input');
    this.passwordInput = page.getByTestId('register-password-input');
    this.confirmPasswordInput = page.getByTestId('register-confirm-password-input');
    this.submitButton = page.getByTestId('register-submit-button');
    this.errorMessage = page.getByTestId('register-error-message');
  }

  async goto(): Promise<void> {
    await this.page.goto('/register');
  }

  async register(name: string, email: string, pass: string, confirmPass?: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.confirmPasswordInput.fill(confirmPass !== undefined ? confirmPass : pass);
    await this.submitButton.click();
  }
}
