import React from 'react';

const SecurityCard = ({ icon, title, description }) => {
  return (
    <div className="bg-[#f8f8f8] h-full">
      <div className="p-4 flex flex-col h-full">
        <div className="py-3 pl-4">
          <img 
            src={icon} 
            alt={title}
            className="w-[120px] h-[120px] object-contain"
          />
        </div>
        
        <div className="px-4 pb-6">
          <h3 className="text-[20px] font-medium leading-[21px] tracking-[-0.6px] text-black mb-4">
            {title}
          </h3>
          <p className="text-[16px] leading-[20px] tracking-[-0.32px] text-[#666666]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const SecurityFeatures = () => {
  const features = [
    {
      icon: "https://avatars.mds.yandex.net/get-lpc/12373972/72f445b5-0bf0-44e3-ba1b-29ba50469958/orig",
      title: "Des prix abordables",
      description: "Fini le marchandage. L'application calcule automatiquement le coût de votre trajet"
    },
    {
      icon: "https://avatars.mds.yandex.net/get-lpc/10116223/41bf8f64-8616-46f9-a936-7dca1da93d1f/orig",
      title: "Économisez sur vos trajets",
      description: "Profitez de nos offres spéciales et réductions exclusives sur vos trajets"
    },
    {
      icon: "https://avatars.mds.yandex.net/get-lpc/10704932/e5cee746-b1af-431a-b274-d010467013d2/orig",
      title: "Fonctions de sécurité",
      description: "Des fonctions de sécurité exclusives accessibles en 2 clics dans l'application KAIROS"
    },
    {
      icon: "https://avatars.mds.yandex.net/get-lpc/9736426/0de8fd20-d93e-4109-9aa9-cdf2f3a92e06/orig",
      title: "Paiements sans espèces",
      description: "Pourquoi compter l'argent et attendre la monnaie? Payez directement via l'application et ne vous souciez plus de rien!"
    }
  ];

  return (
    <section className="py-8 sm:py-10 md:py-[60px] lg:py-20 px-4 sm:px-5 md:px-6 lg:px-10">
      <div className="container mx-auto max-w-[1500px]">
        <h2 className="text-[42px] sm:text-[60px] md:text-[90px] font-medium leading-[100%] tracking-[-1.26px] text-left mb-6 sm:mb-10">
          Des services adaptés à vos besoins
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <SecurityCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityFeatures; 