import React from 'react'

function Modal({ objetoMostrar, filtrarArea, onClose }) {

    /*     let capsula = null
    
        const objetos = {
            item1: {
                area: 'products',
                head: ["Title", "Category", "Price", "Stock", "Warranty Information", "Description"]
    
            },
            item2: {
                area: "users", head: ["Firstname", "Lastname", "Age", "Gender", "City", "Email"],
            },
            item3: {
                area: "posts", head: ["Title", "Views", "Likes", "Dislikes", "Body"]
            },
        }
    
        const val = Object.values(objetos)
        val.forEach((obj) => {
            if (obj.area === filtroPuesto) {
                capsula = obj
            }
        })
    
        if (!capsula) return;
    
        const datos = capsula.body();
     */

    if (!objetoMostrar || !filtrarArea) return null

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-20">
            <div className='bg-[#e1dcd3] p-5 rounded-2xl'>
                <div className='flex flex-col gap-3'>
                    {filtrarArea.map((col, index) => {
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
