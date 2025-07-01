import { BedDouble } from "lucide-react";

export const CustomerAssignTable = ({ customers, onAssignClick }) => {
    return (
        <table className="w-full text-left border">
            <thead className="bg-blue-100">
                <tr>
                    <th className="px-4 py-2">Ad</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Telefon</th>
                    <th className="px-4 py-2">Otaq</th>
                    <th className="px-4 py-2">Əməliyyat</th>
                </tr>
            </thead>
            <tbody>
                {customers.map((customer) => (
                    <tr key={customer.id} className="border-t">
                        <td className="px-4 py-2">{customer.name}</td>
                        <td className="px-4 py-2">{customer.email}</td>
                        <td className="px-4 py-2">{customer.phone}</td>
                        <td className="px-4 py-2">
                            {customer.roomNumber || <span className="text-gray-400">Təyin olunmayıb</span>}
                        </td>
                        <td className="px-4 py-2">
                            <button
                                className="bg-[#003B95] hover:bg-blue-900 text-white px-3 py-1 rounded flex items-center gap-1"
                                onClick={() => onAssignClick(customer)}
                            >
                                <BedDouble size={16} />
                                Otaq təyin et
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
