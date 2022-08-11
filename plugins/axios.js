export default function ({ $axios }, inject) {
  const api = $axios.create();

  api.onRequest(() => {
    const token = localStorage.getItem('crstore-token') || '';
    api.setHeader('Authorization', `Bearer ${token}`);
  });

  api.onResponse(response => response.data);
  api.setBaseURL('http://localhost:3333')

  inject('api', api)
}