import { NavLink, Route, Routes, useNavigate } from "react-router-dom"
import { Home } from "../pages/Home"
import { About } from "../pages/About"
import { Products } from "../pages/Products"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
import { Contact } from "../pages/Contact"
import { Admin } from "../pages/Admin"
import { Dashboard } from "../pages/Dashboard"
import { Details } from "../pages/Details"
import { Cart } from '../pages/Cart'

export const Header = () => {
  const navigate = useNavigate() // must needed for dynamic navbar
  const user = JSON.parse(localStorage.getItem('currentUser'))
  const logout = () => localStorage.removeItem('currentUser')

  return (
    <>
      <header>
        <h1>Pocket BD</h1>
        <menu>
          <ul>
            <li><NavLink to='/' className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink></li>
            <li><NavLink to='/about' className={({ isActive }) => (isActive ? "active" : "")}>About</NavLink></li>
            <li><NavLink to='/products' className={({ isActive }) => (isActive ? "active" : "")}>Products</NavLink></li>
            <li><NavLink to='/contact' className={({ isActive }) => (isActive ? "active" : "")}>Contact</NavLink></li>
            {!user ?
              (
                <>
                  <li><NavLink to='/login' className={({ isActive }) => (isActive ? "active" : "")}>Login</NavLink></li>
                  <li><NavLink to='/register' className={({ isActive }) => (isActive ? "active" : "")}>Register</NavLink></li>
                </>
              ) : (
                <>
                  <li><NavLink to='/cart'>Cart</NavLink></li>
                  <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
                  <li><NavLink to='/login' onClick={logout} >Logout</NavLink></li>
                </>
              )
            }
          </ul>
        </menu>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/detail/:productid" element={<Details />} />
      </Routes>
    </>
  )
}
