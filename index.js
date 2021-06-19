const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3001

let products = [
  {
      "id" : 1,
      "price": 50,
      "image_url": "https://ecubi-live-images.s3.us-east-2.amazonaws.com/604666743deba80011bc7397/variants/604e180c512f9d0012795cc1.jpeg",
      "published": true,
      "stock": 0,
      "name": "Te de Menta Francesa ",
      "description": "Te de hoja entera. Contenido 20gr. Ayuda a limpiar el hígado. Disminuye los dolores de cabeza, problemas de migraña, ayuda a la concentración durante las sesiones de estudio",
  },
  {
    "id" : 2,
      "price": 20,
      "image_url": "https://ecubi-live-images.s3.us-east-2.amazonaws.com/604666743deba80011bc7397/variants/6075d3bb98adee001214bf18.jpg",
      "stock": 0,
      "published": true,
      "name": "Tamal de chocolate",
      "description": "Tamal vegano orgánico. Elaborado con maíz azul, cacao,  azúcar mascabado y aceite de cártamo.",
  },
  {
    "id" : 3,
      "price": 60,
      "image_url": "https://ecubi-live-images.s3.us-east-2.amazonaws.com/604666743deba80011bc7397/variants/6075dd1698adee001214bfff.jpg",
      "stock": 0,
      "published": true,
      "name": "Galletas de pinole",
      "description": "Caja con 10 piezas. Elaboradas con maíz azul, azúcar mascabado, mantequilla y  huevo de animales de libre pastoreo",
  },
  {
    "id" : 4,
      "price": 80,
      "image_url": "https://ecubi-live-images.s3.us-east-2.amazonaws.com/60466d4f3deba80011bc739d/variants/60b6d88133f16f001231fe3f.jpeg",
      "stock": 0,
      "published": true,
      "company_id": "60466d4f3deba80011bc739d",
      "name": "Té de Tochel (Satureja macrostema)",
      "description": "Contiene 20 sobres de 1g de planta molida.\nFavorece los procesos digestivos\nÚtil contra enfermedades gastrointestinales\nAyuda a la reducción de peso\nAntioxidante",
  },
  {
    "id" : 5,
      "price": 30,
      "image_url": "https://ecubi-live-images.s3.us-east-2.amazonaws.com/6046d8393deba80011bc73b5/variants/6075ca3f98adee001214bdf9.jpeg",
      "stock": 0,
      "published": true,
      "name": "Huevo de rancho (6 piezas)",
      "description": "Huevo de rancho, de gallina de libre pastoreo, sin hormonas ni antibióticos.",
  },
  {
    "id" : 6,
      "price": 80,
      "image_url": "https://ecubi-live-images.s3.us-east-2.amazonaws.com/6046d8393deba80011bc73b5/variants/6087706533f16f001231e989.jpeg",
      "stock": 0,
      "published": true,
      "name": "Pipián (frasco 300gr)",
      "description": "Pipián, elaborado con pepita de calabaza, ajonjolí y una mezcla de chiles secos. ",
  },
  {
    "id" : 7,
      "price": 120,
      "image_url": "https://ecubi-live-images.s3.us-east-2.amazonaws.com/6046d8393deba80011bc73b5/variants/609b4f2233f16f001231f334.jpeg",
      "stock": 0,
      "published": true,
      "name": "Tamales 🫔 de ayocote con mole (5 piezas) ",
      "description": "Tamales festivos poblanos, elaborados con masa y frijol ayocote, acompañados de mole. 5 tamiles y medio litro de mole artesanal"
  }
]

app.use('/', express.static(__dirname + '/public'))

app.get('/products', (req, res)=>{
  res.json(products)
})

app.get('/products/:id', (req, res)=>{
  const {id} = req.params
  const product = products.find(prod => prod.id === Number(id))
  if(product){
    res.json(product)
  }else {
    res.status(404).json({
      error: 'Product not found'
    })
  }
})

app.delete('/products/:id', (req, res)=>{
  const {id} = req.params
  
  if( !products.some((prod)=>prod.id === Number(id)) ){
    return res.status(400).json({
      error: 'Product not found'
    })
  }
  products = products.filter(prod => prod.id !== Number(id))
  res.status(204).json({menssage: 'Product deleted'}).end()
})

app.post('/products', (req, res)=>{
  const product = req.body
  
  if(!product || !product.name || !product.price || !product.description){
    return res.status(400).json({
      error: 'Product is missing'
    })
  }

  const ids = products.map(prod=>prod.id)
  const maxId = Math.max(...ids)

  const newProduct = {
    ...product,
    id: maxId + 1
  }

  products = [...products, newProduct]

  res.status(201).json(newProduct)
})

app.use((_req, res)=>{
  res.status(404).json({
    error: 'Not found'
  })
})

app.listen(PORT, ()=>{
  console.log(' ------------------------------------------------ ');
  console.log(`|  💻 Server runing on port ${PORT}.                |\n|  You can watch here: http://localhost:${PORT}/    |`)
})

// Run local server
let os
if (process.env.NODE_ENV === "development") {
  os = require( 'os' )
  const networkInterfaces = os.networkInterfaces( )
  const localIpNetwork = networkInterfaces.en0[1].address
  app.listen(PORT, localIpNetwork, ()=>{
    console.log('|                                                |');
    console.log(`|  📡 Server runing on local network.            |\n|  You can watch here: http://${localIpNetwork}:${PORT}/  |`)
    console.log(' ------------------------------------------------ ');
  })
}

