
import React from 'react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Users, UserRoundCog, Building2, Bookmark, ScrollText, Send, Search, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CardFooter } from '../components/ui/card';
import JobListCard from '../components/cards/JobListCard';

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <Card className="text-center h-full hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="mx-auto bg-precisedBlue/10 text-precisedBlue p-3 rounded-full w-fit">
          {React.createElement(icon, { size: 32 })}
        </div>
        <CardTitle className="mt-4 text-xl text-precisedDarkGray">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

const FeatureCardBox = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <Card className="text-left h-full hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-1">
        <div className="me-auto bg-precisedBlue/10 text-precisedBlue p-3 rounded w-fit">
          {React.createElement(icon, { size: 32 })}
        </div>
        <CardTitle className="mt-4 text-xl text-precisedDarkGray">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

const StatItem = ({ value, label, delay }) => (
  <motion.div
    className="text-center border-r border-[#4d4d4d] last:border-none"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}

  >
    <p className="text-4xl font-bold text-precisedBlue">{value}</p>
    <p className="text-precisedDarkGray">{label}</p>
  </motion.div>
);





const HomePage = () => {


  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch('http://localhost:3001/api/jobs');
      const data = await res.json();
      setJobs(data);
    };

    fetchJobs();
  }, []);

  return (
    <div className="animate-fade-in">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-precisedBlue to-blue-700 text-white py-20 md:py-32" style={{
        backgroundImage: "url('src/assets/img/banner_01.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "soft-light"
      }}
      >
        <div className="container-custom text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 text-secondary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Connecting Talent with Opportunity
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-precisedBlue"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Precised Talent is your expert partner in staffing for the freight forwarding, transportation, and logistics industries.
          </motion.p>
          <motion.div
            className="space-x-0 md:space-x-4 space-y-4 md:space-y-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/job-seekers">
              <Button size="lg" className="bg-white text-precisedBlue hover:bg-gray-100 transform hover:scale-105 transition-transform duration-300">
                Find Your Next Role <Search className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/employers">
              <Button size="lg" variant="outline" className="border-primary shadow text-white bg-precisedBlue hover:bg-white hover:text-precisedBlue hover:border-precisedBlue transform hover:scale-105 transition-transform duration-300">
                Hire Top Talent <Users className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It works */}
      <section className="section-padding bg-gray-100/70">
        <div className="container-custom">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-precisedDarkGray"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            How it <span className="text-precisedBlue">Works?</span>
          </motion.h2>
          <motion.p
            className="text-center text-muted-foreground max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Easy Steps To Get Your Dream Job
            With Our Platform
          </motion.p>
          <div className="grid md:grid-cols-4 gap-8">
            <FeatureCardBox
              icon={UserRoundCog}
              title="Create Account"
              description="Lorem ipsum dolor amer sit lorem ipsum dolor amer sit.Lorem ipsum dolor amer sit lorem ipsum dolor amer sit."
              delay={0.3}
            />
            <FeatureCardBox
              icon={ScrollText}
              title="Upload Your Resume"
              description="Lorem ipsum dolor amer sit lorem ipsum dolor amer sit.Lorem ipsum dolor amer sit."
              delay={0.4}
            />
            <FeatureCardBox
              icon={Search}
              title="Search Jobs"
              description="Lorem ipsum dolor amer sit lorem ipsum dolor amer sit.Lorem ipsum dolor amer sit."
              delay={0.5}
            />
            <FeatureCardBox
              icon={Send}
              title="Apply Your Dream Job"
              description="Lorem ipsum dolor amer sit lorem ipsum dolor amer sit.Lorem ipsum dolor amer sit."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* JobListCard */}
      <section className="section-padding ">
        <div className="container-custom">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-precisedDarkGray"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Latest <span className="text-precisedBlue">Jobs</span>
          </motion.h2>
          <motion.p
            className="text-center text-muted-foreground max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore the Newest Opportunities Handpicked for You.
          </motion.p>

          {/* companyName, postedDate, jobType, jobLevel, jobMode, companyLogo, salary, jobLocation  */}

          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

            <JobListCard

              cardColor={'bg-orange-100'}
              jobId="1"
              icon={Bookmark}
              jobTitle="Senior UI/UX Designer"
              description="Lorem ipsum dolor amer sit lorem ipsum dolor amer sit.Lorem ipsum dolor amer sit lorem ipsum dolor amer sit."
              companyName="Amazon"
              companyLogo="src/assets/img/company_logo/amazon-icon-logo-svgrepo-com.svg"
              postedDate="18-05-2025"
              jobType="Part-time"
              jobLevel="Senior Level"
              jobMode="Remote"
              jobSalary="150000/month"
              jobLocation="Noida"
              delay={0.3}
            />
            <JobListCard
              cardColor={'bg-green-100'}
              icon={Bookmark}
              jobId="2"
              jobTitle="Logistics Coordinator"
              description="Manage and coordinate international shipments, ensuring timely delivery and compliance. Requires 2+ ..."
              companyName="Global Trans Inc."
              companyLogo=""
              postedDate="5/20/2025"
              jobType="Full-time"
              jobLevel="Junior Level"
              jobMode="In-Office"
              jobSalary="25000/month"
              jobLocation="Bengaluru"
              delay={0.3}
            />

            <JobListCard
              cardColor={'bg-blue-100'}
              icon={Bookmark}
              jobId="3"
              jobTitle="Freight Broker"
              description="Connect shippers with carriers, negotiate rates, and manage freight movements. Strong sales skills n..."
              companyName="Speedy Logistics LLC"
              companyLogo=""
              postedDate="18-05-2025"
              jobType="Part-time"
              jobLevel="Senior Level"
              jobMode="Remote"
              jobSalary="250000/month"
              jobLocation="Chicago, IL"
              delay={0.3}
            />

            <JobListCard

              cardColor={'bg-pink-100'}
              icon={Bookmark}
              jobId="4"
              jobTitle="Warehouse Manager"
              description="Oversee all warehouse operations, including inventory management, staffing, and safety protocols...."
              companyName="Secure Storage Ltd."
              companyLogo=""
              postedDate="22-05-2025"
              jobType="Part-time"
              jobLevel="Mid-Senior Level"
              jobMode="Remote"
              jobSalary="230000/month"
              jobLocation="Houston, TX"
              delay={0.3}
            />

          </div> */}

          <div className="grid md:grid-cols-4 gap-8">
            {loading ? (
              <p>Loading jobs...</p> // Optionally add a spinner here
            ) : (
              jobs.slice(0, 4).map((job, index) => (
                <JobListCard
                  key={job.id}
                  jobId={job.id}
                  icon={Bookmark}
                  cardColor={index % 2 === 0 ? 'bg-blue-100' : 'bg-green-100'}
                  jobTitle={job.title}
                  description={job.description}
                  companyName={job.company}
                  companyLogo={job.companyLogo}
                  postedDate={job.postedDate}
                  jobType={job.jobType}
                  jobLevel={job.jobLevel}
                  jobMode={job.jobMode}
                  jobSalary={job.salary}
                  jobLocation={job.location}
                  delay={0.3 + index * 0.1}
                />
              ))
            )}
          </div>


          <div className='mt-5 flex justify-center'>
            <button className=" mt-5 flex items-center justify-center px-5 py-3 w-[20%] rounded-md text-lg font-medium hover:shadow-lg
            transition-colors duration-150 ease-in-out bg-precisedBlue text-white shadow-md"> <Search className='me-2' /> Browse More Jobs</button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-gray-100/70">
        <div className="container-custom">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-precisedDarkGray"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Why Choose <span className="text-precisedBlue">Precised Talent?</span>
          </motion.h2>
          <motion.p
            className="text-center text-muted-foreground max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We understand the unique demands of the logistics sector. Our specialized approach ensures we find the perfect match for both candidates and companies.
          </motion.p>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Briefcase}
              title="Industry Specialization"
              description="Deep expertise in freight forwarding, transportation, and logistics recruitment."
              delay={0.3}
            />
            <FeatureCard
              icon={Users}
              title="Quality Candidates"
              description="Access to a vast network of highly skilled and vetted professionals."
              delay={0.4}
            />
            <FeatureCard
              icon={Search}
              title="Precise Matching"
              description="Our rigorous screening process ensures optimal alignment of skills and culture."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Track Record */}
      <section className="section-padding ">
        <div className="container-custom">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-precisedDarkGray">
              Our Proven <span className="text-precisedBlue">Track Record</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem value="10+" label="Years of Experience" delay={0.3} />
            <StatItem value="500+" label="Successful Placements" delay={0.4} />
            <StatItem value="95%" label="Client Satisfaction" delay={0.5} />
            <StatItem value="24/7" label="Dedicated Support" delay={0.6} />
          </div>
        </div>
      </section>

      {/* Get In Touch */}
      <section className="section-padding bg-gray-100/70">
        <div className="container-custom">
          <div className="bg-precisedBlue p-8 md:p-12 rounded-lg shadow-xl text-white grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Team or Career?</h2>
              <p className="mb-6 text-blue-100">
                Whether you're a company seeking specialized talent or a professional looking for your next opportunity, Precised Talent is here to guide you.
              </p>
              <div className="space-x-0 md:space-x-4 space-y-4 md:space-y-0">
                <Link to="/contact">
                  <Button size="lg" className="bg-white text-precisedBlue hover:bg-gray-100">
                    Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <img alt="Professionals collaborating in a modern office" className="rounded-lg shadow-md" src="https://images.unsplash.com/photo-1685955011452-2d9cf1cb4081" />
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
