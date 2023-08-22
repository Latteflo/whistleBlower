const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
require("./config/db")
require('./config/jwt');
const userRoutes = require("./routes/userRoutes")
const { authMiddlewareWithRole } = require("./middleware/authMiddleware")

//Middleware
app.use(express.json())

//Routes
app.get("/", (req, res) => {
  res.send("Hello, world!!!")
})

app.use("/users", userRoutes)

// A route that only an admin can access
app.get("/admin", authMiddlewareWithRole('admin'), (req, res) => {
  res.send("Hello admin!")
})

// A route that only a client can access
app.get("/client",authMiddlewareWithRole('client'), (req, res) => {
  res.send("Hello client!")
})


app.listen(PORT, () => {
  console.log(`We are aliiivee on port ${PORT}`)
})
