import { useAuth } from 'contexts/Auth'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { loginAPI } from 'services/api'

export const ERROR_MESSAGES = {
  'Cannot find user': 'کاربری با این ایمیل یافت نشد!',
  'Incorrect password': 'گذرواژه اشتباه می‌باشد!',
}

const LoginPage = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleChangeInput = (event) => {
    console.debug({ [event.target.name]: event.target.value })
    setData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }
  const { toggleAuth, user } = useAuth()
  const history = useHistory()

  useEffect(() => {
    if (user.loggedIn) {
      history.push('/dashboard')
    }
    
  }, [user])

  const handleLogin = (event) => {
    event.preventDefault()

    loginAPI({
      email: data.email,
      password: data.password,
    })
      .then(() => {
        toggleAuth()
        history.push('/dashboard')
      })
      .catch((err) => setError(() => err.response.data))
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-4">
          {error && (
            <div className="alert alert-danger" role="alert">
              {ERROR_MESSAGES[error] ?? error}
            </div>
          )}
          <div className="card">
            <form className="card-body" onSubmit={handleLogin}>
              <div className='mb-3'>
              <label htmlFor="email" className="form-label">ایمیل</label>
               <input 
               onChange={handleChangeInput}
               type="email" 
               id="email"
               className="form-control"
               dir="ltr"
               name="email"
               />
              </div>
              <div className='mb-3'>
              <label htmlFor="password" className="form-label">گذرواژه</label>
               <input 
               onChange={handleChangeInput}
               type="password" 
               id="password"
               className="form-control"
               dir="ltr"
               name="password"
               />
              </div>
              
              <button  type="submit" className="btn btn-primary" disabled={!data.email || !data.password}>
                ورود
                </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
