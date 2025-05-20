
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [notifyOverdue, setNotifyOverdue] = useState(true);
  const [notifyApproaching, setNotifyApproaching] = useState(true);
  const [notifyExceeded, setNotifyExceeded] = useState(true);
  const [daysBeforeDue, setDaysBeforeDue] = useState(5);
  
  const handleSaveAlerts = () => {
    toast({
      title: "Settings saved",
      description: "Your alert settings have been updated.",
    });
  };
  
  const handleSaveExport = () => {
    toast({
      title: "Settings saved",
      description: "Your export settings have been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure your application preferences</p>
      </div>
      
      <Tabs defaultValue="alerts" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4 w-full md:w-[400px]">
          <TabsTrigger value="alerts">Alert Settings</TabsTrigger>
          <TabsTrigger value="export">Export Options</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        
        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Alert Notifications</CardTitle>
              <CardDescription>Configure when and how you'd like to receive alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Overdue Invoice Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts when invoices are past their due date
                    </p>
                  </div>
                  <Switch 
                    checked={notifyOverdue} 
                    onCheckedChange={setNotifyOverdue} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Approaching Due Date Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified before invoices are due
                    </p>
                  </div>
                  <Switch 
                    checked={notifyApproaching} 
                    onCheckedChange={setNotifyApproaching} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Budget Exceeded Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify when project expenses exceed the budget
                    </p>
                  </div>
                  <Switch 
                    checked={notifyExceeded} 
                    onCheckedChange={setNotifyExceeded} 
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="days-before">Days Before Due Date</Label>
                  <Input 
                    id="days-before" 
                    type="number" 
                    value={daysBeforeDue}
                    onChange={(e) => setDaysBeforeDue(Number(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground">
                    Number of days before due date to send approaching alerts
                  </p>
                </div>
              </div>
              
              <Button onClick={handleSaveAlerts}>Save Alert Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="export">
          <Card>
            <CardHeader>
              <CardTitle>Export Format</CardTitle>
              <CardDescription>Configure how reports and invoices are exported</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="default-format">Default Export Format</Label>
                  <Select defaultValue="pdf">
                    <SelectTrigger id="default-format">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="report-template">Report Template</Label>
                  <Select defaultValue="detailed">
                    <SelectTrigger id="report-template">
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simple">Simple</SelectItem>
                      <SelectItem value="detailed">Detailed</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="include-charts" defaultChecked />
                <Label htmlFor="include-charts">Include Charts & Graphs</Label>
              </div>
              
              <Button onClick={handleSaveExport}>Save Export Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>Update your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="John Doe" defaultValue="John Doe" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" defaultValue="john@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Acme Inc" defaultValue="DPK Designs" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" placeholder="Designer" defaultValue="Project Manager" />
                </div>
              </div>
              
              <Button>Update Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
