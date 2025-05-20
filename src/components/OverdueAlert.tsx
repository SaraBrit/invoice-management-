
import { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle } from 'lucide-react';
import { Invoice } from '@/lib/types';

interface OverdueAlertProps {
  invoices: Invoice[];
  onView: (invoice: Invoice) => void;
  onDismiss: () => void;
}

const OverdueAlert = ({ invoices, onView, onDismiss }: OverdueAlertProps) => {
  const [open, setOpen] = useState(false);
  const overdueInvoices = invoices.filter(inv => inv.status === 'overdue');
  
  useEffect(() => {
    // Only show alert if there are overdue invoices
    if (overdueInvoices.length > 0) {
      setOpen(true);
    }
  }, [overdueInvoices.length]);
  
  const handleDismiss = () => {
    setOpen(false);
    onDismiss();
  };
  
  const handleView = () => {
    setOpen(false);
    // View the first overdue invoice
    if (overdueInvoices.length > 0) {
      onView(overdueInvoices[0]);
    } else {
      onDismiss();
    }
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  const totalAmount = overdueInvoices.reduce((acc, inv) => acc + inv.amount, 0);
  
  if (overdueInvoices.length === 0) {
    return null;
  }
  
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-2 text-red-600 mb-2">
            <AlertTriangle className="h-5 w-5" />
            <AlertDialogTitle>Overdue Invoices Alert</AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            <div className="space-y-4">
              <p>
                You have <span className="font-bold">{overdueInvoices.length}</span> overdue {overdueInvoices.length === 1 ? 'invoice' : 'invoices'} with 
                a total value of <span className="font-bold text-red-600">{formatCurrency(totalAmount)}</span>.
              </p>
              
              {overdueInvoices.length > 0 && (
                <div className="bg-red-50 p-3 rounded border border-red-100">
                  <div className="text-sm font-medium mb-2">Invoice Details:</div>
                  {overdueInvoices.slice(0, 3).map(inv => (
                    <div key={inv.id} className="flex justify-between text-sm py-1">
                      <div>
                        <span className="font-medium">{inv.id}</span> - {inv.subject}
                      </div>
                      <div className="font-medium">{formatCurrency(inv.amount)}</div>
                    </div>
                  ))}
                  {overdueInvoices.length > 3 && (
                    <div className="text-sm text-center mt-2">
                      And {overdueInvoices.length - 3} more...
                    </div>
                  )}
                </div>
              )}
              
              <p>
                Please take immediate action to address these overdue payments.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleDismiss}>Dismiss</AlertDialogCancel>
          <AlertDialogAction onClick={handleView} className="bg-red-600 hover:bg-red-700">
            View Details
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OverdueAlert;
