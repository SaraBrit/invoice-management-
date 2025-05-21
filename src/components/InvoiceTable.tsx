
import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Invoice } from '@/lib/types';

interface InvoiceTableProps {
  invoices: Invoice[];
  onSelect?: (invoice: Invoice) => void;
}

const InvoiceTable = ({ invoices, onSelect }: InvoiceTableProps) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.subject.toLowerCase().includes(search.toLowerCase()) ||
      invoice.id.toLowerCase().includes(search.toLowerCase()) ||
      invoice.client.toLowerCase().includes(search.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const statusColors = {
    paid: "bg-green-100 text-green-800 hover:bg-green-200",
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    overdue: "bg-red-100 text-red-800 hover:bg-red-200"
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid': return 'Payée';
      case 'pending': return 'En attente';
      case 'overdue': return 'En retard';
      default: return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Rechercher des factures..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full sm:w-48">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="paid">Payée</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="overdue">En retard</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">ID</TableHead>
              <TableHead>Objet</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date de facturation</TableHead>
              <TableHead>Date d'échéance</TableHead>
              <TableHead className="text-right">Montant</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((invoice) => (
                <TableRow 
                  key={invoice.id}
                  onClick={() => onSelect && onSelect(invoice)}
                  className={onSelect ? "cursor-pointer hover:bg-muted/50" : ""}
                >
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.subject}</TableCell>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[invoice.status] || ""} variant="outline">
                      {getStatusLabel(invoice.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>{invoice.invoiceDate}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell className="text-right">{formatCurrency(invoice.amount)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                  Aucune facture trouvée correspondant à vos filtres
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InvoiceTable;
