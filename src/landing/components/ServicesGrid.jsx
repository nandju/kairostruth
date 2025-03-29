import React from 'react';
import { Typography, Row, Col } from 'antd';
import { RightOutlined, CarOutlined, ShoppingOutlined, GiftOutlined, BankOutlined, TeamOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ServiceCard = ({ icon, title, description, link, image }) => (
  <a href={link} className="block">
    <div className="bg-gray-50 p-5 h-full transition-all duration-300 hover:shadow-lg group">
      <div className="grid grid-cols-[140px_1fr] gap-4 relative overflow-hidden">
        <div className="col-span-2">
          <div className="flex items-center">
            <span className="text-3xl font-medium">{title}</span>
          </div>
        </div>
        <div className="col-span-2 pr-24">
          <Text className="text-gray-500 text-sm">
            {description}
          </Text>
        </div>
        <div className="absolute right-0 bottom-0 w-24 h-24">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  </a>
);

const ServicesGrid = () => {
  const services = [
    {
      icon: <CarOutlined />,
      title: "Transport VIP",
      description: "Service de chauffeur privé haut de gamme avec véhicules de luxe pour vos déplacements professionnels et personnels",
      link: "/transport-vip",
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=300&auto=format&fit=crop"
    },
    {
      icon: <TeamOutlined />,
      title: "Événements",
      description: "Service sur mesure pour vos mariages, cérémonies et événements spéciaux avec chauffeur dédié",
      link: "/evenements",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=300&auto=format&fit=crop"
    },
    {
      icon: <CarOutlined />,
      title: "Transferts Aéroport",
      description: "Transferts aéroport ponctuels et confortables, avec suivi des vols et prise en charge des bagages",
      link: "/aeroport",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=300&auto=format&fit=crop"
    },
    {
      icon: <TeamOutlined />,
      title: "Business",
      description: "Solutions de transport premium pour entreprises, avec facturation simplifiée et service personnalisé",
      link: "/business",
      image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=300&auto=format&fit=crop"
    },
    {
      icon: <CarOutlined />,
      title: "Tourisme",
      description: "Excursions privées et circuits touristiques avec chauffeur-guide expérimenté",
      link: "/tourisme",
      image: "https://images.unsplash.com/photo-1499678329028-101435549a4e?q=80&w=300&auto=format&fit=crop"
    }
  ];

  return (
    <section id="services" className="py-8 sm:py-10 md:py-[40px] lg:py-[60px] px-4 sm:px-5 md:px-6 lg:px-7">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Titre à gauche */}
          <div className="lg:w-1/3 lg:sticky lg:top-8 lg:self-start">
            <Title 
              level={1} 
              style={{ 
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: 'clamp(40px, 5vw, 50px)',
                lineHeight: '1.2',
                color: '#000000'
              }}
              className="mb-8 lg:mb-0"
            >
              Des services de transport premium adaptés à vos besoins
            </Title>
          </div>

          {/* Grille à droite */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid; 