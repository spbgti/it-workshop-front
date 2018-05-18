import axs from "axios"

export const axios = axs.create({
  baseURL: 'http://localhost:5001/',
  timeout: 1000,
})
