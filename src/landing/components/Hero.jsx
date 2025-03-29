import React from 'react';
import { Typography, Button, Space, Row, Col } from 'antd';
import { ArrowRightOutlined, CalendarOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Hero = () => {
  return (
    <div 
      className="relative text-white py-24 md:py-32 min-h-[600px] md:min-h-[700px] flex items-center"
      style={{ 
        backgroundImage: 'url(/bg-hero.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Image de fond pour mobile et tablette */}
      <div 
        className="absolute inset-0 md:hidden"
        style={{
          backgroundImage: 'url(/car-1.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0
        }}
      />
      
      {/* Overlay sombre pour améliorer la lisibilité du texte */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
      
      <div className="container mx-auto px-4 relative z-20">
        <Row gutter={[32, 32]} align="middle">
          {/* Colonne de gauche avec le texte */}
          <Col xs={24} md={12} className="text-left">
            <div className="max-w-lg">
              <Title 
                level={1} 
                className="text-white font-poppins mb-6 leading-tight font-bold"
                style={{ 
                  color: '#ffffff',
                  fontSize: 'clamp(2.5rem, 6vw, 5.4rem)'
                }}
              >
                Voyagez en toute sérénité
              </Title>
              
              <Paragraph className="text-gray-light text-lg md:text-xl mb-8">
                Réservez un chauffeur professionnel en quelques clics et profitez d'un trajet confortable et sécurisé.
              </Paragraph>
              
              <Space size="large" className="flex flex-wrap gap-4">
                <Button 
                  type="primary" 
                  size="large"
                  icon={<CalendarOutlined />}
                  className="bg-primary hover:bg-primary-light"
                  style={{ borderRadius: 0, height: '48px', padding: '0 24px' }}
                >
                  Réserver maintenant
                </Button>
                
                <Button 
                  size="large"
                  ghost
                  className="border-white text-white hover:text-primary hover:border-primary"
                  icon={<ArrowRightOutlined />}
                  style={{ borderRadius: 0, height: '48px' }}
                  onClick={() => {
                    const element = document.querySelector('#services');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Nos services
                </Button>
              </Space>
              
              <div className="mt-8 flex items-center">
                <div className="flex -space-x-2 mr-4">
                  {[1, 2, 3, 4].map(i => (
                    <img 
                      key={i}
                      src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${20 + i}.jpg`}
                      alt={`Client ${i}`}
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <div>
                  <span className="text-primary font-bold">4.9/5</span>
                  <span className="text-gray-300 ml-2">Plus de 2000 clients satisfaits</span>
                </div>
              </div>
            </div>
          </Col>
          
          {/* Colonne de droite avec l'image - visible uniquement sur desktop */}
          <Col xs={24} md={12} className="hidden md:flex justify-center md:justify-end">
            <div className="relative w-full">
              <img 
                src="/car-1.webp" 
                alt="Voiture de luxe avec chauffeur" 
                className="w-full h-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-500"
                style={{ maxHeight: '500px', objectFit: 'cover' }}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Hero; 