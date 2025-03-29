import React, { useState } from 'react';
import { Table, Tag, Button, Space, Card, Tabs, Badge, Avatar, Modal, Descriptions, Timeline } from 'antd';
import { 
  CarOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  StopOutlined,
  CalendarOutlined,
  UserOutlined,
  EnvironmentOutlined,
  ArrowRightOutlined,
  EuroCircleOutlined,
  PhoneOutlined,
  MailOutlined,
  ClockCircleFilled,
  CarFilled,
  CreditCardOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';

const Courses = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (record) => {
    setSelectedCourse(record);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedCourse(null);
  };

  // Composant Modal Détaillé
  const DetailModal = ({ course }) => {
    if (!course) return null;

    return (
      <Modal
        title={
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 !rounded-none ${
              course.status === 'Terminée' ? 'bg-green-500' :
              course.status === 'En attente' ? 'bg-blue-500' :
              'bg-primary'
            }`} />
            <span className="font-clash text-xl">
              {course.type === 'location' ? 'Location avec conducteur' : 'Course'}
            </span>
          </div>
        }
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800}
        className="[&_.ant-modal-content]:!p-0 [&_.ant-modal-content]:!rounded-none"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Informations principales */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 !rounded-none">
              <h3 className="font-monument text-sm text-gray-600 mb-3">DÉTAILS DU SERVICE</h3>
              <Descriptions column={1} className="[&_.ant-descriptions-item-label]:!text-gray-500">
                <Descriptions.Item label={<div className="flex items-center gap-2"><ClockCircleFilled className="text-primary" /> Date et Heure</div>}>
                  <div className="font-medium">{course.datetime}</div>
                </Descriptions.Item>
                <Descriptions.Item label={<div className="flex items-center gap-2"><CarFilled className="text-primary" /> Type de service</div>}>
                  <div className="font-medium">{course.type === 'location' ? 'Location avec conducteur' : 'Course simple'}</div>
                </Descriptions.Item>
                {course.type === 'location' && (
                  <Descriptions.Item label={<div className="flex items-center gap-2"><ClockCircleFilled className="text-primary" /> Durée</div>}>
                    <div className="font-medium">{course.duration}</div>
                  </Descriptions.Item>
                )}
                <Descriptions.Item label={<div className="flex items-center gap-2"><CreditCardOutlined className="text-primary" /> Prix</div>}>
                  <div className="font-medium">{course.price.toFixed(2)} €</div>
                </Descriptions.Item>
              </Descriptions>
            </div>

            <div className="bg-gray-50 p-4 !rounded-none">
              <h3 className="font-monument text-sm text-gray-600 mb-3">INFORMATIONS CLIENT</h3>
              <div className="flex items-center gap-4 mb-4">
                <Avatar 
                  size={64}
                  className="bg-primary/10 text-primary border-2 border-primary/20 !rounded-none"
                >
                  {course.client.split(' ')[0][0]}
                </Avatar>
                <div>
                  <div className="font-clash font-medium text-lg">{course.client}</div>
                  <div className="text-gray-500 text-sm">Client fidèle</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <PhoneOutlined className="text-primary" />
                  <span>{course.clientPhone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MailOutlined className="text-primary" />
                  <span>{course.clientEmail}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trajet et Timeline */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-monument text-sm text-gray-600 mb-3">DÉTAILS DU TRAJET</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <div>
                    <div className="font-medium">{course.route.split(' → ')[0]}</div>
                    <div className="text-sm text-gray-500">Point de départ</div>
                  </div>
                </div>
                <div className="ml-3 border-l-2 border-dashed border-gray-300 h-8" />
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{course.route.split(' → ')[1]}</div>
                    <div className="text-sm text-gray-500">Destination</div>
                  </div>
                </div>
              </div>
            </div>

            {course.type === 'location' && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-monument text-sm text-gray-600 mb-3">INFORMATIONS SUPPLÉMENTAIRES</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <InfoCircleOutlined className="text-primary mt-1" />
                    <div>
                      <div className="font-medium">Conditions spéciales</div>
                      <div className="text-sm text-gray-500">{course.specialRequirements}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    );
  };

  const columns = [
    {
      title: (
        <div className="flex items-center gap-2 font-monument text-xs text-gray-600">
          <CalendarOutlined className="text-primary" />
          DATE & HEURE
        </div>
      ),
      dataIndex: 'datetime',
      key: 'datetime',
      render: (text) => (
        <div className="font-clash">
          <div className="font-medium">{text.split(' ')[0]}</div>
          <div className="text-gray-500 text-sm">{text.split(' ')[1]}</div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-2 font-monument text-xs text-gray-600">
          <UserOutlined className="text-primary" />
          CLIENT
        </div>
      ),
      dataIndex: 'client',
      key: 'client',
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <Avatar 
            size="large" 
            className="bg-primary/10 text-primary border-2 border-primary/20 !rounded-none"
          >
            {text.split(' ')[0][0]}
          </Avatar>
          <div>
            <div className="font-clash font-medium">{text}</div>
            <div className="text-xs text-gray-500">Client fidèle</div>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-2 font-monument text-xs text-gray-600">
          <EnvironmentOutlined className="text-primary" />
          TRAJET
        </div>
      ),
      dataIndex: 'route',
      key: 'route',
      render: (text) => (
        <div className="flex items-center gap-2 font-clash">
          <span className="font-medium">{text.split(' → ')[0]}</span>
          <ArrowRightOutlined className="text-gray-400" />
          <span className="font-medium">{text.split(' → ')[1]}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-2 font-monument text-xs text-gray-600">
          <ClockCircleOutlined className="text-primary" />
          STATUT
        </div>
      ),
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        let color = '';
        let icon = null;
        let bgColor = '';
        
        switch (status) {
          case 'En attente':
            color = 'text-blue-600';
            bgColor = 'bg-blue-50';
            icon = <ClockCircleOutlined />;
            break;
          case 'Terminée':
            color = 'text-green-600';
            bgColor = 'bg-green-50';
            icon = <CheckCircleOutlined />;
            break;
          case 'Annulée':
            color = 'text-primary';
            bgColor = 'bg-red-50';
            icon = <StopOutlined />;
            break;
          default:
            color = 'text-gray-600';
            bgColor = 'bg-gray-50';
        }

        return (
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${bgColor} ${color} text-sm font-medium`}>
            {icon}
            <span>{status}</span>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex items-center gap-2 font-monument text-xs text-gray-600">
          <EuroCircleOutlined className="text-primary" />
          PRIX
        </div>
      ),
      dataIndex: 'price',
      key: 'price',
      render: (price) => (
        <div className="font-clash">
          <span className="text-lg font-semibold">{price.toFixed(2)}</span>
          <span className="text-gray-500 ml-1">XOF</span>
        </div>
      ),
    },
    {
      title: '',
      key: 'actions',
      render: (_, record) => (
        <Space size="small" className="flex justify-end">
          <Button 
            type="default"
            onClick={() => showModal(record)}
            className="border-primary/20 text-primary hover:text-white hover:bg-primary hover:border-primary transition-colors !rounded-none"
          >
            Détails
          </Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      datetime: '18/03/2024 15:30',
      client: 'Jean D.',
      clientPhone: '+33 6 12 34 56 78',
      clientEmail: 'jean.d@email.com',
      route: 'Gare de Lyon → Aéroport CDG',
      status: 'Terminée',
      price: 65.00,
      type: 'course'
    },
    {
      key: '2',
      datetime: '18/03/2024 18:00',
      client: 'Marie L.',
      clientPhone: '+33 6 98 76 54 32',
      clientEmail: 'marie.l@email.com',
      route: 'Tour Eiffel → Montmartre',
      status: 'En attente',
      price: 35.50,
      type: 'course'
    },
    {
      key: '3',
      datetime: '17/03/2024 14:15',
      client: 'Pierre M.',
      clientPhone: '+33 6 55 44 33 22',
      clientEmail: 'pierre.m@email.com',
      route: 'Opéra → Place de la Bastille',
      status: 'Annulée',
      price: 25.00,
      type: 'course'
    },
    {
      key: '4',
      datetime: '19/03/2024 09:00',
      client: 'Sophie R.',
      clientPhone: '+33 6 11 22 33 44',
      clientEmail: 'sophie.r@email.com',
      route: 'Paris → Versailles',
      status: 'En attente',
      price: 180.00,
      type: 'location',
      duration: '4 heures',
      specialRequirements: 'Visite guidée du château de Versailles avec attente sur place'
    }
  ];

  const tabItems = [
    {
      key: 'all',
      label: (
        <div className="flex items-center gap-2 px-2">
          <span>Toutes les courses</span>
          <Badge count={data.length} className="bg-primary" />
        </div>
      ),
      children: (
        <Table 
          columns={columns} 
          dataSource={data}
          scroll={{ x: true }}
          pagination={{
            pageSize: 10,
            total: data.length,
            showSizeChanger: true,
            className: "!font-clash [&_.ant-pagination-item-active]:!border-primary [&_.ant-pagination-item-active]:!text-primary",
            showTotal: (total) => (
              <span className="font-monument text-xs text-gray-600">
                Total {total} courses
              </span>
            ),
          }}
          className="[&_th]:!bg-gray-50 [&_th]:!font-monument [&_td]:!py-4"
        />
      ),
    },
    {
      key: 'pending',
      label: (
        <div className="flex items-center gap-2 px-2">
          <span>En attente</span>
          <Badge count={data.filter(item => item.status === 'En attente').length} className="bg-blue-500" />
        </div>
      ),
      children: (
        <Table 
          columns={columns} 
          dataSource={data.filter(item => item.status === 'En attente')}
          scroll={{ x: true }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            className: "!font-clash [&_.ant-pagination-item-active]:!border-primary [&_.ant-pagination-item-active]:!text-primary",
          }}
          className="[&_th]:!bg-gray-50 [&_th]:!font-monument [&_td]:!py-4"
        />
      ),
    },
    {
      key: 'completed',
      label: (
        <div className="flex items-center gap-2 px-2">
          <span>Terminées</span>
          <Badge count={data.filter(item => item.status === 'Terminée').length} className="bg-green-500" />
        </div>
      ),
      children: (
        <Table 
          columns={columns} 
          dataSource={data.filter(item => item.status === 'Terminée')}
          scroll={{ x: true }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            className: "!font-clash [&_.ant-pagination-item-active]:!border-primary [&_.ant-pagination-item-active]:!text-primary",
          }}
          className="[&_th]:!bg-gray-50 [&_th]:!font-monument [&_td]:!py-4"
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 shadow-sm !rounded-none">
        <h1 className="text-2xl font-clash font-semibold text-gray-800">Mes Courses</h1>
        <p className="text-gray-500 mt-1">Gérez vos courses et suivez leur statut</p>
      </div>

      <Card 
        bordered={false}
        className="shadow-sm"
      >
        <Tabs 
          items={tabItems}
          activeKey={activeTab}
          onChange={setActiveTab}
          className="[&_.ant-tabs-nav]:!mb-6 [&_.ant-tabs-tab]:!font-monument [&_.ant-tabs-tab-active]:!text-primary [&_.ant-tabs-ink-bar]:!bg-primary"
        />
      </Card>

      <DetailModal course={selectedCourse} />
    </div>
  );
};

export default Courses; 