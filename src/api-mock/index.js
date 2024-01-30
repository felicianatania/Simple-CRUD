import { createServer, Response } from 'miragejs'

createServer({
  routes() {
    this.get('/example-api-endpoint', () => {
      // new Response(code, header, data)
      return new Response(200, {},  {
        code: 200,
        status: 'OK',
        data: 'hello world'
      })
    })
  }
})