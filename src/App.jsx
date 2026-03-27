import { useEffect, useState } from 'react'
import './App.css'
import { Sector } from 'recharts'
import { exportProducts, exportUsers, exportPost, exportCarts } from './services/api'
import Navbar from './components/Navbar'
import { getProductsByCategory, getQuantityOfProducts, getUsersByAge, getRoleByReactions } from './components/functions'
import Dashboard from './components/Dashboard'
import { Routes, Route } from 'react-router-dom'
import Table from './components/Table'
import Footer from './pages/Footer'

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

  const totalProducts = carts.reduce((acc, value) => acc += value.products.length, 0);

  let chartData = [];
  if (activeFilter === 'products') {
    chartData = getProductsByCategory(products);
  } else if (activeFilter === 'users') {
    chartData = getUsersByAge(users);
  } else if (activeFilter === 'posts') {
    chartData = getRoleByReactions(posts);
  } else if (activeFilter === 'carts') {
    chartData = getQuantityOfProducts(carts);
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

  // const columnsProducts = [
  //   { header: "Title", accessor: "title" },
  //   { header: "Category", accessor: "category" },
  //   { header: "Price", accessor: "price" },
  //   { header: "Stock", accessor: "stock" }
  // ]

  // const columnsUsers = [
  //   {header: "Name", accessor: "firstName"},
  //   {header: "Lastname", accessor: "lastName"},
  //   {header: "Age", accessor: "age"},
  //   {header: "Email", accessor: "email"}
  // ]

  // const columnsPost = [
  //   {header: "Title", accessor: "title"},
  //   {header: "Body", accessor: "body"},
  //   {header: "Views", accessor: "views"}
  // ]

  // console.log(chartData);

  return (
    <>
      <div className='min-h-screen flex'>
        <Navbar />
        <div className='flex-1 flex flex-col'>
          <div className='flex-1'>
            <Routes>
              <Route
                path='/'
                element={
                  <Dashboard
                    products={products}
                    users={users}
                    posts={posts}
                    setActiveFilter={setActiveFilter}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    totalProducts={totalProducts}
                    renderActiveShape={renderActiveShape}
                    chartData={chartData}
                    obj={obj}
                  />
                }
              >
              </Route>
              <Route path='/table' element={<Table products={products} />}></Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App