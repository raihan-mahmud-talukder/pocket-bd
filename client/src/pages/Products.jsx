import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

export const Products = () => {
  const [products, setProducts] = useState([])
  const [duplicate, setDuplicate] = useState([])
  const [skip, setSkip] = useState(0)
  const [filter, setFilter] = useState('all')
  document.title = 'PRODUCTS'

  const limit = 5

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = (await axios.get(`/api/products/getallproducts?limit=${limit}&skip=${skip}`)).data
        setProducts(data)
        setDuplicate(data)
      } catch (error) { console.log(error) }
    }
    fetchData()
  }, [skip])

  const prev = () => { setSkip(skip - limit) }
  const next = () => { setSkip(skip + limit) }

  const filtered = event => {
    setFilter(event)
    if (event !== 'all') {
      const temp = duplicate.filter(product => product.category === event)
      setProducts(temp)
    }
    else { setProducts(duplicate) }
  }

  const available = duplicate.filter(room => room.availability)

  return (
    <>
      <div className="info">
        <span>Filter</span>
        <select value={filter} onChange={event => filtered(event.target.value)}>
          <option value="all">All</option>
          <option value="akh">Akh</option>
          <option value="barley">Barley</option>
          <option value="dhan">Dhan</option>
          <option value="dhap">Dhap</option>
          <option value="ghee">Ghee</option>
          <option value="golpata">Golpata</option>
          <option value="job">Job</option>
          <option value="jolpai">Jolpai</option>
          <option value="khejur">Khejur</option>
          <option value="narkel">Narkel</option>
          <option value="tal">Tal</option>
          <option value="til">Til</option>
          <option value="tishi">Tishi</option>
          <option value="tormuj">Tormuj</option>
          <option value="venna">Venna</option>
        </select>
        <span>Sort</span>
        <span>Search</span>
        <span>Show</span>
        <h4>{products.length} products are available</h4>

      </div>
      <div className="products">
        {products.map(product => { return <Product product={product} key={product._id} /> })}
      </div>
      <div>
        <button className='load' onClick={prev}>Previous</button>
        <button className='load' onClick={next}>Load More</button>
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