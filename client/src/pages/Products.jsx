import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

export const Products = () => {
  const [products, setProducts] = useState([])
  const [duplicate, setDuplicate] = useState([])
  const [count, setCount] = useState(0)
  document.title = 'PRODUCTS'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const val = 0
        const val2 = 0
        const data = (await axios.get(`/api/products/getallproducts?limit=${count}&skip=${val2}`)).data
        setProducts(data)
        setDuplicate(data)
      } catch (error) { console.log(error) }
    }
    fetchData()
  }, [])

  return (
    <>
      <div className="info">
        <h4>{products.length} products are available</h4>
      </div>
      <div className="products">
        {products.map(product => { return <Product product={product} key={product._id} /> })}
      </div>
    </>
  )
}

const Product = ({ product }) => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('currentUser'))

  const privateRoute = () => {
    if (user) navigate(`/detail/${product._id}`)
    else {
      alert('login first!')
      navigate('/login')
    }
  }

  return (
    <div className="product">
      <img src={product.img} alt={product.name} />
      <h3>{product.name}</h3>
      {/* <p>{product.category}</p> */}
      <h5>BDT {product.price} per KG</h5>
      <button className='btn' onClick={privateRoute}>Details</button>
    </div>
  )
}