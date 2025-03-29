import React from 'react';
import { Modal, Card, Avatar, Tag, Rate, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const AssignDriverModal = ({ 
  isOpen, 
  onClose, 
  onAssign, 
  selectedReservation,
  availableDrivers 
}) => {
  return (
    <Modal
      title="Assigner un conducteur"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      className="!rounded-none"
    >
      <div className="space-y-4">
        {availableDrivers.map(driver => (
          <Card 
            key={driver.id} 
            className="!rounded-none cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onAssign(selectedReservation?.id, driver.id)}
          >
            <div className="flex items-center gap-4">
              <Avatar 
                size={64} 
                icon={<UserOutlined />} 
                className="bg-primary"
              />
              <div className="flex-grow">
                <div className="font-medium">{driver.nom}</div>
                <Rate disabled defaultValue={driver.rating} className="text-sm" />
                <div className="text-sm text-gray-500">
                  {driver.courses} courses effectuées
                </div>
              </div>
              <Tag color="success" className="!rounded-none">
                Disponible
              </Tag>
            </div>
          </Card>
        ))}
      </div>
    </Modal>
  );
};

export default AssignDriverModal; 