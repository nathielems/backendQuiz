import pool from '../db';
import bcrypt from 'bcrypt';


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
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [user.name, user.email, hashedPassword]
    );
    connection.release();
    
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