import React, { useEffect, useState } from 'react';
import { DollarSign, Clock, CalendarCheck } from 'lucide-react';

const SalaryReport: React.FC = () => {
    const [payrollData, setPayrollData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const INSTRUCTOR_ID = 'u1';

    useEffect(() => {
        const fetchPayroll = async () => {
            try {
                const res = await fetch(`http://localhost:5001/api/classes/payroll?instructorId=${INSTRUCTOR_ID}`);
                if (res.ok) {
                    const data = await res.json();
                    setPayrollData(data);
                }
            } catch (error) {
                console.error("Error fetching payroll", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPayroll();
    }, []);

    if (loading) return <div>Loading Financials...</div>;
    if (!payrollData) return <div>Error loading data</div>;

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold">Financial Report / Salary</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-3xl bg-gradient-to-br from-green-500 to-emerald-700 text-white shadow-lg">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-2 rounded-full bg-white/20">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold opacity-90">Total Earnings</h3>
                    </div>
                    <p className="text-4xl font-black">${payrollData.totalAmount}</p>
                    <p className="text-sm opacity-70">Unpaid Balance</p>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-blue-100/60">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                            <Clock className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold opacity-70">Billable Hours</h3>
                    </div>
                    <p className="text-3xl font-black">{payrollData.totalHours} hrs</p>
                    <p className="text-sm opacity-50">Rate: ${payrollData.hourlyRate}/hr</p>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-blue-100/60">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                            <CalendarCheck className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold opacity-70">Completed Classes</h3>
                    </div>
                    <p className="text-3xl font-black">{payrollData.history.length}</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-blue-100/60 overflow-hidden">
                <div className="p-6 border-b border-blue-100/60">
                    <h3 className="font-bold">Earnings History</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-blue-50/30">
                            <tr>
                                <th className="p-4 text-sm font-bold opacity-60">Date</th>
                                <th className="p-4 text-sm font-bold opacity-60">Class</th>
                                <th className="p-4 text-sm font-bold opacity-60">Status</th>
                                <th className="p-4 text-sm font-bold opacity-60 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payrollData.history.length > 0 ? (
                                payrollData.history.map((record: any) => (
                                    <tr key={record.id} className="border-b border-blue-100/60 last:border-0 hover:bg-blue-50/30 transition-colors">
                                        <td className="p-4 font-medium">{new Date(record.startTime).toLocaleDateString()}</td>
                                        <td className="p-4 font-medium">{record.title}</td>
                                        <td className="p-4">
                                            <span className="px-2 py-1 rounded-md bg-green-100 text-green-700 text-xs font-bold uppercase">Paid</span>
                                        </td>
                                        <td className="p-4 font-bold text-right">${payrollData.hourlyRate}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center opacity-50">No earning history yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SalaryReport;
