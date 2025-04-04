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
      <div className="absolute inset-0 z-10 bg-black bg-opacity-60"></div>
      
      <div className="container relative z-20 px-4 mx-auto">
        <Row gutter={[32, 32]} align="middle">
          {/* Colonne de gauche avec le texte */}
          <Col xs={24} md={12} className="text-left">
            <div className="max-w-lg">
              <Title 
                level={1} 
                className="mb-6 font-bold leading-tight text-white font-poppins"
                style={{ 
                  color: '#ffffff',
                  fontSize: 'clamp(2.5rem, 6vw, 5.4rem)'
                }}
              >
                Voyagez en toute sérénité
              </Title>
              
              <Paragraph className="mb-8 text-lg text-gray-light md:text-xl">
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
                  className="text-white border-white hover:text-primary hover:border-primary"
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
              
              <div className="flex items-center mt-8">
                <div className="flex mr-4 -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <img 
                      key={i}
                      src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${20 + i}.jpg`}
                      alt={`Client ${i}`}
                      className="w-10 h-10 border-2 border-white rounded-full"
                    />
                  ))}
                </div>
                <div>
                  <span className="font-bold text-primary">4.9/5</span>
                  <span className="ml-2 text-gray-300">Plus de 2000 clients satisfaits</span>
                </div>
              </div>
            </div>
          </Col>
          
          {/* Colonne de droite avec l'image - visible uniquement sur desktop */}
          <Col xs={24} md={12} className="justify-center hidden md:flex md:justify-end">
            <div className="relative w-full">
              <img 
                src="/assets/car-1.webp" 
                alt="Voiture de luxe avec chauffeur" 
                className="w-full h-auto transition-transform duration-500 transform rounded-lg shadow-2xl hover:scale-105"
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