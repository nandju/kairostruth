import React from 'react';
import { Typography, Card, Button, Row, Col, Tag } from 'antd';
import { CarOutlined, GlobalOutlined, ClockCircleOutlined, CheckOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const ServiceCard = ({ icon, title, price, features, buttonText, isPopular }) => (
  <Card 
    className={`h-full transform transition-all duration-300 hover:scale-105 ${
      isPopular ? 'border-primary shadow-2xl' : 'hover:shadow-xl'
    }`}
  >
    {isPopular && (
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <Tag color="primary" className="px-4 py-1 text-sm font-semibold rounded-full">
          Plus Populaire
        </Tag>
      </div>
    )}
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
        {icon}
      </div>
      <Title level={3} className="mb-4">
        {title}
      </Title>
      <div className="mb-6">
        <Text className="text-4xl font-bold text-primary">{price}</Text>
        {price.includes('h') && <Text className="text-gray-500 ml-2">/ heure</Text>}
      </div>
    </div>

    <ul className="space-y-4 mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <CheckOutlined className="text-primary mr-3" />
          <Text>{feature}</Text>
        </li>
      ))}
    </ul>

    <Button 
      type={isPopular ? "primary" : "default"}
      block 
      size="large"
      className={`h-12 ${
        isPopular 
          ? 'bg-primary hover:bg-primary-dark' 
          : 'border-primary text-primary hover:bg-primary hover:text-white'
      }`}
    >
      {buttonText}
    </Button>
  </Card>
);

const ServicesAndPricing = () => {
  const services = [
    {
      icon: <CarOutlined className="text-3xl text-primary" />,
      title: "Transfert Aéroport",
      price: "59€",
      features: [
        "Prix fixe garanti",
        "Suivi des vols en temps réel",
        "30 minutes d'attente offertes",
        "Prise en charge personnalisée",
        "Véhicule premium"
      ],
      buttonText: "Réserver un transfert",
      isPopular: false
    },
    {
      icon: <GlobalOutlined className="text-3xl text-primary" />,
      title: "Business Class",
      price: "79€/h",
      features: [
        "Chauffeur professionnel",
        "Véhicules haut de gamme",
        "Wifi à bord gratuit",
        "Facturation entreprise",
        "Service sur-mesure"
      ],
      buttonText: "Réserver maintenant",
      isPopular: true
    },
    {
      icon: <ClockCircleOutlined className="text-3xl text-primary" />,
      title: "Journée Exclusive",
      price: "490€",
      features: [
        "Chauffeur dédié",
        "Kilométrage illimité",
        "Disponibilité 24/7",
        "Véhicule luxe",
        "Boissons fraîches offertes"
      ],
      buttonText: "Réserver une journée",
      isPopular: false
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"></div>
      
      {/* Cercles décoratifs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Title level={2} className="font-poppins mb-6">
            Des Solutions Adaptées à Vos Besoins
          </Title>
          <Paragraph className="text-lg text-gray-600">
            Découvrez nos services premium de transport avec chauffeur. 
            Des tarifs transparents et des prestations sur-mesure pour tous vos déplacements.
          </Paragraph>
        </div>

        <Row gutter={[32, 32]} className="items-stretch">
          {services.map((service, index) => (
            <Col xs={24} md={8} key={index}>
              <ServiceCard {...service} />
            </Col>
          ))}
        </Row>

        <div className="mt-16 text-center">
          <Paragraph className="text-gray-500 mb-4">
            Tous nos services incluent
          </Paragraph>
          <Row gutter={[16, 16]} justify="center">
            {[
              "Chauffeurs professionnels",
              "Véhicules récents",
              "Assurance premium",
              "Service client 24/7"
            ].map((item, index) => (
              <Col key={index}>
                <Tag className="px-4 py-2 text-sm rounded-full bg-white">
                  {item}
                </Tag>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </section>
  );
};

export default ServicesAndPricing; 