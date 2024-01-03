import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Register = () => {
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()
  document.title = 'REGISTER'


  const modal = () => {
    const w = window.open('', '', 'width=100,height=100')
    w.document.write('Successfully Registered!')
    w.focus()
    setTimeout(() => { w.close(); }, 3000)
  }

  const register = async event => {
    event.preventDefault()
    if (password === confirmPassword) {
      const user = {
        name, mobile, email, password, confirmPassword
      }
      try {
        const result = (await axios.post('/api/users/register', user)).data
        setName('')
        setMobile('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        modal()
        navigate('/login')
      } catch (error) { console.log(error) }
    } else { alert('Passwords not matched!') }
  }

  return (
    <form onSubmit={register} className='register'>
      <h2>REGISTER</h2>
      <label htmlFor="name">Name: </label>
      <input
        type="text"
        placeholder="name"
        required={true}
        id="name"
        value={name}
        onChange={event => setName(event.target.value)}
      /><br />
      <label htmlFor="mobile">Mobile: </label>
      <input
        type="text"
        placeholder="mobile"
        required={true}
        id="mobile"
        value={mobile}
        onChange={event => setMobile(event.target.value)}
      /><br />
      <label htmlFor='email'>Email:</label>
      <input
        type="email"
        placeholder="email"
        required={true}
        id='email'
        value={email}
        onChange={event => setEmail(event.target.value)}
      /><br />
      <label htmlFor="password">Password: </label>
      <input
        type="password"
        placeholder="password"
        required={true}
        id="password"
        value={password}
        onChange={event => setPassword(event.target.value)}
      /><br />
      <label htmlFor="confirmPassword">Confirm Password: </label>
      <input
        type="password"
        placeholder="confirm password"
        required={true}
        id="confirmPassword"
        value={confirmPassword}
        onChange={event => setConfirmPassword(event.target.value)}
      /><br />
      <button type="reset" value='reset'>RESET</button>
      <button type="submit" value='submit'>REGISTER</button>
      <span>Alredy registered? <a href='/login'>LOGIN</a></span>
    </form>
  )
}
