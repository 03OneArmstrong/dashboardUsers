import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

function GenerarPDF(arreglo, lugar) {
    const nuevoPDF = new jsPDF()
    let capsula = null

    const objetos = {
        item1: {
            area: 'products',
            head: ["Title", "Category", "Price", "Stock","Brand", "Warranty Information", "Description"],
            body: () => {
                return arreglo.map((obj) => (
                    [obj.title,
                    obj.category,
                    obj.price,
                    obj.stock,
                    obj.brand,
                    obj.warrantyInformation,
                    obj.description
                    ]
                ))
            }
        },
        item2: {
            area: "users", head: ["Firstname", "Lastname", "Age", "Gender", "Birthday", "City", "Email"], body: () => {
                return arreglo.map((obj) => (
                    [obj.firstName,
                    obj.lastName,
                    obj.age,
                    obj.gender,
                    obj.birthDate,
                    obj.address.city,
                    obj.email
                    ]
                ))
            }
        },
        item3: {
            area: "posts", head: ["Title", "Views", "Likes", "Dislikes", "Body"], body: () => {
                return arreglo.map((obj) => (
                    [obj.title,
                    obj.views,
                    obj.reactions.likes,
                    obj.reactions.dislikes,
                    obj.body
                    ]
                ))
            }
        },
    }

    const val = Object.values(objetos)
    val.forEach((obj) => {
        if (obj.area === lugar) {
            capsula = obj
        }
    })

    if(!capsula) return;

    autoTable(nuevoPDF, {head: [capsula.head], body: capsula.body()})

    nuevoPDF.save(`${Date.now()}-${capsula.area}.pdf`)
}

export default GenerarPDF
