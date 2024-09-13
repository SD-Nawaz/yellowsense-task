import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';

const BookMark = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const jobs = () => {
    navigate('/jobs');
  };
  
  useEffect(() => {
    const fetchBookmarkedJobs = async () => {
      setIsLoading(true);

      try {
        const bookmarkedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
        setBookmarkedJobs(bookmarkedJobs);
      } catch (error) {
        console.error('Error fetching bookmarked jobs:', error);
        setError('Error fetching bookmarked jobs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookmarkedJobs();
  }, []);

  const handleRemoveBookmark = (jobId) => {
    const updatedJobs = bookmarkedJobs.filter((job) => job.id !== jobId);
    setBookmarkedJobs(updatedJobs);
    localStorage.setItem('bookmarkedJobs', JSON.stringify(updatedJobs)); 
  };

  if (isLoading) {
    return <p>Loading bookmarks...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="bookmarks-container">
      <div className='bookMark-buttons'>
        <button className="button button1" onClick={jobs}>Jobs</button>
      </div>

      
      {bookmarkedJobs.length > 0 && <h1 className="bookmark-heading">Your Favorite Jobs</h1>}

      {bookmarkedJobs.length > 0 ? (
        bookmarkedJobs.map((job) => (
          <div key={job.id} className="bookmark-card">
            <Link className="link" to={`/job/${job.id}`}>
              <h1 className="job-title">{job?.title || 'Job title not available'}</h1>
              <p className="jobDetails"><strong className="jobDetails">Location:</strong> {job?.primary_details?.Place || 'N/A'}</p>
              <p className="jobDetails"><strong className="jobDetails">Salary:</strong> {job?.primary_details?.Salary || 'N/A'}</p>
              <p className="jobDetails"><strong className="jobDetails">Job_Type:</strong> {job?.primary_details?.Job_Type || 'N/A'}</p>
              <p className="jobDetails"><strong className="jobDetails">Experience:</strong> {job?.primary_details?.Experience || 'N/A'}</p>
              <p className="jobDetails"><strong className="jobDetails">Fees_Charged:</strong> {job?.primary_details?.Fees_Charged || 'N/A'}</p>
              <p className="jobDetails"><strong className="jobDetails">Qualification:</strong> {job?.primary_details?.Qualification || 'N/A'}</p>
              <p className="jobDetails"><strong className="jobDetails">Phone:</strong> {job?.whatsapp_no || 'N/A'}</p>
              <p className="jobDetails"><strong className="jobDetails">Company:</strong> {job?.company_name || 'N/A'}</p>
            </Link>
            <button className="book-button button" onClick={() => handleRemoveBookmark(job.id)}>Remove</button>
          </div>
        ))
      ) : (
        <p className='no-data'>No Bookmark Jobs</p> 
      )}
    </div>
  );
};

export default BookMark;