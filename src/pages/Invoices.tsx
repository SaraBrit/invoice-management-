
import { useState } from 'react';
import { mockInvoices } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import InvoiceTable from '@/components/InvoiceTable';
import { Invoice } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText } from 'lucide-react';

const Invoices = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  
  const unpaidInvoices = mockInvoices.filter(inv => inv.status !== 'paid');
  const paidInvoices = mockInvoices.filter(inv => inv.status === 'paid');
  const overdueInvoices = mockInvoices.filter(inv => inv.status === 'overdue');
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  const calculateTotals = (invoices: Invoice[]) => {
    return invoices.reduce((total, inv) => total + inv.amount, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Invoices</h1>
          <p className="text-muted-foreground">Manage and track all your invoices</p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          New Invoice
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">Total Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockInvoices.length}</div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(calculateTotals(mockInvoices))}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{paidInvoices.length}</div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(calculateTotals(paidInvoices))}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">Unpaid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {unpaidInvoices.length - overdueInvoices.length}
            </div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(calculateTotals(unpaidInvoices) - calculateTotals(overdueInvoices))}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueInvoices.length}</div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(calculateTotals(overdueInvoices))}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4 w-full md:w-[400px]">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <InvoiceTable 
            invoices={mockInvoices}
            onSelect={(invoice) => setSelectedInvoice(invoice)}
          />
        </TabsContent>
        <TabsContent value="paid">
          <InvoiceTable 
            invoices={mockInvoices.filter(inv => inv.status === 'paid')}
            onSelect={(invoice) => setSelectedInvoice(invoice)}
          />
        </TabsContent>
        <TabsContent value="pending">
          <InvoiceTable 
            invoices={mockInvoices.filter(inv => inv.status === 'pending')}
            onSelect={(invoice) => setSelectedInvoice(invoice)}
          />
        </TabsContent>
        <TabsContent value="overdue">
          <InvoiceTable 
            invoices={mockInvoices.filter(inv => inv.status === 'overdue')}
            onSelect={(invoice) => setSelectedInvoice(invoice)}
          />
        </TabsContent>
      </Tabs>
      
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
    </div>
  );
};

export default Invoices;
