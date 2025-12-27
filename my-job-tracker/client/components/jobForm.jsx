import React, { useState } from 'react';
import { postJob } from '../jobs';

export default function JobForm({ userId, onJobAdded }) {
  const [newJob, setNewJob] = useState({ job_title: '', company_name: '', status: 'Applied', notes: '' });

  const handleSubmit = async () => {
    try {
      await postJob({ ...newJob, employee_id: userId });
      alert("Job posted!");
      setNewJob({ job_title: '', company_name: '', status: 'Applied', notes: '' });
      onJobAdded();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div id="post-job-container" className="job-card">
      <h3>Post a New Job</h3>
      <input type="text" placeholder="Job Title" value={newJob.job_title} onChange={e => setNewJob({...newJob, job_title: e.target.value})} />
      <input type="text" placeholder="Company Name" value={newJob.company_name} onChange={e => setNewJob({...newJob, company_name: e.target.value})} />
      <select value={newJob.status} onChange={e => setNewJob({...newJob, status: e.target.value})}>
        <option value="Applied">Applied</option>
        <option value="Interviewing">Interviewing</option>
        <option value="Rejected">Rejected</option>
        <option value="Offer">Offer</option>
      </select>
      <input type="text" placeholder="Notes" value={newJob.notes} onChange={e => setNewJob({...newJob, notes: e.target.value})} />
      <button onClick={handleSubmit} style={{backgroundColor: '#28a745'}}>Post Job</button>
    </div>
  );
}