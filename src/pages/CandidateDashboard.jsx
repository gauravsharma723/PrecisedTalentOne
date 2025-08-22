import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Briefcase, CheckCircle, UserCircle, FileText } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import JobListCard from '@/components/cards/JobListCard';
import { Card } from '@/components/ui/card';

const CandidateDashboard = () => {
    const { user } = useAuth();
    const { toast } = useToast();

    const [appliedJobs, setAppliedJobs] = useState([]);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchAppliedJobs();
        fetchAllJobs();
    }, []);

    const fetchAppliedJobs = async () => {
        try {
            const res = await axios.get('http://localhost:3001/api/candidate/applications', {
                headers: { Authorization: `Bearer ${localStorage.getItem('precisedTalentToken')}` },
            });
            setAppliedJobs(res.data);
        } catch (err) {
            toast({ title: 'Error', description: 'Failed to load applications.', variant: 'destructive' });
        }
    };

    const fetchAllJobs = async () => {
        try {
            const res = await axios.get('http://localhost:3001/api/jobs');
            setJobs(res.data);
        } catch (err) {
            toast({ title: 'Error', description: 'Failed to fetch jobs.', variant: 'destructive' });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 py-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="container mx-auto px-4">
                <header className="mb-10">
                    <h1 className="text-4xl font-bold text-precisedDarkGray">Candidate Dashboard</h1>
                    <p className="text-gray-600">Welcome back, {user?.name || 'Candidate'}!</p>
                </header>

                {/* Stats Section */}
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                    <Card className="p-4 shadow-md bg-white">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Jobs Applied</p>
                                <h2 className="text-3xl font-bold text-precisedBlue">{appliedJobs.length}</h2>
                            </div>
                            <Briefcase className="w-8 h-8 text-blue-400" />
                        </div>
                    </Card>

                    <Card className="p-4 shadow-md bg-white">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Profile Completion</p>
                                <div className="relative w-full bg-gray-200 h-2 rounded-full mt-2">
                                    <div className="absolute top-0 left-0 h-2 bg-green-500 rounded-full" style={{ width: '70%' }}></div>
                                </div>
                                <p className="text-xs text-green-600 mt-1">70% complete</p>
                            </div>
                            <UserCircle className="w-8 h-8 text-green-500" />
                        </div>
                    </Card>

                    <Card className="p-4 shadow-md bg-white">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Status Tracker</p>
                                <h2 className="text-3xl font-bold text-yellow-500">--</h2>
                            </div>
                            <CheckCircle className="w-8 h-8 text-yellow-500" />
                        </div>
                    </Card>
                </div>

                {/* Job Listings */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-precisedDarkGray">Explore Jobs</h2>
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {jobs.map((job, index) => (
                            <JobListCard
                                key={job.id}
                                jobId={job.id}
                                jobTitle={job.title}
                                jobLocation={job.location}
                                companyName={job.company_name || 'Company'}
                                jobExperience={`${job.experience_required} yrs`}
                                jobSalary={job.salary_range}
                                delay={index * 0.1}
                                cardColor="bg-white"
                                postedDate={new Date(job.created_at).toLocaleDateString()}
                                jobType={job.job_type}
                                jobLevel={job.job_level}
                                jobMode={job.job_mode}
                                companyLogo={job.company_logo || null}
                                icon={FileText}
                            />
                        ))}
                    </div>
                </section>
            </motion.div>
        </div>
    );
};

export default CandidateDashboard;