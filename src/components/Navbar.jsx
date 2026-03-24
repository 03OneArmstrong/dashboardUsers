import { ChartPieIcon, TableCellsIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <div className='bg-[#023047] min-h-screen'>
            <NavLink to="/"
                className={({ isActive }) => `w-28 h-auto border-b border-white p-2 flex justify-center duration-300 cursor-pointer ${isActive ? 'bg-[#457b9d]' : 'hover:bg-[#457b9d]'}`}>
                <ChartPieIcon className='text-white w-14 h-14 mt-2 mb-2' />
            </NavLink>

            <NavLink 
            to='/table'
            className={({isActive}) => `w-28 h-auto border-b border-white p-2 flex justify-center duration-300 cursor-pointer ${isActive ? 'bg-[#457b9d]' : 'hover:bg-[#457b9d]'}`}>
                <TableCellsIcon className='text-white w-14 h-14 mt-2 mb-2' />
            </NavLink>
        </div>
    )
}

export default Navbar
