import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <li className="bg-white min-w-[290px] sm:min-w-0 w-full max-w-[290px] p-4 flex flex-col justify-start items-start gap-3 shrink-0 sm:shrink">
      <h3 className="text-[16px] font-medium leading-[20px] tracking-[-0.02em]">
        {question}
      </h3>
      <div className="w-full">
        <p className="text-[16px] leading-[20px] tracking-[-0.02em] text-[#666666] font-normal">
          {answer}
        </p>
      </div>
      {answer.length > 100 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-left text-black text-[16px] leading-[20px] tracking-[-0.32px] mt-0"
        >
          {isExpanded ? 'Masquer' : 'En savoir plus...'}
        </button>
      )}
    </li>
  );
};

const FAQ = () => {
  const questions = [
    {
      question: "Comment commander une course ?",
      answer: "C'est facile ! Tout d'abord, vous devez télécharger l'application et vous inscrire. Ensuite, vérifiez votre position actuelle, sélectionnez votre destination et choisissez le type de véhicule qui vous convient."
    },
    {
      question: "Comment puis-je payer : en espèces ou par carte ?",
      answer: "Vous pouvez payer par carte, en espèces ou via l'application KAIROS. Choisissez l'option qui vous convient le mieux lorsque vous commandez votre course."
    },
    {
      question: "Puis-je modifier l'itinéraire en cours de route ?",
      answer: "Oui, vous pouvez modifier la destination ou ajouter des arrêts via l'application. Mais attention, le prix peut également changer."
    },
    {
      question: "Comment garantissez-vous la sécurité ?",
      answer: "Tout d'abord, nous ne travaillons qu'avec des chauffeurs formés et expérimentés. Vous pouvez toujours consulter les évaluations et les commentaires des autres passagers avant votre course."
    },
    {
      question: "Que faire si je ne trouve pas mon chauffeur ?",
      answer: "Vous pouvez toujours contacter le chauffeur par téléphone ou par chat dans l'application. Notre service client est également disponible 24/7 pour vous aider."
    }
  ];

  return (
    <section className="bg-[#f8f8f8]">
      <div className="px-4 py-12 sm:py-14 sm:px-6 md:py-16 lg:py-16">
        <div className="max-w-[1500px] mx-auto">
          <h2 className="mb-4 sm:mb-5 md:mb-6 text-[20px] sm:text-[25px] md:text-[35px] lg:text-[50px] font-medium leading-[1.2] tracking-[-0.03em] text-start">
            Questions fréquentes
          </h2>
          
          <div className="px-4 -mx-4 overflow-x-auto sm:overflow-x-visible sm:mx-0 sm:px-0">
            <ul className="flex flex-row gap-2 p-0 pb-6 m-0 list-none sm:flex-row flex-nowrap sm:flex-wrap sm:justify-between">
              {questions.map((item, index) => (
                <FAQItem 
                  key={index} 
                  question={item.question} 
                  answer={item.answer}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ; 