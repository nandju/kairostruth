import React from 'react';

const CityBlock = () => {
  const cities = [
    { name: 'Dakar', link: 'https://yango.com/fr_sn/city/dakar/' },
    { name: 'Thiès', link: 'https://yango.com/fr_sn/city/thies/' },
    { name: 'Rufisque', link: 'https://yango.com/fr_sn/city/rufisque/' },
    { name: 'Saint-Louis', link: 'https://yango.com/fr_sn/city/saint_louis/' },
    { name: 'Touba', link: 'https://yango.com/fr_sn/city/touba/' }
  ];

  return (
    <>
      {/* Section Villes */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-10 py-10 md:py-16 lg:py-20">
        <div className="container mx-auto max-w-[1504px]">
          <h2 className="text-[28px] sm:text-[34px] md:text-[38px] lg:text-[42px] font-medium leading-[120%] lg:leading-[100%] tracking-[-0.03em]">
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
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Contenu */}
            <div className="w-full lg:w-[50%] p-6 sm:p-8 md:p-10 flex items-center">
              <div className="w-full lg:max-w-[400px] mx-auto">
                <p className="text-[22px] sm:text-[24px] md:text-[30px] lg:text-[32px] font-medium leading-[120%] tracking-[-0.02em] text-center lg:text-left">
                  Vous n'avez pas de smartphone pour utiliser l'appli? Pas de problème!
                </p>

                <div className="hidden lg:block my-8"></div>

                <p className="text-[25px] sm:text-[25px] md:text-[44px] lg:text-[48px] font-medium leading-[100%] tracking-[-0.03em] py-4 lg:py-6 whitespace-nowrap text-center lg:text-left">
                  Appelez le 33 825 0825
                </p>

                <p className="text-[22px] sm:text-[24px] md:text-[30px] lg:text-[32px] font-medium leading-[120%] tracking-[-0.02em] mb-8 text-center lg:text-left">
                  pour commander des courses abordables 24/7
                </p>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-[500px] mx-auto lg:mx-0">
                  <a 
                    href="tel:33 825 0825"
                    className="w-full sm:w-[240px] inline-flex h-[50px] px-5 items-center justify-center bg-[#990000] text-white hover:bg-[#800000] transition-colors duration-300 text-base font-medium"
                  >
                    Appelez le 33 825 0825
                  </a>

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