import React from 'react';
import { Typography } from 'antd';

const { Title, Text } = Typography;

const CarCard = ({ image, title, subtitle, description }) => {
  // const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-[#f8f8f8] overflow-hidden h-full">
      <div className="flex flex-col h-full p-8 pt-0">
        <div className="overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-auto object-contain aspect-[640/367]"
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

        <div className="flex-grow mt-6">
          <Text className="text-[#666666] text-base leading-5 block">
            {description}
          </Text>

          {/* {features && features.length > 0 && (
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
                    <li key={index} className="flex items-start pb-3 last:pb-0">
                      <span className="w-[6px] h-[6px] bg-[#990000] mt-[8px] mr-3 flex-shrink-0"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )} */}
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
      image: "/berline.png",
      title: "Berline",
      subtitle: "Transport simple",
      description: "Jusqu'à 4 places",
      features: [
        "Trajet court",
        "Prix abordable",
        "Disponibilité rapide"
      ]
    },
    {
      image: "/suv.png",
      title: "Suv",
      subtitle: "Transport confortable",
      description: "Jusqu'à 4 places",
      features: [
        "Espace confortable",
        "Climatisation",
        "Trajet moyen"
      ]
    },
    {
      image: "/van.png",
      title: "VAN",
      subtitle: "Transport spacieux",
      description: "Jusqu'à 7 places",
      features: [
        "Grand espace",
        "Climatisation",
        "Long trajet"
      ]
    },
    {
      image: "/minibus.png",
      title: "Mini-Bus",
      subtitle: "Transport luxueux",
      description: "Jusqu'à 15 places",
      features: [
        "Véhicule luxueux",
        "Service VIP",
        "Tout trajet"
      ]
    },
    {
      image: "/utilitaire.png",
      title: "Véhicule",
      subtitle: "Transport personnalisé",
      description: "Utilitaire",
      features: [
        "Véhicule luxueux",
        "Service VIP",
        "Tout trajet"
      ]
    },
  ];

  return (
    <section className="py-6 sm:py-8 md:py-[30px] lg:py-[50px] px-4 sm:px-5 md:px-6 lg:px-7">
  <div className="container mx-auto max-w-[1504px]">
    <h2 className="mb-4 sm:mb-5 md:mb-6 text-[20px] sm:text-[25px] md:text-[35px] lg:text-[50px] font-medium leading-[1.2] tracking-[-0.03em] text-start">
      Notre sélection de véhicules
    </h2>
    
    {/* Conteneur scrollable */}
    <div className="flex gap-3 overflow-x-auto sm:gap-4 whitespace-nowrap scroll-smooth">
      {categories.map((category, index) => (
        <div key={index} className="flex-shrink-0 w-[300px] sm:w-[350px] md:w-[400px] lg:w-[450px]">
          <CarCard {...category} />
        </div>
      ))}
    </div>
  </div>
</section>

  );
};

export default CarCategories; 