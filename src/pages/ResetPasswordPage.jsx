import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import axios from 'axios';

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { token } = useParams(); // get token from route
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast({
                title: 'Passwords do not match',
                variant: 'destructive',
            });
            return;
        }

        try {
            const res = await axios.post('http://localhost:3001/api/auth/reset-password', {
                token,
                password,
            });

            if (res.status === 200) {
                toast({
                    title: 'Password Reset Successful',
                    description: 'You can now login with your new password.',
                });
                navigate('/login');
            }
        } catch (error) {
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
                        <img className="w-full animate-float" src="../src/assets/img/loginIcons/reset-password.svg" alt="Reset Password" />
                    </div>
                    <Card className="order-first md:order-none w-full bg-white/90 backdrop-blur-sm p-2 md:px-14 rounded-2xl md:rounded-3xl md:rounded-tl-none md:rounded-bl-none">
                        <CardHeader className="text-center p-1 mb-6">
                            <div className="flex justify-center">
                                <a href="/"><img src="../src/assets/img/logo/logo-light.svg" width="80" alt="Logo" /></a>
                            </div>
                            <CardTitle className="text-3xl font-semibold text-precisedDarkGray">Reset Password</CardTitle>
                            <CardDescription className="text-muted-foreground text-xs px-8">
                                Enter your new password below to reset your account.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <Label htmlFor="password">New Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter new password"
                                        required
                                        className="bg-white/70"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm new password"
                                        required
                                        className="bg-white/70"
                                    />
                                </div>
                                <Button type="submit" className="w-full bg-precisedBlue hover:bg-blue-700 text-white text-lg py-3">
                                    Reset Password
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

export default ResetPasswordPage;
