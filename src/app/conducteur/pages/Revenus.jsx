import React, { useState } from 'react';
import { Card, Row, Col, Statistic, DatePicker, Table, Button, Tabs, Progress, Tag, Modal, Form, Input, Select } from 'antd';
import { 
  DollarOutlined, 
  CarOutlined, 
  ClockCircleOutlined, 
  DownloadOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  CalendarOutlined,
  PlusOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;

const GestionFinanciere = () => {
  const [dateRange, setDateRange] = useState([dayjs().startOf('month'), dayjs().endOf('month')]);
  const [periode, setPeriode] = useState('jour');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Données simulées
  const revenus = {
    total: 496.50,
    courses: 21,
    tempsConduite: '15h 30min',
    progression: 12,
  };

  const depenses = {
    total: 150.25,
    carburant: 80.50,
    entretien: 45.75,
    autres: 24.00,
    progression: -5,
  };

  const solde = revenus.total - depenses.total;

  const columns = {
    revenus: [
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Courses',
        dataIndex: 'rides',
        key: 'rides',
        render: (rides) => (
          <Tag color="blue" className="!rounded-none">
            {rides} courses
          </Tag>
        ),
      },
      {
        title: 'Temps',
        dataIndex: 'drivingTime',
        key: 'drivingTime',
        render: (time) => (
          <Tag color="purple" className="!rounded-none">
            {time}
          </Tag>
        ),
      },
      {
        title: 'Montant',
        dataIndex: 'earnings',
        key: 'earnings',
        render: (amount) => (
          <Tag color="green" className="!rounded-none">
            {amount.toFixed(2)} XOF
          </Tag>
        ),
      },
    ],
    depenses: [
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Catégorie',
        dataIndex: 'category',
        key: 'category',
        render: (category) => (
          <Tag 
            color={
              category === 'Carburant' ? 'orange' :
              category === 'Entretien' ? 'blue' :
              'default'
            }
            className="!rounded-none"
          >
            {category}
          </Tag>
        ),
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Montant',
        dataIndex: 'amount',
        key: 'amount',
        render: (amount) => (
          <Tag color="red" className="!rounded-none">
            -{amount.toFixed(2)} XOF
          </Tag>
        ),
      },
    ],
  };

  const revenusData = [
    {
      key: '1',
      date: '18/03/2024',
      rides: 8,
      drivingTime: '5h 30min',
      earnings: 185.50,
    },
    {
      key: '2',
      date: '17/03/2024',
      rides: 6,
      drivingTime: '4h 45min',
      earnings: 145.75,
    },
  ];

  const depensesData = [
    {
      key: '1',
      date: '18/03/2024',
      category: 'Carburant',
      description: 'Plein d\'essence',
      amount: 80.50,
    },
    {
      key: '2',
      date: '17/03/2024',
      category: 'Entretien',
      description: 'Vidange',
      amount: 45.75,
    },
  ];

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  const periodeButtons = [
    { label: 'Jour', value: 'jour' },
    { label: 'Semaine', value: 'semaine' },
    { label: 'Mois', value: 'mois' },
  ];

  const handleAddDepense = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleModalSubmit = () => {
    form.validateFields().then(values => {
      console.log('Nouvelle dépense:', values);
      // Ici vous ajouteriez la logique pour sauvegarder la dépense
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const categoriesDepenses = [
    { value: 'Carburant', label: 'Carburant' },
    { value: 'Entretien', label: 'Entretien' },
    { value: 'Assurance', label: 'Assurance' },
    { value: 'Réparations', label: 'Réparations' },
    { value: 'Autres', label: 'Autres' },
  ];

  return (
    <div className="space-y-6">
      {/* En-tête avec titre et filtres */}
      <div className="bg-white p-4 md:p-6 shadow-sm !rounded-none">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-clash font-semibold text-gray-800">Gestion Financière</h1>
            <p className="text-sm sm:text-base text-gray-500 mt-1">Suivez vos revenus et dépenses</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
            <div className="flex gap-1 bg-gray-100 p-1 !rounded-none w-full sm:w-auto">
              {periodeButtons.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setPeriode(value)}
                  className={`px-2 sm:px-4 py-1.5 text-xs sm:text-sm font-medium transition-colors !rounded-none flex-1 sm:flex-none ${
                    periode === value
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <RangePicker 
              value={dateRange}
              onChange={handleDateRangeChange}
              className="w-full sm:w-auto !rounded-none"
            />
            <Button 
              icon={<DownloadOutlined />} 
              className="!rounded-none w-full sm:w-auto"
            >
              Exporter
            </Button>
          </div>
        </div>
      </div>

      {/* Vue d'ensemble */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {/* Revenus */}
        <Card bordered={false} className="!rounded-none bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <span className="text-xs sm:text-sm font-medium text-gray-600">Revenus totaux</span>
            <Tag color="green" className="!rounded-none text-xs sm:text-sm">
              +{revenus.progression}%
            </Tag>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-lg sm:text-xl md:text-2xl font-semibold">{revenus.total.toFixed(2)} XOF</p>
              <p className="text-xs sm:text-sm text-gray-500">{revenus.courses} courses</p>
            </div>
            <Progress 
              type="circle" 
              percent={75} 
              width={40} 
              strokeColor="#10B981"
              className="[&_.ant-progress-circle-path]:!stroke-[4px] hidden sm:block"
            />
          </div>
        </Card>

        {/* Dépenses */}
        <Card bordered={false} className="!rounded-none bg-gradient-to-br from-red-50 to-red-100">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <span className="text-xs sm:text-sm font-medium text-gray-600">Dépenses totales</span>
            <Tag color="red" className="!rounded-none text-xs sm:text-sm">
              {depenses.progression}%
            </Tag>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-lg sm:text-xl md:text-2xl font-semibold">{depenses.total.toFixed(2)} XOF</p>
              <p className="text-xs sm:text-sm text-gray-500">
                Carburant: {depenses.carburant} XOF
              </p>
            </div>
            <Progress 
              type="circle" 
              percent={35} 
              width={40} 
              strokeColor="#EF4444"
              className="[&_.ant-progress-circle-path]:!stroke-[4px] hidden sm:block"
            />
          </div>
        </Card>

        {/* Solde */}
        <Card bordered={false} className="!rounded-none bg-gradient-to-br from-blue-50 to-blue-100 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <span className="text-xs sm:text-sm font-medium text-gray-600">Solde net</span>
            <Tag color="blue" className="!rounded-none text-xs sm:text-sm">
              Période en cours
            </Tag>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-lg sm:text-xl md:text-2xl font-semibold">{solde.toFixed(2)} XOF</p>
              <p className="text-xs sm:text-sm text-gray-500">
                {revenus.tempsConduite} de conduite
              </p>
            </div>
            <Progress 
              type="circle" 
              percent={85} 
              width={40} 
              strokeColor="#3B82F6"
              className="[&_.ant-progress-circle-path]:!stroke-[4px] hidden sm:block"
            />
          </div>
        </Card>
      </div>

      {/* Détails */}
      <Card bordered={false} className="!rounded-none">
        <Tabs
          defaultActiveKey="revenus"
          items={[
            {
              key: 'revenus',
              label: (
                <span className="flex items-center gap-2 text-xs sm:text-sm">
                  <ArrowUpOutlined className="text-green-500" />
                  Revenus
                </span>
              ),
              children: (
                <div className="overflow-x-auto">
                  <Table
                    columns={columns.revenus}
                    dataSource={revenusData}
                    pagination={{
                      pageSize: 10,
                      showSizeChanger: true,
                      showTotal: (total) => `Total ${total} entrées`,
                      size: 'small',
                    }}
                    className="[&_.ant-table-thead_.ant-table-cell]:!bg-gray-50 [&_.ant-table-thead_.ant-table-cell]:!text-gray-600 [&_.ant-table]:min-w-[600px]"
                    size="small"
                  />
                </div>
              ),
            },
            {
              key: 'depenses',
              label: (
                <span className="flex items-center gap-2 text-xs sm:text-sm">
                  <ArrowDownOutlined className="text-red-500" />
                  Dépenses
                </span>
              ),
              children: (
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <Button 
                      type="primary" 
                      icon={<PlusOutlined />} 
                      onClick={handleAddDepense}
                      className="!rounded-none bg-primary hover:bg-primary/90 w-full sm:w-auto"
                    >
                      Ajouter une dépense
                    </Button>
                  </div>
                  <div className="overflow-x-auto">
                    <Table
                      columns={columns.depenses}
                      dataSource={depensesData}
                      pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} entrées`,
                        size: 'small',
                      }}
                      className="[&_.ant-table-thead_.ant-table-cell]:!bg-gray-50 [&_.ant-table-thead_.ant-table-cell]:!text-gray-600 [&_.ant-table]:min-w-[600px]"
                      size="small"
                    />
                  </div>
                </div>
              ),
            },
          ]}
        />
      </Card>

      {/* Modal d'ajout de dépense */}
      <Modal
        title={
          <div className="font-clash text-base sm:text-lg">
            Ajouter une dépense
          </div>
        }
        open={isModalVisible}
        onCancel={handleModalCancel}
        onOk={handleModalSubmit}
        okText="Enregistrer"
        cancelText="Annuler"
        className="[&_.ant-modal-content]:!rounded-none [&_.ant-btn]:!rounded-none [&_.ant-select-selector]:!rounded-none [&_.ant-input-number]:!rounded-none [&_.ant-picker]:!rounded-none [&_.ant-input]:!rounded-none"
        width={400}
      >
        <Form
          form={form}
          layout="vertical"
          className="mt-4"
        >
          <Form.Item
            name="date"
            label={<span className="text-sm">Date</span>}
            rules={[{ required: true, message: 'Veuillez sélectionner une date' }]}
          >
            <DatePicker 
              className="w-full" 
              placeholder="Sélectionner une date"
            />
          </Form.Item>

          <Form.Item
            name="category"
            label={<span className="text-sm">Catégorie</span>}
            rules={[{ required: true, message: 'Veuillez sélectionner une catégorie' }]}
          >
            <Select 
              placeholder="Sélectionner une catégorie"
              className="w-full"
            >
              {categoriesDepenses.map(cat => (
                <Option key={cat.value} value={cat.value}>{cat.label}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label={<span className="text-sm">Description</span>}
            rules={[{ required: true, message: 'Veuillez entrer une description' }]}
          >
            <Input 
              placeholder="Description de la dépense"
            />
          </Form.Item>

          <Form.Item
            name="amount"
            label={<span className="text-sm">Montant (XOF)</span>}
            rules={[{ required: true, message: 'Veuillez entrer un montant' }]}
          >
            <Input 
              type="number"
              placeholder="0.00"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GestionFinanciere; 