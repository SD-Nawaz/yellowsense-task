import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {ThreeDots} from 'react-loader-spinner'
import './index.css';

const JobDetail = () => {
  const { id } = useParams();  // Get the job ID from the route parameter
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate();
  const back=()=>{
    navigate('/jobs')
  }
  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await fetch(`https://testapi.getlokalapp.com/common/jobs?page=1`); 
        const data = await response.json();

        console.log('Fetched Job Detail:', data); 

        if (data.results && Array.isArray(data.results)) {
          const foundJob = data.results.find(job => job.id === parseInt(id, 10)); 

          if (foundJob) {
            setJob(foundJob);
          } else {
            throw new Error('Job not found');
          }
        } else {
          throw new Error('Job data is not in the expected format');
        }
      } catch (error) {
        console.error('Error fetching job detail:', error);
        setError('Error fetching job details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobDetail();
  }, [id]);

  if (isLoading) {
    return <div className="products-loader-container">
    <ThreeDots type="ThreeDots" color="#0b69ff" height="50" width="50" />
  </div>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="job-detail-container">
      <div className='details-container'>
      <h1 className='job-title'>{job?.title || 'Job title not available'}</h1>
      <p className='jobDetails'><strong className='jobDetails'>Location:</strong> {job?.primary_details?.Place || 'N/A'}</p>
      <p className='jobDetails'><strong className='jobDetails'>Salary:</strong> {job?.primary_details?.Salary || 'N/A'}</p>
      <p className='jobDetails'><strong className='jobDetails'>Job_Type:</strong> {job?.primary_details?.Job_Type || 'N/A'}</p>
      <p className='jobDetails'><strong className='jobDetails'>Experience:</strong> {job?.primary_details?.Experience || 'N/A'}</p>
      <p className='jobDetails'><strong className='jobDetails'>Fees_Charged:</strong> {job?.primary_details?.Fees_Charged || 'N/A'}</p>
      <p className='jobDetails'><strong className='jobDetails'>Qualification:</strong> {job?.primary_details?.Qualification || 'N/A'}</p>
      <p className='jobDetails'><strong className='jobDetails'>Phone:</strong> {job?.whatsapp_no || 'N/A'}</p>
      <p className='jobDetails'><strong className='jobDetails'>Company:</strong> {job?.company_name || 'N/A'}</p>
      <div className='back-button-container'>
        <button className='back-button' onClick={back}>Back</button>
      </div>
      </div>
    </div>
  );
};

export default JobDetail;