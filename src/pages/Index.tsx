
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { mockFinancialSummary, mockInvoices, mockAlerts } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Invoice } from '@/lib/types';
import MetricCard from '@/components/MetricCard';
import InvoiceTable from '@/components/InvoiceTable';
import AlertList from '@/components/AlertList';
import OverdueAlert from '@/components/OverdueAlert';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { toast } = useToast();
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showOverdueAlert, setShowOverdueAlert] = useState(true);

  useEffect(() => {
    // Check for overdue invoices on component mount
    const overdueInvoices = mockInvoices.filter(inv => inv.status === 'overdue');
    if (overdueInvoices.length > 0 && showOverdueAlert) {
      // The OverdueAlert component will handle showing the alert
    }
  }, [showOverdueAlert]);

  const handleViewInvoice = (invoiceId: string) => {
    const invoice = mockInvoices.find(inv => inv.id === invoiceId);
    if (invoice) {
      setSelectedInvoice(invoice);
    }
  };

  const handleMarkAsRead = (alertId: string) => {
    toast({
      title: "Alert marked as read",
      description: "This alert has been marked as read.",
    });
  };

  const stats = mockFinancialSummary;
  
  // Data for pie charts
  const budgetData = [
    { name: 'Used', value: stats.percentBudgetUsed, color: '#3498db' },
    { name: 'Remaining', value: 100 - stats.percentBudgetUsed, color: '#ecf0f1' },
  ];
  
  const hoursData = [
    { name: 'Billable', value: stats.percentHoursBillable, color: '#3498db' },
    { name: 'Non-Billable', value: 100 - stats.percentHoursBillable, color: '#ecf0f1' },
  ];
  
  const expensesData = [
    { name: 'Billable', value: stats.percentExpensesBillable, color: '#3498db' },
    { name: 'Non-Billable', value: 100 - stats.percentExpensesBillable, color: '#ecf0f1' },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  const renderPieChart = (data: any[]) => (
    <ResponsiveContainer width="100%" height={140}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={35}
          outerRadius={50}
          paddingAngle={0}
          dataKey="value"
          stroke="none"
          label={({ value }) => `${value}%`}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Project Summary Report</h1>
        <h2 className="text-muted-foreground mt-1">Website Design - DPK (DPK Designs)</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          title="Total Budget"
          value={formatCurrency(stats.totalBudget)}
          percent={stats.percentBudgetUsed}
        />
        
        <MetricCard
          title="Total Hours"
          value={stats.totalHours}
          percent={stats.percentHoursBillable}
        />
        
        <MetricCard
          title="Total Expenses"
          value={formatCurrency(stats.totalExpenses)}
          percent={stats.percentExpensesBillable}
          color="finance-orange"
        />
        
        <MetricCard
          title="Fixed Amount Tasks"
          value={formatCurrency(stats.fixedAmountTasks)}
          percent={stats.percentFixedAmountComplete}
          color="finance-gray"
        />
        
        <MetricCard
          title="Total Amount"
          value={formatCurrency(stats.totalAmount)}
          percent={stats.percentInvoiced}
          color="finance-green"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8">
          <Tabs defaultValue="invoices" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
              <TabsTrigger value="timesheets">Timesheets</TabsTrigger>
              <TabsTrigger value="fixed">Fixed Amount</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
            </TabsList>
            <TabsContent value="invoices" className="bg-white rounded-md">
              <InvoiceTable 
                invoices={mockInvoices}
                onSelect={(invoice) => setSelectedInvoice(invoice)}
              />
            </TabsContent>
            <TabsContent value="timesheets">
              <Card>
                <CardContent className="p-6">
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Timesheets data would be shown here
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="fixed">
              <Card>
                <CardContent className="p-6">
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Fixed amount tasks would be shown here
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="expenses">
              <Card>
                <CardContent className="p-6">
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Expenses data would be shown here
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="md:col-span-4 space-y-6">
          <AlertList 
            alerts={mockAlerts} 
            onMarkAsRead={handleMarkAsRead} 
            onViewInvoice={handleViewInvoice}
          />
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium">Financial Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-1">Budget Usage</div>
                  {renderPieChart(budgetData)}
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>Used: {formatCurrency(stats.cost)}</span>
                    <span>Remaining: {formatCurrency(stats.totalBudget - stats.cost)}</span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="text-sm font-medium mb-1">Hours Breakdown</div>
                  {renderPieChart(hoursData)}
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>Billable: {stats.billableHours}</span>
                    <span>Non-Billable: {stats.nonBillableHours}</span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="text-sm font-medium mb-1">Expenses Breakdown</div>
                  {renderPieChart(expensesData)}
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>Billable: {formatCurrency(stats.billableExpenses)}</span>
                    <span>Non-Billable: {formatCurrency(stats.nonBillableExpenses)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Invoice Detail Dialog */}
      <Dialog open={!!selectedInvoice} onOpenChange={(open) => !open && setSelectedInvoice(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Invoice Number</div>
                  <div className="font-medium">{selectedInvoice.id}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Status</div>
                  <div className="font-medium capitalize">{selectedInvoice.status}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Client</div>
                  <div className="font-medium">{selectedInvoice.client}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Amount</div>
                  <div className="font-medium">{formatCurrency(selectedInvoice.amount)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Invoice Date</div>
                  <div className="font-medium">{selectedInvoice.invoiceDate}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Due Date</div>
                  <div className="font-medium">{selectedInvoice.dueDate}</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Subject</div>
                <div className="font-medium">{selectedInvoice.subject}</div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedInvoice(null)}>Close</Button>
                <Button>Download PDF</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Overdue Invoice Alert */}
      <OverdueAlert 
        invoices={mockInvoices}
        onView={setSelectedInvoice}
        onDismiss={() => setShowOverdueAlert(false)}
      />
    </div>
  );
};

export default Dashboard;
