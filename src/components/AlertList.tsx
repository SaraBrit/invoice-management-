
import { useState } from 'react';
import { Alert as AlertType } from '@/lib/types';
import { 
  Bell,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AlertListProps {
  alerts: AlertType[];
  onMarkAsRead?: (alertId: string) => void;
  onViewInvoice?: (invoiceId: string) => void;
}

const AlertList = ({ alerts, onMarkAsRead, onViewInvoice }: AlertListProps) => {
  const [expandedAlerts, setExpandedAlerts] = useState<boolean>(false);
  const unreadAlerts = alerts.filter(alert => !alert.read);
  
  const displayedAlerts = expandedAlerts ? alerts : alerts.slice(0, 3);
  
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'overdue':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'approaching':
        return <Calendar className="h-5 w-5 text-orange-500" />;
      case 'exceeded':
        return <Bell className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };
  
  const getAlertColor = (type: string) => {
    switch (type) {
      case 'overdue':
        return 'bg-red-50 border-red-200';
      case 'approaching':
        return 'bg-orange-50 border-orange-200';
      case 'exceeded':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-medium">
          Alertes
          {unreadAlerts.length > 0 && (
            <Badge className="ml-2 bg-red-500">{unreadAlerts.length}</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayedAlerts.length > 0 ? (
            displayedAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`p-3 rounded-md border ${getAlertColor(alert.type)} ${!alert.read ? 'font-medium' : 'opacity-75'}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm">{alert.message}</div>
                    <div className="text-xs text-muted-foreground mt-1">{alert.createdAt}</div>
                    {alert.invoiceId && (
                      <div className="mt-2 flex gap-2">
                        {onViewInvoice && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-7 text-xs"
                            onClick={() => onViewInvoice(alert.invoiceId!)}
                          >
                            Voir la facture
                          </Button>
                        )}
                        {!alert.read && onMarkAsRead && (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-7 text-xs"
                            onClick={() => onMarkAsRead(alert.id)}
                          >
                            Marquer comme lu
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              Aucune alerte pour le moment
            </div>
          )}
          
          {alerts.length > 3 && (
            <Button 
              variant="ghost" 
              className="w-full text-sm" 
              onClick={() => setExpandedAlerts(!expandedAlerts)}
            >
              {expandedAlerts ? 'Voir moins' : `Voir tout (${alerts.length})`}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertList;
