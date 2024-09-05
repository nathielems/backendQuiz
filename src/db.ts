import mysql from 'mysql2/promise';

// Configuração da conexão com o MySQL
const connection = mysql.createPool({
  host: 'db4free.net',   
  user: 'estudaquiz',  
  password: 'estudaquiz', 
  database: 'estudaquiz', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default connection;
