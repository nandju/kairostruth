import React from 'react';
import { 
  Card, 
  Statistic, 
  Progress, 
  Table, 
  Alert, 
  Button, 
  Tooltip, 
  Tag,
  Space
} from 'antd';
import { 
  ThunderboltOutlined, 
  DollarOutlined, 
  BarChartOutlined,
  RiseOutlined,
  FallOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  DownloadOutlined,
  FilterOutlined,
  ToolOutlined
} from '@ant-design/icons';

const CarburantVehiculeComponent = () => {
  return (
    <div className="space-y-6">
      {/* Statistiques de consommation avec design amélioré */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card 
          bordered={false} 
          className="!rounded-none hover:shadow-md transition-shadow"
        >
          <Statistic
            title={
              <span className="flex items-center gap-2">
                <ThunderboltOutlined className="text-primary" />
                Consommation moyenne
              </span>
            }
            value={7.5}
            suffix="L/100km"
            valueStyle={{ color: '#1890ff' }}
            prefix={
              <Tooltip title="Diminution de 0.3L/100km">
                <FallOutlined className="text-success" />
              </Tooltip>
            }
          />
          <div className="mt-2 text-xs text-gray-500">
            -4% par rapport au mois dernier
          </div>
        </Card>

        <Card 
          bordered={false} 
          className="!rounded-none hover:shadow-md transition-shadow"
        >
          <Statistic
            title={
              <span className="flex items-center gap-2">
                <DollarOutlined className="text-success" />
                Coût total ce mois
              </span>
            }
            value={125000}
            suffix="FCFA"
            valueStyle={{ color: '#52c41a' }}
            prefix={
              <Tooltip title="Augmentation des dépenses">
                <RiseOutlined className="text-warning" />
              </Tooltip>
            }
          />
          <div className="mt-2 text-xs text-gray-500">
            +8% par rapport au mois dernier
          </div>
        </Card>

        <Card 
          bordered={false} 
          className="!rounded-none hover:shadow-md transition-shadow"
        >
          <Statistic
            title={
              <span className="flex items-center gap-2">
                <BarChartOutlined className="text-warning" />
                Volume total ce mois
              </span>
            }
            value={167}
            suffix="L"
            valueStyle={{ color: '#faad14' }}
            prefix={
              <Tooltip title="Volume stable">
                <span className="text-primary">≈</span>
              </Tooltip>
            }
          />
          <div className="mt-2 text-xs text-gray-500">
            +2L par rapport au mois dernier
          </div>
        </Card>
      </div>

      {/* Consommation hebdomadaire avec design moderne */}
      <Card 
        title={
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <BarChartOutlined className="text-primary" />
              Évolution de la consommation
            </span>
            <Space>
              <Button 
                icon={<FilterOutlined />} 
                className="!rounded-none"
              >
                Filtrer
              </Button>
              <Button 
                icon={<DownloadOutlined />} 
                className="!rounded-none"
              >
                Exporter
              </Button>
            </Space>
          </div>
        }
        bordered={false} 
        className="!rounded-none"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 border border-blue-100">
              <p className="text-sm text-gray-500">Moyenne hebdomadaire</p>
              <p className="text-2xl font-medium text-primary mt-1">85L</p>
              <p className="text-xs text-gray-500 mt-1">≈ 75,000 FCFA</p>
            </div>
            <div className="bg-green-50 p-4 border border-green-100">
              <p className="text-sm text-gray-500">Meilleure performance</p>
              <p className="text-2xl font-medium text-success mt-1">78L</p>
              <p className="text-xs text-gray-500 mt-1">Il y a 2 semaines</p>
            </div>
            <div className="bg-yellow-50 p-4 border border-yellow-100">
              <p className="text-sm text-gray-500">Consommation prévue</p>
              <p className="text-2xl font-medium text-warning mt-1">82L</p>
              <p className="text-xs text-gray-500 mt-1">Semaine prochaine</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CalendarOutlined className="text-gray-400" />
                  <span className="text-gray-500">Cette semaine</span>
                </div>
                <div className="text-right">
                  <span className="font-medium">85L</span>
                  <span className="text-gray-500 ml-2">75,000 FCFA</span>
                </div>
              </div>
              <Progress 
                percent={85} 
                strokeColor="#1890ff"
                className="!rounded-none"
                showInfo={false}
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CalendarOutlined className="text-gray-400" />
                  <span className="text-gray-500">Semaine dernière</span>
                </div>
                <div className="text-right">
                  <span className="font-medium">92L</span>
                  <span className="text-gray-500 ml-2">82,000 FCFA</span>
                </div>
              </div>
              <Progress 
                percent={92} 
                strokeColor="#52c41a"
                className="!rounded-none"
                showInfo={false}
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CalendarOutlined className="text-gray-400" />
                  <span className="text-gray-500">Il y a 2 semaines</span>
                </div>
                <div className="text-right">
                  <span className="font-medium">78L</span>
                  <span className="text-gray-500 ml-2">70,000 FCFA</span>
                </div>
              </div>
              <Progress 
                percent={78} 
                strokeColor="#faad14"
                className="!rounded-none"
                showInfo={false}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Historique des pleins avec design raffiné */}
      <Card 
        title={
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ThunderboltOutlined className="text-primary" />
              Historique des pleins
            </span>
            <span className="text-sm text-gray-500">
              Total: 127L ce mois
            </span>
          </div>
        }
        bordered={false} 
        className="!rounded-none"
      >
        <Table
          columns={[
            {
              title: 'Date',
              dataIndex: 'date',
              key: 'date',
              render: (date) => (
                <Space>
                  <CalendarOutlined className="text-gray-400" />
                  {date}
                </Space>
              )
            },
            {
              title: 'Station',
              dataIndex: 'station',
              key: 'station',
              render: (station) => (
                <Space>
                  <EnvironmentOutlined className="text-gray-400" />
                  {station}
                </Space>
              )
            },
            {
              title: 'Quantité',
              dataIndex: 'quantite',
              key: 'quantite',
              render: (quantite) => (
                <Tag color="blue" className="!rounded-none">
                  {quantite}L
                </Tag>
              )
            },
            {
              title: 'Prix unitaire',
              dataIndex: 'prixUnitaire',
              key: 'prixUnitaire',
              render: (prix) => (
                <span className="text-gray-500">
                  {prix} FCFA/L
                </span>
              )
            },
            {
              title: 'Coût total',
              dataIndex: 'cout',
              key: 'cout',
              render: (cout) => (
                <span className="font-medium">
                  {cout.toLocaleString()} <span className="text-gray-500">FCFA</span>
                </span>
              )
            },
            {
              title: 'Évolution',
              key: 'evolution',
              render: (_, record) => (
                <Tooltip title={record.evolution > 0 ? "Augmentation" : "Diminution"}>
                  {record.evolution > 0 ? (
                    <RiseOutlined className="text-error" />
                  ) : (
                    <FallOutlined className="text-success" />
                  )}
                </Tooltip>
              )
            }
          ]}
          dataSource={[
            {
              key: '1',
              date: '20/03/2024',
              quantite: 45,
              prixUnitaire: 890,
              cout: 40000,
              station: 'Total Almadies',
              evolution: 1
            },
            {
              key: '2',
              date: '15/03/2024',
              quantite: 40,
              prixUnitaire: 890,
              cout: 35000,
              station: 'Shell Plateau',
              evolution: -1
            },
            {
              key: '3',
              date: '10/03/2024',
              quantite: 42,
              prixUnitaire: 890,
              cout: 37000,
              station: 'Total Point E',
              evolution: 1
            }
          ]}
          pagination={false}
          className="!rounded-none"
        />
      </Card>

      {/* Alertes de consommation avec design amélioré */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Alert
          message={
            <div className="flex items-center gap-2">
              <RiseOutlined className="text-warning text-lg" />
              <span className="font-medium">Consommation anormale détectée</span>
            </div>
          }
          description={
            <div className="mt-2">
              <p>La consommation de carburant a augmenté de 15% par rapport à la moyenne habituelle cette semaine.</p>
              <div className="mt-3">
                <Button size="small" type="primary" danger className="!rounded-none">
                  Analyser
                </Button>
              </div>
            </div>
          }
          type="warning"
          showIcon={false}
          className="!rounded-none"
        />

        <Alert
          message={
            <div className="flex items-center gap-2">
              <ToolOutlined className="text-primary text-lg" />
              <span className="font-medium">Maintenance recommandée</span>
            </div>
          }
          description={
            <div className="mt-2">
              <p>Une vérification du système d'injection est recommandée pour optimiser la consommation.</p>
              <div className="mt-3">
                <Button size="small" type="primary" className="!rounded-none">
                  Planifier
                </Button>
              </div>
            </div>
          }
          type="info"
          showIcon={false}
          className="!rounded-none"
        />
      </div>
    </div>
  );
};

export default CarburantVehiculeComponent;
