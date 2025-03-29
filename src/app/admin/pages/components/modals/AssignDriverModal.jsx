import React from 'react';
import { Modal, Card, Avatar, Tag, Rate, Space, Button } from 'antd';
import { UserOutlined, CarOutlined, CheckCircleOutlined, ClockCircleOutlined, PhoneOutlined } from '@ant-design/icons';

const AssignDriverModal = ({ 
  isOpen, 
  onClose, 
  selectedReservation, 
  availableDrivers = [], 
  onAssign 
}) => {
  // Données de test pour les conducteurs disponibles
  const mockDrivers = [
    {
      id: 1,
      nom: 'John Doe',
      rating: 4.8,
      courses: 156,
      disponible: true,
      photo: null
    },
    {
      id: 2,
      nom: 'Marie Diop',
      rating: 4.9,
      courses: 203,
      disponible: true,
      photo: null
    },
    {
      id: 3,
      nom: 'Amadou Sow',
      rating: 4.7,
      courses: 178,
      disponible: false,
      photo: null
    }
  ];

  const drivers = availableDrivers.length > 0 ? availableDrivers : mockDrivers;

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <CarOutlined className="text-primary" />
          <span>Assigner un conducteur</span>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
      className="[&_.ant-modal-content]:!rounded-none [&_.ant-modal-header]:!rounded-none [&_.ant-modal-body]:!p-6 [&_.ant-modal-footer]:!rounded-none [&_*]:!rounded-none"
      centered
    >
      {selectedReservation && (
        <Card 
          className="mb-6 !rounded-none [&_*]:!rounded-none" 
          bordered={false}
        >
          <div className="flex items-center gap-4">
            <Avatar 
              size={64} 
              icon={<UserOutlined />} 
              className="bg-primary !rounded-none"
            />
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-lg">{selectedReservation.client.nom}</h3>
                  <Space className="mt-1">
                    <span className="text-gray-500">
                      <PhoneOutlined className="mr-1" />
                      {selectedReservation.client.telephone}
                    </span>
                  </Space>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-4">
        {drivers.map((driver) => (
          <Card 
            key={driver.id}
            hoverable
            className="!rounded-none [&_*]:!rounded-none"
            onClick={() => onAssign(driver.id)}
          >
            <div className="flex items-center gap-4">
              <Avatar 
                size={64} 
                icon={<CarOutlined />}
                className={`${driver.disponible ? 'bg-success' : 'bg-warning'} !rounded-none`}
              />
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-lg">{driver.nom}</h3>
                    <Rate disabled defaultValue={driver.rating} className="text-sm [&_*]:!rounded-none" />
                    <div className="mt-1">
                      <Tag color={driver.disponible ? 'success' : 'warning'} className="!rounded-none">
                        {driver.disponible ? 'Disponible' : 'En course'}
                      </Tag>
                      <Tag className="ml-2 !rounded-none">{driver.courses} courses</Tag>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Modal>
  );
};

export default AssignDriverModal; 