import Axios from 'axios'

export default Axios.create({
  baseURL: `${process.env.REST_API_ENDPOINT}`,
})
