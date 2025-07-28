import { FormEvent } from "react";

interface InputProps {
  onSave: () => void;
  idChange: (n: number) => void;
  changeFirstName: (n: string) => void;
  changeLastName: (n: string) => void;
  changeEmail: (n: string) => void;
  changeBirthDate: (n: string) => void;
  filterChange: (n: string) => void;
  currentId: number;
  currentFirstName: string;
  currentLastName: string;
  currentEmail: string;
  currentBirthDate: string;
  currentFilter: string;
}

export default function Input({
  onSave,
  idChange,
  changeFirstName,
  changeLastName,
  changeEmail,
  changeBirthDate,
  filterChange,
  currentId,
  currentFirstName,
  currentLastName,
  currentEmail,
  currentBirthDate,
  currentFilter,
}: InputProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap bg-white border rounded"
    >
      <input
        className="w-2/4 m-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
        value={currentId === 0 ? "" : currentId}
        type="number"
        placeholder="ID"
        min={0}
        required
        onChange={(e) => idChange(Number(e.target.value))}
      />

      <input
        className="w-full m-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
        value={currentFirstName}
        type="text"
        placeholder="First Name"
        required
        onChange={(e) => changeFirstName(e.target.value)}
      />

      <input
        className="w-full m-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
        value={currentLastName}
        type="text"
        placeholder="Last Name"
        required
        onChange={(e) => changeLastName(e.target.value)}
      />

      <input
        className="w-full m-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
        value={currentEmail}
        type="email"
        placeholder="Email"
        required
        onChange={(e) => changeEmail(e.target.value)}
      />

      <input
        className="w-full m-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
        value={currentBirthDate}
        type="date"
        placeholder="Birth Date"
        required
        onChange={(e) => changeBirthDate(e.target.value)}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out m-3"
      >
        Save
      </button>

      <input
        type="text"
        name="filter"
        placeholder="Filter name"
        className="w-full m-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
        value={currentFilter}
        onChange={(e) => filterChange(e.target.value)}
      />
    </form>
  );
}
