
import { mockMonthlyReports, mockInvoices } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Reports = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Generate and view financial reports</p>
        </div>
        <div className="flex gap-4">
          <Select defaultValue="current">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Year</SelectItem>
              <SelectItem value="previous">Previous Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>
      
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Monthly Revenue</CardTitle>
          <CardDescription>Overview of invoiced and paid amounts by month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockMonthlyReports}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Bar name="Total Invoiced" dataKey="totalInvoiced" fill="#3498db" />
                <Bar name="Total Paid" dataKey="totalPaid" fill="#2ecc71" />
                <Bar name="Total Overdue" dataKey="totalOverdue" fill="#e74c3c" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockMonthlyReports.map((report, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <div className="font-medium">{report.month} {report.year}</div>
                    <div className="text-sm text-muted-foreground">{report.invoiceCount} invoices</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(report.totalPaid)}</div>
                    {report.totalOverdue > 0 && (
                      <div className="text-sm text-red-600">
                        {formatCurrency(report.totalOverdue)} overdue
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Payment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-medium">Paid</div>
                  <div className="text-sm text-muted-foreground">
                    {mockInvoices.filter(inv => inv.status === 'paid').length} invoices
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500" 
                    style={{ 
                      width: `${(mockInvoices.filter(inv => inv.status === 'paid').length / mockInvoices.length) * 100}%` 
                    }} 
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-medium">Pending</div>
                  <div className="text-sm text-muted-foreground">
                    {mockInvoices.filter(inv => inv.status === 'pending').length} invoices
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-500" 
                    style={{ 
                      width: `${(mockInvoices.filter(inv => inv.status === 'pending').length / mockInvoices.length) * 100}%` 
                    }} 
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-medium">Overdue</div>
                  <div className="text-sm text-muted-foreground">
                    {mockInvoices.filter(inv => inv.status === 'overdue').length} invoices
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-500" 
                    style={{ 
                      width: `${(mockInvoices.filter(inv => inv.status === 'overdue').length / mockInvoices.length) * 100}%` 
                    }} 
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Button className="w-full">Download Payment Report</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
