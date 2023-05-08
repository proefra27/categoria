const { getConexion } = require('../database/db');

class Categoria {
  constructor({ id, descripcion, observaciones }) {
    this.id = id;
    this.descripcion = descripcion;
    this.observaciones = observaciones;
  }

  static async getAll() {
    const conn = await getConexion();
    const result = await conn.query('SELECT * FROM categoria');
    conn.end();
    return result;
  }

  static async getById(id) {
    const conn = await db.getConnection();
    const result = await conn.query('SELECT * FROM categorias WHERE id = ?', [id]);
    conn.release();
    return result[0];
  }

  static async create({ descripcion, observaciones }) {
    const conn = await db.getConnection();
    const result = await conn.query('INSERT INTO categorias (description, observations) VALUES (?, ?)', [descripcion, observaciones]);
    conn.release();
    return result.insertId;
  }

  static async update(id, { descripcion, observaciones }) {
    const conn = await db.getConnection();
    const result = await conn.query('UPDATE categorias SET descripcion = ?, observaciones = ? WHERE id = ?', [descripcion, observaciones, id]);
    conn.release();
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const conn = await db.getConnection();
    const result = await conn.query('DELETE FROM categorias WHERE id = ?', [id]);
    conn.release();
    return result.affectedRows > 0;
  }
}

module.exports = Categoria;