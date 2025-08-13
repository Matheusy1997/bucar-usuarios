"use client";
import TableRow from "../../components/TableRow";
import Input from "../../components/Input";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });
  const [todoList, setTodoList] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadPessoas() {
    try {
      const response = await axios.get("http://localhost:3003/pessoas");

      // Axios já retorna o corpo da resposta em `response.data`
      // e já lida com o parseamento do JSON.
      setTodoList(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      // O Axios encapsula o erro em `error.response` para requisições com status 4xx ou 5xx
      console.error("Erro ao buscar pessoas:", error.response || error);
      setTodoList([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPessoas();
  }, []);

  function handleForm(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function addUsers() {
    try {
      // Axios envia o `form` diretamente. Ele serializa para JSON
      // e define o header `Content-Type` automaticamente.
      const response = await axios.post("http://localhost:3003/pessoas", form);

      // Axios lança um erro para status 4xx e 5xx, então não precisamos
      // da verificação `response.ok`. Apenas o sucesso é processado aqui.
      if (response.status === 201) { // O status 201 é o esperado para POST bem-sucedido.
        alert("Pessoa cadastrada com sucesso!");
        setForm({ firstname: "", lastname: "", email: "", });
        loadPessoas();
      }
    } catch (error) {
      // O erro será capturado aqui, incluindo o de status não-2xx.
      console.error("Erro:", error.response || error);

      // O Axios armazena a resposta de erro em `error.response.data`.
      const errorMessage = error.response?.data?.error || "Erro de conexão com o servidor";
      alert(`Erro ao cadastrar pessoa: ${errorMessage}`)
    }
  }

  const filterList = currentFilter
    ? todoList.filter((item) =>
        item.firstname
          .toLocaleLowerCase()
          .includes(currentFilter.toLocaleLowerCase())
      )
    : todoList;

  const deleteUsers = async (idToDelete) => {
    try {
      // Monta a URL de forma dinâmica, incluindo o ID do usuário a ser excluído
      const response = await axios.delete(
        `http://localhost:3003/pessoas/${idToDelete}`
      );

      // O status 200 (OK) ou 204 (No Content) geralmente indica sucesso
      // A resposta não costuma ter corpo (dados) para o DELETE, então você pode
      // simplesmente verificar o status da resposta.
      console.log(`Usuário com ID ${idToDelete} deletado com sucesso.`);

      // Você pode retornar um valor de sucesso, se desejar
      loadPessoas();
      return response.status;
    } catch (error) {
      // Se a requisição falhar, o erro será capturado aqui
      console.error(
        `Erro ao deletar o usuário com ID ${idToDelete}:`,
        error.response.data
      );

      // Em um cenário real, você pode querer exibir uma mensagem de erro para o usuário
      // ou fazer algum outro tratamento.
      throw error; // Rejeita a promessa para que o código que chamou a função possa lidar com o erro
    }
  };

  return (
    <main className="h-screen w-screen flex flex-col items-center text-white bg-black overflow-x-hidden">
      <h1 className="text-3xl font-bold my-2.5">Registrar pessoas</h1>
      <div className="w-2/4 my-2.5">
        <Input
          onSave={addUsers}
          form={form}
          handleForm={handleForm}
          filterChange={setCurrentFilter}
          currentFilter={currentFilter}
        ></Input>
      </div>
      <section className="w-2/4">
        <table className="table-auto border border-gray-400 w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">
                First Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">
                Last Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">
                Email
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  Carregando Usuários...{" "}
                </td>
              </tr>
            ) : filterList.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  {" "}
                  Nenhum usuário encontrado...
                </td>
              </tr>
            ) : (
              filterList.map((item) => (
                <TableRow
                  key={item.id}
                  id={item.id}
                  firstname={item.firstname}
                  lastname={item.lastname}
                  email={item.email}
                  onDelete={deleteUsers}
                />
              ))
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
