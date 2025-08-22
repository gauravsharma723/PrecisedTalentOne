
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';


const isSecure = window.location.protocol === 'https:';


const ContactInfoItem = ({ icon, title, children, delay }) => (
  <motion.div
    className="flex items-start space-x-4 p-4 bg-blue-50/50 rounded-lg"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="flex-shrink-0 text-precisedBlue">
      {React.createElement(icon, { size: 28 })}
    </div>
    <div>
      <h3 className="text-lg font-semibold text-precisedDarkGray">{title}</h3>
      <div className="text-muted-foreground">{children}</div>
    </div>
  </motion.div>
);

const ContactUsPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact Form Submitted:', formData);

    const contactSubmissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
    contactSubmissions.push({ ...formData, submissionDate: new Date().toISOString() });
    localStorage.setItem('contactSubmissions', JSON.stringify(contactSubmissions));

    toast({
      title: 'Message Sent!',
      description: `Thank you, ${formData.name}. We'll be in touch soon.`,
      variant: 'default',
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
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
            Get In <span className="text-precisedBlue">Touch</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're here to help. Whether you're an employer looking for talent or a candidate seeking new opportunities, reach out to us.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-semibold text-precisedDarkGray mb-4">Contact Information</h2>
            <ContactInfoItem icon={MapPin} title="Our Office" delay={0.3}>
              <p>Sector 22, Noida,</p>
              <p> G.B. Nagar,
                Uttar Pradesh, 201301</p>
              <p>India</p>
            </ContactInfoItem>
            <ContactInfoItem icon={Phone} title="Call Us" delay={0.4}>

              <a href="tel:+91-999-999-9999" className="hover:text-precisedBlue ">+91-999-999-9999</a>
              <p>Mon - Fri, 9am - 5pm (IST)</p>
            </ContactInfoItem>
            <ContactInfoItem icon={Mail} title="Email Us" delay={0.5}>
              <a href="mailto:info@precisedtalent.com" className="hover:text-precisedBlue">info@precisedtalent.com</a>
              <p>We typically respond within 24 hours.</p>
            </ContactInfoItem>
            <div className="mt-8">
              {/* <img alt="Map showing office location" className="rounded-lg shadow-md w-full h-64 object-contain" src="src/assets/img/contactUs.png" /> */}

              {isSecure ? (
                <iframe
                  title="Google Map - Sector 22, Noida"
                  src="https://www.google.com/maps/embed?pb=..."
                  className="rounded-lg shadow-md w-full h-64"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <img
                  alt="Map showing office location"
                  className="rounded-lg shadow-md w-full h-64 object-contain bg-precisedBlue/5"
                  src="src/assets/img/contactUs.png"
                />
              )}



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
                  <Send className="mr-2" /> Send Us a Message
                </CardTitle>
                <CardDescription>
                  Have a question or inquiry? Fill out the form below.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="your.email@example.com" required />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" value={formData.subject} onChange={handleChange} placeholder="e.g., Talent Inquiry, Job Application Question" required />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" value={formData.message} onChange={handleChange} placeholder="Your message here..." rows={5} required />
                  </div>
                  <Button type="submit" className="w-full bg-precisedBlue hover:bg-blue-700 text-white">
                    Send Message <Send className="ml-2 h-5 w-5" />
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

export default ContactUsPage;
