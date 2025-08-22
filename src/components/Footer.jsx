
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-precisedDarkGray text-gray-300 py-12 pb-5">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>

            <img className="mb-2" src="src/assets/img/logo/logo-white.svg" style={{ width: '50%' }}
              alt="" />
            <h2 className="text-xl font-semibold text-white mb-4">Precised Talent</h2>
            <p className="text-sm leading-relaxed">
              Connecting skilled professionals with leading companies in freight forwarding, transportation, and logistics.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-precisedBlue transition-colors">About Us</Link></li>
              <li><Link to="/employers" className="hover:text-precisedBlue transition-colors">For Employers</Link></li>
              <li><Link to="/job-seekers" className="hover:text-precisedBlue transition-colors">For Job Seekers</Link></li>
              <li><Link to="/contact" className="hover:text-precisedBlue transition-colors">Contact Us</Link></li>
              <li><Link to="/admin/login" className="hover:text-precisedBlue transition-colors">Admin</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-1  flex-shrink-0" />
                <span>Sector 22, Noida, G.B. Nagar,
                  Uttar Pradesh, 201301</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 mt-1 " />
                <a href="tel:+91-999-999-9999" className="hover:text-precisedBlue transition-colors">+91-999-999-9999</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 mt-1" />
                <a href="mailto:info@precisedtalent.com" className="hover:text-precisedBlue transition-colors">info@precisedtalent.com</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-precisedBlue transition-colors"><Facebook size={24} /></a>
              {/* <a href="#" className="text-gray-400 hover:text-precisedBlue transition-colors"><Twitter size={24} /></a> */}
              <a href="#" className="text-gray-400 hover:text-precisedBlue transition-colors"><Linkedin size={24} /></a>
            </div>
          </div>
        </div>
        {/* bg-green-500 */}
        <div className="mt-10 pt-2 border-t border-gray-700 text-center text-sm ">
          <p>&copy; {currentYear} Precised Talent. All Rights Reserved.</p>
          <p className="mt-1">
            <Link to="/privacy-policy" className="hover:text-precisedBlue transition-colors">Privacy Policy</Link> |
            <Link to="/terms-of-service" className="hover:text-precisedBlue transition-colors ml-2">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
