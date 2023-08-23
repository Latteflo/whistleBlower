const {
    createReply,
    getRepliesByReportId,
    updateReply,
    deleteReply,
  } = require('../models/ReplyModel');
  
  exports.createReply = async (req, res) => {
    try {
      const reply = await createReply(req.body.reportId, req.body.userId, req.body.text);
      res.status(201).json({ message: 'Reply created successfully', data: reply });
    } catch (error) {
      res.status(400).json({ message: 'Error creating reply', error });
    }
  };
  
  exports.getReplyById = async (req, res) => {
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
  
  exports.updateReply = async (req, res) => {
    try {
      const reply = await updateReply(req.params.id, req.body.text);
      if (!reply) {
        return res.status(404).json({ message: 'Reply not found' });
      }
      res.status(200).json({ message: 'Reply updated successfully', data: reply });
    } catch (error) {
      res.status(400).json({ message: 'Error updating reply', error });
    }
  };
  
  exports.deleteReply = async (req, res) => {
    try {
      const reply = await deleteReply(req.params.id);
      if (!reply) {
        return res.status(404).json({ message: 'Reply not found' });
      }
      res.status(200).json({ message: 'Reply deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error deleting reply', error });
    }
  };
  