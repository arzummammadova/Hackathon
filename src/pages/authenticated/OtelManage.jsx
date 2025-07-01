import { CustomerTable } from "../../components/CustomerTable/CustomerTable";
export function OtelManage() {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="flex flex-col items-center">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">OtelManage</h1>
                    <p className="text-gray-600">Müştəri idarəetmə sistemi</p>
                </div>
                <CustomerTable />
            </div>
        </div>
    );
}

export default OtelManage;