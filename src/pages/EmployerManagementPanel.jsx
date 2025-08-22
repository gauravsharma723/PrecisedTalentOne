import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, CheckCircle, XCircle, ShieldOff } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const EmployerManagementPanel = () => {
    const [employers, setEmployers] = useState([]);
    const { toast } = useToast();

    useEffect(() => {
        // Fetch all employers from the API (replace with real endpoint)
        const storedEmployers = JSON.parse(localStorage.getItem('employers')) || [];
        setEmployers(storedEmployers);
    }, []);

    const updateStatus = (id, status) => {
        const updatedEmployers = employers.map(emp =>
            emp.id === id ? { ...emp, status } : emp
        );
        setEmployers(updatedEmployers);
        localStorage.setItem('employers', JSON.stringify(updatedEmployers));
        toast({
            title: `Employer ${status === 'approved' ? 'Approved' : 'Rejected'}`,
            description: `The employer has been ${status}.`,
        });
    };

    return (
        <Card className="mt-10 shadow-md">
            <CardHeader>
                <CardTitle>Employers Management</CardTitle>
                <CardDescription>Approve or manage all employer accounts.</CardDescription>
            </CardHeader>
            <CardContent>
                {employers.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2">Company</th>
                                    <th className="px-4 py-2">Email</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employers.map((emp) => (
                                    <tr key={emp.id} className="bg-white border-b">
                                        <td className="px-4 py-3 font-medium text-gray-900">{emp.companyName}</td>
                                        <td className="px-4 py-3">{emp.email}</td>
                                        <td className="px-4 py-3 capitalize">{emp.status}</td>
                                        <td className="px-4 py-3 space-x-2">
                                            <Button size="sm" variant="outline"><Eye className="w-4 h-4" /></Button>
                                            {emp.status === 'pending' && (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        className="bg-green-500 hover:bg-green-600 text-white"
                                                        onClick={() => updateStatus(emp.id, 'approved')}
                                                    >
                                                        <CheckCircle className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        className="bg-red-500 hover:bg-red-600 text-white"
                                                        onClick={() => updateStatus(emp.id, 'rejected')}
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                    </Button>
                                                </>
                                            )}
                                            {emp.status === 'approved' && (
                                                <Button
                                                    size="sm"
                                                    className="bg-yellow-500 hover:bg-yellow-600 text-white"
                                                    onClick={() => updateStatus(emp.id, 'suspended')}
                                                >
                                                    <ShieldOff className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-muted-foreground text-center py-4">No employer records found.</p>
                )}
            </CardContent>
        </Card>
    );
};

export default EmployerManagementPanel;