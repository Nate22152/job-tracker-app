import React, { useState } from 'react';
import { deleteJob, updateJob } from '../jobs.js';

export default function JobTable({ jobs, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
    //Pre-fill the data 
  const startEditing = (job) => {
    setEditingId(job.id);
    setEditFormData({ ...job }); 
  };

  const handleSave = async (id) => {
    try {
      await updateJob(id, editFormData);
      setEditingId(null);
      onUpdate();
    } catch (err) {
      alert("Update failed: " + err.message);
    }
  };
  //output the table
  return (
    <table className="job-table">
      <thead>
        <tr>
          <th>Job Title</th>
          <th>Company</th>
          <th>Status</th>
          <th>Notes</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map(job => (
          <tr key={job.id}>
            {editingId === job.id ? (
              <>
                {/* Editing Mode */}
                <td><input type="text" value={editFormData.job_title} onChange={e => setEditFormData({...editFormData, job_title: e.target.value})} /></td>
                <td><input type="text" value={editFormData.company_name} onChange={e => setEditFormData({...editFormData, company_name: e.target.value})} /></td>
                <td>
                  <select value={editFormData.status} onChange={e => setEditFormData({...editFormData, status: e.target.value})}>
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Offer">Offer</option>
                  </select>
                </td>
                <td><input type="text" value={editFormData.notes} onChange={e => setEditFormData({...editFormData, notes: e.target.value})} /></td>
                <td>
                  <button className="save-btn" onClick={() => handleSave(job.id)}>Save</button>
                  <button className="cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
                </td>
              </>
            ) : (
              <>
                {/* Standard View Mode */}
                <td><strong>{job.job_title}</strong></td>
                <td>{job.company_name}</td>
                <td><span className={`status-pill ${job.status.toLowerCase()}`}>{job.status}</span></td>
                <td className="note-text">{job.notes || '-'}</td>
                <td>
                  <button className="edit-btn" onClick={() => startEditing(job)}>Edit</button>
                  <button className="delete-btn" onClick={() => {
                    if(window.confirm("Delete this job?")) deleteJob(job.id).then(onUpdate);
                  }}>Delete</button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}