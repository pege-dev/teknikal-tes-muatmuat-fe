



interface ConfirmationModalProps {
    isOpen: boolean
    onConfirm: () => void
    onCancel: () => void
}


export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    onConfirm,
    onCancel,
    isOpen
}) => {

    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 inset-0 min-h-screen flex items-center justify-center z-50">
            <div className="fixed bg-gray-900/50 inset-0"></div>
            <div className="bg-white p-4 rounded-md shadow-md z-50 min-w-sm max-w-md">
                <h2 className="text-lg font-semibold mb-2">Hapus Item</h2>
                <p className="text-gray-600 mb-4">Apa kamu yakin ingin menghapus item ini?</p>
                <div className="flex justify-end">
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-2" onClick={onConfirm}>Hapus</button>
                    <button className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md" onClick={onCancel}>Batal</button>
                </div>
            </div>
        </div>
    )
}