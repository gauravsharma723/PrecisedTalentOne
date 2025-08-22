import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:3001/api/auth/forgot-password', { email });

            if (res.status === 200) {
                toast({
                    title: 'Password Reset Email Sent',
                    description: 'Check your inbox for reset instructions.',
                });
                navigate('/');
            }
        } catch (error) {
            console.error(error);

            toast({
                title: 'Error',
                description: error.response?.data?.message || 'Something went wrong.',
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[rgba(169,223,191,1)] via-[rgba(88,180,221,0.27)] to-[rgba(0,135,254,0.25)] p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl shadow-2xl rounded-md">
                    <div className="order-last md:order-first bg-gradient-to-br from-[rgba(0,73,188,0.82)] to-[rgba(2,112,173,0.7)] p-20 rounded-2xl md:rounded-3xl md:rounded-tr-none md:rounded-br-none flex items-center justify-center">
                        <img className="w-full animate-float" src="../src/assets/img/loginIcons/forgot-password.svg" alt="Forgot Password" />
                    </div>
                    <Card className="order-first md:order-none w-full bg-white/90 backdrop-blur-sm p-2 md:px-14 rounded-2xl md:rounded-3xl md:rounded-tl-none md:rounded-bl-none">
                        <CardHeader className="text-center p-1 mb-6">
                            <div className="flex justify-between items-center">
                                <a href="/"><img src="../src/assets/img/logo/logo-light.svg" width="80" alt="Logo" /></a>
                                <div className="text-sm">
                                    Go back to <Link to="/login" className="text-precisedBlue">Login</Link>
                                </div>
                            </div>
                            <CardTitle className="text-3xl font-semibold text-precisedDarkGray">Forgot Password</CardTitle>
                            <CardDescription className="text-muted-foreground text-xs px-8">
                                Enter your email address and we'll send you instructions to reset your password.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        required
                                        className="bg-white/70"
                                    />
                                </div>
                                <Button type="submit" className="w-full bg-precisedBlue hover:bg-blue-700 text-white text-lg py-3">
                                    Send Reset Link
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
                <p className="text-center text-sm text-gray-400 mt-6">
                    &copy; {new Date().getFullYear()} Precised Talent. All rights reserved.
                </p>
            </motion.div>
        </div>
    );
};

export default ForgotPasswordPage;
