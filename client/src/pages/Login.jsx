import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    document.title = 'LOGIN'

    const modal = () => {
        const w = window.open('', '', 'width=100,height=100')
        w.document.write('Successfully Logged in!')
        w.focus()
        setTimeout(() => { w.close(); }, 3000)
    }

    const login = async event => {
        event.preventDefault()
        const user = { email, password }
        try {
            const result = (await axios.post('/api/users/login', user)).data
            localStorage.setItem('currentUser', JSON.stringify(result))
            modal()
            navigate('/products')
        } catch (error) { console.log(error) }
    }

    const google = async () => {
        window.open('http://localhost:5000/auth/google/callback', '_self')
        try {
            const result = (await axios.get('/api/users/login')).data
            localStorage.setItem('currentUser', JSON.stringify(result))
            modal()
        } catch (error) { console.log(error) }
    }

    const facebook = async () => {
        window.open('http://localhost:5000/auth/facebook/callback', '_self')
        try {
            const result = (await axios.get('/api/users/login')).data
            localStorage.setItem('currentUser', JSON.stringify(result))
            modal()
        } catch (error) { console.log(error) }
    }

    return (
        <form onSubmit={login} className='login'>
            <h2>LOGIN</h2>
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
            <button type="reset" value='reset'>RESET</button>
            <button type="submit" value='submit'>LOGIN</button>
            <span>Haven't registered? <a href='/register'>REGISTER</a></span>
            <p>
                <span>or login with &nbsp; </span>
                <button onClick={google}>Google</button>
                <button onClick={facebook}>Facebook</button>
            </p>
        </form>
    )
}
