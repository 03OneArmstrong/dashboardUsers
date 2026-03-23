
import { ChartPieIcon } from '@heroicons/react/24/outline'
import React from 'react'

function Navbar() {
    return (
        <div className='bg-[#03045e]'>
            <div className='w-28 h-auto border-b border-white p-2 flex justify-center hover:bg-[#457b9d] duration-300 cursor-pointer'>
                <ChartPieIcon className='text-white w-14 h-14' />
            </div>
        </div>
    )
}

export default Navbar
