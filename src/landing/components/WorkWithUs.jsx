import React from 'react';
import { Typography } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import ScrollingRibbon from './ScrollingRibbon';

const { Title, Text } = Typography;

const WorkCard = ({ title, description }) => (
  <div className="bg-[#F8F8F8] p-4 sm:p-5 h-full transition-all duration-300 hover:shadow-lg group cursor-default">
    <div className="grid grid-rows-[min-content_min-content] gap-2 sm:gap-2.5">
      <div className="flex items-center justify-between">
        <span className="text-[24px] sm:text-[28px] md:text-[32px] font-medium leading-[100%] group-hover:text-[#990000] transition-colors duration-300">{title}</span>
        <img 
          className="w-8 transition-transform duration-300 serv-arrow sm:w-auto group-hover:translate-x-1" 
          src="https://avatars.mds.yandex.net/get-lpc/10704932/21e2cd32-7dca-4476-9f8c-75f72a8bbf2d/orig" 
          alt="icône"
        />
      </div>
      <Text className="text-[#707070] text-xs sm:text-sm leading-[110%] group-hover:text-black transition-colors duration-300">
        {description}
      </Text>
    </div>
  </div>
);

const SecurityFeature = ({ title, description }) => (
  <div className="flex flex-col gap-1">
    <span className="text-base sm:text-lg md:text-xl font-medium leading-[21px] text-black pb-2 sm:pb-3 md:pb-4">
      {title}
    </span>
    <Text className="text-[#666666] text-xs sm:text-sm md:text-base leading-5">
      {description}
    </Text>
  </div>
);

const WorkWithUs = () => {
  const workCards = [
    {
      title: "Réservation VTC",
      description: "Réservez votre chauffeur privé pour tous vos déplacements professionnels et personnels"
    },
    {
      title: "Service Premium",
      description: "Découvrez nos services haut de gamme et nos offres sur mesure pour vos événements spéciaux"
    }
  ];

  const securityFeatures = [
    {
      title: "Service personnalisé",
      description: "Un service sur mesure adapté à vos besoins, que ce soit pour vos déplacements professionnels ou personnels."
    },
    {
      title: "Disponibilité 24/7",
      description: "Nous sommes à votre disposition 24h/24 et 7j/7 pour tous vos trajets, même de dernière minute."
    },
    {
      title: "Confort et élégance",
      description: "Voyagez dans des véhicules haut de gamme conduits par des chauffeurs expérimentés et courtois."
    },
    {
      title: "Ponctualité garantie",
      description: "La ponctualité est notre marque de fabrique. Nous nous engageons à respecter vos horaires."
    }
  ];

  return (
    <div className="my-10 sm:my-16 md:my-20">
      {/* Section Travaillez avec nous */}
      <section className="px-4 py-10 sm:py-16 md:py-20 sm:px-6 md:px-10">
        <div className="container mx-auto">
          <div 
            className="mb-4 sm:mb-5 md:mb-6 text-[20px] sm:text-[25px] md:text-[35px] lg:text-[50px] font-medium leading-[1.2] tracking-[-0.03em] text-start"
          >
            Nos services premium
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px] sm:gap-[30px] max-w-[800px]">
            {workCards.map((card, index) => (
              <WorkCard key={index} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* Ruban défilant
      <ScrollingRibbon /> */}

      {/* Section Sécurité */}
      <section className="px-4 pb-10 bg-white sm:pb-16 md:pb-20 sm:px-6 md:px-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 md:gap-20">
            <div className="h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop"
                alt="Service VTC"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col justify-center h-full py-6 sm:py-8 md:py-10">
              <div 
                className="mb-4 sm:mb-5 md:mb-6 text-[20px] sm:text-[25px] md:text-[35px] lg:text-[50px] font-medium leading-[1.2] tracking-[-0.03em] text-start"
              >
                L'excellence du transport privé
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:gap-10">
                {securityFeatures.map((feature, index) => (
                  <SecurityFeature key={index} {...feature} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkWithUs; 