const db = require('../database/db');


const categoriasAPI = {};

// GET all categories
categoriasAPI.getCategorias = async (req, res, next) => {
  try {
    const conexion = await db.getConexion();
    const categorias = await conexion.query('SELECT * FROM categoria');
    res.json(categorias);
  } catch (error) {
    next(error);
  }
}
// GET a single category by id
categoriasAPI.getCategoria =  async (req, res, next) => {
  try {
    const { id } = req.params;
    const conexion = await db.getConexion();
    const categoria = await conexion.query('SELECT * FROM categoria WHERE id = ?', [id]);
    if (categoria.length === 0) {
      res.status(404).json({ mensaje: 'Categoria no encontrada' });
    } else {
      res.json(categoria[0]);
    }
  } catch (error) {
    next(error);
  }
}

// POST a new category
categoriasAPI.addCategoria = async (req, res, next) => {
  try {
    const { descripcion, observaciones } = req.body;
    const conexion = await db.getConexion();
    const result = await conexion.query('INSERT INTO categoria (descripcion, observaciones) VALUES (?, ?)', [descripcion, observaciones]);
    const categoria = await conexion.query('SELECT * FROM categoria WHERE id = ?', [result.insertId]);
    res.status(201).json(categoria[0]);
  } catch (error) {
    next(error);
  }
};

// PUT (update) an existing category by id
categoriasAPI.updateCategoria =  async (req, res, next) => {
  try {
    const { id } = req.params;
    const { descripcion, observaciones } = req.body;
    const result = await db.query('UPDATE categorias SET descripcion = ?, observaciones = ? WHERE id = ?', [descripcion, observaciones, id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ mensaje: 'Categoria no encontrada' });
    } else {
      const categoria = await db.query('SELECT * FROM categorias WHERE id = ?', [id]);
      res.json(categoria[0]);
    }
  } catch (error) {
    next(error);
  }
};

// DELETE a category by id
categoriasAPI.deleteCategoria =  async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM categorias WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ mensaje: 'Categoria no encontrada' });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = categoriasAPI;