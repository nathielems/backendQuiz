import pool from '../db';

interface IUser {
  name: string;
  email: string;
  password: string;
  }

export async function getUsers(): Promise<any[]> {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM users') as [any[], any];
    connection.release();
    return rows;
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
}

export async function createUser(user: IUser): Promise<IUser> {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?)',
      [user.name, user.email, user.password]
    );
    connection.release();
    
    // Retornar o novo usuário
    return {
      name: user.name,
      email:user.email,
      password: user.password
    };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error; 
  }
}
