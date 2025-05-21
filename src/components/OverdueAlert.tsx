
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
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
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
            <AlertDialogTitle>Alerte de Factures en Retard</AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            <div className="space-y-4">
              <p>
                Vous avez <span className="font-bold">{overdueInvoices.length}</span> {overdueInvoices.length === 1 ? 'facture' : 'factures'} en retard 
                d'une valeur totale de <span className="font-bold text-red-600">{formatCurrency(totalAmount)}</span>.
              </p>
              
              {overdueInvoices.length > 0 && (
                <div className="bg-red-50 p-3 rounded border border-red-100">
                  <div className="text-sm font-medium mb-2">Détails des factures:</div>
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
                      Et {overdueInvoices.length - 3} de plus...
                    </div>
                  )}
                </div>
              )}
              
              <p>
                Veuillez prendre des mesures immédiates pour régler ces paiements en retard.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleDismiss}>Ignorer</AlertDialogCancel>
          <AlertDialogAction onClick={handleView} className="bg-red-600 hover:bg-red-700">
            Voir les détails
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OverdueAlert;
