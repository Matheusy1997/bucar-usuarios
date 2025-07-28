interface TableRowProps{
    id:number
    name:string
    onDelete: (id: number) => void
}

export default function TableRow({id, name, onDelete}: TableRowProps) {
    return (
        <tr>
            <td  className="py-3 px-4 text-left text-sm font-semibold tracking-wider">{id}</td>
            <td className="py-3 px-4 text-left text-sm font-semibold tracking-wider">{name}</td>
            <td className="py-3 px-4 text-left text-sm font-semibold tracking-wider">
                <button onClick={() => onDelete(id)} className="hover:cursor-pointer">X</button>
                </td>
        </tr>
    )
}