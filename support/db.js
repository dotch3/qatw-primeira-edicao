import pgPromise from "pg-promise";

const pgp = new pgPromise();
const db = pgp("postgres://dba:dba@paybank-db:5432/UserDB");

export async function getCode2FA(cpf) {

  const query = `
    SELECT t.code,u.id
    FROM public."TwoFactorCode" t
    JOIN public."User" u ON u."id" = t."userId"
    WHERE u."cpf" = '${cpf}'
    ORDER BY t.id DESC
    LIMIT 1;
    `

  const result = await db.oneOrNone(query)  // oneOrNone return a json object
  return result.code
}
