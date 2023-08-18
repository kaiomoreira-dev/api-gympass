import { fastifyApp } from './app'

fastifyApp.listen(
  {
    host: '0.0.0.0',
    port: 3333,
  },
  () => {
    console.log('Server run port 3333!')
  },
)
