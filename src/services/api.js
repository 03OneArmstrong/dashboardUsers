const exportProducts = async () => {
    try {
        const res = await fetch("https://dummyjson.com/products");

        if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status} - ${res.statusText}`)
        }

        const data = await res.json();
        return data.products

    } catch (error) {
        console.error(error);
        
    }
}
const exportUsers = async () => {
    try {
        const res = await fetch("https://dummyjson.com/users");

        if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status} - ${res.statusText}`)
        }

        const data = await res.json();
        return data.users

    } catch (error) {
        console.error(error);
        
    }
}
const exportCarts = async () => {
    try {
        const res = await fetch("https://dummyjson.com/carts");

        if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status} - ${res.statusText}`)
        }

        const data = await res.json();
        return data.carts

    } catch (error) {
        console.error(error);
        
    }
}
const exportPost = async () => {
    try {
        const res = await fetch("https://dummyjson.com/posts");

        if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status} - ${res.statusText}`)
        }

        const data = await res.json();
        return data.posts

    } catch (error) {
        console.error(error);
        
    }
}

export {exportProducts, exportUsers, exportCarts, exportPost}