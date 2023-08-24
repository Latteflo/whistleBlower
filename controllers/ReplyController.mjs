import {
  createReply as createReplyModel,
  getRepliesByReportId,
  updateReply as updateReplyModel,
  deleteReply as deleteReplyModel,
} from '../models/ReplyModel.mjs';  

export const createReplyController = async (req, res) => {
  try {
    const reply = await createReplyModel(req.body.reportId, req.body.userId, req.body.text);
    res.status(201).json({ message: 'Reply created successfully', data: reply });
  } catch (error) {
    res.status(400).json({ message: 'Error creating reply', error });
  }
};

export const getReplyByIdController = async (req, res) => {
  try {
    const replies = await getRepliesByReportId(req.params.id);
    if (replies.length === 0) {
      return res.status(404).json({ message: 'Replies not found' });
    }
    res.status(200).json({ data: replies });
  } catch (error) {
    res.status(400).json({ message: 'Error retrieving replies', error });
  }
};

export const updateReplyController = async (req, res) => {
  try {
    const reply = await updateReplyModel(req.params.id, req.body.text);
    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' });
    }
    res.status(200).json({ message: 'Reply updated successfully', data: reply });
  } catch (error) {
    res.status(400).json({ message: 'Error updating reply', error });
  }
};

export const deleteReplyController = async (req, res) => {
  try {
    const reply = await deleteReplyModel(req.params.id);
    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' });
    }
    res.status(200).json({ message: 'Reply deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting reply', error });
  }
};
