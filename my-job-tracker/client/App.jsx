import React, { useState, useEffect } from 'react';
import Auth from './components/Auth.jsx';
import JobForm from './components/jobForm.jsx';
import JobTable from './components/jobTable.jsx';
import { getJobs } from './jobs';
import './style.css';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All'); 

  const fetchJobs = async () => {
    if (!currentUser) return;
    const data = await getJobs(currentUser.id);
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, [currentUser]);

  const filteredJobs = filterStatus === 'All' 
    ? jobs 
    : jobs.filter(job => job.status === filterStatus);

  if (!currentUser) return <Auth onAuthSuccess={setCurrentUser} />;

  return (
    /* Dashboard */
    <div id="dashboard">
      <h1>Welcome, {currentUser.fname || currentUser.username}!</h1>
      <button onClick={() => setCurrentUser(null)} className="btn-danger">Logout</button>
      
      <JobForm userId={currentUser.id} onJobAdded={fetchJobs} />
      
      <hr />
      
      <div className="list-header">
        <h3>Available Jobs</h3>
        <div className="filter-container">
          <label>Filter by Status: </label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">All</option>
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Rejected">Rejected</option>
            <option value="Offer">Offer</option>
          </select>
        </div>
      </div>

      
      <JobTable jobs={filteredJobs} onUpdate={fetchJobs} />
    </div>
  );
}