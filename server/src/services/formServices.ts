import { getDB } from '../db';

export const saveFormResponse = async (formData: Record<string, string>) => {
  const db = getDB();
  const json = JSON.stringify(formData);
  const sql = 'INSERT INTO responses (data) VALUES (?)';
  await db.execute(sql, [json]);
};
