import {test, expect} from '@playwright/test';

import {getCode2FA} from '../support/db';

import {LoginPage} from '../pages/LoginPage';

import {DashPage} from '../pages/DashPage';

import {LoginActions} from '../pages/actions/LoginActions';

import {getJob, cleanJobs} from '../support/redis';

test('test valid login', async ({page}) => {
  const loginPage = new LoginPage(page);
  const dashPage = new DashPage(page);

  const user = {
    cpf: "00000014141",
    password: "147258"
  };

  await cleanJobs()

  await page.goto('http://paybank-mf-auth:3000/');

  await loginPage.fillCpf(user.cpf);
  await loginPage.fillPassword(user.password);
  await page.getByRole('heading', {name: 'Verificação em duas etapas'}).waitFor({timeout: 3000});

  // getting the code from database
  // const code2fa = await getCode2FA()

  // getting the code from Redis
  const code2fa = await getJob()
  await loginPage.fillCode2FA(code2fa);
  await expect(await dashPage.getAccountBalance()).toHaveText('R$ 5.000,00');

});


test('test valid login with LoginActions', async ({page}) => {
  const loginActions = new LoginActions(page);

  const user = {
    cpf: "00000014141",
    password: "147258"
  };
  await page.goto('http://paybank-mf-auth:3000/');

  await loginActions.fillCpf(user.cpf);

  await loginActions.fillPassword(user.password);

  await page.getByRole('heading', {name: 'Verificação em duas etapas'}).waitFor({timeout: 3000});

  const code2fa = await getJob()
  await loginActions.fillCode2FA(code2fa);

  //sleep
  await page.waitForTimeout(3000)

  await expect(await loginActions.getAccountBalance()).toHaveText('R$ 5.000,00');

  // await loginActions.Logout()

});

test('test invalid login', async ({page}) => {
  const loginPage = new LoginPage(page);
  const user = {
    cpf: "00000014141",
    password: "147258"
  };

  await page.goto('http://paybank-mf-auth:3000/');
  await expect(page.getByRole('heading')).toContainText('Acesse sua Conta');
  await loginPage.fillCpf(user.cpf);
  await loginPage.fillPassword(user.password);
  await loginPage.fillCode2FA('123456');

  await expect(page.locator('span')).toContainText('Código inválido. Por favor, tente novamente.');
  await expect(page.locator('div').filter({hasText: /^Código inválido\. Por favor, tente novamente\.$/})).toBeVisible();
});


