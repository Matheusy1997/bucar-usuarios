'use client'
import { useState, useEffect } from "react";
import  Input  from "../../components/Input";
import TableRow from "../../components/TableRow";

const afazeres = [
  { id: 1, name: "Responder e-mails importantes" },
  { id: 2, name: "Preparar apresentação para reunião de segunda" },
  { id: 3, name: "Ir ao supermercado" },
  { id: 4, name: "Agendar consulta médica" },
  { id: 5, name: "Pagar contas da casa" },
  { id: 6, name: "Fazer exercícios físicos" },
  { id: 7, name: "Terminar relatório financeiro" },
  { id: 8, name: "Ligar para cliente X" },
  { id: 9, name: "Pesquisar sobre novas tecnologias" },
  { id: 10, name: "Organizar arquivos digitais" },
  { id: 11, name: "Regar as plantas" },
  { id: 12, name: "Limpar a cozinha" },
  { id: 13, name: "Comprar presente de aniversário" },
  { id: 14, name: "Ler capítulo do livro" },
  { id: 15, name: "Planejar roteiro de viagem" },
  { id: 16, name: "Revisar código do projeto Y" },
  { id: 17, name: "Atualizar currículo" },
  { id: 18, name: "Fazer backup de fotos" },
  { id: 19, name: "Consertar torneira que vaza" },
  { id: 20, name: "Estudar para certificação" },
  { id: 21, name: "Agendar manutenção do carro" },
  { id: 22, name: "Doar roupas antigas" },
  { id: 23, name: "Aprender novas palavras em inglês" },
  { id: 24, name: "Cozinhar refeição saudável" },
  { id: 25, name: "Meditar por 15 minutos" },
  { id: 26, name: "Escrever artigo para blog" },
  { id: 27, name: "Resolver quebra-cabeça" },
  { id: 28, name: "Visitar um museu" },
  { id: 29, name: "Assistir a um documentário" },
  { id: 30, name: "Ligar para um amigo ou familiar" }
];

interface ListItem {
  id: number
  name: string
}

export default function Home() {
  const [currentId, setCurrentId] = useState<number>(0)
  const [currentName, setCurrentName] = useState<string>('')
  const [todoList, setTodoList] = useState<ListItem[]>([])
  const [currentFilter , setCurrentFilter] = useState<string>('')
  useEffect(() => {
    setTodoList(afazeres)
  })

  function addListItem() {
    const newItem: ListItem = {id: currentId, name: currentName}
    setTodoList(prevTodoList => [...prevTodoList, newItem]);
    console.log(todoList)

    setCurrentId(0)
    setCurrentName('')
  }

  const filterList = currentFilter 
    ? todoList.filter((item) => 
      item.name.toLocaleLowerCase().includes(currentFilter.toLocaleLowerCase())
    )
    : todoList

  const deleteListItem = (idToDelete: number) => {
    setTodoList(prevTodoList => prevTodoList.filter(item => item.id !== idToDelete));
  };

  return (
    <main className="h-screen w-screen flex flex-col items-center text-white bg-black overflow-x-hidden">
      <h1 className="text-3xl font-bold my-2.5">My to-do List</h1>
      <div className="w-2/4 my-2.5">
        <Input onSave={addListItem} idChange={setCurrentId} textChange={setCurrentName} currentId={currentId} currentNome={currentName} filterChange={setCurrentFilter} currentFilter={currentFilter}></Input>
      </div>
      <section className="w-2/4">
        <table className="table-auto border border-gray-400 w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">
                ID
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">
                To-do
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {filterList.map(item => (
              <TableRow
              key={item.id}
              id={item.id}
              name={item.name}
              onDelete={deleteListItem}/> 
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
