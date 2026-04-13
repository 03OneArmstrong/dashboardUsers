import React from 'react'

const configModal = {
    products: [
        { header: "Title", accessor: "title" },
        { header: "Category", accessor: "category" },
        { header: "Price", accessor: "price" },
        { header: "Stock", accessor: "stock" },
        { header: "Brand", accessor: "brand" },
        { header: "Warranty Information", accessor: "warrantyInformation" },
        { header: "Description", accessor: "description" },
    ], users: [
        { header: "FirstName", accessor: "firstName" },
        { header: "LastName", accessor: "lastName" },
        { header: "Age", accessor: "age" },
        { header: "Gender", accessor: "gender" },
        { header: "BirthDate", accessor: "birthDate" },
        { header: "City", accessor: "address.city" },
        { header: "Email", accessor: "email" },
    ], posts: [
        { header: "Title", accessor: "title" },
        { header: "Views", accessor: "views" },
        { header: "Likes", accessor: "reactions.likes" },
        { header: "Dislikes", accessor: "reactions.dislikes" },
        { header: "Body", accessor: "body" },
    ],
}
function Modal({ objetoMostrar, filtroPuesto, onClose }) {

    const columnas = configModal[filtroPuesto]

    if (!objetoMostrar || !columnas) return null

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-20">
            <div className='bg-[#e1dcd3] p-5 rounded-2xl'>
                <div className='flex flex-col gap-3'>
                    {columnas.map((col, index) => {
                        const value = col.accessor.includes('.')
                            ? col.accessor.split('.').reduce((acc, key) => acc?.[key], objetoMostrar)
                            : objetoMostrar[col.accessor]

                        return (
                            <p key={index} className='p-2 border-b m-1'>
                                <strong>{col.header}: </strong>
                                {value ?? 'N/A'}
                            </p>
                        )
                    })}
                </div>

                <div className=''>
                    <button
                        className='cursor-pointer m-2 p-3 bg-[#7a1437] text-white hover:bg-[#c7434b] duration-300 rounded-2xl'
                        onClick={onClose}>Cerrar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal
