const express = require('express');
const app = express();

const livros = require('./routes/livroRoutes');

app.use('/',livros);
        
module.exports=app 
