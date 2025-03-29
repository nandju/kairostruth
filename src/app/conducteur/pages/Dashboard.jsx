import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Timeline, Button, Alert } from 'antd';
import { 
  CarOutlined, 
  ClockCircleOutlined, 
  DollarOutlined, 
  StarOutlined,
  BellOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  RightOutlined,
  LeftOutlined
} from '@ant-design/icons';

const Dashboard = () => {
  // Simulation de notifications
  const notifications = [
    {
      type: 'success',
      icon: <CheckCircleOutlined />,
      message: 'Nouvelle course attribuée pour aujourd\'hui à 18h30 - Gare de Lyon',
    },
    {
      type: 'error',
      icon: <CloseCircleOutlined />,
      message: 'Course annulée à 15h45 par le client',
    },
    {
      type: 'info',
      icon: <InfoCircleOutlined />,
      message: 'Les nouveaux tarifs seront appliqués à partir du 1er avril',
    },
    {
      type: 'warning',
      icon: <InfoCircleOutlined />,
      message: 'Trafic dense signalé sur le périphérique',
    }
  ];

  const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentNotificationIndex((prevIndex) => 
      prevIndex === 0 ? notifications.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentNotificationIndex((prevIndex) => 
      prevIndex === notifications.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentNotification = notifications[currentNotificationIndex];

  const getNotificationStyles = (type) => {
    switch(type) {
      case 'success':
        return {
          iconBg: 'bg-green-500/10',
          iconColor: 'text-green-500',
          dotColor: 'bg-green-500'
        };
      case 'error':
        return {
          iconBg: 'bg-primary/10',
          iconColor: 'text-primary',
          dotColor: 'bg-primary'
        };
      case 'info':
        return {
          iconBg: 'bg-blue-500/10',
          iconColor: 'text-blue-500',
          dotColor: 'bg-blue-500'
        };
      case 'warning':
        return {
          iconBg: 'bg-yellow-500/10',
          iconColor: 'text-yellow-500',
          dotColor: 'bg-yellow-500'
        };
      default:
        return {
          iconBg: 'bg-gray-500/10',
          iconColor: 'text-gray-500',
          dotColor: 'bg-gray-500'
        };
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNotificationIndex((prevIndex) => 
        prevIndex === notifications.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change toutes les 5 secondes

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Bande d'information responsive */}
      <div className="bg-primary relative overflow-hidden">
        {/* Conteneur principal responsive */}
        <div className="flex flex-col sm:flex-row relative">
          {/* En-tête de la bande */}
          <div className="w-full sm:w-[200px] bg-primary-dark flex items-center justify-between sm:justify-start p-4 z-10">
            <div className="flex items-center gap-2">
              <BellOutlined className="text-white text-xl" />
              <span className="text-white font-druk text-sm uppercase tracking-wider">Notifications</span>
            </div>
            {/* Gradient de transition - visible uniquement sur desktop */}
            <div className="hidden sm:block absolute right-0 top-0 h-full w-8 bg-gradient-to-r from-primary-dark to-transparent"></div>
          </div>

          {/* Zone de contenu */}
          <div className="flex-1 relative overflow-hidden">
            {/* Notifications mobiles avec défilement */}
            <div className="sm:hidden">
              <div className="relative overflow-hidden" style={{ height: '80px' }}>
                <div className="transition-transform duration-500 ease-in-out"
                     style={{ transform: `translateY(-${currentNotificationIndex * 80}px)` }}>
                  {notifications.map((notif, index) => (
                    <div 
                      key={index}
                      className="absolute w-full p-4"
                      style={{ top: `${index * 80}px` }}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-xl ${
                          notif.type === 'success' ? 'text-green-400' :
                          notif.type === 'error' ? 'text-white' :
                          notif.type === 'info' ? 'text-blue-400' :
                          'text-yellow-400'
                        }`}>
                          {notif.icon}
                        </span>
                        <span className="text-white font-monument text-sm">
                          {notif.message}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Pagination carrée sur mobile */}
              <div className="flex justify-center gap-2 pb-3">
                {notifications.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 transition-all duration-300 ${
                      index === currentNotificationIndex
                        ? 'bg-white'
                        : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Défilement des notifications (desktop) */}
            <div className="hidden sm:flex h-14 items-center overflow-hidden">
              <div className="flex gap-8 items-center animate-scroll-x whitespace-nowrap pl-4">
                {notifications.map((notif, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-sm"
                  >
                    <span className={`text-xl ${
                      notif.type === 'success' ? 'text-green-400' :
                      notif.type === 'error' ? 'text-white' :
                      notif.type === 'info' ? 'text-blue-400' :
                      'text-yellow-400'
                    }`}>
                      {notif.icon}
                    </span>
                    <span className="text-white font-monument text-sm">
                      {notif.message}
                    </span>
                  </div>
                ))}
                {/* Répétition pour l'animation continue (desktop) */}
                {notifications.map((notif, index) => (
                  <div 
                    key={`repeat-${index}`} 
                    className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-sm"
                  >
                    <span className={`text-xl ${
                      notif.type === 'success' ? 'text-green-400' :
                      notif.type === 'error' ? 'text-white' :
                      notif.type === 'info' ? 'text-blue-400' :
                      'text-yellow-400'
                    }`}>
                      {notif.icon}
                    </span>
                    <span className="text-white font-monument text-sm">
                      {notif.message}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <div className="bg-white p-6 shadow-sm border-l-4 border-primary hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 font-monument text-sm tracking-wide">COURSES AUJOURD'HUI</span>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <CarOutlined className="text-primary text-xl" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-3xl font-clash font-semibold text-gray-800">8</span>
              <span className="text-sm text-gray-500 ml-2">courses</span>
            </div>
            <div className="mt-2 flex items-center text-green-500 text-sm">
              <span className="font-medium">+2</span>
              <span className="ml-1">vs. hier</span>
            </div>
          </div>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <div className="bg-white p-6 shadow-sm border-l-4 border-red-500 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 font-monument text-sm tracking-wide">DÉPENSES</span>
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <DollarOutlined className="text-red-500 text-xl" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-3xl font-clash font-semibold text-gray-800">45.80</span>
              <span className="text-sm text-gray-500 ml-2">€</span>
            </div>
            <div className="mt-2 flex items-center text-red-500 text-sm">
              <span className="font-medium">-12%</span>
              <span className="ml-1">vs. hier</span>
            </div>
          </div>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <div className="bg-white p-6 shadow-sm border-l-4 border-green-500 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 font-monument text-sm tracking-wide">REVENUS</span>
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <DollarOutlined className="text-green-500 text-xl" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-3xl font-clash font-semibold text-gray-800">125.50</span>
              <span className="text-sm text-gray-500 ml-2">€</span>
            </div>
            <div className="mt-2 flex items-center text-green-500 text-sm">
              <span className="font-medium">+8%</span>
              <span className="ml-1">vs. hier</span>
            </div>
          </div>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <div className="bg-white p-6 shadow-sm border-l-4 border-yellow-500 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 font-monument text-sm tracking-wide">NOTE MOYENNE</span>
              <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <StarOutlined className="text-yellow-500 text-xl" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-3xl font-clash font-semibold text-gray-800">4.8</span>
              <span className="text-sm text-gray-500 ml-2">/5</span>
            </div>
            <div className="mt-2 flex items-center text-green-500 text-sm">
              <span className="font-medium">+0.2</span>
              <span className="ml-1">vs. hier</span>
            </div>
          </div>
        </Col>
      </Row>

      {/* Activité récente et Prochaines courses */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <div className="bg-white shadow-sm hover:shadow-lg transition-shadow duration-200">
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <span className="font-monument text-sm tracking-wide text-gray-600">ACTIVITÉ RÉCENTE</span>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <ClockCircleOutlined className="text-primary text-sm" />
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="absolute top-3 bottom-0 left-1.5 w-[1px] bg-gray-200"></div>
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-clash font-medium text-gray-800">Course terminée</p>
                        <p className="text-sm text-gray-500 mt-1">15:30 - Gare de Lyon → Aéroport CDG</p>
                        <div className="mt-2 inline-flex items-center px-2 py-1 bg-green-50 text-green-700 text-xs rounded">
                          Client satisfait - 5/5
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">Il y a 30min</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <div className="absolute top-3 bottom-0 left-1.5 w-[1px] bg-gray-200"></div>
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-clash font-medium text-gray-800">Nouvelle réservation</p>
                        <p className="text-sm text-gray-500 mt-1">14:45 - Pour demain à 9h00</p>
                        <div className="mt-2 inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                          Trajet: Opéra → La Défense
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">Il y a 1h</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-clash font-medium text-gray-800">Course annulée</p>
                        <p className="text-sm text-gray-500 mt-1">13:15 - Tour Eiffel → Montmartre</p>
                        <div className="mt-2 inline-flex items-center px-2 py-1 bg-red-50 text-primary text-xs rounded">
                          Compensation 5€
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">Il y a 2h</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
        
        <Col xs={24} lg={12}>
          <div className="bg-white shadow-sm hover:shadow-lg transition-shadow duration-200">
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <span className="font-monument text-sm tracking-wide text-gray-600">PROCHAINES COURSES</span>
                <div className="flex items-center gap-3">
                  <button className="text-primary hover:text-primary-dark font-medium text-sm transition-colors">
                    Voir tout
                  </button>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <CarOutlined className="text-primary text-sm" />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <div className="absolute top-3 bottom-0 left-1.5 w-[1px] bg-gray-200"></div>
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-clash font-medium text-gray-800">Place de la Bastille</p>
                        <p className="text-sm text-gray-500 mt-1">Client: Marie D.</p>
                        <div className="mt-2 inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                          16:45 - Destination: Gare Montparnasse
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">Dans 1h</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <div className="absolute top-3 bottom-0 left-1.5 w-[1px] bg-gray-200"></div>
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-clash font-medium text-gray-800">Gare du Nord</p>
                        <p className="text-sm text-gray-500 mt-1">Client: Thomas B.</p>
                        <div className="mt-2 inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                          18:00 - Destination: Aéroport d'Orly
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">Dans 2h15</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-clash font-medium text-gray-800">Opéra Garnier</p>
                        <p className="text-sm text-gray-500 mt-1">Client: Sophie M.</p>
                        <div className="mt-2 inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                          19:30 - Destination: Champs-Élysées
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">Dans 3h45</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Style pour les animations */}
      <style jsx="true">{`
        @keyframes scroll-x {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-x {
          animation: scroll-x 30s linear infinite;
        }

        .animate-scroll-x:hover {
          animation-play-state: paused;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard; 