
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertTriangle, CheckCircle, Activity } from "lucide-react";

interface SecurityMetric {
  name: string;
  status: "secure" | "warning" | "critical";
  score: number;
  lastCheck: string;
  description: string;
}

interface SecurityAlert {
  id: string;
  type: "threat" | "vulnerability" | "policy";
  severity: "low" | "medium" | "high" | "critical";
  message: string;
  timestamp: string;
  resolved: boolean;
}

export function SecurityMonitor() {
  const [metrics, setMetrics] = useState<SecurityMetric[]>([
    {
      name: "Authentification",
      status: "secure",
      score: 95,
      lastCheck: new Date().toLocaleString('fr-FR'),
      description: "Système d'authentification sécurisé"
    },
    {
      name: "Chiffrement des données",
      status: "secure",
      score: 98,
      lastCheck: new Date().toLocaleString('fr-FR'),
      description: "Chiffrement AES-256 actif"
    },
    {
      name: "Validation des entrées",
      status: "warning",
      score: 85,
      lastCheck: new Date().toLocaleString('fr-FR'),
      description: "Validation stricte des données utilisateur"
    },
    {
      name: "Protection CSRF",
      status: "secure",
      score: 92,
      lastCheck: new Date().toLocaleString('fr-FR'),
      description: "Protection contre les attaques CSRF"
    }
  ]);

  const [alerts, setAlerts] = useState<SecurityAlert[]>([
    {
      id: "1",
      type: "vulnerability",
      severity: "medium",
      message: "Mise à jour de sécurité disponible pour les dépendances",
      timestamp: new Date().toLocaleString('fr-FR'),
      resolved: false
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "secure": return "text-green-600";
      case "warning": return "text-yellow-600";
      case "critical": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "bg-blue-100 text-blue-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const overallScore = Math.round(metrics.reduce((acc, m) => acc + m.score, 0) / metrics.length);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Shield className={`w-5 h-5 ${getStatusColor(metric.status)}`} />
                  <h4 className="font-semibold text-sm">{metric.name}</h4>
                </div>
                <Badge className={
                  metric.status === "secure" ? "bg-green-100 text-green-800" :
                  metric.status === "warning" ? "bg-yellow-100 text-yellow-800" :
                  "bg-red-100 text-red-800"
                }>
                  {metric.score}%
                </Badge>
              </div>
              <Progress value={metric.score} className="h-2 mb-2" />
              <p className="text-xs text-gray-500">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-teal-600" />
            Score de sécurité global
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-3xl font-bold text-teal-600">{overallScore}%</div>
              <div className="text-sm text-gray-600">Niveau de sécurité</div>
            </div>
            <div className="flex items-center gap-2">
              {overallScore >= 90 ? (
                <CheckCircle className="w-8 h-8 text-green-600" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
              )}
            </div>
          </div>
          <Progress value={overallScore} className="h-3" />
        </CardContent>
      </Card>

      {alerts.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Alertes de sécurité</h3>
          {alerts.filter(alert => !alert.resolved).map((alert) => (
            <Alert key={alert.id}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <span className="text-sm text-gray-500">{alert.timestamp}</span>
                  </div>
                  <div>{alert.message}</div>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}
    </div>
  );
}
