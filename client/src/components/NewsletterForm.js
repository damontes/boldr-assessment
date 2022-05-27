import { useState } from 'react'
import { subscribeNewsLetter } from '../services/subscribe'
import { validateEmail } from './utils'

export default function NewssLetterForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  const hanldeOnSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const isValid = validateEmail(email)
    if (!isValid) {
      setError('You have entered an invalid email address!')
      setLoading(false)
      return
    }
    const response = await subscribeNewsLetter(email)
    setResponse(response)
    setLoading(false)
  }

  const handleOnChange = (e) => {
    if (error) setError('')
    setEmail(e.target.value)
    setResponse(null)
  }

  return (
    <form className="form" onSubmit={hanldeOnSubmit}>
      <div className="input-container">
        <input
          className={error ? 'error' : ''}
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleOnChange}
        />
        {error && <span className="error">{error}</span>}
      </div>
      <button disabled={loading}>{loading ? 'Loading...' : 'Subcribe'}</button>
      {response && (
        <span
          className={`response-message${
            response.success ? ' success' : ' not-success'
          }`}
        >
          {response.message}
        </span>
      )}
    </form>
  )
}
