
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [notifyOverdue, setNotifyOverdue] = useState(true);
  const [notifyApproaching, setNotifyApproaching] = useState(true);
  const [notifyExceeded, setNotifyExceeded] = useState(true);
  const [daysBeforeDue, setDaysBeforeDue] = useState(5);
  
  const handleSaveAlerts = () => {
    toast({
      title: "Paramètres sauvegardés",
      description: "Vos paramètres d'alertes ont été mis à jour.",
    });
  };
  
  const handleSaveExport = () => {
    toast({
      title: "Paramètres sauvegardés",
      description: "Vos paramètres d'exportation ont été mis à jour.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Paramètres</h1>
        <p className="text-muted-foreground">Configurez vos préférences d'application</p>
      </div>
      
      <Tabs defaultValue="alerts" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4 w-full md:w-[400px]">
          <TabsTrigger value="alerts">Paramètres d'alertes</TabsTrigger>
          <TabsTrigger value="export">Options d'exportation</TabsTrigger>
          <TabsTrigger value="profile">Profil</TabsTrigger>
        </TabsList>
        
        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Notifications d'alertes</CardTitle>
              <CardDescription>Configurez quand et comment vous souhaitez recevoir des alertes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Alertes de factures en retard</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevez des alertes lorsque les factures ont dépassé leur date d'échéance
                    </p>
                  </div>
                  <Switch 
                    checked={notifyOverdue} 
                    onCheckedChange={setNotifyOverdue} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Alertes d'échéance approchante</Label>
                    <p className="text-sm text-muted-foreground">
                      Soyez notifié avant l'échéance des factures
                    </p>
                  </div>
                  <Switch 
                    checked={notifyApproaching} 
                    onCheckedChange={setNotifyApproaching} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Alertes de dépassement de budget</Label>
                    <p className="text-sm text-muted-foreground">
                      Notification lorsque les dépenses du projet dépassent le budget
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
                  <Label htmlFor="days-before">Jours avant échéance</Label>
                  <Input 
                    id="days-before" 
                    type="number" 
                    value={daysBeforeDue}
                    onChange={(e) => setDaysBeforeDue(Number(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground">
                    Nombre de jours avant l'échéance pour envoyer des alertes d'approche
                  </p>
                </div>
              </div>
              
              <Button onClick={handleSaveAlerts}>Enregistrer les paramètres d'alertes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="export">
          <Card>
            <CardHeader>
              <CardTitle>Format d'exportation</CardTitle>
              <CardDescription>Configurez comment les rapports et factures sont exportés</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="default-format">Format d'exportation par défaut</Label>
                  <Select defaultValue="pdf">
                    <SelectTrigger id="default-format">
                      <SelectValue placeholder="Sélectionnez un format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="report-template">Modèle de rapport</Label>
                  <Select defaultValue="detailed">
                    <SelectTrigger id="report-template">
                      <SelectValue placeholder="Sélectionnez un modèle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simple">Simple</SelectItem>
                      <SelectItem value="detailed">Détaillé</SelectItem>
                      <SelectItem value="custom">Personnalisé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="include-charts" defaultChecked />
                <Label htmlFor="include-charts">Inclure les graphiques</Label>
              </div>
              
              <Button onClick={handleSaveExport}>Enregistrer les paramètres d'exportation</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profil utilisateur</CardTitle>
              <CardDescription>Mettez à jour vos informations de compte</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom</Label>
                  <Input id="name" placeholder="Jean Dupont" defaultValue="Jean Dupont" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="jean@exemple.com" defaultValue="jean@exemple.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Entreprise</Label>
                  <Input id="company" placeholder="Acme Inc" defaultValue="DPK Designs" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="position">Poste</Label>
                  <Input id="position" placeholder="Designer" defaultValue="Chef de projet" />
                </div>
              </div>
              
              <Button>Mettre à jour le profil</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
