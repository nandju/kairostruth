import React from 'react';
import { Typography } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

const ServiceCard = ({ title, description, price, details, features, link, image, reverse }) => (
  <a href={link} className="block">
    <div className={`flex flex-col lg:flex-row ${reverse ? 'lg:flex-row-reverse' : ''} h-full p-6 transition-all duration-300 rounded-lg bg-gray-50 hover:shadow-lg gap-6`}>
      <div className="w-full lg:w-[50%] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
        <div className="w-full h-full overflow-hidden">
          <img src={image} alt={title} className="object-cover w-full h-full rounded-md" />
        </div>
      </div>
      <div className="relative flex flex-col justify-center items-start text-start gap-4 lg:w-[50%]">
        <div>
          <span className="text-2xl font-semibold">{title}</span>
        </div>
        <Text className="text-sm text-gray-500">{description}</Text>
        {price && (
          <div>
            <Text className="text-lg font-semibold">{price}</Text>
            {details && <Text className="block text-sm text-gray-500">{details}</Text>}
          </div>
        )}
        {features?.length > 0 && (
          <ul className="mt-2 space-y-2 text-sm text-gray-600">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircleOutlined className="text-green-500" /> {feature}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </a>
);

const ServicesGrid = () => {
  const services = [
    {
      title: "Transferts Aéroport",
      description: "Pour vos déplacements sans stress vers ou depuis l'AIBD.",
      price: "Transfert Simple : 25 000 FCFA",
      details: "Aller-Retour : 40 000 FCFA",
      features: [
        "Confort et Sécurité : Véhicules entretenus et chauffeurs qualifiés.",
        "Fiabilité : Ponctualité garantie pour ne pas manquer vos vols.",
        "Sérénité : Que ce soit une arrivée ou un départ, nous nous occupons de tout pour vous !",
      ],
      link: "/transferts-aeroport",
      image: "https://i.pinimg.com/736x/70/16/c6/7016c680ae4e103497b9c0e46a163269.jpg",
    },
    {
      title: "Mise À Disposition À Dakar",
      description: "La flexibilité pour tous vos besoins dans la capitale !",
      price: "Tarif Horaire : 10 000 FCFA",
      details: "À partir de 3 heures : 8 000 FCFA / heure",
      features: [
        "Flexibilité : Idéal pour des rendez-vous successifs ou des déplacements spontanés.",
        "Confort Optimal : Chauffeur dédié pour la durée souhaitée.",
        "Découverte de Dakar : Partez à la découverte de la ville avec l'aide d'un guide local.",
      ],
      link: "/mise-a-disposition-dakar",
      image: "https://i.pinimg.com/736x/70/16/c6/7016c680ae4e103497b9c0e46a163269.jpg",
    },
    {
      title: "Mise À Disposition en Région",
      description: "Pour vos trajets vers les régions du Sénégal avec confort et sécurité.",
      price: "Demi-journée ou journée complète sur mesure (nous contacter)",
      details: "Carburant : À la charge du client",
      features: [
        "Flexibilité : Parfait pour des voyages d'affaires ou des excursions.",
        "Connaissance des Routes : Nos chauffeurs connaissent les meilleures routes et destinations.",
        "Personnalisation : Possibilité d'organiser des trajets selon vos besoins.",
      ],
      link: "/mise-a-disposition-region",
      image: "https://i.pinimg.com/736x/70/16/c6/7016c680ae4e103497b9c0e46a163269.jpg",
    },
  ];

  return (
    <section id="servicesplus" className="px-4 py-8">
      <div className="container mx-auto">
        <div className="flex flex-col justify-center gap-12 text-center">
          <div>
        <h2 className="mb-4 sm:mb-5 md:mb-6 text-[20px] sm:text-[25px] md:text-[35px] lg:text-[50px] font-medium leading-[1.2] tracking-[-0.03em] text-start">
          Services détaillés
        </h2>
          </div>
          <div className="flex flex-col gap-12">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} reverse={index % 2 !== 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
