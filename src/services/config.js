const API_URL = 'https://private-2034fc-petslove.apiary-mock.com'
// const API_MONGO_LOCAL = 'http://localhost:3000'
// const SERVER = 'http://localhost:3000'
const SERVER = process.env.REACT_APP_BASE_KEY_SERVER
const HOST = process.env.REACT_APP_BASE_KEY_HOST
// const HOST = 'https://pets-love.app'
// const HOST = 'http://localhost:3001'

export {
  HOST,
  API_URL,
  // API_MONGO_LOCAL,
  SERVER,
}
