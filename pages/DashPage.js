export class DashPage {
  constructor(page) {
    this.title = "Dashboard";
    this.page = page
  }

  async getAccountBalance() {
    // expect(await this.page.locator('#root')).toContainText('Saldo disponível');
    return this.page.locator('#account-balance')
  }

  async Logout() {
    await this.page.getByRole('button', {name: 'Sair'}).click();
  }
}
