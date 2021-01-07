import { createProxyMiddleware } from "http-proxy-middleware";

export default createProxyMiddleware({
  target: "https://shrouded-thicket-03801.herokuapp.com/",
  changeOrigin: true,
  pathRewrite: {"^api/": ""}
})
