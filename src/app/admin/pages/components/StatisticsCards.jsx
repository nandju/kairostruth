import React from 'react';
import { Card, Statistic, Progress, Badge, Tooltip } from 'antd';
import { RiseOutlined, DollarOutlined } from '@ant-design/icons';

const StatisticsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card bordered={false} className="!rounded-none hover:shadow-md transition-shadow">
        <Statistic
          title={
            <span className="flex items-center gap-2">
              <Badge status="processing" />
              Réservations du jour
            </span>
          }
          value={12}
          prefix={
            <Tooltip title="En augmentation">
              <RiseOutlined className="text-success" />
            </Tooltip>
          }
          valueStyle={{ color: '#1890ff' }}
        />
        <Progress 
          percent={75} 
          showInfo={false}
          strokeColor="#1890ff"
          className="!rounded-none mt-2"
        />
      </Card>

      <Card bordered={false} className="!rounded-none hover:shadow-md transition-shadow">
        <Statistic
          title={
            <span className="flex items-center gap-2">
              <Badge status="warning" />
              En attente
            </span>
          }
          value={5}
          valueStyle={{ color: '#faad14' }}
          suffix={
            <span className="text-sm text-gray-500">/ 12</span>
          }
        />
        <div className="mt-2 text-xs text-gray-500">
          2 depuis plus d'une heure
        </div>
      </Card>

      <Card bordered={false} className="!rounded-none hover:shadow-md transition-shadow">
        <Statistic
          title={
            <span className="flex items-center gap-2">
              <Badge status="success" />
              Taux de confirmation
            </span>
          }
          value={85}
          suffix="%"
          valueStyle={{ color: '#52c41a' }}
          prefix={
            <Tooltip title="En augmentation">
              <RiseOutlined className="text-success" />
            </Tooltip>
          }
        />
        <Progress 
          percent={85} 
          showInfo={false}
          strokeColor="#52c41a"
          className="!rounded-none mt-2"
        />
      </Card>

      <Card bordered={false} className="!rounded-none hover:shadow-md transition-shadow">
        <Statistic
          title={
            <span className="flex items-center gap-2">
              <DollarOutlined className="text-success" />
              Revenus du jour
            </span>
          }
          value={245000}
          suffix="FCFA"
          valueStyle={{ color: '#52c41a' }}
        />
        <div className="mt-2 text-xs text-gray-500">
          +15% vs. hier
        </div>
      </Card>
    </div>
  );
};

export default StatisticsCards; 