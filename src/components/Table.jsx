import { EyeIcon, TrashIcon, ArrowRightCircleIcon, ArrowLeftCircleIcon } from "@heroicons/react/16/solid"
import { useState } from "react"
import GenerarPDF from "./GenerarPDF"
import Modal from "./Modal"

function Table({ data }) {

    const [inputFiltro, setInputFiltro] = useState('')
    const [filtroEstado, setFiltroEstado] = useState('null')
    const [filtroPuesto, setFiltroPuesto] = useState('products')
    const [filtroPDF, setFiltroPDF] = useState('products')
    const [mostrarModal, setMostrarModal] = useState(false)
    const [objetoMostrar, setObjetoMostrar] = useState(null)

    const abriModal = (usuario) => {
        setMostrarModal(true)
        setObjetoMostrar(usuario)
    }

    const arr = Object.values(data);
    let filtrarArea = []
    let registros = []
    arr.forEach((obj) => {
        if (obj.value === filtroPuesto) {
            filtrarArea = obj.columns
            registros = obj.rows
        }
    })

    let registroPDF = []
    arr.forEach((obj) => {
        if (obj.value === filtroPDF) {
            registroPDF = obj.rows
        }
    })

    console.log(registros);

    const filtro = registros.filter((obj) => {
        if (filtroPuesto === 'products') {
            const valorCoincide =
                obj.title?.toLowerCase().includes(inputFiltro.toLowerCase()) ||
                obj.category?.toLowerCase().includes(inputFiltro.toLowerCase()) ||
                obj?.price.toString().includes(inputFiltro) ||
                obj?.stock.toString().includes(inputFiltro)

            const coincideCategoria = filtroEstado === 'null'
                ? true
                : obj.category === filtroEstado

            return valorCoincide && coincideCategoria
        }
        if (filtroPuesto === 'users') {
            const valorCoincide =
                obj.firstName?.toLowerCase().includes(inputFiltro.toLowerCase()) ||
                obj.lastname?.toLowerCase().includes(inputFiltro.toLowerCase()) ||
                obj.email?.toLowerCase().includes(inputFiltro.toLowerCase()) ||
                obj.age?.toString().includes(inputFiltro)

            return valorCoincide
        }

        if (filtroPuesto === 'posts') {
            const valorCoincide =
                obj.title?.toLowerCase().includes(inputFiltro.toLowerCase()) ||
                obj.body?.toLowerCase().includes(inputFiltro.toLowerCase()) ||
                obj.views?.toString().includes(inputFiltro)
            return valorCoincide
        }
    })

    const [paginaActual, setPaginaActual] = useState(1);
    const registroPorPagina = 5;
    const inicio = (paginaActual - 1) * registroPorPagina;
    const fin = inicio + registroPorPagina;
    const totalPaginas = Math.ceil(filtro.length / registroPorPagina)
    const registrosMostrados = filtro.slice(inicio, fin)

    const handleBuscar = (e) => {
        const input = e.target.value;
        const result = input.replace(/[^a-zA-Záéíóú1234567890.]/g, '')
        setInputFiltro(result)
    }

    return (
        <>
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
                        <select
                            disabled={filtroPuesto !== 'products'}
                            value={filtroEstado}
                            onChange={(e) => setFiltroEstado(e.target.value)}
                            className={`border border-black text-white p-2 rounded-2xl text-center w-40 ${filtroPuesto === 'products' ? 'bg-[#780000]' : 'bg-[#495057]'}`}>
                            <option value="null">All</option>
                            <option value="beauty">Beauty</option>
                            <option value="fragrances">Fragrances</option>
                            <option value="furniture">Furniture</option>
                            <option value="groceries">Groceries</option>
                        </select>
                    </div>

                    <div>
                        <select
                            value={filtroPuesto}
                            onChange={(e) => setFiltroPuesto(e.target.value)}
                            className="border bg-[#a2d2ff] p-2 rounded-full text-center w-40"
                        >
                            <option value='products'>Products</option>
                            <option value='users'>Users</option>
                            <option value='posts'>Posts</option>
                        </select>
                    </div>

                    <div className="p-3 grid grid-cols-2 gap-2">
                        <select
                            onChange={(e) => setFiltroPDF(e.target.value)}
                            value={filtroPDF}
                            className="border border-black p-2 bg-[#3e5c76] text-white rounded-full w-36 text-center">
                            <option value='products'>Products</option>
                            <option value='users'>Users</option>
                            <option value='posts'>Posts</option>
                        </select>
                        <button
                            onClick={() => GenerarPDF(registroPDF, filtroPDF)}
                            className="bg-[#5a189a] p-2 rounded-full cursor-pointer text-white hover:bg-[#240046] duration-300"
                        >Generar PDF</button>
                    </div>

                </div>
                <div>
                    <table className='mt-4 w-full'>
                        <thead className='bg-[#588157] border-2 border-black'>
                            <tr>
                                {filtrarArea.map((col, index) => (
                                    <th key={index}
                                        className="p-3 border border-black text-white font-medium text-center"
                                    >
                                        {col.header}
                                    </th>
                                ))}
                                <th className='p-3 border border-black text-white font-medium text-center'>Actions</th>
                            </tr>

                        </thead>
                        {registrosMostrados.length > 0 && (
                            <tbody className='border'>
                                {registrosMostrados.map((obj, index) => (
                                    <tr key={index}
                                        className='border-2 border-black'
                                    >
                                        {filtrarArea.map((col, index) => {
                                            const value = col.accessor.includes('.')
                                                ? col.accessor.split('.').reduce((acc, key) => acc?.[key], obj)
                                                : obj[col.accessor]
                                            return (
                                                <td
                                                    className="text-center p-3 bg-[#edede9] text-black border"
                                                    key={index}>
                                                    {value}
                                                </td>
                                            )
                                        })}

                                        <td className='text-center p-3 bg-[#edede9] text-black border'>
                                            <div className="flex justify-center items-center gap-4">
                                                <button onClick={() => abriModal(obj)}>
                                                    <EyeIcon className="w-9 h-9 p-1 text-[#6f1d1b] rounded-full cursor-pointer hover:bg-[#432818] hover:text-[#ffe6a7] duration-300" />
                                                </button>
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
                            className={`rounded-full text-[#8cb369] duration-300 ${paginaActual === totalPaginas ? 'bg-[#495057] cursor-not-allowed' : 'bg-white cursor-pointer hover:text-[#023047]'}`}>
                            <ArrowRightCircleIcon className="w-12 h-12" />
                        </button>
                    </div>
                </div>
            </div>
            {
                objetoMostrar && mostrarModal && (
                    <Modal objetoMostrar={objetoMostrar} filtrarArea={filtrarArea} onClose={() => setMostrarModal(false)} />
                )}
        </>
    )
}

export default Table
