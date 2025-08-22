import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';


const JobListCard = ({ jobId, cardColor, icon, jobTitle, description, delay, companyName, postedDate, jobType, jobLevel, jobMode, companyLogo, jobSalary, jobLocation }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
    >
        <Card className="text-left border-2 border-grey-600 h-full hover:shadow-xl transition-shadow duration-300 rounded-3xl ">
            {/* <CardHeader className="pb-1">
        <div className="me-auto bg-precisedBlue/10 text-precisedBlue p-3 rounded w-fit">
          {React.createElement(icon, { size: 32 })}
        </div>
        <CardTitle className="mt-4 text-xl text-precisedDarkGray">{title}</CardTitle>
      </CardHeader> */}
            <CardContent className={`${cardColor || 'bg-stone-100'} m-2 rounded-3xl  p-3`}>
                <div className="flex justify-between">
                    <div className="rounded-full w-fit bg-white px-3 py-2 text-xs">
                        {postedDate}
                    </div>

                    {/* hover:scale-110 transition-transform duration-300 */}

                    <div onclick={{}} className="rounded-full border border-transparent w-fit bg-white text-center p-2 flex justify-center align-center hover:bg-slate-200 hover:border hover:cursor-pointer hover:border-slate-300 transition-transform duration-300 ">
                        <a >{React.createElement(icon, { size: 14 })}</a>
                    </div>
                </div>

                <div className="flex flex-col my-2">
                    <span className="text-xs my-2">{companyName}</span>
                    <div className="flex justify-between items-center">
                        <span className="text-xl " style={{ maxWidth: '75%' }}>
                            {jobTitle}
                        </span>
                        {companyLogo ? (
                            // <img
                            //   src={companyLogo}
                            //   className="rounded-full p-2 bg-orange-300"
                            //   width={40}
                            //   alt="Company Logo"
                            // />

                            <div className="w-10 h-10 rounded-full p-2 bg-orange-300 flex items-center justify-center">
                                <img loading="lazy"
                                    src={companyLogo}
                                    className="object-contain w-full h-full"
                                    alt="Company Logo"
                                />
                            </div>
                        ) : (

                            <div className="w-10 h-10 rounded-full bg-white p-2 flex items-center justify-center border border-grey-100">
                                <img loading="lazy"
                                    src={'src/assets/img/company_logo/default_logo.png'}
                                    className="object-contain w-full h-full"
                                    alt="Company Logo"
                                />
                            </div>

                        )}


                    </div>
                    {/* <img
                src="src/assets/img/company_logo/default_logo.png"
                className="rounded-full w-10 h-10 p-2 object-contain bg-white"
                width={40}
                alt="Default Logo"
                style={{ maxWidth: '100%' }}
              /> */}
                    <div className="flex gap-2 my-2 flex-wrap">
                        <span className="rounded-full border border-red-400 bg-transparent text-dark px-[8px] py-[2px] text-xs">
                            {jobType}
                        </span>
                        <span className="rounded-full border border-red-400 bg-transparent text-dark px-[8px] py-[2px] text-xs">
                            {jobLevel}
                        </span>

                        <span className="rounded-full border border-red-400 bg-transparent text-dark px-[8px] py-[2px] text-xs">
                            {jobMode}
                        </span>
                        <span className="rounded-full border border-red-400 bg-transparent text-dark px-[8px] py-[2px] text-xs">
                            {jobLocation}
                        </span>
                    </div>
                </div>
            </CardContent>
            <CardFooter >
                <div className='flex justify-between items-center w-full mt-2 flex-wrap'>
                    <div>
                        <span className="salary text-base font-bold">
                            ₹ {jobSalary}
                        </span>
                        <span className='block text-xs'>
                            {jobLocation}
                        </span>
                    </div>
                    <div>

                        <Link to={`/job-details/${jobId}`} className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out bg-precisedBlue text-white shadow-lg">
                            Details
                        </Link>

                    </div>
                </div>
            </CardFooter>
        </Card>
    </motion.div >
);

export default JobListCard;