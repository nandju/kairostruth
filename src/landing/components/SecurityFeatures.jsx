import React from 'react';
import { Tooltip } from 'antd';

const StepCard = ({ number, title, description }) => {
  return (
    <Tooltip title={description} placement="top">
      <div className="bg-[#f8f8f8] h-full cursor-pointer transition-all duration-300 hover:shadow-lg">
        <div className="flex flex-col h-full p-4">
          <div className="py-3 pl-4">
            <div className="flex items-center justify-center w-[60px] h-[60px] rounded-full bg-[#990000] text-white font-bold text-[24px]">
              {number}
            </div>
            <div className="h-[2px] w-full bg-[#990000] mt-2"></div>
          </div>

          <div className="px-4 pb-6">
            <h3 className="text-[20px] font-medium leading-[21px] tracking-[-0.6px] text-black mb-4">
              {title}
            </h3>
          </div>
        </div>
      </div>
    </Tooltip>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Choisissez votre Service et Zone",
      description: "Sélectionnez entre Transfert (trajet direct) ou Mise à disposition (location avec chauffeur)."
    },
    {
      number: "2",
      title: "Renseignez la destination et l'heure",
      description: "Indiquez votre lieu d'arrivée et sélectionnez la date et l'heure de prise en charge."
    },
    {
      number: "3",
      title: "Confirmation et Envoi",
      description: "Indiquez votre mode de paiement, validez votre demande et imprimez votre facture."
    }
  ];

  return (
    <section className="py-6 sm:py-8 md:py-[50px] lg:py-16 px-4 sm:px-5 md:px-6 lg:px-10">
      <div className="container mx-auto max-w-[1500px]">
        <h2 className="mb-4 sm:mb-5 md:mb-6 text-[20px] sm:text-[25px] md:text-[35px] lg:text-[50px] font-medium leading-[1.2] tracking-[-0.03em] text-start">
          COMMENT ÇA MARCHE AVEC <span className="text-[#990000]">KAIROS ?</span>
        </h2>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide whitespace-nowrap lg:grid lg:grid-cols-3 lg:gap-4">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
