import React, { Component } from 'react';
import { Navigate } from 'react-router-dom'; 
import './index.css';
import {ThreeDots} from 'react-loader-spinner'

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      page: 1,
      isLoading: false,
      error: null,
      hasMore: true,
      jobIds: new Set(), 
      redirectToJob: null, 
      redirectToBookmarks: false, 
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.fetchJobs();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.fetchJobs();
    }
    if (prevState.redirectToJob !== this.state.redirectToJob && this.state.redirectToJob) {
      this.setState({ redirectToJob: null });
    }
    if (prevState.redirectToBookmarks !== this.state.redirectToBookmarks && this.state.redirectToBookmarks) {
      this.setState({ redirectToBookmarks: false });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  fetchJobs = async () => {
    const { page, isLoading, hasMore, jobIds } = this.state;

    if (isLoading || !hasMore) return;

    this.setState({ isLoading: true });

    try {
      const response = await fetch(`https://testapi.getlokalapp.com/common/jobs?page=${page}`);
      const data = await response.json();

      if (Array.isArray(data.results)) {
        const newJobs = data.results.filter((job) => {
          if (jobIds.has(job.id)) {
            return false; 
          }
          jobIds.add(job.id);
          return true;
        });

        this.setState((prevState) => ({
          jobs: [...prevState.jobs, ...newJobs],
          hasMore: page < 2, 
        }));
      } else {
        throw new Error('Jobs data is not in the expected format');
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      this.setState({ error: 'Error fetching job data' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 5 &&
      !this.state.isLoading &&
      this.state.hasMore
    ) {
      this.setState((prevState) => ({ page: prevState.page + 1 }));
    }
  }

  handleJobClick = (id) => {
    this.setState({ redirectToJob: id });
  };

  bookmark = () => {
    this.setState({ redirectToBookmarks: true });
  };

  handleBookmarkClick = (job, e) => {
    e.stopPropagation();
    const bookmarkedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
    const isBookmarked = bookmarkedJobs.some((b) => b.id === job.id);

    if (isBookmarked) {
      alert('Job has bookmarked!');
      return;
    }

    bookmarkedJobs.push(job);
    localStorage.setItem('bookmarkedJobs', JSON.stringify(bookmarkedJobs));

    alert('Job bookmarked!');
  };

  render() {
    const { jobs, isLoading, error, hasMore, redirectToJob, redirectToBookmarks } = this.state;

    if (redirectToJob) {
      return <Navigate to={`/job/${redirectToJob}`} />;
    }

    if (redirectToBookmarks) {
      return <Navigate to="/bookmark" />;
    }

    return (
      <div className="jobs-container">
        <button className='bookmark-button btn' onClick={this.bookmark}>Bookmarks Jobs</button>
        <h1 className='main-heading-jobs'>Find Your Interested Jobs</h1>
        {jobs.length > 0 ? (
          jobs
            .filter(
              (job) =>
                job.title && job.primary_details?.Place && job.primary_details?.Salary
            ).map((job, index) => (
              <div
                key={`${job.id}-${index}`}
                className="job-card"
                onClick={() => this.handleJobClick(job.id)}
              >
                {job.title && <h2 className='job-title'>{job.title}</h2>}
                {job.primary_details?.Place && (
                  <p className='jobDetails'>
                    <strong className='jobDetails'>Location:</strong> {job.primary_details.Place}
                  </p>
                )}
                {job.primary_details?.Salary && (
                  <p className='jobDetails'>
                    <strong className='jobDetails'>Salary:</strong> {job.primary_details.Salary}
                  </p>
                )}
                {job.whatsapp_no && (
                  <p className='jobDetails'>
                    <strong className='jobDetails'>Phone:</strong> {job.whatsapp_no}
                  </p>
                )}
                {job.company_name && (
                  <p className='jobDetails'>
                    <strong className='jobDetails'>Company:</strong> {job.company_name}
                  </p>
                )}
                <div className='book-mark-container'>
                <button className='bookmark-button' onClick={(e) => this.handleBookmarkClick(job, e)}>
                  Bookmark
                </button>
                </div>
              </div>
            ))
        ) : (
          <p>No jobs available</p>
        )}

        {isLoading && <div className="products-loader-container">
            <ThreeDots type="ThreeDots" color="#0b69ff" height="50" width="50" />
        </div>}
        {error && <p>{error}</p>}
        {!hasMore && !isLoading && <p className='no-more-jobs'>No more jobs to load.</p>}
      </div>
    );
  }
}

export default Jobs;