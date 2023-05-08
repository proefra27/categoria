const { getConexion } = require('../database/db');


const categoriasAPI = {};

// GET todas las categorias
categoriasAPI.getCategorias = async (req, res, next) => {
  try {
    const conexion = await getConexion();
    const categorias = await conexion.query('SELECT * FROM categoria');
    res.json(categorias[0]);
  } catch (error) {
    next(error);
  }
}

// GET una categoria por id
categoriasAPI.getCategoria =  async (req, res, next) => {
  try {
    const { id } = req.params;
    const conexion = await getConexion();
    const categoria = await conexion.query('SELECT * FROM categoria WHERE id = ?', [id]);
    if (categoria[0].length === 0) {
      res.status(404).json({ mensaje: 'Categoria no encontrada' });
    } else {
      res.json(categoria[0]);
    }
  } catch (error) {
    next(error);
  }
}

// POST de una nueva categoria
categoriasAPI.addCategoria = async (req, res, next) => {
  try {
    const { descripcion, observaciones } = req.body;
    const conexion = await getConexion();
    const result = await conexion.query('INSERT INTO categoria (descripcion, observaciones) VALUES (?, ?)', [descripcion, observaciones]);
    const categoria = await conexion.query('SELECT * FROM categoria WHERE id = ?', [result[0].insertId]);
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
    const conexion = await getConexion();
    const result = await conexion.query('UPDATE categoria SET descripcion = ?, observaciones = ? WHERE id = ?', [descripcion, observaciones, id]);
    if (result[0].affectedRows === 0) {
      res.status(404).json({ mensaje: 'Categoria no encontrada' });
    } else {
      const categoria = await conexion.query('SELECT * FROM categoria WHERE id = ?', [id]);
      res.json(categoria[0]);
    }
  } catch (error) {
    next(error);
  }
};

// DELETE una categoria por id
categoriasAPI.deleteCategoria =  async (req, res, next) => {
  try {
    const { id } = req.params;
    const conexion = await getConexion();
    const result = await conexion.query('DELETE FROM categoria WHERE id = ?', [id]);
    console.log(result)
    if (result[0].affectedRows === 0) {
      res.status(404).json({ mensaje: 'Categoria no encontrada' });
    } else {
      res.status(201).json({ mensaje: 'Categoria eliminada' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = categoriasAPI;