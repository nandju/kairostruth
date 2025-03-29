import React, { useState } from 'react';
import { Typography } from 'antd';

const { Title, Text } = Typography;

const CarCard = ({ image, title, subtitle, description, features }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-[#f8f8f8] overflow-hidden h-full">
      <div className="p-8 pt-0 flex flex-col h-full">
        <div className="overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-auto object-cover aspect-[640/367]"
          />
        </div>
        
        <div className="mt-6">
          <h3 className="text-[34px] font-medium leading-[34px]">
            {title}
            {subtitle && (
              <span className="block text-base uppercase font-semibold tracking-[-0.02em] pt-[22px] leading-[20px]">
                {subtitle}
              </span>
            )}
          </h3>
        </div>

        <div className="mt-6 flex-grow">
          <Text className="text-[#666666] text-base leading-5 block">
            {description}
          </Text>

          {features && features.length > 0 && (
            <div className="mt-8">
              <div 
                className={`cursor-pointer font-medium text-black flex items-center justify-between`}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <span>Caractéristiques</span>
                <img 
                  src="https://avatars.mds.yandex.net/get-lpc/9736426/5d5f6397-27f8-47f2-8f12-5a7220290456/orig?width=20&height=20"
                  alt="toggle"
                  className={`transition-transform duration-100 ${isExpanded ? 'rotate-180' : ''}`}
                />
              </div>
              
              {isExpanded && (
                <ul className="mt-3 text-[#666666] list-none">
                  {features.map((feature, index) => (
                    <li key={index} className="pb-3 last:pb-0 flex items-start">
                      <span className="w-[6px] h-[6px] bg-[#990000] mt-[8px] mr-3 flex-shrink-0"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <button className="mt-8 w-full h-[44px] border border-[#990000] text-base font-medium transition-all duration-300 hover:bg-[#990000] hover:text-white">
          Réserver
        </button>
      </div>
    </div>
  );
};

const CarCategories = () => {
  const categories = [
    {
      image: "https://avatars.mds.yandex.net/get-lpc/12373972/12c84eb4-9700-4ce6-86f3-e56de7975be1/orig",
      title: "Économique",
      subtitle: "Transport simple",
      description: "Suzuki Alto, Toyota Starlet",
      features: [
        "Trajet court",
        "Prix abordable",
        "Disponibilité rapide"
      ]
    },
    {
      image: "https://avatars.mds.yandex.net/get-lpc/12373972/6065ce26-8a01-4e17-bf9a-d450dfbde488/orig",
      title: "Confort",
      subtitle: "Transport confortable",
      description: "Toyota Yaris, Renault Logan",
      features: [
        "Espace confortable",
        "Climatisation",
        "Trajet moyen"
      ]
    },
    {
      image: "https://avatars.mds.yandex.net/get-lpc/1635340/513b6dac-ff6b-45d4-a0df-465d460f9f33/orig",
      title: "Confort +",
      subtitle: "Transport spacieux",
      description: "Hyundai Elantra, Toyota Corolla",
      features: [
        "Grand espace",
        "Climatisation",
        "Long trajet"
      ]
    },
    {
      image: "https://avatars.mds.yandex.net/get-lpc/12373972/5311e932-0e95-408e-833e-3f49e775ba4a/orig",
      title: "Premium",
      subtitle: "Transport luxueux",
      description: "Mercedes Classe E, BMW Série 5",
      features: [
        "Véhicule luxueux",
        "Service VIP",
        "Tout trajet"
      ]
    }
  ];

  return (
    <section className="py-8 sm:py-10 md:py-[40px] lg:py-[60px] px-4 sm:px-5 md:px-6 lg:px-7">
      <div className="container mx-auto max-w-[1504px]">
        <h2 className="mb-6 sm:mb-7 md:mb-8 text-[42px] sm:text-[60px] md:text-[75px] lg:text-[90px] font-medium leading-[1.2] tracking-[-0.03em]">
          Catégories de service
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {categories.map((category, index) => (
            <CarCard key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarCategories; 