const db = require('../database/db');
const Categoria = require('../models/Categoria');

const categoriasController = {};

categoriasController.listarCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.getAll();
    res.render('categorias/listar', { categorias });
  } catch (error) {
    console.log(error);
  }
};

categoriasController.mostrarFormularioCrear = (req, res) => {
  res.render('categorias/crear');
};

categoriasController.crearCategoria = async (req, res) => {
  const { descripcion, observaciones } = req.body;

  try {
    const nuevaCategoria = Categoria.build({ descripcion, observaciones });
    await nuevaCategoria.save();
    res.redirect('/categorias');
  } catch (error) {
    console.log(error);
  }
};

categoriasController.mostrarFormularioEditar = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    res.render('categorias/editar', { categoria });
  } catch (error) {
    console.log(error);
  }
};

categoriasController.editarCategoria = async (req, res) => {
  const { descripcion, observaciones } = req.body;

  try {
    const categoria = await Categoria.findByPk(req.params.id);
    categoria.descripcion = descripcion;
    categoria.observaciones = observaciones;
    await categoria.save();
    res.redirect('/categorias');
  } catch (error) {
    console.log(error);
  }
};

categoriasController.eliminarCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    await categoria.destroy();
    res.redirect('/categorias');
  } catch (error) {
    console.log(error);
  }
};

module.exports = categoriasController;