"use client"

import { LucideBox } from "lucide-react";
import { useState } from "react";

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    stock: number;
}

interface ProductsFormModalProps {
    isOpen: boolean;
    type: "add" | "edit";
    product: Product | null;
    products: Product[];
    onClose: () => void;
    onSubmit: (formData: Product) => void;
}

export default function ProductsFormModal({
    type,
    isOpen,
    onClose,
    onSubmit,
    product,
    products
}: ProductsFormModalProps) {
    if (!isOpen) return null;


    const [formData, setFormData] = useState<Product | null>(product || null);
    const [errors, setErrors] = useState<Record<string, string>>({});


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData) {
            setErrors({ name: "Nama produk harus diisi", price: "Harga harus diisi", stock: "Stok harus diisi" })
            return
        };
        if (products?.some((p) => p.name.toLowerCase() === formData.name.toLowerCase())) {
            setErrors({ name: "Nama produk sudah ada" })
            return
        }
        onSubmit(formData!);
        setErrors({})
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 top-0 ">
            <div className="fixed inset-0 bg-gray-900/50" onClick={onClose}></div>
            <div className="bg-white p-4 rounded-md shadow-md z-50 w-full mx-2 md:min-w-sm max-w-md ">
                <div className="flex items-center gap-2 mb-2">
                    <span className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-2xl">
                        <LucideBox />
                    </span>
                    <h2 className="text-lg font-bold ">{type === "add" ? "Tambah Produk" : "Edit Produk"}</h2>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Nama Produk
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData?.name || ""}
                                onChange={(e) => setFormData({ ...formData!, name: e.target.value })}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                        </div>

                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                Harga
                            </label>
                            <input
                                type="number"
                                id="price"
                                value={formData?.price || ""}
                                onChange={(e) => setFormData({ ...formData!, price: Number(e.target.value) })}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            />
                            {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}

                        </div>


                        <div>
                            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                                Stok
                            </label>
                            <input
                                type="number"
                                id="stock"
                                value={formData?.stock || ""}
                                onChange={(e) => setFormData({ ...formData!, stock: Number(e.target.value) })}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            />
                            {errors.stock && <span className="text-red-500 text-sm">{errors.stock}</span>}

                        </div>


                        <div className="w-full grid grid-cols-2">
                            <button
                                type="submit"
                                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                            >
                                Simpan
                            </button>
                            <button
                                type="button"
                                className="mt-4 ml-2 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                                onClick={onClose}
                            >
                                Tutup
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}