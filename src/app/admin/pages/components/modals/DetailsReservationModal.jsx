import React from 'react';
import { 
  Modal, 
  Descriptions, 
  Button, 
  Space, 
  Tag, 
  Timeline, 
  Avatar,
  Rate,
  Divider,
  Card
} from 'antd';
import { 
  UserOutlined, 
  CarOutlined, 
  EnvironmentOutlined,
  PhoneOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  MessageOutlined
} from '@ant-design/icons';

const DetailsReservationModal = ({ 
  isOpen, 
  onClose, 
  reservation, 
  onCancel,
  onConfirm,
  onAssign,
  getStatusColor
}) => {
  if (!reservation) return null;

  return (
    <Modal
      title={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CarOutlined className="text-primary" />
            <span>Détails de la réservation #{reservation.id}</span>
          </div>
          <Tag 
            color={getStatusColor(reservation.statut)}
            className="!rounded-none"
            icon={
              reservation.statut === 'Confirmée' ? <CheckCircleOutlined /> :
              reservation.statut === 'En cours' ? <ClockCircleOutlined /> :
              undefined
            }
          >
            {reservation.statut}
          </Tag>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      width={800}
      className="[&_.ant-modal-content]:!rounded-none [&_.ant-modal-header]:!rounded-none [&_.ant-modal-body]:!p-6 [&_.ant-modal-footer]:!rounded-none [&_*]:!rounded-none"
      centered
      footer={
        <Space>
          <Button 
            danger 
            onClick={() => onCancel(reservation.id)}
            className="!rounded-none"
          >
            Annuler la réservation
          </Button>
          <Button 
            type="primary" 
            onClick={() => onConfirm(reservation.id)}
            className="!rounded-none"
          >
            Confirmer
          </Button>
        </Space>
      }
    >
      <div className="space-y-6">
        {/* Informations du client */}
        <Card bordered={false} className="!rounded-none [&_*]:!rounded-none">
          <div className="flex items-center gap-4">
            <Avatar 
              size={64} 
              icon={<UserOutlined />}
              className="bg-primary !rounded-none"
            />
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-lg">{reservation.client.nom}</h3>
                  <Space className="mt-1">
                    <span className="text-gray-500">
                      <PhoneOutlined className="mr-1" />
                      {reservation.client.telephone}
                    </span>
                  </Space>
                </div>
                <Button 
                  icon={<MessageOutlined />}
                  className="!rounded-none"
                >
                  Contacter
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Divider />

        {/* Détails de la location */}
        <Descriptions bordered column={2} className="[&_.ant-descriptions-item-label]:!bg-gray-50 [&_*]:!rounded-none">
          <Descriptions.Item 
            label={
              <span className="flex items-center gap-2">
                <CarOutlined />
                Type de location
              </span>
            }
            span={2}
          >
            <Tag color={reservation.avecConducteur ? "processing" : "success"} className="!rounded-none">
              {reservation.avecConducteur ? "Avec conducteur" : "Sans conducteur"}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item 
            label={
              <span className="flex items-center gap-2">
                <CalendarOutlined />
                Date début
              </span>
            }
          >
            {reservation.dateHeure.debut}
          </Descriptions.Item>
          <Descriptions.Item 
            label={
              <span className="flex items-center gap-2">
                <CalendarOutlined />
                Date fin
              </span>
            }
          >
            {reservation.dateHeure.fin}
          </Descriptions.Item>
          <Descriptions.Item 
            label={
              <span className="flex items-center gap-2">
                <ClockCircleOutlined />
                Durée
              </span>
            }
            span={2}
          >
            {reservation.duree} jours
          </Descriptions.Item>
          <Descriptions.Item 
            label={
              <span className="flex items-center gap-2">
                <DollarOutlined />
                Montant
              </span>
            }
            span={2}
          >
            <div className="space-y-1">
              <div className="font-medium text-success">
                {reservation.montant.total.toLocaleString()} FCFA
              </div>
              <div className="text-sm text-gray-500">
                {reservation.montant.parJour.toLocaleString()} FCFA / jour
              </div>
            </div>
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        {/* Conducteur assigné - affiché uniquement si la location est avec conducteur */}
        {reservation.avecConducteur && (
          <>
            {reservation.conducteur ? (
              <Card 
                title={
                  <span className="flex items-center gap-2">
                    <CarOutlined className="text-primary" />
                    Conducteur assigné
                  </span>
                }
                bordered={false}
                className="!rounded-none [&_*]:!rounded-none"
              >
                <div className="flex items-center gap-4">
                  <Avatar 
                    size={64} 
                    icon={<CarOutlined />}
                    className="bg-success !rounded-none"
                  />
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-lg">{reservation.conducteur.nom}</h3>
                        <Rate disabled defaultValue={reservation.conducteur.rating} className="text-sm [&_*]:!rounded-none" />
                      </div>
                      <Button 
                        type="primary"
                        className="!rounded-none"
                        onClick={() => onAssign(reservation)}
                      >
                        Changer de conducteur
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <Card bordered={false} className="!rounded-none [&_*]:!rounded-none bg-gray-50">
                <div className="text-center py-4">
                  <p className="text-gray-500 mb-4">Aucun conducteur assigné</p>
                  <Button 
                    type="primary"
                    icon={<CarOutlined />}
                    className="!rounded-none"
                    onClick={() => onAssign(reservation)}
                  >
                    Assigner un conducteur
                  </Button>
                </div>
              </Card>
            )}

            <Divider />
          </>
        )}

        {/* Timeline des événements */}
        <Card 
          title={
            <span className="flex items-center gap-2">
              <ClockCircleOutlined className="text-primary" />
              Historique
            </span>
          }
          bordered={false}
          className="!rounded-none [&_*]:!rounded-none"
        >
          <Timeline
            items={[
              {
                color: 'blue',
                children: (
                  <div>
                    <p className="font-medium">Réservation créée</p>
                    <p className="text-sm text-gray-500">15/03/2024 14:30</p>
                  </div>
                )
              },
              ...(reservation.avecConducteur && reservation.conducteur ? [
                {
                  color: 'green',
                  children: (
                    <div>
                      <p className="font-medium">Conducteur assigné</p>
                      <p className="text-sm text-gray-500">15/03/2024 14:35</p>
                    </div>
                  )
                }
              ] : []),
              {
                color: 'blue',
                children: (
                  <div>
                    <p className="font-medium">En cours</p>
                    <p className="text-sm text-gray-500">15/03/2024 14:45</p>
                  </div>
                )
              }
            ]}
          />
        </Card>
      </div>
    </Modal>
  );
};

export default DetailsReservationModal; 