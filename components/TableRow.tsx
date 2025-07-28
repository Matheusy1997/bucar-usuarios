import { Users } from "@/app/page"

export default function TableRow({id, firstName, lastName, email, birthDate, onDelete}: Users) {
    const handleDelete = (id: number) => {
        onDelete?.(id)
    }
    return (
        <tr>
            <td  className="py-3 px-4 text-left text-sm font-semibold tracking-wider">{id}</td>
            <td className="py-3 px-4 text-left text-sm font-semibold tracking-wider">{firstName}</td>
            <td className="py-3 px-4 text-left text-sm font-semibold tracking-wider">{lastName}</td>
            <td className="py-3 px-4 text-left text-sm font-semibold tracking-wider">{email}</td>
            <td className="py-3 px-4 text-left text-sm font-semibold tracking-wider">{birthDate}</td>
            <td className="py-3 px-4 text-left text-sm font-semibold tracking-wider">
                <button onClick={() => handleDelete(id)} className="hover:cursor-pointer">X</button>
                </td>
        </tr>
    )
}