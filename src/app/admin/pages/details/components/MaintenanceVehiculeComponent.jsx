import React, { useState } from 'react';
import { Card, Progress, Timeline, Button, Badge, Alert, Statistic, Row, Col, Tag } from 'antd';
import { ToolOutlined, ClockCircleOutlined, CheckCircleOutlined, WarningOutlined, PlusOutlined, CalendarOutlined } from '@ant-design/icons';

import PlanifierMaintenanceModal from './modals/PlanifierMaintenanceModal';
import DiagnosticModal from './modals/DiagnosticModal';
import DetailsInterventionModal from './modals/DetailsInterventionModal';
import AjouterInterventionModal from './modals/AjouterInterventionModal';

const MaintenanceVehiculeComponent = () => {
  // États pour gérer l'ouverture/fermeture des modaux
  const [planifierModalOpen, setPlanifierModalOpen] = useState(false);
  const [diagnosticModalOpen, setDiagnosticModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [ajouterModalOpen, setAjouterModalOpen] = useState(false);
  const [selectedIntervention, setSelectedIntervention] = useState(null);

  // Gestionnaires d'événements pour les modaux
  const handlePlanifier = (values) => {
    console.log('Planification:', values);
    setPlanifierModalOpen(false);
  };

  const handleDiagnostic = (values) => {
    console.log('Diagnostic:', values);
    setDiagnosticModalOpen(false);
  };

  const handleAjouterIntervention = (values) => {
    console.log('Nouvelle intervention:', values);
    setAjouterModalOpen(false);
  };

  const handleVoirDetails = (intervention) => {
    setSelectedIntervention(intervention);
    setDetailsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Alertes et actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Alert
          message="Maintenance préventive recommandée"
          description="Dans 25 jours ou 2,500 km"
          type="warning"
          showIcon
          icon={<ClockCircleOutlined className="text-yellow-500" />}
          action={
            <Button 
              size="small" 
              type="primary" 
              className="!rounded-none bg-yellow-500 border-yellow-500"
              onClick={() => setPlanifierModalOpen(true)}
            >
              Planifier
            </Button>
          }
          className="!rounded-none"
        />
        <Alert
          message="Vidange d'huile nécessaire"
          description="Dépassement de 500 km"
          type="error"
          showIcon
          icon={<WarningOutlined className="text-red-500" />}
          action={
            <Button 
              size="small" 
              danger 
              type="primary" 
              className="!rounded-none"
              onClick={() => setPlanifierModalOpen(true)}
            >
              Urgent
            </Button>
          }
          className="!rounded-none"
        />
        <Alert
          message="Pneus en bon état"
          description="Prochain contrôle dans 3 mois"
          type="success"
          showIcon
          icon={<CheckCircleOutlined className="text-green-500" />}
          className="!rounded-none"
        />
      </div>

      {/* État de maintenance et statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card 
          title={
            <div className="flex items-center justify-between">
              <span>État du véhicule</span>
              <Tag color="success" className="!rounded-none">92% Excellent</Tag>
            </div>
          }
          bordered={false} 
          className="!rounded-none"
        >
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">État général</span>
                <span className="font-medium text-green-500">92%</span>
              </div>
              <Progress 
                percent={92} 
                strokeColor="#52c41a"
                className="!rounded-none"
                showInfo={false}
              />
            </div>
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="Kilométrage actuel"
                  value={42500}
                  suffix="km"
                  className="!text-sm"
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Prochaine révision"
                  value={45000}
                  suffix="km"
                  className="!text-sm"
                />
              </Col>
            </Row>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Button 
                icon={<ToolOutlined />} 
                className="!rounded-none"
                onClick={() => setDiagnosticModalOpen(true)}
              >
                Diagnostic
              </Button>
              <Button 
                icon={<CalendarOutlined />} 
                className="!rounded-none"
                onClick={() => setPlanifierModalOpen(true)}
              >
                Planifier
              </Button>
            </div>
          </div>
        </Card>

        <Card 
          title="Prochaines interventions"
          extra={
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              className="!rounded-none"
              onClick={() => setAjouterModalOpen(true)}
            >
              Nouvelle intervention
            </Button>
          }
          bordered={false} 
          className="!rounded-none"
        >
          <div className="space-y-4">
            <div className="flex items-center p-3 border border-yellow-200 bg-yellow-50">
              <div className="mr-4">
                <Badge status="warning" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Vidange d'huile</p>
                    <p className="text-sm text-gray-500">Dans 25 jours ou 2,500 km</p>
                  </div>
                  <Button 
                    size="small" 
                    type="link"
                    onClick={() => handleVoirDetails({
                      type: "Vidange d'huile",
                      statut: "Planifiée",
                      date: "15/04/2024",
                      kilometrage: "45000"
                    })}
                  >
                    Détails
                  </Button>
                </div>
                <Progress percent={75} size="small" showInfo={false} />
              </div>
            </div>

            <div className="flex items-center p-3 border border-blue-200 bg-blue-50">
              <div className="mr-4">
                <Badge status="processing" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Contrôle technique</p>
                    <p className="text-sm text-gray-500">Dans 2 mois</p>
                  </div>
                  <Button 
                    size="small" 
                    type="link"
                    onClick={() => handleVoirDetails({
                      type: "Contrôle technique",
                      statut: "Planifiée",
                      date: "20/05/2024",
                      kilometrage: "46000"
                    })}
                  >
                    Détails
                  </Button>
                </div>
                <Progress percent={40} size="small" showInfo={false} />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Historique des maintenances */}
      <Card 
        title="Historique des interventions"
        extra={
          <div className="flex gap-2">
            <Button className="!rounded-none">
              Filtrer
            </Button>
            <Button className="!rounded-none">
              Exporter
            </Button>
          </div>
        }
        bordered={false} 
        className="!rounded-none"
      >
        <Timeline
          mode="left"
          items={[
            {
              color: "green",
              label: "15/01/2024",
              children: (
                <div 
                  className="bg-gray-50 p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => handleVoirDetails({
                    type: "Révision complète",
                    statut: "Terminée",
                    date: "15/01/2024",
                    kilometrage: "42000",
                    technicien: "Mohamed Diop",
                    cout: 250000
                  })}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Révision complète</p>
                      <p className="text-sm text-gray-500">42,000 km</p>
                      <p className="text-sm mt-2">Changement huile, filtres et plaquettes de frein</p>
                    </div>
                    <Tag color="success" className="!rounded-none">Terminée</Tag>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="small" className="!rounded-none">
                      Voir le rapport
                    </Button>
                    <Button size="small" type="link" className="!rounded-none">
                      Facture
                    </Button>
                  </div>
                </div>
              )
            },
            {
              color: "yellow",
              label: "01/12/2023",
              children: (
                <div 
                  className="bg-gray-50 p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => handleVoirDetails({
                    type: "Maintenance préventive",
                    statut: "Terminée",
                    date: "01/12/2023",
                    kilometrage: "38000",
                    technicien: "Amadou Sow",
                    cout: 150000
                  })}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Maintenance préventive</p>
                      <p className="text-sm text-gray-500">38,000 km</p>
                      <p className="text-sm mt-2">Vérification générale et équilibrage des pneus</p>
                    </div>
                    <Tag color="success" className="!rounded-none">Terminée</Tag>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="small" className="!rounded-none">
                      Voir le rapport
                    </Button>
                    <Button size="small" type="link" className="!rounded-none">
                      Facture
                    </Button>
                  </div>
                </div>
              )
            }
          ]}
        />
      </Card>

      {/* Modaux */}
      <PlanifierMaintenanceModal
        open={planifierModalOpen}
        onCancel={() => setPlanifierModalOpen(false)}
        onSubmit={handlePlanifier}
      />

      <DiagnosticModal
        open={diagnosticModalOpen}
        onCancel={() => setDiagnosticModalOpen(false)}
        onSubmit={handleDiagnostic}
      />

      <DetailsInterventionModal
        open={detailsModalOpen}
        onCancel={() => setDetailsModalOpen(false)}
        intervention={selectedIntervention}
      />

      <AjouterInterventionModal
        open={ajouterModalOpen}
        onCancel={() => setAjouterModalOpen(false)}
        onSubmit={handleAjouterIntervention}
      />
    </div>
  );
};

export default MaintenanceVehiculeComponent;
