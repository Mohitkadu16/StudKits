import { admin } from '@/lib/firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

export type AuditLogAction = 'PROJECT_CREATED' | 'PROJECT_UPDATED' | 'REQUEST_APPROVED' | 'REQUEST_DECLINED' | 'SYSTEM_SEED';

export interface AuditLog {
  action: AuditLogAction;
  adminEmail: string;
  details: string;
  targetId?: string;
  timestamp: string;
}

export async function logAdminAction(action: AuditLogAction, adminEmail: string, details: string, targetId?: string) {
  try {
    const db = getFirestore(admin);
    const logEntry: AuditLog = {
      action,
      adminEmail,
      details,
      targetId,
      timestamp: new Date().toISOString()
    };
    
    await db.collection('auditLogs').add(logEntry);
  } catch (error) {
    console.error('Failed to write audit log:', error);
  }
}
