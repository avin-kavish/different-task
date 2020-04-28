import Axios from 'axios'

/*
 * Make all :Different api calls through this instance.
 * Allows for common authentication patterns
 */
export default Axios.create({
  baseURL: `${process.env.REST_API_ENDPOINT}`,
})
