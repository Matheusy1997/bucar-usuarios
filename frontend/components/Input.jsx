
export default function Input({
  onSave,
  handleForm,
  form,
  filterChange,
  currentFilter,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap bg-white border rounded"
    >
      <input
        className="w-full m-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
        name="firstname"
        value={form.firstname}
        type="text"
        placeholder="First Name"
        required
        onChange={handleForm}
      />

      <input
        className="w-full m-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
        name="lastname"
        value={form.lastname}
        type="text"
        placeholder="Last Name"
        required
        onChange={handleForm}
      />

      <input
        className="w-full m-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
        name="email"
        value={form.email}
        type="email"
        placeholder="Email"
        required
        onChange={handleForm}
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
        placeholder="Filter first name"
        className="w-full m-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
        value={currentFilter}
        onChange={(e) => filterChange(e.target.value)}
      />
    </form>
  );
}
