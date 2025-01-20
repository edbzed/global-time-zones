import React from 'react';
import { CheckCircle2, XCircle, Clock, ArrowDownUp, Globe2, Wifi, AlertCircle } from 'lucide-react';
import type { SyncStatus } from '../types';

interface SyncStatusProps {
  status: SyncStatus;
}

const qualityColors = {
  excellent: 'text-green-500',
  good: 'text-blue-500',
  fair: 'text-yellow-500',
  poor: 'text-red-500',
};

export function SyncStatusDisplay({ status }: SyncStatusProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center gap-2 mb-4">
        <ArrowDownUp className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold">Sync Status</h2>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
          <div className="flex items-center gap-2">
            {status.connected ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
            <span className="font-medium">
              {status.connected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          
          {status.connectionQuality && (
            <div className="flex items-center gap-2">
              <Wifi className={`w-4 h-4 ${qualityColors[status.connectionQuality]}`} />
              <span className="text-sm capitalize">{status.connectionQuality}</span>
            </div>
          )}
        </div>

        {status.currentRegion && (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <div className="flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-gray-600" />
              <span>Region: {status.currentRegion.name}</span>
            </div>
            <span className="text-sm text-gray-500">
              {status.currentRegion.latency}ms
            </span>
          </div>
        )}

        {status.lastSync && (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-600" />
              <span>Last Sync</span>
            </div>
            <span className="text-sm font-mono">
              {status.lastSync.toLocaleTimeString()}
            </span>
          </div>
        )}

        {status.syncCount !== undefined && (
          <div className="text-sm text-gray-600 mt-2">
            Total syncs: {status.syncCount}
          </div>
        )}

        {status.errors && status.errors.length > 0 && (
          <div className="mt-4 p-3 bg-red-50 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-red-800">Sync Errors</span>
            </div>
            <ul className="text-sm text-red-700 list-disc list-inside">
              {status.errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}