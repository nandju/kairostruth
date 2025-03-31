import React from 'react';
import { PhoneOutlined } from "@ant-design/icons";

const CityBlock = () => {
  const cities = [
    { name: 'Dakar', link: '' },
    { name: 'Partout dans le sénégal', link: '' },
  ];

  return (
    <>
      {/* Section Villes */}
      <section className="px-4 py-8 sm:px-6 md:px-8 lg:px-10 md:py-12 lg:py-16">
        <div className="container mx-auto max-w-[1504px]">
          <h2 className="mb-4 sm:mb-5 md:mb-6 text-[20px] sm:text-[25px] md:text-[35px] lg:text-[50px] font-medium leading-[1.2] tracking-[-0.03em] text-start">
            Où nous trouver : {' '}
            {cities.map((city, index) => (
              <React.Fragment key={city.name}>
                <a 
                  href={city.link}
                  className="text-[#3f95ce] hover:text-[#990000] transition-colors duration-300"
                >
                  {city.name}
                </a>
                {index < cities.length - 2 && ', '}
                {index === cities.length - 2 && ' et '}
              </React.Fragment>
            ))}
          </h2>
        </div>
      </section>

      {/* Section Appel */}
      <section id="contact" className="px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="container mx-auto max-w-[1504px]">
          <div className="bg-[#f8f8f8] overflow-hidden flex flex-col lg:flex-row">
            {/* Image */}
            <div className="w-full lg:w-[50%] h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
              <div className="w-full h-full overflow-hidden">
                <img 
                  src="https://avatars.mds.yandex.net/get-lpc/10704932/cff5c961-fa35-462d-be81-a09476d909d1/orig"
                  alt="Support téléphonique"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Contenu */}
            <div className="w-full lg:w-[50%] p-6 sm:p-8 md:p-10 flex items-center">
              <div className="w-full lg:max-w-[400px] mx-auto">
                <p className="text-[12px] sm:text-[15px] md:text-[20px] lg:text-[25px] font-extralight leading-[120%] tracking-[-0.02em] text-center lg:text-left">
                  Vous n'avez pas de smartphone pour utiliser l'appli? Pas de problème!
                </p>

                <div className="hidden my-8 lg:block"></div>

                <p className="text-[12px] sm:text-[15px] md:text-[20px] lg:text-[25px] font-medium leading-[100%] tracking-[-0.03em] py-4 lg:py-6 whitespace-nowrap text-center lg:text-left">
                  Appelez le 33 825 0825
                </p>

                <p className="text-[12px] sm:text-[15px] md:text-[20px] lg:text-[25px] font-extralight leading-[120%] tracking-[-0.02em] mb-8 text-center lg:text-left">
                  pour commander des courses abordables 24/7
                </p>

                <div className="flex flex-col sm:flex-col gap-4 sm:gap-6 w-full sm:w-[500px] justify-center items-center lg:items-start mx-auto lg:mx-0">
                  
                  {/* Bouton WhatsApp */}
                  <a 
                    href="https://wa.me/221338250825" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full sm:w-[240px] inline-flex h-[50px] px-5 items-center justify-center bg-[#25D366] text-white hover:bg-[#1EBE57] transition-colors duration-300 text-base font-medium"
                  >
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                      alt="WhatsApp"
                      className="w-6 h-6 mr-2"
                    />
                    Écrire sur WhatsApp
                  </a>

                  {/* Bouton Appeler */}
                  <a 
                    href="tel:33 825 0825"
                    className="w-full sm:w-[240px] inline-flex h-[50px] px-5 items-center justify-center bg-[#990000] text-white hover:bg-[#800000] transition-colors duration-300 text-base font-medium"
                  >
                    <PhoneOutlined className="mr-2 text-lg text-white" />
                    Appelez le 33 825 0825
                  </a>

                  {/* Bouton Copier le Numéro */}
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText('33 825 0825');
                      alert('Numéro copié !');
                    }}
                    className="w-full sm:w-[240px] inline-flex h-[50px] px-5 items-center justify-center border border-[#e5e5e5] hover:border-black transition-colors duration-300 text-base font-medium"
                  >
                    <img 
                      src="https://avatars.mds.yandex.net/get-lpc/9736426/e434ea41-c121-4408-b759-b5ecf35f7224/orig"
                      alt="copy"
                      className="w-6 h-6 mr-2"
                    />
                    Copier le numéro
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CityBlock; 