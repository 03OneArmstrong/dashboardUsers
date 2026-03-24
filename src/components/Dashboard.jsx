import { ShoppingBagIcon, ShoppingCartIcon, UserIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/16/solid'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Legend } from 'recharts'
import Card from './Card'

function Dashboard({products, users, posts, setActiveFilter,activeIndex, setActiveIndex, totalProducts, renderActiveShape, chartData, obj}) {
    
  return (
    <div className='min-h-screen p-8 flex-1'>
        <div className='bg-[#1d3557] p-8 flex items-center justify-center gap-10 mb-10 rounded-2xl'>
          <Card
            titulo="Products"
            valor={products.length}
            Icon={ShoppingBagIcon}
            color='bg-black'
            hover='hover:bg-[#4a5759]'
            filter='products'
            onClick={setActiveFilter}
          />

          <Card
            titulo="Age by Users"
            valor={users.length}
            Icon={UserIcon}
            color='bg-[#780000]'
            hover='hover:bg-[#c1121f]'
            filter='users'
            onClick={setActiveFilter}
          />

          <Card
            titulo="Reactions Posts"
            valor={posts.length}
            Icon={ChatBubbleOvalLeftEllipsisIcon}
            color='bg-[#335c67]'
            hover='hover:bg-[#457b9d]'
            filter='posts'
            onClick={setActiveFilter}
          />

          <Card
            titulo="Quantity of Products"
            valor={totalProducts}
            Icon={ShoppingCartIcon}
            color='bg-[#31572c]'
            hover='hover:bg-[#4f772d]'
            filter='carts'
            onClick={setActiveFilter}
          />

        </div>
        {chartData.length > 0 && (
          <div className='bg-white p-6 flex justify-center items-center gap-8 flex-wrap border rounded-2xl'>
            <div>
              <h2 className='text-center mb-4 font-bold'>Bar Graph {obj.title}</h2>
              <BarChart
                className='border p-2 rounded-2xl'
                width={700} height={350} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" />
              </BarChart>
            </div>
            <div>
              <h2 className='text-center mb-4 font-bold'>Pie Graph {obj.title}</h2>
              <PieChart
                className='border p-2 rounded-2xl'
                width={400} height={400}>
                <Pie
                  data={chartData}
                  dataKey="total"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  isAnimationActive={true}
                  label={{ fill: '#000000', fontSize: "12" }}
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>
        )}

      </div>
  )
}

export default Dashboard
