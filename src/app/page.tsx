"use client";
import { useState, useEffect } from "react";
import Input from "../../components/Input";
import TableRow from "../../components/TableRow";

export interface Users {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  birthDate: string;
  onDelete?: (id: number) => void;
}

interface ApiUsers {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  birthDate: string;
}

export default function Home() {
  const [currentId, setCurrentId] = useState<number>(0);
  const [currentFirstName, setCurrentFirstName] = useState<string>("");
  const [currentLastName, setCurrentLastName] = useState<string>("");
  const [currentEmail, setCurrentEmail] = useState<string>("");
  const [currentBirthDate, setCurrentBirthDate] = useState<string>("");
  const [todoList, setTodoList] = useState<Users[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const searchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ApiUsers[] = await response.json();

        const mapperdUsers: Users[] = data.map((user) => {
          const formattedBirthDate = new Date(
            user.birthDate + "T00:00:00"
          ).toLocaleDateString("pt-BR");

          return {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            birthDate: formattedBirthDate,
          };
        });
        setTodoList(mapperdUsers)
      } catch(error) {
        console.error("Erro ao buscar usuários:", error)
      } finally {
        setLoading(false);
      }
    };
    searchUsers();
  }, []);

  function addUsers() {
    const date = new Date(currentBirthDate + "T00:00:00");
    const newItem: Users = {
      id: currentId,
      firstname: currentFirstName,
      lastname: currentLastName,
      email: currentEmail,
      birthDate: date.toLocaleDateString("pt-BR"),
    };
    setTodoList((prevTodoList) => [...prevTodoList, newItem]);
    console.log(todoList);

    setCurrentId(0);
    setCurrentFirstName("");
    setCurrentLastName("");
    setCurrentEmail("");
    setCurrentBirthDate("");
  }

  const filterList = currentFilter
    ? todoList.filter((item) =>
        item.firstname
          .toLocaleLowerCase()
          .includes(currentFilter.toLocaleLowerCase())
      )
    : todoList;

  const deleteUsers = (idToDelete: number) => {
    setTodoList((prevTodoList) =>
      prevTodoList.filter((item) => item.id !== idToDelete)
    );
  };

  return (
    <main className="h-screen w-screen flex flex-col items-center text-white bg-black overflow-x-hidden">
      <h1 className="text-3xl font-bold my-2.5">My to-do List</h1>
      <div className="w-2/4 my-2.5">
        <Input
          onSave={addUsers}
          idChange={setCurrentId}
          currentId={currentId}
          changeFirstName={setCurrentFirstName}
          currentFirstName={currentFirstName}
          changeLastName={setCurrentLastName}
          currentLastName={currentLastName}
          changeEmail={setCurrentEmail}
          currentEmail={currentEmail}
          changeBirthDate={setCurrentBirthDate}
          currentBirthDate={currentBirthDate}
          filterChange={setCurrentFilter}
          currentFilter={currentFilter}
        ></Input>
      </div>
      <section className="w-2/4">
        <table className="table-auto border border-gray-400 w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">
                ID
              </th>
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
                Birth Date
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
                  birthDate={item.birthDate}
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
