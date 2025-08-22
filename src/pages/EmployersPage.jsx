
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Building, Users, CheckSquare, ArrowRight, Award, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const BenefitItem = ({ icon, title, description, delay }) => (
  <motion.div
    className="flex items-start space-x-4"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="flex-shrink-0 text-precisedBlue bg-blue-100 p-3 rounded-full">
      {React.createElement(icon, { size: 24 })}
    </div>
    <div>
      <h3 className="text-lg font-semibold text-precisedDarkGray">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </motion.div>
);

const EmployersPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    roleNeeded: '',
    jobDescription: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Talent Request Submitted:', formData);

    const talentRequests = JSON.parse(localStorage.getItem('talentRequests')) || [];
    talentRequests.push(formData);
    localStorage.setItem('talentRequests', JSON.stringify(talentRequests));

    toast({
      title: 'Request Submitted!',
      description: 'Thank you for your talent request. We will contact you shortly.',
      variant: 'default',
    });
    setFormData({
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      roleNeeded: '',
      jobDescription: '',
    });
  };

  return (
    <div className="animate-fade-in section-padding">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-precisedDarkGray mb-4">
            Partner with <span className="text-precisedBlue">Precised Talent</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Access top-tier professionals in freight forwarding, transportation, and logistics. Let us help you build a high-performing team.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-semibold text-precisedDarkGray mb-6">Why Choose Us?</h2>
            <div className="space-y-6">
              <BenefitItem icon={Award} title="Specialized Expertise" description="Deep understanding of the skills and experience required in your industry." delay={0.3} />
              <BenefitItem icon={Search} title="Targeted Search" description="We identify and attract candidates that precisely match your requirements." delay={0.4} />
              <BenefitItem icon={Users} title="Vetted Professionals" description="Rigorous screening to ensure you meet only qualified and motivated individuals." delay={0.5} />
              <BenefitItem icon={CheckSquare} title="Efficient Process" description="Streamlined recruitment to save you time and resources, delivering results quickly." delay={0.6} />
            </div>
            <div className="mt-8">
              <img alt="Business professionals shaking hands" className="rounded-lg shadow-md w-full" src="src/assets/img/employersPageImage.webp" />

              {/* https://images.unsplash.com/photo-1566304660263-c15041ac11c0 */}

            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="shadow-xl border-precisedBlue border-t-4">
              <CardHeader>
                <CardTitle className="text-2xl text-precisedBlue flex items-center">
                  <Building className="mr-2" /> Request Talent
                </CardTitle>
                <CardDescription>
                  Fill out the form below, and one of our expert consultants will contact you to discuss your specific needs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" value={formData.companyName} onChange={handleChange} placeholder="Your Company Inc." required />
                  </div>
                  <div>
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    <Input id="contactPerson" value={formData.contactPerson} onChange={handleChange} placeholder="John Doe" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="john.doe@example.com" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="(123) 456-7890" />
                  </div>
                  <div>
                    <Label htmlFor="roleNeeded">Role(s) Needed</Label>
                    <Input id="roleNeeded" value={formData.roleNeeded} onChange={handleChange} placeholder="e.g., Logistics Coordinator, Freight Broker" required />
                  </div>
                  <div>
                    <Label htmlFor="jobDescription">Brief Job Description / Requirements</Label>
                    <Textarea id="jobDescription" value={formData.jobDescription} onChange={handleChange} placeholder="Tell us about the skills, experience, and responsibilities..." rows={4} required />
                  </div>
                  <Button type="submit" className="w-full bg-precisedBlue hover:bg-blue-700 text-white">
                    Submit Request <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EmployersPage;
