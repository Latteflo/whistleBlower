const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
require("./db")
const userRoutes = require("./routes/userRoutes")

//Middleware
app.use(express.json())

//Routes
app.use("/users", userRoutes)

app.get("/", (req, res) => {
  res.send("Hello, world!")
})

app.listen(PORT, () => {
  console.log(`We are aliiivee on port${PORT}`)
})
