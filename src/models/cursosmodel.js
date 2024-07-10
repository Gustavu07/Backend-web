import mysql from 'mysql2/promise';


const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'root',
    database: 'coursera'
}

const connection = await mysql.createConnection(config);

export class cursosmodel {
    static async getAll() {
        const query = 'SELECT * FROM cursos';
        const [rows] = await connection.execute(query);
        return rows;
    }

    static async getById(id) {
        const query = 'SELECT * FROM cursos WHERE id_curso = ?';
        const [rows] = await connection.execute(query, [id]);
        return rows[0];
    }

    static async create(curso) {
        console.log(curso);
        const query = 'INSERT INTO cursos (categoria_id, id_user, nombre, descripcion, universidad_o_procedencia, nivel, idioma, imagenes, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const [result] = await connection.execute(query, [curso.categoria, curso.id_user, curso.nombre, curso.descripcion, curso.universidad_o_procedencia, curso.nivel, curso.idioma, curso.imagenes, curso.fecha_inicio, curso.fecha_fin]);

        return { id_curso: result.insertId, ...curso };

    }

    static async update(id, curso) {
        const fecha_inicio = new Date(curso.fecha_inicio);
        const fecha_fin = new Date(curso.fecha_fin);
        const query = 'UPDATE cursos SET   nombre = ?, descripcion = ?, universidad_o_procedencia = ?, nivel = ?, idioma = ?, fecha_inicio = ?, fecha_fin = ? WHERE id_curso = ?';
        await connection.execute(query, [ curso.nombre, curso.descripcion, curso.universidad_o_procedencia, curso.nivel, curso.idioma, fecha_inicio, fecha_fin, id]);
        return { id_curso: id, ...curso };
    }

    static async delete(id) {
        const query = 'DELETE FROM cursos WHERE id_curso = ?';
        await connection.execute(query, [id]);
    }
}