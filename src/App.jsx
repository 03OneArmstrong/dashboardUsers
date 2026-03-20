import { useEffect, useState } from 'react'
import './App.css'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Legend, Sector } from 'recharts'
import { exportProducts, exportUsers, exportPost } from './services/api'
import { ShoppingBagIcon, UsersIcon, UserIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/16/solid'
import Card from './components/Card'

function App() {
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  // const [carts, setCarts] = useState([])
  const [posts, setPost] = useState([])
  const [activeFilter, setActiveFilter] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const COLORS = ['#ff6b6b', '#4d96ff', '#6bcB77', '#ffd93d', '#845ec2', '#00c9a7']

  const renderActiveShape = (props) => {
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill
    } = props

    return (
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 12}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    )
  }

  const getProductsByCategory = () => {
    const result = products.reduce((acc, value) => {
      if (!acc[value.category]) {
        acc[value.category] = 0
      }
      acc[value.category] += 1;
      return acc;
    }, {})

    return Object.keys(result).map((key, index) => ({
      name: key,
      title: "Products",
      total: result[key],
      fill: COLORS[index % COLORS.length]
    }))
  }

  const getUsersByAge = () => {
    const result = users.reduce((acc, value) => {

      if (value.age >= 18 && value.age <= 25) {
        acc["18-25"] += 1
      } else if (value.age >= 26 && value.age <= 35) {
        acc["26-35"] += 1
      } else if (value.age >= 36 && value.age <= 45) {
        acc["36-45"] += 1
      } else if (value.age >= 46) {
        acc["46+"] += 1
      }
      return acc

    }, { "18-25": 0, "26-35": 0, "36-45": 0, "46+": 0 })

    return Object.keys(result).map((key, index) => ({
      name: key,
      title: "Ages",
      total: result[key],
      fill: COLORS[index % COLORS.length]
    }))
  }

  const getUsersByCountry = () => {
    const result = users.reduce((acc, value) => {
      let genero = value.gender
      if (!acc[genero]) {
        acc[genero] = 0
      } 
      acc[genero] += 1;
      return acc;
    }, {})

    return Object.keys(result).map((key, index) => ({
      name: key,
      title: "Gender",
      total: result[key],
      fill: COLORS[index % COLORS.length]
    }))
  }

  let chartData = [];
  if (activeFilter === 'products') {
    chartData = getProductsByCategory();
  } else if (activeFilter === 'users') {
    chartData = getUsersByAge();
  } else if (activeFilter === 'country') {
    chartData = getUsersByCountry();
  }


  useEffect(() => {
    const getProducts = async () => {
      const prod = await exportProducts();
      const user = await exportUsers();
      // const cart = await exportCarts();
      const post = await exportPost();
      setProducts(prod);
      setUsers(user);
      // setCarts(cart)
      setPost(post)
    }
    getProducts();
  }, [])

  return (
    <>
      <div className='min-h-screen p-8'>
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
            titulo="Age Users"
            valor={users.length}
            Icon={UserIcon}
            color='bg-[#780000]'
            hover='hover:bg-[#c1121f]'
            filter='users'
            onClick={setActiveFilter}
          />

          <Card
            titulo="Gender Users"
            valor={users.length}
            Icon={UsersIcon}
            color='bg-[#335c67]'
            hover='hover:bg-[#457b9d]'
            filter='country'
            onClick={setActiveFilter}
          />

          <Card
            titulo="Posts"
            valor={posts.length}
            Icon={ChatBubbleOvalLeftEllipsisIcon}
            color='bg-[#31572c]'
            hover='hover:bg-[#4f772d]'
            filter='posts'
            onClick={setActiveFilter}
          />
        </div>
        {chartData.length > 0 && (
          <div className='bg-white p-6 flex justify-center items-center gap-8 flex-wrap border rounded-2xl'>
            <div>
              <h2 className='text-center mb-4 font-bold'>Bar Graph</h2>
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
              <h2 className='text-center mb-4 font-bold'>Pie Graph</h2>
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
    </>
  )
}

export default App
