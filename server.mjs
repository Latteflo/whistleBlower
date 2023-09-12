import express from "express"
import helmet from "helmet"
import "./config/db.mjs"
import "./config/jwt.mjs"
import userRoutes from "./routes/userRoutes.mjs"
import reportRoutes from "./routes/reportRoutes.mjs"
import replyRoutes from "./routes/replyRoutes.mjs"
import searchRoutes from "./routes/searchRoutes.mjs"
import priorityRoutes from "./routes/priorityRoutes.mjs"
import categoryRoutes from "./routes/categoryRoutes.mjs"
import auditRoutes from "./routes/auditLogRoutes.mjs"
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// CORS
app.use(cors({
  origin: 'http://localhost:3000',  
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Middleware
app.use(express.json());
app.use(helmet());

// Routes
app.use("/users", userRoutes);
app.use("/reports", reportRoutes);
app.use("/replies", replyRoutes);
app.use("/search", searchRoutes);
app.use("/priorities", priorityRoutes);
app.use("/categories", categoryRoutes);
app.use("/audits", auditRoutes);

app.get("/", (req, res) => {
  res.send("Hello, world!!!");
});

app.listen(PORT, () => {
  console.log(`We are aliiivee on port ${PORT}`);
});
