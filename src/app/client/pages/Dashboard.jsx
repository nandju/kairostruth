import React, { useState, useEffect } from 'react';
import { Input, Modal, Form, Button, DatePicker, TimePicker, Select, Radio } from 'antd';
import { NotificationOutlined, GiftOutlined, CustomerServiceOutlined, ThunderboltOutlined, CarOutlined, EnvironmentOutlined, ClockCircleOutlined, StarOutlined, LoadingOutlined, ArrowLeftOutlined, ArrowRightOutlined, CheckOutlined } from '@ant-design/icons';

const Dashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [reservationType, setReservationType] = useState(null);
  const [selectedDates, setSelectedDates] = useState({ startDate: null, endDate: null });
  const [form] = Form.useForm();

  const messages = [
    {
      text: "Bienvenue sur  , votre allié pour la gestion de vos réservations",
      icon: <NotificationOutlined className="text-3xl" />,
      color: "bg-primary"
    },
    {
      text: "🎉 NOUVEAU : -20% sur les réservations de longue durée ce mois-ci !",
      icon: <GiftOutlined className="text-3xl" />,
      color: "bg-primary-light"
    },
    {
      text: "Une question ? Notre service client est disponible 24/7",
      icon: <CustomerServiceOutlined className="text-3xl" />,
      color: "bg-primary-dark"
    },
    {
      text: "⚡️ Découvrez notre nouvelle gamme de véhicules premium",
      icon: <ThunderboltOutlined className="text-3xl" />,
      color: "bg-primary-darker"
    }
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        setIsAnimating(false);
      }, 500);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const currentMessage = messages[currentMessageIndex];

  const recentTrips = [
    {
      id: 1,
      location: "Aéroport Charles de Gaulle",
      address: "95700 Roissy-en-France",
      date: "15 Mars 2024",
      time: "14:30",
      rating: 5,
      price: "95€",
      duration: "45 min",
      distance: "28 km"
    },
    {
      id: 2,
      location: "Disneyland Paris",
      address: "77700 Marne-la-Vallée",
      date: "12 Mars 2024",
      time: "09:15",
      rating: 4,
      price: "85€",
      duration: "40 min",
      distance: "25 km"
    }
  ];

  const handleInputClick = () => {
    setIsModalVisible(true);
    getCurrentLocation();
  };

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=VOTRE_CLE_API&language=fr`
            );
            const data = await response.json();
            if (data.results && data.results[0]) {
              setCurrentLocation(data.results[0].formatted);
              form.setFieldsValue({ pickup: data.results[0].formatted });
            }
          } catch (error) {
            console.error('Erreur de géocodage:', error);
          } finally {
            setIsLoadingLocation(false);
          }
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error);
          setIsLoadingLocation(false);
        }
      );
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleModalSubmit = (values) => {
    console.log('Valeurs du formulaire:', values);
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleReservationTypeChange = (e) => {
    setReservationType(e.target.value);
    form.resetFields();
  };

  const vehicleCategories = [
    {
      id: 'economique',
      title: 'Économique',
      description: 'Suzuki Alto, Toyota Starlet',
      price: '15€',
      basePrice: '2.5€/km',
      image: "https://avatars.mds.yandex.net/get-lpc/12373972/12c84eb4-9700-4ce6-86f3-e56de7975be1/orig",
    },
    {
      id: 'confort',
      title: 'Confort',
      description: 'Toyota Yaris, Renault Logan',
      price: '20€',
      basePrice: '3€/km',
      image: "https://avatars.mds.yandex.net/get-lpc/12373972/6065ce26-8a01-4e17-bf9a-d450dfbde488/orig",
    },
    {
      id: 'confort_plus',
      title: 'Confort +',
      description: 'Hyundai Elantra, Toyota Corolla',
      price: '25€',
      basePrice: '3.5€/km',
      image: "https://avatars.mds.yandex.net/get-lpc/1635340/513b6dac-ff6b-45d4-a0df-465d460f9f33/orig",
    },
    {
      id: 'premium',
      title: 'Premium',
      description: 'Mercedes Classe E, BMW Série 5',
      price: '35€',
      basePrice: '4.5€/km',
      image: "https://avatars.mds.yandex.net/get-lpc/12373972/5311e932-0e95-408e-833e-3f49e775ba4a/orig",
    }
  ];

  const calculateDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1; // Retourne au moins 1 jour
  };

  const handleDateChange = (dates) => {
    if (!dates || !dates[0] || !dates[1]) {
      setSelectedDates({ startDate: null, endDate: null });
      return;
    }
    setSelectedDates({
      startDate: dates[0],
      endDate: dates[1]
    });
  };

  return (
    <div className="-m-6">
      {/* Ruban défilant moderne et responsive */}
      <div className={`group relative overflow-hidden ${currentMessage.color} transition-all duration-700`}>
        {/* Barre de progression animée */}
        <div className="absolute top-0 left-0 h-1 bg-white/20 w-full">
          <div className="h-full bg-white/40 animate-progress-bar" />
        </div>

        <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 md:py-5 lg:py-8">
          {/* Contenu principal */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-8">
            {/* Icône avec cercle de fond - Taille adaptative */}
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
              {React.cloneElement(currentMessage.icon, { 
                className: "text-base sm:text-lg md:text-xl lg:text-3xl text-white" 
              })}
            </div>

            {/* Texte avec animation - Taille adaptative */}
            <div className={`flex-grow transition-all duration-500 ${
              isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}>
              <p className="text-white text-sm sm:text-base md:text-lg lg:text-2xl font-druk tracking-wide m-0 line-clamp-2 sm:line-clamp-1">
                {currentMessage.text}
              </p>
            </div>
          </div>

          {/* Indicateurs de progression - Position et taille adaptatives */}
          <div className="absolute bottom-1 sm:bottom-2 md:bottom-3 lg:bottom-4 right-2 sm:right-3 md:right-4 flex gap-0.5 sm:gap-1 md:gap-1.5">
            {messages.map((_, index) => (
              <div
                key={index}
                className={`h-0.5 sm:h-1 md:h-1.5 transition-all duration-300 ${
                  index === currentMessageIndex 
                    ? 'w-3 sm:w-4 md:w-5 lg:w-6 bg-white' 
                    : 'w-0.5 sm:w-1 md:w-1.5 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Effet de brillance au survol - Masqué sur mobile */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none hidden sm:block">
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 animate-shine" />
        </div>
      </div>

      <div className="p-0">
        {/* Barre de recherche */}
        <div className="w-full pt-6">
          <Input
            size="large"
            placeholder="Où allons-nous aujourd'hui ?"
            prefix={<CarOutlined className="text-2xl text-primary" />}
            className="h-16 text-lg rounded-none border border-gray-200 hover:border-primary focus:border-primary transition-all duration-300 px-6 [&>input]:border-0"
            onClick={handleInputClick}
          />
        </div>

        {/* Dernières courses */}
        <div className="w-full mt-8">
          <h2 className="text-xl font-druk mb-4 px-0">Vos dernières courses</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentTrips.map(trip => (
              <div 
                key={trip.id}
                className="group bg-white border border-gray-200 hover:border-primary cursor-pointer transition-all duration-300"
              >
                <div className="p-4">
                  {/* En-tête avec localisation et date */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <EnvironmentOutlined className="text-xl text-primary" />
                        <h3 className="text-lg font-semibold text-gray-800">{trip.location}</h3>
                      </div>
                      <p className="text-gray-500 text-sm ml-8">{trip.address}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-800">{trip.date}</p>
                      <p className="text-sm text-gray-500">{trip.time}</p>
                    </div>
                  </div>

                  {/* Détails de la course */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <ClockCircleOutlined className="text-gray-400" />
                        <span className="text-sm text-gray-600">{trip.duration}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {trip.distance}
                      </div>
                      <div className="flex items-center gap-1">
                        <StarOutlined className="text-primary" />
                        <span className="text-sm text-gray-600">{trip.rating}</span>
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-primary">
                      {trip.price}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Slider Voitures */}
      <div className="mt-16 pb-12">
        <div className="flex items-center justify-between mb-8 px-6">
          <div>
            <h2 className="text-xl font-druk mb-2">Notre flotte de véhicules</h2>
            <p className="text-gray-500">Découvrez notre sélection de véhicules premium pour tous vos déplacements</p>
          </div>
          <div className="flex gap-2">
            <Button 
              type="text" 
              icon={<ArrowLeftOutlined />} 
              className="border border-gray-200 hover:border-primary hover:text-primary transition-all"
              onClick={() => {
                const slider = document.querySelector('.vehicles-slider');
                slider.scrollLeft -= 350;
              }}
            />
            <Button 
              type="text" 
              icon={<ArrowRightOutlined />} 
              className="border border-gray-200 hover:border-primary hover:text-primary transition-all"
              onClick={() => {
                const slider = document.querySelector('.vehicles-slider');
                slider.scrollLeft += 350;
              }}
            />
          </div>
        </div>

        <div className="vehicles-slider flex overflow-x-auto gap-6 pb-4 px-6 scrollbar-hide scroll-smooth">
          {[
            {
              image: "https://avatars.mds.yandex.net/get-lpc/12373972/5311e932-0e95-408e-833e-3f49e775ba4a/orig",
              name: "Mercedes Classe E",
              category: "Premium",
              description: "Élégance et confort pour vos trajets d'affaires",
              features: ["Sièges en cuir", "Climatisation 4 zones", "Wifi embarqué"],
              price: "À partir de 35€/heure"
            },
            {
              image: "https://avatars.mds.yandex.net/get-lpc/12373972/6065ce26-8a01-4e17-bf9a-d450dfbde488/orig",
              name: "BMW Série 5",
              category: "Premium",
              description: "Performance et luxe pour vos déplacements",
              features: ["Intérieur cuir", "Toit ouvrant", "Son premium"],
              price: "À partir de 35€/heure"
            },
            {
              image: "https://avatars.mds.yandex.net/get-lpc/1635340/513b6dac-ff6b-45d4-a0df-465d460f9f33/orig",
              name: "Audi A6",
              category: "Premium",
              description: "Technologie et raffinement à votre service",
              features: ["GPS intégré", "Sièges chauffants", "Audio Bang & Olufsen"],
              price: "À partir de 35€/heure"
            },
            {
              image: "https://avatars.mds.yandex.net/get-lpc/12373972/12c84eb4-9700-4ce6-86f3-e56de7975be1/orig",
              name: "Tesla Model S",
              category: "Premium+",
              description: "L'excellence électrique pour vos trajets",
              features: ["100% électrique", "Autopilot", "Écran 17 pouces"],
              price: "À partir de 40€/heure"
            }
          ].map((vehicle, index) => (
            <div 
              key={index}
              className="flex-none w-[400px] group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <div className="aspect-[16/9]">
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6 bg-white border border-t-0 border-gray-200 group-hover:border-primary transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{vehicle.name}</h3>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-sm">
                      {vehicle.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-primary font-semibold">{vehicle.price}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{vehicle.description}</p>
                
                <div className="space-y-2">
                  {vehicle.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckOutlined className="text-primary text-sm" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        title={
          <div className="flex items-center gap-4">
            {reservationType && (
              <Button 
                icon={<ArrowLeftOutlined />} 
                type="text"
                onClick={() => {
                  setReservationType(null);
                  form.resetFields();
                }}
                className="hover:text-primary -ml-2"
              />
            )}
            <span>
              {reservationType ? (
                reservationType === 'trajet' ? 'Réserver un trajet' : 'Location de véhicule'
              ) : 'Nouvelle réservation'}
            </span>
          </div>
        }
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
        width={800}
        className="font-poppins [&_.ant-modal-content]:rounded-none [&_.ant-modal-header]:rounded-none [&_.ant-btn]:rounded-none [&_.ant-input]:rounded-none [&_.ant-picker]:rounded-none [&_.ant-select-selector]:rounded-none [&_.ant-radio-wrapper]:rounded-none"
      >
        {!reservationType ? (
          <div className="py-4">
            <h3 className="text-lg font-semibold mb-4">Type de réservation</h3>
            <Radio.Group onChange={handleReservationTypeChange} value={reservationType} className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Radio value="trajet" className="w-full">
                  <div className="p-4 border border-gray-200 hover:border-primary transition-all duration-300 cursor-pointer w-full">
                    <h4 className="font-semibold">Réserver un trajet</h4>
                    <p className="text-gray-500 text-sm">D'un point A à un point B avec chauffeur</p>
                  </div>
                </Radio>
                <Radio value="location" className="w-full">
                  <div className="p-4 border border-gray-200 hover:border-primary transition-all duration-300 cursor-pointer w-full">
                    <h4 className="font-semibold">Location de véhicule</h4>
                    <p className="text-gray-500 text-sm">Louez un véhicule pour une durée définie</p>
                  </div>
                </Radio>
              </div>
            </Radio.Group>
          </div>
        ) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleModalSubmit}
            className="mt-4"
          >
            {reservationType === 'trajet' ? (
              <>
                {/* Formulaire pour un trajet */}
                <Form.Item
                  name="pickup"
                  label="Point de départ"
                  rules={[{ required: true, message: 'Veuillez renseigner le point de départ' }]}
                >
                  <Input
                    prefix={<EnvironmentOutlined className="text-primary" />}
                    placeholder="Votre position actuelle"
                    suffix={isLoadingLocation && <LoadingOutlined spin />}
                    className="rounded-none [&>*]:rounded-none"
                  />
                </Form.Item>

                <Form.Item
                  name="destination"
                  label="Destination"
                  rules={[{ required: true, message: 'Veuillez renseigner la destination' }]}
                >
                  <Input
                    prefix={<EnvironmentOutlined className="text-primary" />}
                    placeholder="Où souhaitez-vous aller ?"
                    className="rounded-none [&>*]:rounded-none"
                  />
                </Form.Item>

                {/* Sélection du véhicule */}
                <Form.Item
                  name="vehicleType"
                  label="Type de véhicule"
                  rules={[{ required: true, message: 'Veuillez sélectionner un type de véhicule' }]}
                >
                  <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
                    {vehicleCategories.map((vehicle) => (
                      <div
                        key={vehicle.id}
                        className={`flex-none w-[300px] border cursor-pointer transition-all duration-300 hover:border-primary ${
                          form.getFieldValue('vehicleType') === vehicle.id ? 'border-primary' : 'border-gray-200'
                        }`}
                        onClick={() => form.setFieldsValue({ vehicleType: vehicle.id })}
                      >
                        <div className="aspect-[16/9] overflow-hidden">
                          <img 
                            src={vehicle.image} 
                            alt={vehicle.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-semibold">{vehicle.title}</h4>
                            <div className="text-right">
                              <div className="text-primary font-semibold">{vehicle.price}</div>
                              <div className="text-sm text-gray-500">{vehicle.basePrice}</div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{vehicle.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Form.Item>

                <Form.Item
                  name="notes"
                  label="Notes supplémentaires"
                >
                  <Input.TextArea
                    placeholder="Informations complémentaires..."
                    rows={4}
                    className="rounded-none"
                  />
                </Form.Item>
              </>
            ) : (
              <>
                {/* Formulaire pour une location */}
                <Form.Item
                  name="pickupLocation"
                  label="Lieu de prise en charge"
                  rules={[{ required: true, message: 'Veuillez renseigner le lieu de prise en charge' }]}
                >
                  <Input
                    prefix={<EnvironmentOutlined className="text-primary" />}
                    placeholder="Où souhaitez-vous récupérer le véhicule ?"
                    className="rounded-none [&>*]:rounded-none"
                  />
                </Form.Item>

                <Form.Item
                  name="dates"
                  label="Période de location"
                  rules={[{ required: true, message: 'Veuillez sélectionner les dates de location' }]}
                >
                  <DatePicker.RangePicker
                    className="w-full"
                    format="DD/MM/YYYY"
                    placeholder={['Date de début', 'Date de fin']}
                    onChange={handleDateChange}
                  />
                </Form.Item>

                {/* Sélection du véhicule */}
                <Form.Item
                  name="vehicleType"
                  label="Type de véhicule"
                  rules={[{ required: true, message: 'Veuillez sélectionner un type de véhicule' }]}
                >
                  <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
                    {vehicleCategories.map((vehicle) => {
                      const numberOfDays = calculateDays(selectedDates.startDate, selectedDates.endDate);
                      const dailyPrice = parseInt(vehicle.price.replace('€', ''));
                      const totalPrice = numberOfDays * dailyPrice;
                      const hasDiscount = numberOfDays >= 7;
                      const discountedPrice = hasDiscount ? Math.round(totalPrice * 0.8) : totalPrice;

                      return (
                        <div
                          key={vehicle.id}
                          className={`flex-none w-[300px] border cursor-pointer transition-all duration-300 hover:border-primary ${
                            form.getFieldValue('vehicleType') === vehicle.id ? 'border-primary' : 'border-gray-200'
                          }`}
                          onClick={() => form.setFieldsValue({ vehicleType: vehicle.id })}
                        >
                          <div className="aspect-[16/9] overflow-hidden">
                            <img 
                              src={vehicle.image} 
                              alt={vehicle.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-lg font-semibold">{vehicle.title}</h4>
                              <div className="text-right">
                                {numberOfDays > 0 ? (
                                  <>
                                    <div className="text-primary font-semibold">
                                      {hasDiscount && (
                                        <span className="line-through text-gray-400 text-sm mr-2">
                                          {totalPrice}€
                                        </span>
                                      )}
                                      {discountedPrice}€
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {vehicle.price}/jour × {numberOfDays} jour{numberOfDays > 1 ? 's' : ''}
                                    </div>
                                    {hasDiscount && (
                                      <div className="text-xs text-green-600 font-medium mt-1">
                                        -20% sur 7 jours et +
                                      </div>
                                    )}
                                  </>
                                ) : (
                                  <div className="text-primary font-semibold">
                                    {vehicle.price}/jour
                                  </div>
                                )}
                                <div className="text-sm text-gray-500">Kilométrage illimité</div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">{vehicle.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Form.Item>

                <Form.Item
                  name="notes"
                  label="Notes supplémentaires"
                >
                  <Input.TextArea
                    placeholder="Informations complémentaires..."
                    rows={4}
                    className="rounded-none"
                  />
                </Form.Item>
              </>
            )}

            <Form.Item className="mb-0 flex justify-end gap-4">
              <Button onClick={handleModalCancel}>
                Annuler
              </Button>
              <Button type="primary" htmlType="submit" className="bg-primary">
                {reservationType === 'trajet' ? 'Réserver le trajet' : 'Réserver le véhicule'}
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

// Ajout des animations personnalisées
const style = document.createElement('style');
style.textContent = `
  @keyframes progress {
    from { width: 0; }
    to { width: 100%; }
  }

  @keyframes shine {
    from { transform: translateX(-100%); }
    to { transform: translateX(100%); }
  }

  .animate-progress-bar {
    animation: progress 6s linear infinite;
  }

  .animate-shine {
    animation: shine 2s infinite;
  }

  /* Masquer la barre de défilement tout en gardant la fonctionnalité */
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }
`;
document.head.appendChild(style);

export default Dashboard; 