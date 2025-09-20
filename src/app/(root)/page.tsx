"use client"

import { ConfirmationModal } from "@/components/confirmation-modal";
import ProductsFormModal from "@/components/forms/products-form-modal";
import { PRODUCTS } from "@/data/products";
import { LucideBan, LucideEdit, LucideLink, LucidePlusCircle, LucideTrash, LucideXCircle } from "lucide-react";
import Link from "next/link";
import { use, useEffect, useState } from "react";


interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    stock: number;
}

export default function ProductsPage() {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [data, setData] = useState<Product[]>(PRODUCTS)
    const [filteredData, setFilteredData] = useState<Product[]>([])
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [confirmModal, setConfirmModal] = useState<boolean>(false)
    const [productModal, setProductModal] = useState<{
        type: 'add' | 'edit',
        isOpen: boolean
    } | null>(null)


    const [search, setSearch] = useState<string>("")
    const [sortType, setSortType] = useState<string>("")


    const onDelete = (product: Product) => {
        setConfirmModal(true)
        setSelectedProduct(product)
    }

    const onEditProduct = (product: Product) => {
        setProductModal({ type: 'edit', isOpen: true })
        setSelectedProduct(product)
    }


    const onAddProduct = () => {
        setProductModal({ type: 'add', isOpen: true })
    }


    const onReset = () => {
        setSortType("")
        setSearch("")
    }


    const productModalClose = () => {
        setProductModal(null)
        setSelectedProduct(null)
    }


    useEffect(() => {
        setIsLoading(true)
        const timeout = setTimeout(() => {
            let result = data;

            if (search) {
                result = result.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
            }

            if (sortType === "price-high") {
                result = [...result].sort((a, b) => b.price - a.price)
            } else if (sortType === "price-low") {
                result = [...result].sort((a, b) => a.price - b.price)
            } else if (sortType === "stock-high") {
                result = [...result].sort((a, b) => b.stock - a.stock)
            } else if (sortType === "stock-low") {
                result = [...result].sort((a, b) => a.stock - b.stock)
            }


            setFilteredData(result)
            setIsLoading(false)
        }, 500)

        return () => clearTimeout(timeout)

    }, [search, sortType, data])


    const handleSubmitProduct = (formData: Product) => {
        if (productModal?.type === "add") {
            setData([...data, { ...formData, id: data.length + 1, image: "https://placehold.co/600x400" }])
            productModalClose()
        } else {
            setData(data.map((product) => product.id === formData.id ? formData : product))
            productModalClose()
        }
    }

    const handleDeleteProduct = () => {
        if (selectedProduct) {
            setData(data.filter((product) => product.id !== selectedProduct.id))
            setSelectedProduct(null)
            setConfirmModal(false)
        }
    }

    return (
        <>
            <div className="flex items-center gap-2 md:flex-row flex-col justify-between pb-4 border-b">
                <div className="flex items-center gap-2">
                    <h1 className="font-bold text-4xl">Products Page</h1>
                    <Link className="flex items-center gap-2 text-sky-600 px-4 py-2 rounded-md" href="/fetching">

                        <LucideLink className="size-4" />
                        Halaman Fetching
                    </Link>
                </div>
                <button onClick={onAddProduct} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md flex items-center gap-2">
                    <LucidePlusCircle className="size-4" />
                    Tambah Produk
                </button>
            </div>

            <div className="mt-4">
                <p className="text-gray-600">Total Produk: {data.length}</p>
                <div className="flex items-center gap-2">
                    <div>
                        <label htmlFor="search" className="sr-only">
                            Search
                        </label>
                        <input
                            type="text"
                            id="search"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="search" className="sr-only">
                            Filter
                        </label>
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => setSortType(e.target.value)} value={sortType}>
                            <option value="">Filter</option>
                            <option value="price-high">Harga Tertinggi</option>
                            <option value="price-low">Harga Terendah</option>
                            <option value="stock-high">Stok Tertinggi</option>
                            <option value="stock-low">Stok Terendah</option>
                        </select>

                    </div>
                    {sortType || search ? (
                        <div >
                            <label htmlFor="reset" className="sr-only">Reset</label>
                            <button type="button" className="flex items-center gap-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" onClick={onReset}>
                                <LucideXCircle className="size-4" />
                                Reset
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {isLoading ? (
                    <div className="col-span-4 flex flex-col items-center justify-center gap-5">
                        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
                        <p className="text-gray-600">Loading ...</p>
                    </div>
                ) : filteredData.length === 0 ? (
                    <div className="col-span-4 flex flex-col items-center justify-center">
                        <LucideBan className="text-gray-600 size-12" />
                        <p className="text-gray-600">No products found</p>
                    </div>
                ) : (
                    filteredData.map((product) => (
                        <div key={product.id} className="bg-white rounded-md shadow-md relative overflow-hidden hover:shadow-lg border border-gray-300">
                            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded">NEW</div>
                            <div className="absolute top-2 right-2  px-2 py-1 rounded flex items-center gap-2">
                                <button onClick={() => onEditProduct(product)} className="text-blue-500 p-1.5 aspect-square rounded hover:bg-blue-100 cursor-pointer transition-colors duration-300">
                                    <LucideEdit className="size-4" />
                                    <span className="sr-only">Edit</span>
                                </button>
                                <button onClick={() => onDelete(product)} className="text-red-500 p-1.5 aspect-square rounded hover:bg-red-100 cursor-pointer transition-colors duration-300">
                                    <LucideTrash className="size-4" />
                                    <span className="sr-only">Delete</span>
                                </button>
                            </div>

                            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                            <div className="flex flex-col items-center justify-center p-4 gap-4">
                                <h2 className="font-bold text-xl">{product.name}</h2>
                                <p className="text-gray-600">Rp {Number(product.price).toLocaleString('id-ID', {
                                    currency: 'IDR',
                                })}</p>
                                <p className="text-gray-600">Stock: {product.stock}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <ProductsFormModal isOpen={productModal?.isOpen ?? false} onClose={productModalClose} onSubmit={handleSubmitProduct} product={selectedProduct} type={productModal?.type ?? "add"} products={data} />

            <ConfirmationModal isOpen={confirmModal} onConfirm={handleDeleteProduct} onCancel={() => setConfirmModal(false)} />

        </>
    );
}