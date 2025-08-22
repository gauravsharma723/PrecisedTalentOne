
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Briefcase, Users, FileText, LogOut, PlusCircle, Trash2, Edit3, Eye, Mail, Building2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from 'framer-motion';

const initialJobs = [
  { id: '1', title: 'Logistics Coordinator', company: 'Global Trans Inc.', location: 'New York, NY', industry: 'Freight Forwarding', description: 'Manage and coordinate international shipments, ensuring timely delivery and compliance. Requires 2+ years experience.', postedDate: '2025-05-20' },
  { id: '2', title: 'Freight Broker', company: 'Speedy Logistics LLC', location: 'Chicago, IL', industry: 'Transportation', description: 'Connect shippers with carriers, negotiate rates, and manage freight movements. Strong sales skills needed.', postedDate: '2025-05-18' },
];





const AdminDashboardPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [jobListings, setJobListings] = useState([]);
  const [talentRequests, setTalentRequests] = useState([]);
  const [candidateSubmissions, setCandidateSubmissions] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);

  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [jobFormData, setJobFormData] = useState({
    title: '', company: '', location: '', industry: '', description: '', postedDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('jobListings')) || initialJobs;
    if (!localStorage.getItem('jobListings')) {
      localStorage.setItem('jobListings', JSON.stringify(initialJobs));
    }

    //if (user.role !== 'admin') navigate('/unauthorized');

    setJobListings(storedJobs);
    setTalentRequests(JSON.parse(localStorage.getItem('talentRequests')) || []);
    setCandidateSubmissions(JSON.parse(localStorage.getItem('candidateSubmissions')) || []);
    setContactMessages(JSON.parse(localStorage.getItem('contactSubmissions')) || []);
  }, []);


  const updateJobStorage = (updatedJobs) => {
    setJobListings(updatedJobs);
    localStorage.setItem('jobListings', JSON.stringify(updatedJobs));
  };
  //updateJobStorage(updatedJobs);



  const handleLogout = () => {
    logout();
    toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
    navigate('/admin/login');
  };

  const handleJobFormChange = (e) => {
    const { id, value } = e.target;
    setJobFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleJobSubmit = (e) => {
    e.preventDefault();
    let updatedJobs;
    if (currentJob) {
      updatedJobs = jobListings.map(job => job.id === currentJob.id ? { ...job, ...jobFormData } : job);
      toast({ title: 'Job Updated', description: `Job "${jobFormData.title}" has been updated.` });
    } else {
      const newJob = { ...jobFormData, id: String(Date.now()), postedDate: new Date(jobFormData.postedDate).toISOString() };
      updatedJobs = [...jobListings, newJob];
      toast({ title: 'Job Added', description: `New job "${newJob.title}" has been added.` });
    }
    setJobListings(updatedJobs);
    localStorage.setItem('jobListings', JSON.stringify(updatedJobs));
    setIsJobModalOpen(false);
    setCurrentJob(null);
    setJobFormData({ title: '', company: '', location: '', industry: '', description: '', postedDate: new Date().toISOString().split('T')[0] });
    updateJobStorage(updatedJobs);
  };

  const openJobModal = (job = null) => {
    setCurrentJob(job);
    if (job) {
      setJobFormData({ ...job, postedDate: new Date(job.postedDate).toISOString().split('T')[0] });
    } else {
      setJobFormData({ title: '', company: '', location: '', industry: '', description: '', postedDate: new Date().toISOString().split('T')[0] });
    }
    setIsJobModalOpen(true);
  };

  const deleteJob = (jobId) => {
    const jobToDelete = jobListings.find(job => job.id === jobId);
    if (window.confirm(`Are you sure you want to delete the job: "${jobToDelete?.title}"?`)) {
      const updatedJobs = jobListings.filter(job => job.id !== jobId);
      setJobListings(updatedJobs);
      localStorage.setItem('jobListings', JSON.stringify(updatedJobs));
      toast({ title: 'Job Deleted', description: `Job "${jobToDelete?.title}" has been deleted.`, variant: 'destructive' });
    }
  };

  const StatCard = ({ title, count, icon, color }) => (
    <Card className={`shadow-lg border-l-4 ${color}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {React.createElement(icon, { className: "h-5 w-5 text-muted-foreground" })}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 animate-fade-in">
      <div className="container-custom">
        <header className="mb-8 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-precisedDarkGray">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage Precised Talent operations.</p>
          </div>
          <Button onClick={handleLogout} variant="destructive" className="mt-4 md:mt-0">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </header>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard title="Total Registered Employers" count={jobListings.length} icon={Building2} color="border-precisedBlue" />
          {/*  */}

          <StatCard title="Total Candidates" count={talentRequests.length} icon={Users} color="border-green-500" />

          <StatCard title="Total Active Jobs" count={jobListings.length} icon={Briefcase} color="border-precisedBlue" />

          <StatCard title=" Pending Employer Approvals" count={candidateSubmissions.length} icon={FileText} color="border-yellow-500" />
          {/* <StatCard title="Talent Requests" count={talentRequests.length} icon={Users} color="border-green-500" /> */}
          {/* <StatCard title="Candidate Submissions" count={candidateSubmissions.length} icon={FileText} color="border-yellow-500" /> */}
          {/* <StatCard title="Contact Messages" count={contactMessages.length} icon={Mail} color="border-purple-500" /> */}
        </div>

        <Card className="mb-8 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">Job Listings</CardTitle>
              <CardDescription>Manage current job openings.</CardDescription>
            </div>
            <Button onClick={() => openJobModal()} className="bg-precisedBlue hover:bg-blue-700">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Job
            </Button>
          </CardHeader>
          <CardContent>
            {jobListings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">Title</th>
                      <th scope="col" className="px-6 py-3">Company</th>
                      <th scope="col" className="px-6 py-3">Location</th>
                      <th scope="col" className="px-6 py-3">Posted Date</th>
                      <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobListings.map(job => (
                      <motion.tr
                        key={job.id}
                        className="bg-white border-b hover:bg-gray-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">{job.title}</td>
                        <td className="px-6 py-4">{job.company}</td>
                        <td className="px-6 py-4">{job.location}</td>
                        <td className="px-6 py-4">{new Date(job.postedDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4 space-x-2">
                          <Button variant="outline" size="sm" onClick={() => openJobModal(job)}><Edit3 className="h-4 w-4" /></Button>
                          <Button variant="destructive" size="sm" onClick={() => deleteJob(job.id)}><Trash2 className="h-4 w-4" /></Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : <p className="text-muted-foreground text-center py-4">No job listings yet.</p>}
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="shadow-md">
            <CardHeader><CardTitle>Talent Requests ({talentRequests.length})</CardTitle></CardHeader>
            <CardContent className="max-h-60 overflow-y-auto">
              {talentRequests.length > 0 ? talentRequests.map((req, i) => (
                <div key={i} className="p-2 border-b text-sm">
                  <p className="font-semibold">{req.companyName} - {req.roleNeeded}</p>
                  <p className="text-xs text-muted-foreground">{req.contactPerson} ({req.email})</p>
                </div>
              )) : <p className="text-muted-foreground">No talent requests.</p>}
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader><CardTitle>Candidate Submissions ({candidateSubmissions.length})</CardTitle></CardHeader>
            <CardContent className="max-h-60 overflow-y-auto">
              {candidateSubmissions.length > 0 ? candidateSubmissions.map((sub, i) => (
                <div key={i} className="p-2 border-b text-sm">
                  <p className="font-semibold">{sub.name} ({sub.email})</p>
                  <p className="text-xs text-muted-foreground">Resume: {sub.resumeName || 'N/A'}</p>
                </div>
              )) : <p className="text-muted-foreground">No candidate submissions.</p>}
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader><CardTitle>Contact Messages ({contactMessages.length})</CardTitle></CardHeader>
            <CardContent className="max-h-60 overflow-y-auto">
              {contactMessages.length > 0 ? contactMessages.map((msg, i) => (
                <div key={i} className="p-2 border-b text-sm">
                  <p className="font-semibold">{msg.name} ({msg.email})</p>
                  <p className="text-xs text-muted-foreground">Subject: {msg.subject}</p>
                </div>
              )) : <p className="text-muted-foreground">No contact messages.</p>}
            </CardContent>
          </Card>
        </div>

        <Dialog open={isJobModalOpen} onOpenChange={setIsJobModalOpen}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>{currentJob ? 'Edit Job Listing' : 'Add New Job Listing'}</DialogTitle>
                <DialogDescription>
                  {currentJob ? 'Update the details for this job opening.' : 'Fill in the details for the new job opening.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleJobSubmit} className="space-y-4 py-4">
                <div>
                  <Label htmlFor="title">Job Title</Label>
                  <Input id="title" value={jobFormData.title} onChange={handleJobFormChange} required />
                </div>
                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" value={jobFormData.company} onChange={handleJobFormChange} required />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" value={jobFormData.location} onChange={handleJobFormChange} required />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" value={jobFormData.industry} onChange={handleJobFormChange} required />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" value={jobFormData.description} onChange={handleJobFormChange} rows={4} required />
                </div>
                <div>
                  <Label htmlFor="postedDate">Date Posted</Label>
                  <Input id="postedDate" type="date" value={jobFormData.postedDate} onChange={handleJobFormChange} required />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" className="bg-precisedBlue hover:bg-blue-700">{currentJob ? 'Save Changes' : 'Add Job'}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </motion.div>
        </Dialog>
      </div>
    </div >
  );
};

export default AdminDashboardPage;
