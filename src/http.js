import axs from "axios"

export const axios = axs.create({
  baseURL: process.env.BACKEND_ADR,
  timeout: 10000,
})
