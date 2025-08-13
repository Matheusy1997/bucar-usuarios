
export default function TableRow({id, firstname, lastname, email, onDelete}) {
    return (
        <tr>
            <td className="py-3 px-4 text-left text-sm font-semibold tracking-wider">{firstname}</td>
            <td className="py-3 px-4 text-left text-sm font-semibold tracking-wider">{lastname}</td>
            <td className="py-3 px-4 text-left text-sm font-semibold tracking-wider">{email}</td>
            <td className="py-3 px-4 text-left text-sm font-semibold tracking-wider">
                <button onClick={() => onDelete(id)} className="hover:cursor-pointer">X</button>
                </td>
        </tr>
    )
}