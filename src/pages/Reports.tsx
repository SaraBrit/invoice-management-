
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
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  // Traduire les mois dans les données des rapports mensuels
  const translateMonths = (month: string) => {
    const monthTranslations: Record<string, string> = {
      'January': 'Janvier',
      'February': 'Février',
      'March': 'Mars',
      'April': 'Avril',
      'May': 'Mai',
      'June': 'Juin',
      'July': 'Juillet',
      'August': 'Août',
      'September': 'Septembre',
      'October': 'Octobre',
      'November': 'Novembre',
      'December': 'Décembre'
    };
    
    return monthTranslations[month] || month;
  };
  
  // Créer une copie des données avec les mois traduits
  const translatedMonthlyReports = mockMonthlyReports.map(report => ({
    ...report,
    month: translateMonths(report.month)
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Rapports</h1>
          <p className="text-muted-foreground">Générer et consulter des rapports financiers</p>
        </div>
        <div className="flex gap-4">
          <Select defaultValue="current">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sélectionner une période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Année courante</SelectItem>
              <SelectItem value="previous">Année précédente</SelectItem>
              <SelectItem value="custom">Plage personnalisée</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Générer un rapport
          </Button>
        </div>
      </div>
      
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Revenus mensuels</CardTitle>
          <CardDescription>Aperçu des montants facturés et payés par mois</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={translatedMonthlyReports}
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
                <Bar name="Total facturé" dataKey="totalInvoiced" fill="#3498db" />
                <Bar name="Total payé" dataKey="totalPaid" fill="#2ecc71" />
                <Bar name="Total en retard" dataKey="totalOverdue" fill="#e74c3c" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Résumé mensuel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {translatedMonthlyReports.map((report, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <div className="font-medium">{report.month} {report.year}</div>
                    <div className="text-sm text-muted-foreground">{report.invoiceCount} factures</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(report.totalPaid)}</div>
                    {report.totalOverdue > 0 && (
                      <div className="text-sm text-red-600">
                        {formatCurrency(report.totalOverdue)} en retard
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
            <CardTitle>Statut des paiements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-medium">Payées</div>
                  <div className="text-sm text-muted-foreground">
                    {mockInvoices.filter(inv => inv.status === 'paid').length} factures
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
                  <div className="text-sm font-medium">En attente</div>
                  <div className="text-sm text-muted-foreground">
                    {mockInvoices.filter(inv => inv.status === 'pending').length} factures
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
                  <div className="text-sm font-medium">En retard</div>
                  <div className="text-sm text-muted-foreground">
                    {mockInvoices.filter(inv => inv.status === 'overdue').length} factures
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
              <Button className="w-full">Télécharger le rapport de paiements</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
