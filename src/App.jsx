import { useEffect, useState } from 'react'
import './App.css'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Legend, Sector } from 'recharts'
import { exportProducts, exportUsers, exportPost, exportCarts } from './services/api'
import { ShoppingBagIcon, ShoppingCartIcon, UserIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/16/solid'
import Card from './components/Card'
import { COLORS } from './Colors'
import Navbar from './components/Navbar'

function App() {
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [carts, setCarts] = useState([])
  const [posts, setPost] = useState([])
  const [activeFilter, setActiveFilter] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)

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
      title: "Quantity Products By Category",
      total: result[key],
      fill: COLORS[index % COLORS.length]
    }))
  }

  let totalProducts = carts.reduce((acc, value) => acc += value.products.length , 0);

  const getQuantityOfProducts = () => {
    const result = carts.reduce((acc, value) => {
      if (!acc[value.userId]) {
        acc[value.userId] = value.products.length
      }
      return acc;
    }, {})

    return Object.keys(result).map((key, index) => ({
      name: `${key}`,
      title: "Quantity Of Products By User",
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
      title: "Ages By Users",
      total: result[key],
      fill: COLORS[index % COLORS.length]
    }))
  }

  const getRoleByReactions = () => {
    const result = posts.reduce((acc, value) => {
      let reacciones = value.reactions;
      let total = 0;
      Object.values(reacciones).forEach((num) => {
        total += num
      })

      if (total >= 0 && total <= 100) {
        acc["0-100"] += 1
      } else if (total >= 101 && total <= 200) {
        acc["101-200"] += 1
      } else if (total >= 201 && total <= 300) {
        acc["201-300"] += 1
      } else if (total >= 301 && total <= 400) {
        acc["301-400"] += 1
      } else if (total >= 401 && total <= 500) {
        acc["401-500"] += 1
      } else if (total >= 501 && total <= 700) {
        acc["501-700"] += 1
      } else if (total >= 701 && total <= 1000) {
        acc["701-1000"] += 1
      } else if (total >= 1000) {
        acc["1000+"] += 1
      }

      return acc;
    },
      {
        "0-100": 0,
        "101-200": 0,
        "201-300": 0,
        "301-400": 0,
        "401-500": 0,
        "501-700": 0,
        "701-1000": 0,
        "1000+": 0,
      })

    return Object.keys(result).map((key, index) => ({
      name: key,
      title: "Quantity of Reaction by Posts",
      total: result[key],
      fill: COLORS[index % COLORS.length]
    }))
  }

  let chartData = [];
  if (activeFilter === 'products') {
    chartData = getProductsByCategory();
  } else if (activeFilter === 'users') {
    chartData = getUsersByAge();
  } else if (activeFilter === 'posts') {
    chartData = getRoleByReactions();
  } else if (activeFilter === 'carts') {
    chartData = getQuantityOfProducts();
  }

  // Obtener titulo
  // const [obj] = chartData;
  const obj = chartData[0]

  useEffect(() => {
    const getProducts = async () => {
      const prod = await exportProducts();
      const user = await exportUsers();
      const cart = await exportCarts();
      const post = await exportPost();
      setProducts(prod);
      setUsers(user);
      setCarts(cart)
      setPost(post)
    }
    getProducts();
  }, [])

  // console.log(chartData);

  return (
    <>
    <div className='min-h-screen flex'>
      <Navbar />
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
    </div>
    </>
  )
}

export default App
