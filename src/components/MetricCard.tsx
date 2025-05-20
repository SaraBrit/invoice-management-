
import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  percent?: number;
  color?: string;
  className?: string;
  details?: { label: string; value: string | number }[];
}

const MetricCard = ({ 
  title, 
  value, 
  subtitle, 
  percent = 0,
  color = 'finance-blue',
  className = "",
  details = []
}: MetricCardProps) => {
  // Map our color strings to Tailwind classes
  const colorMap: Record<string, string> = {
    'finance-blue': 'border-finance-blue text-finance-blue',
    'finance-green': 'border-finance-green text-finance-green',
    'finance-red': 'border-finance-red text-finance-red',
    'finance-orange': 'border-finance-orange text-finance-orange',
    'finance-gray': 'border-finance-gray text-finance-gray',
  };
  
  const borderColor = colorMap[color] || 'border-finance-blue text-finance-blue';
  
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-2">
          <span className="text-sm text-muted-foreground">{title}</span>
          <span className="text-2xl font-bold">{value}</span>
          {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
          
          {percent !== undefined && (
            <div className="mt-2">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full bg-blue-200 text-blue-700">
                      {percent}%
                    </span>
                  </div>
                </div>
                <div className="flex h-2 overflow-hidden bg-gray-200 rounded">
                  <div 
                    className={`flex flex-col justify-center bg-finance-blue`} 
                    style={{ width: `${Math.max(5, percent)}%` }}
                  />
                </div>
              </div>
            </div>
          )}
          
          {details && details.length > 0 && (
            <div className="border-t mt-4 pt-4">
              {details.map((detail, i) => (
                <div key={i} className="flex justify-between text-sm py-1">
                  <span className="text-muted-foreground">{detail.label}</span>
                  <span className="font-medium">{detail.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
