import fs from 'node:fs/promises'
import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5174
const base = process.env.BASE || '/'

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : ''
const ssrManifest = isProduction
  ? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')
  : undefined

// Create http server
const app = express()

// Add Vite or respective production middlewares
let vite
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv('./dist/client', { extensions: [] }))
}

// Serve HTML
app.use('*', async (req, res) => {
  try {
    // console.log(req.originalUrl)
    const url = req.originalUrl.replace(base, '')
    const domain = req.headers.host ? 'https://' + req.headers.host : req.headers.referer 
    let template
    let render
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.js')).render
    } else {
      template = templateHtml
      const manifest = JSON.parse(await fs.readFile('./dist/server/.vite/manifest.json'), 'utf-8');
      const entryServerPath = manifest['src/entry-server.js'].file;
      render = (await import(`./dist/server/${entryServerPath}`)).render
      
    }
 

    const { stream, headTags } = await render(url, ssrManifest, domain)

    template = template.replace('<!--headTags-->', headTags)
    template = template.replace('<!--app-html-->', stream)
    res.status(200).set({ 'Content-Type': 'text/html' })

    res.write(template)
    res.end()
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
