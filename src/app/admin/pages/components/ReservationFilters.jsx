import React from 'react';
import { Card, Tabs, Divider, Select, DatePicker, Input, Button, Tooltip, Badge } from 'antd';
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/fr_FR';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const ReservationFilters = ({ 
  activeTab, 
  onTabChange, 
  statusFilter, 
  onStatusFilterChange,
  searchText,
  onSearchChange,
  onDateRangeChange 
}) => {
  return (
    <Card bordered={false} className="!rounded-none">
      <Tabs 
        activeKey={activeTab} 
        onChange={onTabChange}
        className="!rounded-none"
      >
        <TabPane 
          tab={
            <span className="flex items-center gap-2">
              <Badge status="default" />
              Toutes
            </span>
          } 
          key="all"
        />
        <TabPane 
          tab={
            <span className="flex items-center gap-2">
              <Badge status="warning" />
              En attente
            </span>
          } 
          key="pending"
        />
        <TabPane 
          tab={
            <span className="flex items-center gap-2">
              <Badge status="processing" />
              En cours
            </span>
          } 
          key="ongoing"
        />
        <TabPane 
          tab={
            <span className="flex items-center gap-2">
              <Badge status="success" />
              Terminées
            </span>
          } 
          key="completed"
        />
      </Tabs>

      <Divider className="my-4" />

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center">
          <Select
            value={statusFilter}
            onChange={onStatusFilterChange}
            className="w-40 [&_.ant-select-selector]:!rounded-none"
            placeholder="Filtrer par statut"
            allowClear
            options={[
              { value: 'all', label: 'Tous les statuts' },
              { value: 'confirmed', label: 'Confirmées' },
              { value: 'pending', label: 'En attente' },
              { value: 'ongoing', label: 'En cours' },
              { value: 'completed', label: 'Terminées' },
              { value: 'cancelled', label: 'Annulées' }
            ]}
          />
          <RangePicker 
            locale={locale}
            className="[&_.ant-picker]:!rounded-none"
            onChange={onDateRangeChange}
            placeholder={['Date début', 'Date fin']}
          />
        </div>
        <div className="flex gap-4 items-center w-full md:w-auto">
          <Input.Search
            placeholder="Rechercher une réservation..."
            className="w-full md:w-64 [&_.ant-input]:!rounded-none [&_.ant-input-search-button]:!rounded-none"
            value={searchText}
            onChange={onSearchChange}
            prefix={<SearchOutlined className="text-gray-400" />}
          />
          <Tooltip title="Exporter les réservations">
            <Button 
              icon={<DownloadOutlined />} 
              className="!rounded-none"
            >
              Exporter
            </Button>
          </Tooltip>
        </div>
      </div>
    </Card>
  );
};

export default ReservationFilters; 