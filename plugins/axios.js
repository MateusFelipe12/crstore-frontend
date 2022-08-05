export default function ({ $axios }, inject) {
  
  const token = localStorage.getItem('crstore-token') || '';

  const api = $axios.create({
    headers: {
      common: {
        Authorization: `Bearer ${token}`
      }
    },
  })

  api.setBaseURL('http://localhost:3333')
  Response = Response.data  
  inject('api', api)
}