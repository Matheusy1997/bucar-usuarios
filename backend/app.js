const express = require("express");
const cors = require("cors");
const sequelize = require("./database");
const Pessoa = require("./models/Pessoa");

const app = express();
const PORT = 3003;

// Middleware
app.use(express.json());
app.use(cors());

// Sincroniza o modelo com o banco de dados (cria a tabela se não existir)
sequelize
  .sync()
  .then(() => console.log("Tabela de pessoas sincronizada com sucesso!"))
  .catch((err) => console.error("Erro ao sinconizar tabela:", err));

// --- ENDPOINTS ---

// Endpoint para criar uma nova pessoa
app.post("/pessoas", async (req, res) => {
  try {
    const { firstname, lastname, email } = req.body;
    const novaPessoa = await Pessoa.create({
      firstname,
      lastname,
      email,
    });
    res.status(201).json(novaPessoa);
  } catch (error) {
    console.error("Erro detalhado no cadastro:", error);
    res
      .status(500)
      .json({ error: "Erro ao criar pessoa.", details: error.message });
  }
});

// Endpoint para obter todas as pessoas
app.get("/pessoas", async (req, res) => {
  try {
    const pessoa = await Pessoa.findAll();
    res.status(200).json(pessoa);
  } catch (error) {
    res.status(500).json({ error: "Erro ao busca pessoas." });
  }
});

//Endpoint pra deletar uma pessoa do banco de dados
app.delete("/pessoas/:id", async (req, res) => {
  try {
    // 1. Captura o ID da requisição usando req.params
    const { id } = req.params;

    // 2. Chama o método `destroy()` do Sequelize para apagar o registro
    // O método `destroy()` retorna o número de linhas afetadas.
    const linhasAfetadas = await Pessoa.destroy({
      where: {
        id: id, // A condição para deletar: onde o `id` da tabela é igual ao ID da requisição
      },
    });

    // 3. Verifica se alguma linha foi realmente deletada
    if (linhasAfetadas === 0) {
      // Se 0 linhas foram afetadas, significa que o registro não foi encontrado
      return res.status(404).json({ message: "Pessoa não encontrada." });
    }

    // Se a exclusão foi bem-sucedida, retorna um status 204
    // O status 204 significa "No Content", indicando sucesso sem corpo de resposta
    return res.status(204).send();
  } catch (error) {
    // Em caso de erro do servidor, retorna um status 500
    return res
      .status(500)
      .json({ message: "Erro ao deletar a pessoa.", error: error.message });
  }
});

// Iniciar o servidor

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
