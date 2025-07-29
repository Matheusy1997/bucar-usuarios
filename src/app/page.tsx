"use client";
import React, { useState, useEffect } from "react";
import Input from "../../components/Input";
import TableRow from "../../components/TableRow";
import { searchUsers } from "../../components/users";
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
  const [form, setForm] = useState<ApiUsers>({
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    birthDate: ''
  });
  const [todoList, setTodoList] = useState<Users[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    searchUsers().then(setTodoList)
    setLoading(false)
  }, []);

  function handleForm(e:React.ChangeEvent<HTMLInputElement>):void {
    const { name, value } = e.target
    if(name === 'id') {
      const id = Number(value)
      setForm((prev) => ({...prev, [name]: id}))
    } else {
      setForm((prev) => ({...prev, [name]: value}))
    }
  }

  function addUsers() {
    const date = new Date(form.birthDate + "T00:00:00");
    if(todoList.some(user => user.id === form.id)) {
      alert('id já cadastrado') 
      setForm({
        id: 0,
        firstname: form.firstname,
        lastname: form.lastname,
        email: form.email,
        birthDate: form.birthDate
      })
      return
    }
    const newItem: Users = {
      id: form.id,
      firstname: form.firstname,
      lastname: form.lastname,
      email: form.email,
      birthDate: date.toLocaleDateString("pt-BR"),
    };
    setTodoList((prevTodoList) => [...prevTodoList, newItem]);
    form.id = 0
    form.firstname = ''
    form.lastname = ''
    form.email = ''
    form.birthDate= ''
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
