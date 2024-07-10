import mysql from 'mysql2/promise';

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'root',
    database: 'coursera'
}

const connection = await mysql.createConnection(config);

export class usermodel {
    static async getAll() {
        const query = 'SELECT * FROM usuarios';
        const [rows] = await connection.execute(query);
        return rows;
    }
    static async getByemail(email) {
        const query = 'SELECT * FROM usuarios WHERE email = ?';
        const [rows] = await connection.execute(query, [email]);
        return rows[0];	
    }
    static async create(user) {
    const query = 'INSERT INTO usuarios (nombre, apellido, email, contrasena) VALUES (?, ?, ?, ?)';
    const [result] = await connection.execute(query, [user.nombre, user.apellido, user.email, user.contrasena]);
    return { id_user: result.insertId, ...user };
}

}

//usando el patron modelo vista controlador 