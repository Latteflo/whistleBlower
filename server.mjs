import express from "express";
import "./config/db.mjs";
import "./config/jwt.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import reportRoutes from "./routes/reportRoutes.mjs";
import replyRoutes from "./routes/replyRoutes.mjs";
import searchRoutes from "./routes/searchRoutes.mjs";
import priorityRoutes from "./routes/priorityRoutes.mjs";
import categoryRoutes from "./routes/categoryRoutes.mjs";
import auditRoutes from "./routes/auditLogRoutes.mjs";
import { authMiddlewareWithRole } from "./middleware/authMiddleware.mjs";
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './config/swagger.mjs'; 

const app = express();
const PORT = process.env.PORT || 3000;

// Use Swagger
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(express.json());
app.use("/users", userRoutes);
app.use("/reports", reportRoutes);
app.use("/replies", replyRoutes);
app.use("/search", searchRoutes);
app.use("/priorities", priorityRoutes);
app.use("/categories", categoryRoutes);
app.use("/audits", auditRoutes);


// Routes
app.get("/", (req, res) => {
  res.send("Hello, world!!!");
});

// A route that only an admin can access
app.get("/admin", authMiddlewareWithRole('admin'), (req, res) => {
  res.send("Hello admin!");
});

// A route that only a client can access
app.get("/users", authMiddlewareWithRole('client'), (req, res) => {
  res.send("Hello client!");
});

app.listen(PORT, () => {
  console.log(`We are aliiivee on port ${PORT}`);
});
