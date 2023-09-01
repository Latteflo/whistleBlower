import { createAuditLogModel, getAuditLogsByReportIdModel} from '../models/AuditLogModel.mjs';

export const createAuditLog = async (req, res) => {
    try {
        const { userId, reportId, action } = req.body;
        const auditLog = await createAuditLogModel(userId, reportId, action);
        res.status(201).json({ message: 'Audit log created successfully', data: auditLog });
    } catch (error) {
        res.status(400).json({ message: 'Error creating audit log', error });
    }
};

export const getAuditLogs = async (req, res) => {
    try {
        const auditLogs = await getAuditLogsByReportIdModel(req.params.id);
        if (auditLogs.length === 0) {
            return res.status(404).json({ message: 'Audit logs not found for this report' });
        }
        res.status(200).json({ data: auditLogs });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving audit logs', error });
    }
};
