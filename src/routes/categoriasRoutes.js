const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categorias-controller');
const categoriasControllerApi = require('../controllers/categorias-controller-api');

//Trabajo interno
router.get('/', categoriasController.listarCategorias);
router.get('/crear', categoriasController.mostrarFormularioCrear);
router.post('/crear', categoriasController.crearCategoria);
router.get('/editar/:id', categoriasController.mostrarFormularioEditar);
router.post('/editar/:id', categoriasController.editarCategoria);
router.post('/eliminar/:id', categoriasController.eliminarCategoria);

//Trabajo externo
router.get('/api', categoriasControllerApi.getCategorias);
router.get('/api/:id', categoriasControllerApi.getCategoria);
router.post('/api', categoriasControllerApi.addCategoria);
router.put('/api/:id',categoriasControllerApi.updateCategoria );
router.delete('/api/:id', categoriasControllerApi.deleteCategoria);

module.exports = router;