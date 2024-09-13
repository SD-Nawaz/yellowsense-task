import {Link} from 'react-router-dom'
import './index.css'

const Home = () => {


    return (
        <div className="home-container">
            <h1 className="heading">YellowSense Jobs</h1>
            <p className="paragraph">
                At YellowSense Jobs, we connect job seekers with their dream careers and empower companies to find the perfect talent. Whether you're a seasoned professional or just starting out, our platform offers a vast array of job listings across industries, from tech and healthcare to marketing and finance. With easy-to-use search filters, personalized job recommendations, and resources to help you prepare for the application process, we make finding your next job simple and efficient. Employers can post jobs, access a diverse pool of candidates, and streamline their hiring process with our intuitive tools.
            </p>
            <p className='paragraph'>
                Start your journey with us today—where careers meet opportunities.
            </p>
            <div className="btn-container">
                <Link to="/jobs">
                    <button type="button" className="btn job-button">
                        Apply Jobs
                    </button>
                </Link>
                
            </div>
        </div>
    )
}

export default Home