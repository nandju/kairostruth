import React from 'react';
import { Modal, Button, Tag, Space, Descriptions, Avatar, Divider } from 'antd';
import { 
  CarOutlined, 
  CalendarOutlined, 
  EnvironmentOutlined,
  UserOutlined,
  DollarOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  DownloadOutlined
} from '@ant-design/icons';

const DetailsCourseModal = ({ 
  isOpen, 
  onClose, 
  course 
}) => {
  if (!course) return null;

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <CarOutlined className="text-primary text-xl" />
          <span className="text-lg font-medium">Détails de la course</span>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose} className="!rounded-none">
          Fermer
        </Button>
      ]}
      width={800}
      className="!rounded-none"
    >
      <div className="space-y-6">
        {/* En-tête avec statut */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <CalendarOutlined className="text-gray-400" />
            <span className="text-lg">{course.date}</span>
          </div>
          <Tag 
            color={
              course.statut === 'Terminée' ? 'success' : 
              course.statut === 'En cours' ? 'processing' : 
              'error'
            } 
            className="!rounded-none"
          >
            {course.statut}
          </Tag>
        </div>

        <Divider className="my-4" />

        {/* Informations du conducteur */}
        <div className="bg-gray-50 p-4">
          <div className="flex items-center gap-4">
            <Avatar 
              size={64} 
              icon={<UserOutlined />}
              className="bg-primary"
            />
            <div>
              <h3 className="text-lg font-medium">{course.conducteur}</h3>
              <Space className="text-gray-500">
                <PhoneOutlined />
                <span>+221 77 123 45 67</span>
              </Space>
            </div>
          </div>
        </div>

        {/* Détails de la course */}
        <Descriptions bordered column={2} className="[&_.ant-descriptions-item-label]:bg-gray-50">
          <Descriptions.Item 
            label={
              <Space>
                <EnvironmentOutlined />
                Départ
              </Space>
            }
            span={1}
          >
            {course.depart}
          </Descriptions.Item>
          <Descriptions.Item 
            label={
              <Space>
                <EnvironmentOutlined />
                Destination
              </Space>
            }
            span={1}
          >
            {course.destination}
          </Descriptions.Item>
          <Descriptions.Item 
            label={
              <Space>
                <CarOutlined />
                Distance
              </Space>
            }
          >
            {course.distance} km
          </Descriptions.Item>
          <Descriptions.Item 
            label={
              <Space>
                <ClockCircleOutlined />
                Durée
              </Space>
            }
          >
            {course.duree}
          </Descriptions.Item>
          <Descriptions.Item 
            label={
              <Space>
                <DollarOutlined />
                Coût
              </Space>
            }
            span={2}
          >
            {course.cout.toLocaleString()} FCFA
          </Descriptions.Item>
        </Descriptions>

        {/* Actions supplémentaires */}
        <div className="flex justify-end gap-3 mt-4">
          <Button 
            icon={<DownloadOutlined />}
            className="!rounded-none"
          >
            Télécharger le rapport
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DetailsCourseModal; 