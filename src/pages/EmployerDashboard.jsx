import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import JobListCard from '../components/cards/JobListCard';
import { Bar } from 'react-chartjs-2';
import { Briefcase, Users, UserRoundCog, Building2, Bookmark, ScrollText, Send, Search, ArrowRight, CheckCircle } from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import Select from 'react-select';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EmployerDashboard = () => {
    const { toast } = useToast();
    const { user } = useAuth();
    const token = localStorage.getItem('precisedTalentToken');

    const [jobs, setJobs] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [jobForm, setJobForm] = useState({
        title: '',
        description: '',
        location: '',
        experience_required: '',
        salary_range: ''
    });
    const [logoFile, setLogoFile] = useState(null);


    const jobTypeOptions = [
        { value: 'Full-time', label: 'Full-time' },
        { value: 'Part-time', label: 'Part-time' },
        { value: 'Contract', label: 'Contract' }
    ];

    const jobLevelOptions = [
        { value: 'Junior', label: 'Junior' },
        { value: 'Mid-Level', label: 'Mid-Level' },
        { value: 'Senior', label: 'Senior' }
    ];

    const jobModeOptions = [
        { value: 'Remote', label: 'Remote' },
        { value: 'On-site', label: 'On-site' },
        { value: 'Hybrid', label: 'Hybrid' }
    ];
    const fetchJobs = async () => {
        try {
            const res = await axios.get('http://localhost:3001/api/employer/jobs', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setJobs(res.data);
        } catch (err) {
            toast({ title: 'Error', description: 'Failed to fetch jobs', variant: 'destructive' });
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleChange = (e) => {
        setJobForm({ ...jobForm, [e.target.id]: e.target.value });
    };

    const handlePostJob = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in jobForm) {
            formData.append(key, jobForm[key]?.value || jobForm[key]);
        }
        if (logoFile) formData.append('company_logo', logoFile);

        try {
            await axios.post('http://localhost:3001/api/employer/jobs', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast({ title: 'Job Posted', description: `${jobForm.title} has been posted.` });
            setOpenModal(false);
            setJobForm({
                title: '',
                description: '',
                location: '',
                experience_required: '',
                salary_range: '',
                jobType: null,
                jobLevel: null,
                jobMode: null
            });
            setLogoFile(null);
            fetchJobs();
        } catch (err) {
            toast({ title: 'Error', description: 'Job post failed.', variant: 'destructive' });
        }
    };

    const chartData = {
        labels: ['Posted Jobs', 'Active Jobs'],
        datasets: [
            {
                label: 'Total Jobs',
                data: [jobs.length],
                backgroundColor: 'rgba(2, 112, 173, 0.7)',
            },
            {
                label: 'Active Jobs',
                data: [2, 4, 25, 10],
                backgroundColor: 'rgba(2, 112, 173, 0.4)',
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Job Statistics' },
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 py-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="container mx-auto px-4">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-4xl font-bold text-precisedDarkGray">Employer Dashboard</h1>
                        <p className="text-base text-gray-600">Welcome, {user?.name || 'Employer'}!</p>
                    </div>
                    <Button onClick={() => setOpenModal(true)} className="bg-precisedBlue hover:bg-blue-700 text-white">
                        <PlusCircle className="mr-2 h-5 w-5" /> Post Job
                    </Button>
                </header>

                {/* Stats and Chart */}
                <section className="mb-12">
                    <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white shadow rounded-xl p-4">
                            <p className="text-sm text-gray-500">Total Jobs</p>
                            <h2 className="text-3xl font-bold text-precisedBlue">{jobs.length}</h2>
                        </div>
                        <div className="bg-white shadow rounded-xl p-4">
                            <p className="text-sm text-gray-500">Applicants (coming soon)</p>
                            <h2 className="text-3xl font-bold text-yellow-500">--</h2>
                        </div>
                        <div className="bg-white shadow rounded-xl p-4">
                            <p className="text-sm text-gray-500">Profile Score</p>
                            <div className="relative w-full bg-gray-200 rounded-full h-2 mt-2">
                                <div className="absolute top-0 left-0 h-2 bg-green-500 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                            <p className="text-xs mt-1 text-green-600">75% Complete</p>
                        </div>
                    </motion.div>
                    <div className="bg-white shadow rounded-xl p-6">
                        <Bar options={chartOptions} data={chartData} />
                    </div>
                </section>

                {/* Job Cards */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-precisedDarkGray">Your Job Listings</h2>
                    <div className="grid  sm:grid-cols-2   md:grid-cols-4 gap-8">
                        {jobs.map((job, index) => {
                            const colors = ['bg-orange-100', 'bg-green-100', 'bg-blue-100', 'bg-pink-100'];
                            const cardColor = colors[Math.floor(Math.random() * colors.length)];

                            return (

                                <motion.div
                                    key={job.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <JobListCard
                                        cardColor={cardColor}

                                        jobId={job.id}

                                        jobTitle={job.title}
                                        jobLocation={job.location}
                                        companyName={user?.name || 'Your Company'}
                                        jobExperience={`${job.experience_required} yrs`}
                                        jobSalary={job.salary_range}
                                        delay={index * 0.1}
                                        description={job.description}
                                        postedDate={new Date(job.created_at).toLocaleDateString()}
                                        jobType={job.job_type}
                                        jobLevel={job.job_level}
                                        jobMode={job.job_mode}
                                        companyLogo={job.company_logo || "../src/assets/img/company_logo/amazon-icon-logo-svgrepo-com.svg"}
                                        icon={Bookmark}
                                    />
                                </motion.div>
                            )
                        })}
                    </div>

                </section>
            </motion.div>


            {/* Post Job Modal */}
            {/* <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-semibold">Post New Job</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handlePostJob} className="space-y-4 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="title">Job Title</Label>
                                <Input id="title" value={jobForm.title} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" value={jobForm.location} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label htmlFor="experience_required">Experience (years)</Label>
                                <Input id="experience_required" type="number" value={jobForm.experience_required} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label htmlFor="salary_range">Salary Range</Label>
                                <Input id="salary_range" value={jobForm.salary_range} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label htmlFor="job_type">Job Type</Label>
                                <Input id="job_type" value={jobForm.job_type} onChange={handleChange} placeholder="e.g., Full-time" />
                            </div>
                            <div>
                                <Label htmlFor="job_level">Job Level</Label>
                                <Input id="job_level" value={jobForm.job_level} onChange={handleChange} placeholder="e.g., Mid-Level" />
                            </div>
                            <div>
                                <Label htmlFor="job_mode">Job Mode</Label>
                                <Input id="job_mode" value={jobForm.job_mode} onChange={handleChange} placeholder="e.g., On-site" />
                            </div>
                            <div>
                                <Label htmlFor="company_logo">Company Logo</Label>
                                <Input id="company_logo" type="file" accept="image/*" onChange={(e) => setJobForm({ ...jobForm, company_logo: e.target.files[0] })} />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" value={jobForm.description} onChange={handleChange} rows={4} required />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" className="bg-precisedBlue text-white hover:bg-blue-700">Post Job</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog> */}

            <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl text-precisedDarkGray">Post a New Job</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handlePostJob} className="space-y-4 py-4" encType="multipart/form-data">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label className="mb-1 block" htmlFor="title">Job Title</Label>
                                <Input id="title" value={jobForm.title} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label className="mb-1 block" htmlFor="location">Location</Label>
                                <Input id="location" value={jobForm.location} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label className="mb-1 block" htmlFor="experience_required">Experience (years)</Label>
                                <Input id="experience_required" type="number" value={jobForm.experience_required} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label className="mb-1 block" htmlFor="salary_range">Salary Range</Label>
                                <Input id="salary_range" value={jobForm.salary_range} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <Label className="mb-1 block" htmlFor="job_type">Job Type</Label>
                                <Select id="job_type" value={jobForm.job_type} onChange={(val) => setJobForm(prev => ({ ...prev, job_type: val }))} options={jobTypeOptions} isSearchable />
                            </div>
                            <div>
                                <Label className="mb-1 block" htmlFor="job_level">Job Level</Label>
                                <Select id="job_level" value={jobForm.job_level} onChange={(val) => setJobForm(prev => ({ ...prev, job_level: val }))} options={jobLevelOptions} isSearchable />
                            </div>
                            <div>
                                <Label className="mb-1 block" htmlFor="job_mode">Job Mode</Label>
                                <Select id="job_mode" value={jobForm.job_mode} onChange={(val) => setJobForm(prev => ({ ...prev, job_mode: val }))} options={jobModeOptions} isSearchable />
                            </div>
                        </div>

                        <div>
                            <Label className="mb-1 block" htmlFor="description">Description</Label>
                            <Textarea id="description" value={jobForm.description} onChange={handleChange} required />
                        </div>

                        <div>
                            <Label className="mb-1 block" htmlFor="company_logo">Company Logo</Label>
                            <Input type="file" id="company_logo" onChange={(e) => setLogoFile(e.target.files[0])} />
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" className="bg-precisedBlue text-white hover:bg-blue-700">Post Job</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default EmployerDashboard;
