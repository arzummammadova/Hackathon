import React, { useState } from "react";
import { Plus, Trash2, UserPlus } from "lucide-react";

const ServiceManager = () => {
    const [services, setServices] = useState([
        { id: 1, name: "Otağa səhər yeməyi", price: 15 },
        { id: 2, name: "Təmizlik xidməti", price: 10 },
    ]);
    const [newService, setNewService] = useState({ name: "", price: "" });

    const handleAddService = () => {
        if (newService.name && newService.price) {
            setServices([
                ...services,
                {
                    id: Date.now(),
                    name: newService.name,
                    price: parseFloat(newService.price),
                },
            ]);
            setNewService({ name: "", price: "" });
        }
    };

    const handleDelete = (id) => {
        setServices((prev) => prev.filter((s) => s.id !== id));
    };

    const handleAssignToCustomer = (service) => {
        alert(`"${service.name}" xidməti müştəriyə təyin edildi!`);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
                <h1 className="text-2xl font-bold text-[#003B95] mb-4">
                    Xidmətlər Modulu
                </h1>

                {/* Yeni Xidmət Əlavə Et */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">
                        Yeni xidmət əlavə et
                    </h2>
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Xidmətin adı"
                            value={newService.name}
                            onChange={(e) =>
                                setNewService({ ...newService, name: e.target.value })
                            }
                            className="border rounded-md px-4 py-2 w-full"
                        />
                        <input
                            type="number"
                            placeholder="Qiymət (₼)"
                            value={newService.price}
                            onChange={(e) =>
                                setNewService({ ...newService, price: e.target.value })
                            }
                            className="border rounded-md px-4 py-2 w-full"
                        />
                        <button
                            onClick={handleAddService}
                            className="bg-[#003B95] hover:bg-blue-900 text-white px-4 py-2 rounded-md flex items-center gap-1"
                        >
                            <Plus size={16} />
                            Əlavə et
                        </button>
                    </div>
                </div>

                {/* Xidmət Siyahısı */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-3">
                        Xidmət siyahısı
                    </h2>
                    <ul className="divide-y border rounded-md">
                        {services.map((service) => (
                            <li
                                key={service.id}
                                className="flex justify-between items-center p-4"
                            >
                                <div>
                                    <p className="text-[#003B95] font-medium">{service.name}</p>
                                    <p className="text-sm text-gray-500">₼{service.price}</p>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleAssignToCustomer(service)}
                                        className="text-green-600 hover:text-green-800 flex items-center gap-1"
                                        title="Müştəriyə təyin et"
                                    >
                                        <UserPlus size={18} />
                                        Təyin et
                                    </button>
                                    <button
                                        onClick={() => handleDelete(service.id)}
                                        className="text-red-600 hover:text-red-800"
                                        title="Sil"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </li>
                        ))}
                        {services.length === 0 && (
                            <li className="p-4 text-gray-500">Heç bir xidmət əlavə olunmayıb.</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ServiceManager;
