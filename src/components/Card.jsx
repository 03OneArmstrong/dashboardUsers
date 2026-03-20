function Card({ titulo, valor, Icon, color, hover, filter, onClick }) {

    return (
        <>
            <div 
            onClick={() => onClick(filter)}
            className={`${color} flex flex-wrap items-center justify-center gap-3 w-40 h-40 p-5 rounded-2xl ${hover} duration-300 cursor-pointer`}>
                <div className='flex items-center justify-center gap-3 w-30 h-20 border-b-2 border-white'>
                    <Icon className='w-12 h-12 text-white' />
                    <h1 className='text-white'>{titulo}</h1>
                </div>
                <div className='w-full text-center'>
                    <p className='text-white'>{valor}</p>
                </div>
            </div>
        </>
    )
}

export default Card
