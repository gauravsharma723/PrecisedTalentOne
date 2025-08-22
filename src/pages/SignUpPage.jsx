import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

const SignUpPage = () => {

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'candidate',
    });


    const { toast } = useToast();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     if (formData.password !== formData.confirmPassword) {
    //         toast({
    //             title: 'Error',
    //             description: 'Passwords do not match.',
    //             variant: 'destructive',
    //         });
    //         return;
    //     }

    //     // Mock signup logic
    //     toast({
    //         title: 'Account Created',
    //         description: 'You can now login to your account.',
    //     });

    //     navigate('/');
    // };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast({
                title: 'Error',
                description: 'Passwords do not match.',
                variant: 'destructive',
            });
            return;
        }

        try {
            const res = await fetch('http://localhost:3001/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.fullName,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role || 'candidate' // optional
                })

            });

            const data = await res.json();

            if (res.ok) {
                toast({ title: 'Success', description: data.message });
                navigate('/login');
            } else {
                toast({ title: 'Error', description: data.message, variant: 'destructive' });
            }
        } catch (error) {
            console.error(error);
            toast({ title: 'Error', description: 'Something went wrong.', variant: 'destructive' });
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
                    {/* Left side with SVG */}
                    <div className="order-last md:order-first bg-gradient-to-br from-[rgba(0,73,188,0.82)] to-[rgba(2,112,173,0.7)] p-20 rounded-2xl md:rounded-3xl md:rounded-tr-none md:rounded-br-none flex items-center justify-center">
                        <img
                            className="w-full animate-float"
                            src="../src/assets/img/loginIcons/signup-icon.svg"
                            alt="Sign Up Illustration"
                        />
                    </div>

                    {/* Right side with form */}
                    <Card className="order-first md:order-none w-full bg-white/90 backdrop-blur-sm p-2 md:px-14 rounded-2xl md:rounded-3xl md:rounded-tl-none md:rounded-bl-none">
                        <CardHeader className="text-center p-1 mb-6">
                            <div className="flex justify-between items-center">
                                <a href="/"><img src="../src/assets/img/logo/logo-light.svg" width="80" alt="Logo" /></a>
                                <div className="text-sm">
                                    Already a member? <Link to="/login" className="text-precisedBlue">Login</Link>
                                </div>
                            </div>
                            <CardTitle className="text-3xl font-semibold text-precisedDarkGray">Create Account</CardTitle>
                            <CardDescription className="text-muted-foreground text-xs px-8">
                                Join Precised Talent and get closer to your dream job.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        required
                                        className="bg-white/70"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        required
                                        className="bg-white/70"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="role">Account Type</Label>
                                    <select
                                        id="role"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        required
                                        className="bg-white/70 w-full px-3 py-2 rounded border"
                                    >
                                        <option value="candidate">Candidate</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <div>
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        required
                                        className="bg-white/70"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        required
                                        className="bg-white/70"
                                    />
                                </div>
                                <Button type="submit" className="w-full bg-precisedBlue hover:bg-blue-700 text-white text-lg py-3">
                                    Create Account
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

export default SignUpPage;
