import mysql from 'mysql2/promise';

const config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'coursera'
};

const connection = await mysql.createConnection(config);

export class CategoriasModel {
    static async getAll() {
        const query = 'SELECT * FROM categoria';
        const [rows] = await connection.execute(query);
        return rows;
    }

    static async getById(id) {
        const query = 'SELECT * FROM categoria WHERE categoria_id = ?';
        const [rows] = await connection.execute(query, [id]);
        return rows[0];
    }

    static async create(categoria) {
        const { nombre_curso, descripcion } = categoria;
        const query = 'INSERT INTO categoria (nombre_curso, descripcion) VALUES (?, ?)';
        const [result] = await connection.execute(query, [nombre_curso, descripcion]);
        return { categoria_id: result.insertId, ...categoria };
    }

    static async update(id, categoria) {
        const { nombre_curso, descripcion } = categoria;
        const query = 'UPDATE categoria SET nombre_curso = ?, descripcion = ? WHERE categoria_id = ?';
        await connection.execute(query, [nombre_curso, descripcion, id]);
        return { categoria_id: id, ...categoria };
    }

    static async delete(id) {
        const query = 'DELETE FROM categoria WHERE categoria_id = ?';
        await connection.execute(query, [id]);
    }
}
