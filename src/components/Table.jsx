import { EyeIcon, TrashIcon, ArrowRightCircleIcon, ArrowLeftCircleIcon } from "@heroicons/react/16/solid"
import { useState } from "react"

function Table({ products }) {

    const [inputFiltro, setInputFiltro] = useState('')

    const filtro = products.filter((obj) => {
        const valorCoincide =
            obj.title?.toLowerCase().includes(inputFiltro.toLowerCase()) ||
            obj.category?.toLowerCase().includes(inputFiltro.toLowerCase()) ||
            obj?.price.toString().includes(inputFiltro) ||
            obj?.stock.toString().includes(inputFiltro)

        return valorCoincide
    })

    const [paginaActual, setPaginaActual] = useState(1);
    const registroPorPagina = 5;
    const inicio = (paginaActual - 1) * registroPorPagina;
    const fin = inicio + registroPorPagina;
    const totalPaginas = Math.ceil(filtro.length / registroPorPagina)
    const registrosMostrados = filtro.slice(inicio, fin)

    const handleBuscar = (e) => {
        const input = e.target.value;
        const result = input.replace(/[^a-zA-Záéíóú123456789]/g, '')
        setInputFiltro(result)
    }

    return (
        <div className='w-full p-6'>
            <div className='w-full p-6 grid grid-cols-4 gap-2 place-items-center border rounded-2xl bg-[#1d3557]'>
                <div className=''>
                    <input
                        value={inputFiltro}
                        onChange={handleBuscar}
                        className='border border-black text-center rounded-xl bg-[#31572c] p-2 text-white'
                        type="text" placeholder='Search' />
                </div>
                <div>
                    <select className='border border-black bg-[#780000] text-white p-2 rounded-2xl text-center w-40'>
                        <option value="">All</option>
                        <option value="">Beauty</option>
                        <option value="">Fragrances</option>
                        <option value="">Furniture</option>
                        <option value="">Groceries</option>
                    </select>
                </div>
            </div>
            <div>
                <table className='mt-4 w-full'>
                    <thead className='bg-[#588157] border-2 border-black'>
                        <tr className=''>
                            <th className='p-3 border border-black text-white font-medium text-center'>Title</th>
                            <th className='p-3 border border-black text-white font-medium text-center'>Category</th>
                            <th className='p-3 border border-black text-white font-medium text-center'>Price</th>
                            <th className='p-3 border border-black text-white font-medium text-center'>Stock</th>
                            <th className='p-3 border border-black text-white font-medium text-center'>Actions</th>
                        </tr>
                    </thead>
                    {registrosMostrados.length > 0 && (
                        <tbody className='border'>
                            {registrosMostrados.map((obj) => (
                                <tr key={obj.id}
                                    className='border-2 border-black'
                                >
                                    <td className='text-center p-3 bg-[#edede9] text-black border'>{obj.title}</td>
                                    <td className='text-center p-3 bg-[#edede9] text-black border'>{obj.category}</td>
                                    <td className='text-center p-3 bg-[#edede9] text-black border'>{obj.price}</td>
                                    <td className='text-center p-3 bg-[#edede9] text-black border'>{obj.stock}</td>
                                    <td className='text-center p-3 bg-[#edede9] text-black border'>
                                        <div className="flex justify-center items-center gap-4">
                                            <EyeIcon className="w-9 h-9 p-1 text-[#6f1d1b] rounded-full cursor-pointer hover:bg-[#432818] hover:text-[#ffe6a7] duration-300" />
                                            <TrashIcon className="w-9 h-9 p-1 text-[#c1121f] rounded-full cursor-pointer hover:bg-black hover:text-white duration-300" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
                <div className="flex justify-center gap-20 m-5 p-5">
                    <button
                        onClick={() => setPaginaActual(p => p - 1)}
                        disabled={paginaActual === 1}
                        className={`rounded-full text-[#8cb369] duration-300 ${paginaActual === 1 ? 'bg-[#495057] cursor-not-allowed' : 'bg-white cursor-pointer hover:text-[#023047]'}`}
                    >
                        <ArrowLeftCircleIcon className="w-12 h-12" />
                    </button>
                    <button
                        onClick={() => setPaginaActual(p => p + 1)}
                        disabled={paginaActual === totalPaginas}
                        className={`rounded-full text-[#8cb369] duration-300 ${paginaActual === totalPaginas ?'bg-[#495057] cursor-not-allowed' : 'bg-white cursor-pointer hover:text-[#023047]' }`}>
                        <ArrowRightCircleIcon className="w-12 h-12" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Table
