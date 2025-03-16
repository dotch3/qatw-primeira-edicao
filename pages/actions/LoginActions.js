export class LoginActions {
  constructor(page) {
    this.page = page;
  }

  async fillCpf(cpf) {
    await this.page.getByRole('textbox', {name: 'Digite seu CPF'}).click();
    await this.page.getByRole('textbox', {name: 'Digite seu CPF'}).fill(cpf);

    await this.page.getByRole('button', {name: 'Continuar'}).click();
  }

  async fillPassword(password) {
    for (const digit of password) {
      await this.page.getByRole('button', {name: digit}).click();
    }
    await this.page.getByRole('button', {name: 'Continuar'}).click();
  }

  async fillCode2FA(code2fa) {
    await this.page.getByRole('textbox', {name: '000000'}).click();
    await this.page.getByRole('textbox', {name: '000000'}).fill(code2fa);
    await this.page.getByRole('button', {name: 'Verificar'}).click();
  }

  async getAccountBalance() {
   return this.page.locator('#account-balance')
  }
  
  async Logout() {
    await this.page.getByRole('button', {name: 'Sair'}).click();
  }
}