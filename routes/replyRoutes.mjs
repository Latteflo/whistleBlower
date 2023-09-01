import express from 'express';
import {
  createReply,
  getReplyById,
  updateReply,
  deleteReply,
} from '../controllers/ReplyController.mjs';
import { authMiddleware } from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.post("/", authMiddleware, createReply);
router.get("/:reportId", authMiddleware, getReplyById);
router.put("/:id", authMiddleware, updateReply);
router.delete("/:id", authMiddleware, deleteReply);

export default router;
