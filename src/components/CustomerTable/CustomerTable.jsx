import CustomerTableField from "./CustomerTableField"

export function CustomerTable() {

    const customers = [{
        name: "asdasd",
        email: "asdasd@gmail.com",
        phone: "123456789",
        status: "Active"
    }]
    return (
        <div>


            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Ad
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Elektron Poçt
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nömrə
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <CustomerTableField key={customer.id} {...customer} />
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}