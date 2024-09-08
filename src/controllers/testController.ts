import pool from '../db';

export async function saveVocationalResult(user_id: number, maxOption: string): Promise<void> {
  try {
    const connection = await pool.getConnection();

    await connection.query(
      'INSERT INTO vocational_answers (user_id, answer) VALUES (?, ?)',
      [user_id, maxOption]
    );

    connection.release();
  } catch (error) {
    console.error('Error saving vocational result:', error);
    throw error;
  }
}

export async function getVocationalResult(user_id: number): Promise<void> {
  try {
    const connection = await pool.getConnection();

    const [rows]: any = await connection.query('SELECT * FROM vocational_answers WHERE user_id = ?', [user_id]);
    return rows;

  } catch (error) {
    console.error('Error getting vocational result:', error);
    throw error;
  }
}