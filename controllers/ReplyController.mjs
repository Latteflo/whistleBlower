import {
  createReplyModel,
  getRepliesByReportIdModel,
  updateReplyModel,
  deleteReplyModel,
} from '../models/ReplyModel.mjs';

// Function to create a reply
export const createReply = async (req, res) => {
  try {
    const { reportId, userId, text } = req.body;
    if (!reportId || !userId || !text) {
      return res.status(400).json({success: false,  message: 'Missing required fields' });
    }
    const reply = await createReplyModel(reportId, userId, text);
    res.status(201).json({ success: true, message: 'Reply created successfully', data: reply });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating reply', error });
  }
};

// Function to get replies by report ID
export const getReplyById = async (req, res) => {
  try {
    const replies = await getRepliesByReportIdModel(req.params.id);
    if (!replies.length) {
      return res.status(404).json({success: false,  message: 'Replies not found' });
    }
    res.status(200).json({ success: true, data: replies });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving replies', error });
  }
};

// Function to update a reply
export const updateReply = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, message: 'Text is required' });
    }
    const reply = await updateReplyModel(req.params.id, text);
    if (!reply) {
      return res.status(404).json({success: false,  message: 'Reply not found' });
    }
    res.status(200).json({ success: true, message: 'Reply updated successfully', data: reply });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating reply', error });
  }
};

// Function to delete a reply
export const deleteReply = async (req, res) => {
  try {
    const reply = await deleteReplyModel(req.params.id);
    if (!reply) {
      return res.status(404).json({success: false,  message: 'Reply not found' });
    }
    res.status(200).json({ success: true, message: 'Reply deleted successfully' });
  } catch (error) {
    res.status(500).json({success: false,  message: 'Error deleting reply', error });
  }
};
