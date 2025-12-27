import { API_URL } from './api.js';

export async function postJob(jobData) {
    const response = await fetch(`${API_URL}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to post job');
    return data;
}

export async function getJobs(employeeId) {
    const res = await fetch(`${API_URL}/jobs?employeeId=${employeeId}`);
    if (!res.ok) {
        const errorInfo = await res.json();
        throw new Error(errorInfo.error || "Server error");
    }
    return await res.json();
}

// Inside jobs.js

export async function deleteJob(jobId) {
    const response = await fetch(`${API_URL}/jobs/${jobId}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error("Failed to delete job");
    return await response.json();
}

export async function updateJob(jobId, updatedData) {
    const response = await fetch(`${API_URL}/jobs/${jobId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    });
    if (!response.ok) throw new Error("Failed to update job");
    return await response.json();
}