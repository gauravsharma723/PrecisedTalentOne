import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Briefcase, MapPin, Search, Filter, UploadCloud, ArrowRight, Building } from 'lucide-react';
import { motion } from 'framer-motion';

const initialJobs = [
  { id: '1', title: 'Logistics Coordinator', company: 'Global Trans Inc.', location: 'New York, NY', industry: 'Freight Forwarding', description: 'Manage and coordinate international shipments, ensuring timely delivery and compliance. Requires 2+ years experience.', postedDate: '2025-05-20' },
  { id: '2', title: 'Freight Broker', company: 'Speedy Logistics LLC', location: 'Chicago, IL', industry: 'Transportation', description: 'Connect shippers with carriers, negotiate rates, and manage freight movements. Strong sales skills needed.', postedDate: '2025-05-18' },
  { id: '3', title: 'Supply Chain Analyst', company: 'Efficient Solutions Co.', location: 'Los Angeles, CA', industry: 'Logistics', description: 'Analyze supply chain data, identify inefficiencies, and propose improvements. Bachelor\'s degree required.', postedDate: '2025-05-15' },
  { id: '4', title: 'Warehouse Manager', company: 'Secure Storage Ltd.', location: 'Houston, TX', industry: 'Logistics', description: 'Oversee all warehouse operations, including inventory management, staffing, and safety protocols.', postedDate: '2025-05-22' },
  { id: '5', title: 'Customs Brokerage Specialist', company: 'BorderFree Trade', location: 'Miami, FL', industry: 'Freight Forwarding', description: 'Prepare and process customs documentation for import/export shipments. CHB license preferred.', postedDate: '2025-05-12', salary: '10000' },
];

const ALL_LOCATIONS_VALUE = "all-locations-placeholder";
const ALL_INDUSTRIES_VALUE = "all-industries-placeholder";


const JobCard = ({
  job,
  delay,
  cardColor = 'bg-stone-100',
  icon = Briefcase,
  jobType = "Full-time",
  jobLevel = "Mid-level",
  jobMode = "On-site",

  jobLocation = job.location,
}) => {
  console.log('Job salary:', job);
  return (

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >

      <Card className="text-left border-2 border-grey-600 h-full hover:shadow-xl transition-shadow duration-300 rounded-3xl ">
        <CardContent className={`${cardColor} m-2 rounded-3xl p-3`}>
          <div className="flex justify-between">
            <div className="rounded-full w-fit bg-white px-3 py-2 text-xs">
              {job.postedDate}
            </div>
            <div
              onClick={() => console.log('Clicked')}
              className="rounded-full border border-transparent w-fit bg-white text-center p-2 flex justify-center items-center hover:bg-slate-200 hover:border hover:cursor-pointer hover:border-slate-300 transition-transform duration-300"
            >
              {React.createElement(icon, { size: 14 })}
            </div>
          </div>
          <div className="flex flex-col my-2">
            <span className="text-xs my-2">{job.company}</span>
            <div className="flex justify-between items-center">
              <span className="text-xl" style={{ maxWidth: '70%' }}>
                {job.title}
              </span>
            </div>
            <div className="flex gap-2 my-2 flex-wrap">
              {[jobType, jobLevel, jobMode, jobLocation].map((label, i) => (
                <span
                  key={i}
                  className="rounded-full border border-red-400 bg-transparent text-dark px-2 py-1 text-xs"
                >
                  {label}
                </span>
              ))}
            </div>


          </div>
        </CardContent>
        <CardFooter>
          <div className="flex justify-between items-center w-full mt-2 flex-wrap">
            <div>
              <span className="salary text-base font-bold">₹ {job.salary || 'N/A'}</span>
              <span className="block text-xs">{jobLocation}</span>
            </div>
            <div>
              {/* <button href="/job-details" className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out bg-precisedBlue text-white shadow-lg">
                Details
              </button> */}
              <Link to={`/job-details/${job.id}`} className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out bg-precisedBlue text-white shadow-lg">
  Details
</Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
};

const JobSeekersPage = () => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({ role: '', location: ALL_LOCATIONS_VALUE, industry: ALL_INDUSTRIES_VALUE });
  const [searchTerm, setSearchTerm] = useState('');
  const [resumeFormData, setResumeFormData] = useState({ name: '', email: '', phone: '', resume: null, coverLetter: '' });

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('jobListings')) || initialJobs;
    if (!localStorage.getItem('jobListings')) {
      localStorage.setItem('jobListings', JSON.stringify(initialJobs));
    }
    setJobs(storedJobs);
    setFilteredJobs(storedJobs);
  }, []);

  const uniqueLocations = useMemo(() => [...new Set(jobs.map(job => job.location))], [jobs]);
  const uniqueIndustries = useMemo(() => [...new Set(jobs.map(job => job.industry))], [jobs]);

  useEffect(() => {
    let currentJobs = [...jobs];
    if (filters.role) {
      currentJobs = currentJobs.filter(job => job.title.toLowerCase().includes(filters.role.toLowerCase()));
    }
    if (filters.location && filters.location !== ALL_LOCATIONS_VALUE) {
      currentJobs = currentJobs.filter(job => job.location === filters.location);
    }
    if (filters.industry && filters.industry !== ALL_INDUSTRIES_VALUE) {
      currentJobs = currentJobs.filter(job => job.industry === filters.industry);
    }
    if (searchTerm) {
      currentJobs = currentJobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredJobs(currentJobs);
  }, [filters, searchTerm, jobs]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const handleResumeFormChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "resume") {
      setResumeFormData(prev => ({ ...prev, resume: files[0] }));
    } else {
      setResumeFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleResumeSubmit = (e) => {
    e.preventDefault();
    console.log('Resume Submitted:', resumeFormData);

    const candidateSubmissions = JSON.parse(localStorage.getItem('candidateSubmissions')) || [];
    candidateSubmissions.push({ name: resumeFormData.name, email: resumeFormData.email, phone: resumeFormData.phone, resumeName: resumeFormData.resume?.name, coverLetter: resumeFormData.coverLetter, submissionDate: new Date().toISOString() });
    localStorage.setItem('candidateSubmissions', JSON.stringify(candidateSubmissions));

    toast({
      title: 'Application Sent!',
      description: `Thank you, ${resumeFormData.name}. Your resume has been submitted.`,
    });
    setResumeFormData({ name: '', email: '', phone: '', resume: null, coverLetter: '' });
    e.target.reset();
  };

  const cardColors = [
    'bg-red-100',
    'bg-green-100',
    'bg-blue-100',
    'bg-yellow-100',
    'bg-purple-100',
    'bg-pink-100',
    'bg-indigo-100',
    'bg-teal-100',
    'bg-orange-100',
    'bg-cyan-100',
  ];


  return (
    <div className="animate-fade-in section-padding">
      <div className="container-custom">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-precisedDarkGray mb-4">
            Find Your Next <span className="text-precisedBlue">Career Move</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore exciting opportunities in the freight forwarding, transportation, and logistics industries.
          </p>
        </motion.div>

        <Card className="mb-12 p-6 shadow-md bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="grid md:grid-cols-4 gap-4 items-end">
            <div>
              <Label htmlFor="searchTerm">Search Keywords</Label>
              <div className="relative">
                <Input id="searchTerm" placeholder="e.g., Manager, Broker, NYC" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pr-10" />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            <div>
              <Label htmlFor="filterRole">Role / Title</Label>
              <Input id="filterRole" placeholder="e.g., Logistics Coordinator" value={filters.role} onChange={(e) => handleFilterChange('role', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="filterLocation">Location</Label>
              <Select value={filters.location} onValueChange={(value) => handleFilterChange('location', value)}>
                <SelectTrigger id="filterLocation"><SelectValue placeholder="All Locations" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_LOCATIONS_VALUE}>All Locations</SelectItem>
                  {uniqueLocations.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="filterIndustry">Industry</Label>
              <Select value={filters.industry} onValueChange={(value) => handleFilterChange('industry', value)}>
                <SelectTrigger id="filterIndustry"><SelectValue placeholder="All Industries" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_INDUSTRIES_VALUE}>All Industries</SelectItem>
                  {uniqueIndustries.map(ind => <SelectItem key={ind} value={ind}>{ind}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {filteredJobs.length > 0 ? (
          <div className="grid md:grid-cols-4 gap-8 mb-5">
            {filteredJobs.map((job, index) => (
              <JobCard key={job.id} job={job} delay={index * 0.1} cardColor={cardColors[index % cardColors.length]} />
            ))}
          </div>
        ) : (
          <motion.p
            className="text-center text-muted-foreground text-lg py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No job listings match your current criteria. Try broadening your search.
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: filteredJobs.length > 0 ? filteredJobs.length * 0.1 + 0.2 : 0.2 }}
        >
          <Card className="shadow-xl border-precisedBlue border-t-4 mt-10">
            <CardHeader>
              <CardTitle className="text-2xl text-precisedBlue flex items-center">
                <UploadCloud className="mr-2" /> Submit Your Resume
              </CardTitle>
              <CardDescription>
                Don't see the perfect fit? Submit your resume, and we'll contact you about suitable opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleResumeSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" className="mt-2" value={resumeFormData.name} onChange={handleResumeFormChange} placeholder="Your Full Name" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" className="mt-2" type="email" value={resumeFormData.email} onChange={handleResumeFormChange} placeholder="your.email@example.com" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input id="phone" className="mt-2" type="tel" value={resumeFormData.phone} onChange={handleResumeFormChange} placeholder="999-999-9999" />
                </div>
                <div>
                  <Label htmlFor="resume">Upload Resume (PDF, DOC, DOCX)</Label>
                  <Input id="resume" type="file" onChange={handleResumeFormChange} accept=".pdf,.doc,.docx" required
                    className="mt-2 pb-11 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-precisedBlue hover:file:bg-blue-100"
                  />
                </div>
                <div>
                  <Label htmlFor="coverLetter">Cover Letter / Additional Information (Optional)</Label>
                  <Textarea id="coverLetter" className="mt-2" value={resumeFormData.coverLetter} onChange={handleResumeFormChange} placeholder="Tell us more about your career goals..." rows={4} />
                </div>
                <Button type="submit" className="w-full bg-precisedBlue hover:bg-blue-700 text-white">
                  Submit Application <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default JobSeekersPage;