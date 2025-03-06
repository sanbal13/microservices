const express = require("express");
const {createProxyMiddleware} = require("http-proxy-middleware");

const app = express();

app.use("/auth", createProxyMiddleware({target: "http://localhost:4000", changeOrigin: true}));
app.use("/products", createProxyMiddleware({target: "http://localhost:5000", changeOrigin: true}));
app.use("/orders", createProxyMiddleware({target: "http://localhost:6000", changeOrigin: true}));
app.use("/notifications", createProxyMiddleware({target: "http://localhost:7000", changeOrigin: true}));

app.listen(8000, () => console.log("API Gateway runningon port 8000"));