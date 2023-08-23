const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
require("./config/db");
require('./config/jwt');
const userRoutes = require("./routes/userRoutes");
const reportRoutes = require("./routes/reportRoutes");
const replyRoutes = require("./routes/replyRoutes");
const priorityRoutes = require("./routes/priorityRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const { authMiddlewareWithRole } = require("./middleware/authMiddleware");
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swagger'); 

// Use Swagger
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(express.json());
app.use("/users", userRoutes);
app.use("/reports", reportRoutes);
app.use("/replies", replyRoutes);
app.use("/priorities", priorityRoutes);
app.use("/categories", categoryRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("Hello, world!!!");
});

// A route that only an admin can access
app.get("/admin", authMiddlewareWithRole('admin'), (req, res) => {
  res.send("Hello admin!");
});

// A route that only a client can access
app.get("/client", authMiddlewareWithRole('client'), (req, res) => {
  res.send("Hello client!");
});

app.listen(PORT, () => {
  console.log(`We are aliiivee on port ${PORT}`);
});
