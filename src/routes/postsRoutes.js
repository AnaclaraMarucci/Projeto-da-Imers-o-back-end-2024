// Importa o framework Express para criar a aplicação web
import express from "express";

// Importa o módulo Multer para lidar com uploads de arquivos
import multer from "multer";

// Importa as funções controladoras para posts vindas do arquivo postsController.js
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost} from "../controllers/postsController.js";  

import cors from "cors";  
const corsOptions = {
  origin: "http://localhost:8000", 
  optionsSuccessStatus: 200
}

// Configura o armazenamento para uploads usando Multer
const storage = multer.diskStorage({
  // Define a pasta de destino para os uploads (ajuste o caminho se necessário)
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Define como o arquivo será nomeado (mantém o nome original)
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Cria uma instância do Multer usando a configuração de armazenamento
const upload = multer({ storage });

// Define as rotas da API usando a função routes
const routes = (app) => { 
  // Middleware para interpretar dados JSON enviados no corpo da requisição
  app.use(express.json());  
  app.use(cors(corsOptions))

  // **Rota GET para listar todos os posts**
  /**
   * Esta rota responde a requisições GET para o endpoint "/posts"
   * e chama a função listarPosts do arquivo postsController.js para recuperar e retornar todos os posts.
   */
  app.get("/posts", listarPosts);

  // **Rota POST para criar um novo post**
  /**
   * Esta rota responde a requisições POST para o endpoint "/posts"
   * e chama a função postarNovoPost do arquivo postsController.js para criar um novo post.
   * O corpo da requisição deve conter os dados do novo post.
   */
  app.post("/posts", postarNovoPost);

  // **Rota POST para upload de imagem**
  /**
   * Esta rota responde a requisições POST para o endpoint "/upload"
   * e usa o middleware upload.single("imagem") do Multer para tratar o upload de um único arquivo.
   * A função uploadImagem do arquivo postsController.js é chamada para processar a imagem enviada.
   * O campo "imagem" no formulário deve corresponder ao nome do arquivo enviado.
   */
  app.post("/upload", upload.single("imagem"), uploadImagem);   
    
  app.put("/upload/:id", atualizarNovoPost)
};

// Exporta a função routes para ser usada em outros arquivos do projeto
export default routes;