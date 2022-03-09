const express = require('express');
const route = express.Router();
const controller = require('../controller/livroController');

route.get('/livros',controller.getAll);
route.get('/:id',controller. getLivroByID)

module.exports=route


