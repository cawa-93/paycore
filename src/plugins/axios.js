import axios from 'axios'

export default axios.create({
  baseURL: 'https://sandbox.sdk.finance/api/v1'
})
