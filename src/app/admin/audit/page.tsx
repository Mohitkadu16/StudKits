'use client';

import { Suspense, useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { AdminGuard } from '@/components/admin/admin-guard';
import { Activity, ShieldAlert, CheckCircle2, UserX, ServerCrash } from 'lucide-react';
import type { AuditLog } from '@/lib/audit-logger';

function getActionIcon(action: string) {
  switch (action) {
    case 'PROJECT_CREATED':
    case 'REQUEST_APPROVED':
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case 'PROJECT_UPDATED':
      return <Activity className="h-5 w-5 text-blue-500" />;
    case 'REQUEST_DECLINED':
      return <UserX className="h-5 w-5 text-red-500" />;
    case 'SYSTEM_SEED':
      return <ServerCrash className="h-5 w-5 text-yellow-500" />;
    default:
      return <ShieldAlert className="h-5 w-5 text-gray-500" />;
  }
}

function formatDate(isoString: string) {
  const date = new Date(isoString);
  return date.toLocaleString();
}

function AuditLogFeed() {
  const [logs, setLogs] = useState<(AuditLog & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only subscribe if authenticated as admin (handled by AdminGuard)
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'auditLogs'),
      orderBy('timestamp', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newLogs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as (AuditLog & { id: string })[];
      setLogs(newLogs);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching audit logs:", err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading audit history...</div>;
  }

  if (logs.length === 0) {
    return (
      <div className="bg-card text-card-foreground p-8 rounded-xl text-center border shadow-sm">
        <ShieldAlert className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
        <h3 className="text-lg font-medium">No Activity Found</h3>
        <p className="text-muted-foreground text-sm mt-1">Audit logs will appear here when sensitive actions are taken.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {logs.map(log => (
        <div key={log.id} className="flex items-start gap-4 p-4 border rounded-xl bg-card shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-background border rounded-full p-2 mt-1 shadow-sm">
            {getActionIcon(log.action)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-4">
              <h4 className="font-semibold text-foreground truncate">{log.action.replace(/_/g, ' ')}</h4>
              <time className="text-xs text-muted-foreground whitespace-nowrap">
                {formatDate(log.timestamp)}
              </time>
            </div>
            <p className="text-sm text-muted-foreground mt-1 break-words">{log.details}</p>
            <div className="flex items-center gap-3 mt-3 text-xs">
              <span className="inline-flex items-center px-2 py-1 rounded bg-secondary/50 font-medium text-secondary-foreground">
                Author: {log.adminEmail}
              </span>
              {log.targetId && (
                <span className="inline-flex items-center px-2 py-1 rounded border bg-transparent font-medium text-muted-foreground">
                  Target ID: {log.targetId}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AuditDashboard() {
  return (
    <AdminGuard>
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
        <div className="mb-8 border-b pb-5">
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <ShieldAlert className="h-8 w-8 text-primary" />
            Security Audit Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Real-time feed of all administrative actions and sensitive database modifications.
          </p>
        </div>
        <AuditLogFeed />
      </div>
    </AdminGuard>
  );
}
