  import { COLORS } from '../Colors'

  const getProductsByCategory = (products) => {
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

  const getQuantityOfProducts = (carts) => {
    const result = carts.reduce((acc, value) => {
      if (!acc[value.userId]) {
        acc[value.userId] = value.products.length
      }
      return acc;
    }, {})

    return Object.keys(result).map((key, index) => ({
      name: `${key}`,
      title: "Quantity Of Products By User ID",
      total: result[key],
      fill: COLORS[index % COLORS.length]
    }))
  }

  const getUsersByAge = (users) => {
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

  const getRoleByReactions = (posts) => {
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
export {getProductsByCategory, getQuantityOfProducts, getUsersByAge, getRoleByReactions}