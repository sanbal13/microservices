const express = require("express");
const {createProxyMiddleware} = require("http-proxy-middleware");

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.json({message: "Entered api-gateway"});
});
app.use("/auth", createProxyMiddleware({target: "http://auth-service:4000", changeOrigin: true}));
app.use("/products", createProxyMiddleware({target: "http://product-service:5000", changeOrigin: true}));
app.use("/orders", createProxyMiddleware({target: "http://order-service:6000", changeOrigin: true}));
app.use("/notifications", createProxyMiddleware({target: "http://notification-service:7000", changeOrigin: true}));

app.listen(8000, () => console.log("API Gateway runningon port 8000"));

