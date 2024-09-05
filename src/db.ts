import mysql from 'mysql2/promise';

// Configuração da conexão com o banco de dados
const pool = mysql.createPool({
  host: 'db4free.net',   
  user: 'estudaquiz',  
  password: 'estudaquiz', 
  database: 'estudaquiz', 
});

export default pool;
