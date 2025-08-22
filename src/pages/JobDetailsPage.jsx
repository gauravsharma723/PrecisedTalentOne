import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Modal from '@/components/ui/modal';
import { Link } from 'react-router-dom';
import { Briefcase, Star, StarHalf, Users, UserRoundCog, Building2, Bookmark, ScrollText, Send, Search, ArrowRight, CheckCircle } from 'lucide-react';
import { FaStar, FaSuitcase, FaMapMarkerAlt } from "react-icons/fa";


import { motion } from 'framer-motion';

const JobDetailsCard = ({
    jobSalary,
    delay,
    jobTitle,
    jobLocation,
    companyName, companyRating,
    companyLogo, jobExperience,
    cardColor = 'bg-stone-100',
    icon = Briefcase,
    jobType = "Full-time",
    jobLevel = "Mid-level",
    jobMode = "On-site",
    setModalType,
    setModalOpen,
}) => {
    // console.log('Job salary:', job);
    const roundedRating = Math.round(companyRating * 2) / 2;
    const fullStars = Math.floor(roundedRating);
    const hasHalfStar = roundedRating % 1 !== 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
        >
            <div className="mx-auto bg-white rounded-xl shadow border p-6 mb-10">
                <div className="flex justify-between items-start">
                    {/* Left Info */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">{jobTitle}</h2>

                        <div className="flex items-center mt-1 text-sm text-gray-500">
                            <p className="text-gray-600 mr-2">{companyName}</p>
                            {/* <FaStar className="text-yellow-400 mr-1" /> */}

                            <div className="star-rating mr-2">
                                <div className="stars">
                                    {Array.from({ length: 5 }, () => (
                                        <Star fill="#111" strokeWidth={0} size={14} />
                                    ))}
                                </div>
                                <div className="stars rating">
                                    {Array.from({ length: fullStars }, () => (
                                        <Star fill="#facc15" strokeWidth={0} size={14} />

                                    ))}
                                    {hasHalfStar && <StarHalf key="half" fill="#facc15" strokeWidth={0} size={14} />}
                                </div>
                            </div>
                            <span>
                                <a href="">({companyRating || 'N/A'})</a>
                            </span>

                        </div>

                        <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
                            <span className="flex items-center">
                                {/* <FaSuitcase className="mr-2" />   */}
                                <span className='mr-2'>
                                    {React.createElement(Briefcase, { size: 18 })}
                                </span>  {`${jobExperience} Years` || 'N/A'}
                            </span>
                            <span>|</span>
                            <span>₹ {jobSalary || 'Not Disclosed'} </span>
                            <span>|</span>
                            <span className="flex items-center">
                                <FaMapMarkerAlt className="mr-1" /> {jobLocation || "N/A"}
                            </span>
                        </div>
                    </div>

                    {/* Company Logo */}
                    <img
                        src={companyLogo}
                        alt="companyName"
                        className="h-20"
                    />
                </div>

                <hr className="my-4" />

                {/* Footer */}
                <div className="flex justify-between items-center text-sm text-gray-600">
                    <div>
                        <span className="mr-4">Job Posted: <span className="font-semibold text-black">2 Days Ago</span></span>
                        <span className="mr-4">Openings: <span className="font-semibold text-black">4</span></span>
                        <span>Applicants: <span className="font-semibold text-black">41</span></span>
                    </div>

                    <div className="flex gap-4">
                        <button className="px-4 py-2 border border-blue-600 rounded-full text-blue-600 hover:bg-blue-50" onClick={() => {
                            setModalType('register');
                            setModalOpen(true);
                        }}>
                            Register to apply
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex items-center" onClick={() => {
                            setModalType('apply');
                            setModalOpen(true);
                        }}>
                            Apply Now <span className="ml-1">
                                <Send size={20} />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
};


const JobDescription = ({ job }) => {
    return (
        <div className="mx-auto bg-white rounded-xl shadow border p-6 mb-4">
            <h3 className="text-xl font-semibold mb-3">Full Job Description</h3>
            {/* <p className="text-gray-600 text-sm">{job.type} • {job.location}</p> */}
            <hr className="my-4" />
            <div className="mt-4">
                <h3 className="text-xl font-semibold mb-3">What you’ll do</h3>
                <p className="text-gray-700 text-sm">{job.description}</p>
            </div>

            <div className="mt-4">
                <h3 className="font-semibold text-xl mb-3">Responsibilities</h3>
                <ul className=" list-inside text-sm">
                    {job.responsibilities.map((item, idx) => (
                        <li key={idx} className='mb-5'>
                            <svg className='inline mr-2' height="12" viewBox="384 349 257 512" width="12" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <path d="M640,604.16L384,860.16L384,348.16Z" fill="#0270ad" fill-opacity="1">
                                </path>
                            </svg>
                            {item}</li>
                    ))}
                </ul>
            </div>

            <div className="mt-4">
                <h3 className="font-semibold text-xl mb-3">Requirements</h3>
                <ul className=" list-inside text-sm">
                    {job.requirements.map((req, idx) => (
                        <li key={idx} className='mb-5'> <svg className='inline mr-2' height="12" viewBox="384 349 257 512" width="12" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <path d="M640,604.16L384,860.16L384,348.16Z" fill="#0270ad" fill-opacity="1">
                            </path>
                        </svg> {req}</li>
                    ))}
                </ul>
            </div>

            <div className="mt-4">
                <h3 className="font-semibold text-xl mb-3">Benefits</h3>
                <ul className="list-inside text-sm">
                    {job.benefits.map((benefit, idx) => (
                        <li key={idx} className='mb-5'>
                            <svg className='inline mr-2' height="12" viewBox="384 349 257 512" width="12" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <path d="M640,604.16L384,860.16L384,348.16Z" fill="#0270ad" fill-opacity="1">
                                </path>
                            </svg>
                            {benefit}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const jobData = {
    title: "Senior UI/UX Designer",
    type: "Full-time",
    location: "Remote",
    description: "This is a paid, fully remote, full-time role open to international applicants.",
    responsibilities: [
        "Work with a team of technically sophisticated engineers who put users first to craft new products and features that impact hundreds of thousands of engineers around the world",
        "Partner with business, product and design to translate growth strategies into technical plans",
        "Scope, design, and develop new technical projects, laying the groundwork for early-stage products to iteratively evolve and scale",
        "Uphold our high engineering standards and bring consistency to the many codebases and processes you will encounter",
        "Motivated by solving hard problems, and measuring your success in terms of impact doing so",
        "Thrive in a highly collaborative environment involving different stakeholders and subject matter experts",
    ],
    requirements: [
        "5+ years of software development experience...",
        "Skilled in React, TypeScript, Tailwind...",
        // more items...
    ],
    benefits: [
        "Flexible schedule",
        "Paid time off",
        "Work from home",
        // more...
    ]
};

const JobDetailsPage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null); // Required to avoid ReferenceError
    const [isDragging, setIsDragging] = useState(false);

    const { toast } = useToast();


    const [uploadedResume, setUploadedResume] = useState(null);

    const handleResumeUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Optional: Validate file type/size here
            setUploadedResume(file);
            console.log('Selected file:', file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/pdf') {
            setUploadedResume(file);
            console.log('Dropped PDF:', file);
        } else {
            alert('Please upload a PDF file.');
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };


    // Handlers for form submission
    const handleApplySubmit = (e) => {
        e.preventDefault();
        alert('Application submitted!');
        setModalOpen(false);
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        alert('Registered successfully!');
        setModalOpen(false);
    };


    return (

        <div className="animate-fade-in ">
            <section className="bg-gradient-to-br from-precisedBlue to-blue-700 text-white py-20 md:py-32" style={{
                backgroundImage: "url('../src/assets/img/banner_01.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundBlendMode: "soft-light"
            }}
            >
                <div className="container-custom text-left !ml-[20px]">
                    <div style={{ maxWidth: "50%" }}>
                        <motion.h1
                            className="text-4xl md:text-6xl font-bold mb-6 text-secondary" style={{ lineHeight: "initial" }}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Get Your <span className='text-precisedBlue'>Dream Job</span> <br /> Today!
                        </motion.h1>
                        <motion.p
                            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-precisedBlue"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Explore all the most exciting job roles <br />based on your inerest and study major.
                        </motion.p>
                    </div>

                </div>
            </section >


            <section className="section-padding bg-gray-100/70">
                <div className="container-custom">

                    <JobDetailsCard

                        jobSalary='100000'
                        delay='0.3'
                        jobTitle="Senior Developer"
                        jobLocation="Gurugram"
                        companyName="Amazon"
                        companyRating="3.4"
                        companyLogo="../src/assets/img/company_logo/amazon-2-logo-svgrepo-com.svg"
                        jobExperience="3-4"
                        setModalType={setModalType}
                        setModalOpen={setModalOpen}
                        handleResumeUpload

                    />
                    <JobDescription job={jobData} />

                </div>
            </section>


            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalType === 'apply' ? "Apply for Job" : "Register to Apply"}
                save={modalType === 'apply' ? (< button type="submit" className="text-white rounded flex items-center">
                    Submit Application
                    <span className="ml-1">
                        <Send size={20} />
                    </span>
                </button>) : (< button type="submit" className="text-white rounded flex items-center">
                    Register

                </button>)}

            >
                {modalType === 'apply' && (
                    <>
                        {/* <h3>Apply for Job</h3> */}
                        <div className="container max-w-3xl ">
                            <form onSubmit={handleApplySubmit} className="space-y-4">
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Full Name</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring focus:outline-none"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-sm font-medium">Email</label>
                                    <input
                                        type="email"
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring focus:outline-none"
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-sm font-medium">Phone</label>
                                    <input
                                        type="tel"
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring focus:outline-none"
                                        placeholder="+91 9876543210"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-sm font-medium">Resume (PDF)</label>


                                    <div className={`mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 transition-colors duration-300 ${isDragging ? 'bg-indigo-50' : 'bg-white'
                                        }`}
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}>
                                        <div className="text-center">
                                            <svg className="mx-auto size-12 text-red-300"

                                                fill="currentColor"
                                                aria-hidden="true" viewBox="128 178 768 854"  >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M213.333,262.827L640,262.827L640,433.493L810.667,433.493L810.667,945.493L213.333,945.493ZM170.667,177.493C158.72,177.493 148.622,181.618 140.373,189.867C132.124,198.116 128,208.213 128,220.16L128,988.16C128,1000.11 132.124,1010.2 140.373,1018.45C148.622,1026.7 158.72,1030.83 170.667,1030.83L853.333,1030.83C865.28,1030.83 875.378,1026.56 883.627,1018.03C891.875,1009.49 896,999.538 896,988.16L896,390.827L682.667,177.493ZM448,412.16C448,445.724 443.449,481.564 434.347,519.68C425.244,557.796 412.444,595.342 395.947,632.32C379.449,669.298 360.391,702.862 338.773,733.013C317.156,763.164 294.969,787.342 272.213,805.547L322.56,874.667C390.258,829.156 455.111,796.16 517.12,775.68C588.8,751.787 656.213,744.391 719.36,753.493L738.987,670.72C701.44,658.204 666.88,638.293 635.307,610.987C603.733,583.68 578.844,552.391 560.64,517.12C542.436,481.849 533.333,446.862 533.333,412.16ZM473.6,667.307C484.978,641.138 494.933,614.684 503.467,587.947C523.947,619.236 548.409,647.396 576.853,672.427C536.462,679.253 495.502,690.916 453.973,707.413C460.8,694.329 467.342,680.96 473.6,667.307Z" fill-opacity="1">
                                                </path>
                                            </svg>

                                            <div className="mt-4 flex text-sm text-gray-600 items-center justify-center">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                >
                                                    <span>Upload a file</span>
                                                    <input
                                                        id="file-upload"
                                                        name="file-upload"
                                                        accept=".pdf"
                                                        type="file"
                                                        className="sr-only"
                                                        onChange={handleResumeUpload}
                                                    />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>

                                            <p className="text-xs text-gray-600">PDF up to 10MB</p>
                                            {uploadedResume && (
                                                <p className="mt-4 text-sm text-gray-700">
                                                    Selected File: <strong>{uploadedResume.name}</strong>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* test */}


                                {/* test */}

                                <div>
                                    <label className="block mb-1 text-sm font-medium">Message (Optional)</label>
                                    <textarea
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none"
                                        rows="4"
                                        placeholder="Write a message or cover letter..."
                                    />
                                </div>


                            </form>
                        </div>
                    </>
                )}

                {modalType === 'register' && (
                    <>
                        {/* <h3>Register to Apply</h3> */}


                        <form onSubmit={handleRegisterSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1 text-sm font-medium">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Jane Doe"
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    placeholder="email@example.com"
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium">Password</label>
                                <input
                                    type="password"
                                    placeholder="********"
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium">Confirm Password</label>
                                <input
                                    type="password"
                                    placeholder="********"
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none"
                                    required
                                />
                            </div>

                        </form>
                    </>
                )}
            </Modal>
        </div >
    );
};

export default JobDetailsPage;