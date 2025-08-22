import React, { useState } from 'react';
import axios from 'axios';  // <-- Import axios!
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react'; // Import icons for toggling




const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // Inside your component:
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:3001/api/auth/login', { email, password });
      //console.log("data", res);


      const { token, user } = res.data;

      // Save token & user info (you might want to move this into your AuthContext login)
      localStorage.setItem('precisedTalentToken', res.data.token);
      localStorage.setItem('precisedTalentUser', JSON.stringify(res.data.user));

      // Call login context method if you have one
      if (login) login(res.data.token, res.data.user);

      console.log("User", user.role);

      if (user.role === 'admin') navigate('/admin/dashboard');
      else if (user.role === 'employer') navigate('/employer/dashboard');
      else if (user.role === 'candidate') navigate('/candidate/dashboard');


      // if (user.role === 'admin') {
      //   navigate('/admin-dashboard');


      // }

      // else
      //   navigate('/'); // or wherever you want to redirect

      toast({ title: 'Success', description: 'Logged in successfully!' });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      toast({ title: 'Error', description: err.response?.data?.message || 'Login failed', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[rgba(169,223,191,1)] via-[rgba(88,180,221,0.27)] to-[rgba(0,135,254,0.25)] p-4">
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <div className="grid grid-cols-1 gap-0 max-w-7xl rounded-md md:grid-cols-2">
          <div className="shadow-2xl bg-gradient-to-br from-[rgba(0,73,188,0.82)] to-[rgba(2,112,173,0.7)] rounded-2xl rounded-t-none md:rounded-3xl md:rounded-tr-none md:rounded-br-none p-20 flex justify-center items-center">
            <img className="w-full max-w-full animate-float" src="../src/assets/img/loginIcons/login-icon.svg" alt="Login Illustration" />
          </div>
          <Card className="order-first md:order-none w-full shadow-2xl bg-white/90 backdrop-blur-sm p-2 md:px-14 rounded-2xl rounded-b-none md:rounded-3xl md:rounded-tl-none md:rounded-bl-none">
            <CardHeader className="text-center p-1 mb-6">
              <div className="flex justify-between items-center">
                <a href="/">
                  <img src="../src/assets/img/logo/logo-light.svg" width="80" alt="Precised Talent Logo" />
                </a>
                <div className="text-sm">
                  Don't have an account?{' '}
                  <Link to="/sign-up" className="text-precisedBlue">
                    Sign Up
                  </Link>
                </div>
              </div>
              <CardTitle className="text-3xl mb-1 font-semibold text-precisedDarkGray">Login</CardTitle>
              <CardDescription className="text-muted-foreground text-xs px-8">
                Now you can apply to your dream job here in Precised Talent
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    required
                    className="bg-white/70"
                  />
                </div>
                <div className="relative">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="bg-white/70"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-9 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div className="flex justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-md focus:ring-blue-500"
                    />
                    <label htmlFor="remember-me" className="ml-2 text-sm font-medium text-gray-900">
                      Remember me
                    </label>
                  </div>
                  <Link to="/forgot-password" className="text-precisedBlue text-sm">
                    Forgot Password?
                  </Link>
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <Button type="submit" disabled={loading} className="w-full bg-precisedBlue hover:bg-blue-700 text-white text-lg py-3">
                  <LogIn className="mr-2 h-5 w-5" /> {loading ? 'Logging in...' : 'Secure Login'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">&copy; {new Date().getFullYear()} Precised Talent. All rights reserved.</p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
