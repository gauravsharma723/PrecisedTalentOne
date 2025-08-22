import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    company: { type: String },
    companyLogo: { type: String },
    postedDate: { type: Date, default: Date.now },
    jobType: { type: String },
    jobLevel: { type: String },
    jobMode: { type: String },
    salary: { type: String },
    location: { type: String }
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);

