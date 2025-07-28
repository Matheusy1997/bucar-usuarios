"use client";
import { useState, useEffect } from "react";
import Input from "../../components/Input";
import TableRow from "../../components/TableRow";

interface Users {
  id: number;
  firstName: string;
  lastName: string;
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

  useEffect(() => {}, []);

  function addUsers() {
    const newItem: Users = {
      id: currentId,
      firstName: currentFirstName,
      lastName: currentLastName,
      email: currentEmail,
      birthDate: currentBirthDate,
    };
    setTodoList((prevTodoList) => [...prevTodoList, newItem]);
    console.log(todoList);

    setCurrentId(0);
    setCurrentFirstName("");
  }

  const filterList = currentFilter
    ? todoList.filter((item) =>
        item.firstName
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
                To-do
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {filterList.map((item) => (
              <TableRow
                key={item.id}
                id={item.id}
                name={item.lastName}
                onDelete={deleteUsers}
              />
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
