import React from 'react';
import { Typography } from 'antd';
import { CarOutlined } from '@ant-design/icons';

const { Text } = Typography;

const ServiceCard = ({ title, description, link, image }) => (
  <a href={link} className="block break-words">
    <div className="h-full p-6 transition-all duration-300 rounded-lg bg-gray-50 hover:shadow-lg">
      <div className="relative flex flex-col gap-4">
        <div className="w-full h-40">
          <img src={image} alt={title} className="object-cover w-full h-full rounded-md" />
        </div>
        <div>
          <span className="text-xl font-semibold">{title}</span>
        </div>
        <Text className="px-2 overflow-hidden text-sm text-gray-500 break-words">{description}</Text>
        
      </div>
    </div>
  </a>
);

const ServicesGrid = () => {
  const services = [
    {
      title: "Transferts Aéroport",
      description: "Pour vos déplacements sans stress vers ou depuis l'aéroport.",
      // price: "Transfert Simple : 25 000 FCFA",
      // details: "Aller-Retour : 40 000 FCFA",
      // features: [
      //   "Confort et Sécurité : Véhicules entretenus et chauffeurs qualifiés.",
      //   "Fiabilité : Ponctualité garantie pour ne pas manquer vos vols.",
      //   "Sérénité : Que ce soit une arrivée ou un départ, nous nous occupons de tout pour vous !",
      // ],
      link: "#servicesplus",
      image: "/aeroport.jpg",
    },
    {
      title: "Mise À Disposition À Dakar",
      description: "La flexibilité pour tous vos besoins dans la capitale !",
      // price: "Tarif Horaire : 10 000 FCFA",
      // details: "À partir de 3 heures : 8 000 FCFA / heure",
      // features: [
      //   "Flexibilité : Idéal pour des rendez-vous successifs ou des déplacements spontanés.",
      //   "Confort Optimal : Chauffeur dédié pour la durée souhaitée.",
      //   "Découverte de Dakar : Partez à la découverte de la ville avec l'aide d'un guide local.",
      // ],
      link: "#servicesplus",
      image: "/dakar.png",
    },
    {
      title: "Mise À Disposition en Région",
      description: "Pour vos trajets vers les régions du Sénégal avec confort et sécurité.",
      // price: "Demi-journée ou journée complète sur mesure (nous contacter)",
      // details: "Carburant : À la charge du client",
      // features: [
      //   "Flexibilité : Parfait pour des voyages d'affaires ou des excursions.",
      //   "Connaissance des Routes : Nos chauffeurs connaissent les meilleures routes et destinations.",
      //   "Personnalisation : Possibilité d'organiser des trajets selon vos besoins.",
      // ],
      link: "#servicesplus",
      image: "/region.jpg",
    },
  ];

  return (
    <section id="services" className="px-4 py-8">
  <div className="container flex flex-col items-center mx-auto text-center">
    <div className="flex flex-col items-center justify-center gap-12">
      <div className="flex flex-row items-start justify-start">
        <div className="mb-4 sm:mb-5 md:mb-6 text-[20px] sm:text-[25px] md:text-[35px] lg:text-[50px] font-medium leading-[1.2] tracking-[-0.03em] text-start"
        >
          Des services de transport adaptés à vos besoins
        </div>
      </div>
      <div className="flex justify-center w-full lg:w-2/3">
      <div className="grid grid-cols-1 gap-6 pb-4 overflow-x-auto sm:grid-cols-3 lg:hidden whitespace-nowrap">
              <div className="flex space-x-4">
                {services.map((service, index) => (
                  <div key={index} className="flex-shrink-0 w-80">
                    <ServiceCard {...service} />
                  </div>
                ))}
              </div>
            </div>
        <div className="hidden gap-20 lg:grid lg:grid-cols-3 justify-items-center">
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
