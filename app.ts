import { serve } from 'https://deno.land/std@0.167.0/http/mod.ts'
import { Context, Hono } from 'https://deno.land/x/hono@v2.6.1/mod.ts'
import { cors } from 'https://deno.land/x/hono@v2.6.1/middleware/cors/index.ts'
import { serveStatic } from 'https://deno.land/x/hono@v2.5.4/middleware.ts'


import Message from './resp.ts'

const app = new Hono()

app.use(cors())

app.get('/page', serveStatic({ path: './public/index.html' }))

app.get('/api', (c: Context) => c.text('Hola Hono 🔥'))

app.get('/', (c: Context) => {
  const resp: Message = {
    received: true,
    message: 'Hola mundo'
  }
  return c.json(resp)
})

app.get('/entry/:id', (c: Context) => {
  const id = Number(c.req.param('id'))
  if (isNaN(id)) return c.text('invalid id')

  return c.json({
    id,
    msg: 'Esta es una entrada'
  })
})



serve(app.fetch)