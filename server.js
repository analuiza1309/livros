//const express = require ('expres')
//const app = express ();
const port = 3000;

const app = require('./src/app');

app.listen(port,()=>console.log(`Rodando na porta ${port}!`));


 