
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Briefcase, Users, Building, Phone, FolderHeart as HomeIcon, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext'; // adjust this path if needed
import { useNavigate } from 'react-router-dom';

import SimpleUserDropdown from './ui/simpleuserdropdown'



const NavItem = ({ to, children, Icon }) => (

  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center px-3 py-2 rounded-full text-sm font-medium transition-colors duration-150 ease-in-out ${isActive
        ? 'bg-precisedBlue text-white shadow-lg rounded-bl-[0px]'
        : 'text-precisedDarkGray hover:bg-blue-100 hover:text-precisedBlue hover:rounded-bl-[0px]'
      }`
    }
  >
    <Icon className="w-5 h-5 mr-2" />
    {children}
  </NavLink>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { isAuthenticated, user, logout } = useAuth();


  const navigate = useNavigate(); // 👈 Add this

  // ... your navLinks, etc

  const handleLogout = () => {
    // clear any auth tokens or session data here
    setIsOpen(false); // Close dropdown

    logout();

    // optionally redirect to home or login page
    navigate('/login'); // 👈 Redirects to login
  };

  const handleLogin = () => {
    // This is a mock login for demo
    // setIsLoggedIn(true);
  };

  const navLinks = [
    { to: '/', text: 'Home', Icon: HomeIcon },
    { to: '/about', text: 'About Us', Icon: Info },
    { to: '/employers', text: 'Employers', Icon: Building },
    { to: '/job-seekers', text: 'Job Seekers', Icon: Briefcase },
    { to: '/contact', text: 'Contact Us', Icon: Phone },
  ];

  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: "auto" },
  };



  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">

              <img className='logo' src="src/assets/img/logo/logo-light.svg" width="100" />
              {/* <span className="text-2xl font-bold text-precisedBlue">Precised</span>
                  <span className="text-2xl font-bold text-precisedDarkGray">Talent</span> */}
            </Link>
          </div>
          {/* <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map(link => (
                <NavItem key={link.to} to={link.to} Icon={link.Icon}>
                  {link.text}
                </NavItem>
              ))}
              <Link to="/login">
                <Button variant="" className="ml-4 border-precisedBlue text-white ease-in-out delay-100 transition-all hover:scale-x-105  hover:text-white">
                  Candidate Login
                </Button>
              </Link>

              <Link to="/login">
                <Button variant="outline" className="ml-4 border-precisedBlue text-precisedBlue hover:bg-precisedBlue hover:text-white delay-100 transition-all hover:scale-x-105" >
                  Company Login
                </Button>
              </Link>
            </div>
          </div> */}

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map(link => (
                <NavItem key={link.to} to={link.to} Icon={link.Icon}>
                  {link.text}
                </NavItem>
              ))}

              {!isAuthenticated ? (
                <>
                  <Link to="/login">
                    <Button
                      variant=""
                      className="ml-4 border-precisedBlue text-white hover:scale-x-105 transition-all"
                      onClick={handleLogin} // For demo; normally handled by your login page
                    >
                      Candidate Login
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button
                      variant="outline"
                      className="ml-4 border-precisedBlue text-precisedBlue hover:bg-precisedBlue hover:text-white transition-all"
                    >
                      Company Login
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  {/* <Button
                    variant="outline"
                    className="ml-4 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button> */}


                  <SimpleUserDropdown user={{ name: user.name, email: user.email }} onLogout={handleLogout} />

                </>
              )}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <Link to="/login" className="mr-2">
              <Button size="sm" variant="outline" className="border-precisedBlue text-precisedBlue hover:bg-precisedBlue hover:text-white">
                Candidate
              </Button>
            </Link>
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="ghost"
              size="icon"
              className="text-precisedDarkGray hover:text-precisedBlue"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      {/* 
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden overflow-hidden"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map(link => (
            <NavItem key={link.to} to={link.to} Icon={link.Icon}>
              {link.text}
            </NavItem>
          ))}
        </div>
      </motion.div> */}

      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden overflow-hidden"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map(link => (
            <NavItem key={link.to} to={link.to} Icon={link.Icon}>
              {link.text}
            </NavItem>
          ))}

          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <Button
                  variant=""
                  className="w-full mt-2 border-precisedBlue text-white transition-all"
                  onClick={handleLogin}
                >
                  Candidate Login
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="outline"
                  className="w-full mt-2 border-precisedBlue text-precisedBlue transition-all"
                >
                  Company Login
                </Button>
              </Link>
            </>
          ) : (
            <Button
              variant="outline"
              className="w-full mt-2 border-red-500 text-red-500 transition-all"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </div>
      </motion.div>



    </nav>
  );
};

export default Navbar;
