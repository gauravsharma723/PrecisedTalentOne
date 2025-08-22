
import React from 'react';
import { Briefcase, Globe, Award, Users, Target, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ValueCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <Card className="h-full text-center p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-center mb-4">
        {React.createElement(icon, { size: 40, className: "text-precisedBlue" })}
      </div>
      <h3 className="text-xl font-semibold text-precisedDarkGray mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  </motion.div>
);

const AboutUsPage = () => {
  return (
    <div className="animate-fade-in section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-precisedDarkGray mb-4">
            About <span className="text-precisedBlue">Precised Talent</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Your trusted partner in navigating the complexities of talent acquisition within the dynamic logistics, freight forwarding, and transportation sectors.
          </p>
        </motion.div>

        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                alt="Modern office interior with a team working"
                className="rounded-lg shadow-xl w-full h-auto object-cover "
                src="src/assets/img/about_us/aboutUs02.png" />

              {/* https://images.unsplash.com/photo-1651009188116-bb5f80eaf6aa */}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-semibold text-precisedDarkGray mb-6">Our Mission & Vision</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Target size={28} className="text-precisedBlue mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-precisedDarkGray mb-1">Mission</h3>
                    <p className="text-muted-foreground">
                      To meticulously connect exceptional talent with leading organizations in the logistics and supply chain industries, fostering growth and success for both individuals and businesses through precise, ethical, and efficient recruitment solutions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Globe size={28} className="text-precisedBlue mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-precisedDarkGray mb-1">Vision</h3>
                    <p className="text-muted-foreground">
                      To be the most trusted and sought-after recruitment partner globally for the freight forwarding, transportation, and logistics sectors, recognized for our deep industry knowledge, unwavering commitment to quality, and transformative impact on careers and companies.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mb-16 py-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
          <h2 className="text-3xl font-semibold text-precisedDarkGray text-center mb-10">
            Our Core Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-8">
            <ValueCard icon={CheckCircle} title="Integrity" description="Upholding the highest ethical standards in all our interactions." delay={0.1} />
            <ValueCard icon={Briefcase} title="Expertise" description="Leveraging deep industry knowledge for precise placements." delay={0.2} />
            <ValueCard icon={Users} title="Partnership" description="Building long-term relationships based on trust and mutual success." delay={0.3} />
            <ValueCard icon={Award} title="Excellence" description="Striving for outstanding results and exceeding expectations." delay={0.4} />
          </div>
        </section>

        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="order-last md:order-first"
            >
              <h2 className="text-3xl font-semibold text-precisedDarkGray mb-6">Experience & Reach</h2>
              <p className="text-muted-foreground mb-4">
                With over a decade of dedicated experience, Precised Talent has cultivated an extensive network and a profound understanding of the global logistics landscape. We've successfully placed candidates in diverse roles across continents, adapting to regional nuances and industry demands.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center"><Briefcase size={20} className="text-precisedBlue mr-3" /> Over 10 years of specialized recruitment experience.</li>
                <li className="flex items-center"><Globe size={20} className="text-precisedBlue mr-3" /> Global network spanning key logistics hubs.</li>
                <li className="flex items-center"><Award size={20} className="text-precisedBlue mr-3" /> Proven success in staffing for mid-sized to large corporations.</li>
                <li className="flex items-center"><Users size={20} className="text-precisedBlue mr-3" /> A dedicated team of industry-savvy consultants.</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-first md:order-last"
            >

              <img
                alt="Global map with connection lines"
                className="rounded-lg shadow-xl w-full h-auto object-cover"
                src="src/assets/img/IndianMapOnGlobe.png" />


              {/* https://images.unsplash.com/photo-1552764217-6d34d9795ab9 */}

            </motion.div>
          </div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <h2 className="text-2xl font-semibold text-precisedDarkGray mb-4">
            Let's Build the Future of Logistics, Together.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Partner with Precised Talent and experience the difference that specialized expertise and a commitment to excellence can make.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUsPage;
