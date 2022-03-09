const res = require("express/lib/response");
const fs = require("fs");


const livros= require('../model/LivroModel.js')


const getAll=(req,res)=>{
    console.log(req.url)
    livros.find(function(err,livros){
      if(err) { 
        res.status(500).send({ message: err.message })
      }
      res.status(200).send(livros)
    })
};


const getLivroByID = (req, res) => {
    const id = req.params.id

    // método find retorna o primeiro resultado que passar na condição
    // método filter retorna um array de resultados
    // como ID é um identificador único, é mais indicado utilizar FIND
    livros.find({ id }, function(err, Livros){
    if(err) { 
      res.status(500).send({ message: err.message })
    }
    res.status(200).send(Livros)
  })
}


const getByTitulo = (req, res) => {
    const titulo = req.params.titulo
    const livroFiltradoPorTitulo = livros.find((livro) => livro.titulo == titulo)

    res.status(200).send(livroFiltradoPorTitulo);
}


const postLivros= (req,res)=>{
    console.log(req.body);
    let livro = new livros(req.body);
    livro.save(function(err){
    if (err) res.status(500).send({ message: err.message })

    res.status(201).send(livro.toJSON());
  })
};


const deleteLivros = (req, res) => {
    const id = req.params.id;
    try{
      livros.find({ id }, function(err, livro){
        if(livros.length > 0){
            livros.deleteMany({ id }, function (err) {
                if (!err) {
                  res.status(200).send({ message: 'Tarefa removida com sucesso', status: "SUCCESS" })
                }
              })
        }else res.status(200).send({ message: 'Não há tarefa para ser removida', status: "EMPTY" })
    })
}catch (err) {
  console.log(err)
  return res.status(424).send({ message: "Erro ao deletar o registro de tarefa" })
}
};


const deleteLivroAntigo = (req, res) => {
  //Deleta quando concluido = true
  try {
    livros.deleteMany({ antigo: true }, function (err) {
        if (!err) {
            res.status(200).send({ message: 'Livros antigos removido com sucesso', status: "SUCCESS" })
        }
    })
  } catch (err) {
    console.log(err)
    return res.status(424).send({ message: err.message })
  }
}


const putLivros = (req, res) => {
  const id = req.params.id;
  try {
    //Pego o id que foi passado por query param
     
    livros.updateOne(
      { id },
      { $set: req.body },
      function (err) {
      res.status(201).send({ message: "Tarefa atualizada com sucesso!" });
  })
  } catch (err) {
    return res.status(424).send({ message: err });
  }
}


const patchLivros = (req, res) => {
  const id = req.params.id;
  const atualizacao = req.body;
  console.log(atualizacao)

  try {
    const LivrosASerModificado = livros.find((livro) => livro.id == id);

    //Ele vai buscar dentro do objeto tarefaASerModificada atributos em que o nome coincida com os do objeto atualizacao, e vai substituir o valor

    Object.keys(atualizacao).forEach((chave) => {
      LivrosASerModificado[chave] = atualizacao[chave]
    })

    fs.writeFile("./SRC/model/LivroModel.json", JSON.stringify(livros), 'utf8', function(err) {
      if (err) {
        return res.status(424).send({ message: err});
      }
      console.log("Arquivo atualizado com sucesso!")
    });

    return res.status(200).send(livros);
  } catch(err) {
    return res.status(424).send({ message: err });
  }
}



module.exports = {
                    getAll,
                    getLivroByID,
                    
                    getByTitulo,
                    postLivros,
                    deleteLivros,
                    deleteLivroAntigo,
                    putLivros,
                    patchLivros
}


