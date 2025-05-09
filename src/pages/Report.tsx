
import React from 'react';
import Layout from '@/components/Layout';
import IncidentReport from '@/components/IncidentReport';

const Report = () => {
  return (
    <Layout title="Report an Incident">
      <IncidentReport />
      
      <div className="safety-card mt-4">
        <h2 className="mb-4">Reporting Guidelines</h2>
        <div className="space-y-3 text-sm">
          <p>
            <strong>What to report:</strong> Any safety concerns, suspicious activity, or crimes you've witnessed on CTA property.
          </p>
          <p>
            <strong>Be specific:</strong> Include exact location, time, and description of individuals involved.
          </p>
          <p>
            <strong>Emergency situations:</strong> For immediate threats or emergencies, call 911 directly.
          </p>
          <p>
            <strong>Follow up:</strong> You can check the status of your reports in the app.
          </p>
        </div>
      </div>
      
      <div className="rounded-lg bg-blue-50 p-4 mt-4 border border-blue-100">
        <h3 className="font-medium text-transit-blue mb-2">CTA Safety Resources</h3>
        <ul className="text-sm space-y-2">
          <li>CTA Security Hotline: <strong>1-888-YOUR-CTA</strong></li>
          <li>Text emergencies to <strong>CTA-SAFE (282-7233)</strong></li>
          <li>Safety officers available at major stations</li>
        </ul>
      </div>
    </Layout>
  );
};

export default Report;
