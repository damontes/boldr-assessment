const BASE_URL = 'http://localhost:3001'

export const subscribeNewsLetter = (email) => {
  return fetch(`${BASE_URL}/subscribeNewsletter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
    .then((res) => res.json())
    .then((response) => response)
}
