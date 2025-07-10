
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, FileText, Users, Building, Clock, Star, Search, Filter, SortAsc } from 'lucide-react';

interface ProcedureCatalogTabProps {
  onAddProcedure?: () => void;
  onOpenApprovalQueue?: () => void;
}

export function ProcedureCatalogTab({ onAddProcedure, onOpenApprovalQueue }: ProcedureCatalogTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTypeFilter, setActiveTypeFilter] = useState('Tous');
  const [activeStatusFilter, setActiveStatusFilter] = useState('Statut');
  const [activeDigitizationFilter, setActiveDigitizationFilter] = useState('Numérisation');

  const procedures = [
    {
      id: 1,
      title: "Création d'entreprise SARL",
      description: "Procédure complète pour créer une société à responsabilité limitée",
      category: "Entreprise",
      duration: "15-30 jours",
      complexity: "Moyenne",
      popularity: 95,
      status: "Validé",
      digitization: "Oui"
    },
    {
      id: 2,
      title: "Permis de construire",
      description: "Demande d'autorisation de construction pour bâtiment résidentiel",
      category: "Urbanisme",
      duration: "2-3 mois",
      complexity: "Élevée",
      popularity: 87,
      status: "En cours",
      digitization: "Partiellement"
    },
    {
      id: 3,
      title: "Carte nationale d'identité",
      description: "Renouvellement ou première demande de CNI",
      category: "État Civil",
      duration: "7-14 jours",
      complexity: "Faible",
      popularity: 92,
      status: "Validé",
      digitization: "Non"
    }
  ];

  const typeFilters = ['Tous', 'Loi', 'Ordonnance', 'Décret', 'Arrêté', 'Instruction'];
  const statusFilters = ['Statut', 'Validé', 'En cours', 'En attente'];
  const digitizationFilters = ['Numérisation', 'Oui', 'Non', 'Partiellement'];

  const filteredProcedures = procedures.filter(procedure => {
    const matchesSearch = procedure.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         procedure.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         procedure.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = activeStatusFilter === 'Statut' || procedure.status === activeStatusFilter;
    const matchesDigitization = activeDigitizationFilter === 'Numérisation' || procedure.digitization === activeDigitizationFilter;
    
    return matchesSearch && matchesStatus && matchesDigitization;
  });

  return (
    <div className="space-y-6">
      {/* Barre de recherche avec filtres */}
      <Card className="border-l-4 border-l-teal-500">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher des procédures administratives..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filtrer
            </Button>
            <Button variant="outline" className="gap-2">
              <SortAsc className="w-4 h-4" />
              Trier
            </Button>
            <Button 
              variant="outline" 
              onClick={onOpenApprovalQueue}
              className="bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100 gap-2"
            >
              File d'approbation
            </Button>
            <Button onClick={onAddProcedure} className="bg-teal-600 hover:bg-teal-700 gap-2">
              <Plus className="w-4 h-4" />
              Ajouter un texte
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filtres de catégorie */}
      <div className="space-y-4">
        {/* Première ligne de filtres */}
        <div className="flex gap-2">
          {typeFilters.map((type) => (
            <Button
              key={type}
              variant={activeTypeFilter === type ? "default" : "outline"}
              onClick={() => setActiveTypeFilter(type)}
              className={`rounded-full ${
                activeTypeFilter === type 
                  ? "bg-teal-600 hover:bg-teal-700 text-white" 
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {type}
            </Button>
          ))}
        </div>

        {/* Deuxième ligne de filtres - Status et Numérisation */}
        <div className="flex gap-4">
          {/* Filtre Statut */}
          <div className="flex gap-2">
            {statusFilters.map((status) => (
              <Button
                key={status}
                variant={activeStatusFilter === status ? "default" : "outline"}
                onClick={() => setActiveStatusFilter(status)}
                className={`rounded-full ${
                  activeStatusFilter === status 
                    ? "bg-teal-600 hover:bg-teal-700 text-white" 
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {status}
              </Button>
            ))}
          </div>

          {/* Filtre Numérisation */}
          <div className="flex gap-2">
            {digitizationFilters.map((digitization) => (
              <Button
                key={digitization}
                variant={activeDigitizationFilter === digitization ? "default" : "outline"}
                onClick={() => setActiveDigitizationFilter(digitization)}
                className={`rounded-full ${
                  activeDigitizationFilter === digitization 
                    ? "bg-teal-600 hover:bg-teal-700 text-white" 
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {digitization}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">248</div>
            <div className="text-sm text-gray-600">Procédures</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">1,542</div>
            <div className="text-sm text-gray-600">Utilisateurs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Building className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">47</div>
            <div className="text-sm text-gray-600">Organismes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">12.5</div>
            <div className="text-sm text-gray-600">Jours (moy.)</div>
          </CardContent>
        </Card>
      </div>

      {/* Résultats */}
      <div className="text-lg font-semibold">
        {filteredProcedures.length} procédure(s) trouvée(s)
      </div>

      {/* Liste des procédures */}
      <div className="space-y-4">
        {filteredProcedures.map((procedure) => (
          <Card key={procedure.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{procedure.title}</h3>
                    <Badge variant="secondary">{procedure.category}</Badge>
                    <Badge variant={procedure.status === 'Validé' ? 'default' : 'outline'}>
                      {procedure.status}
                    </Badge>
                    <Badge variant={
                      procedure.digitization === 'Oui' ? 'default' :
                      procedure.digitization === 'Partiellement' ? 'secondary' : 'outline'
                    }>
                      {procedure.digitization}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">{procedure.popularity}%</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{procedure.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Durée: {procedure.duration}</span>
                    </div>
                    <div>
                      Complexité: <Badge variant={
                        procedure.complexity === 'Faible' ? 'default' :
                        procedure.complexity === 'Moyenne' ? 'secondary' : 'destructive'
                      }>{procedure.complexity}</Badge>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="ml-4">
                  Voir détails
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
