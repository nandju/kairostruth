import React, { useState } from 'react';
import { Table, Button, Tag, Space, Input, Tabs, Timeline, Divider } from 'antd';
import { SearchOutlined, CarOutlined, ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined, CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Search } = Input;

const mockData = [
  {
    id: '1',
    vehicule: 'Tesla Model 3',
    debut: '2024-03-20',
    fin: '2024-03-25',
    status: 'en_cours',
    prix: 450,
    type: 'location',
    image: "https://avatars.mds.yandex.net/get-lpc/12373972/12c84eb4-9700-4ce6-86f3-e56de7975be1/orig",
    adresse: "123 Avenue des Champs-Élysées, Paris",
  },
  {
    id: '2',
    vehicule: 'BMW i4',
    debut: '2024-03-22',
    fin: '2024-03-24',
    status: 'en_attente',
    prix: 320,
    type: 'trajet',
    image: "https://avatars.mds.yandex.net/get-lpc/12373972/6065ce26-8a01-4e17-bf9a-d450dfbde488/orig",
    adresse: "Aéroport Charles de Gaulle, Terminal 2E",
  },
  {
    id: '3',
    vehicule: 'Mercedes Classe E',
    debut: '2024-02-25',
    fin: '2024-02-28',
    status: 'terminee',
    prix: 750,
    type: 'location',
    image: "https://avatars.mds.yandex.net/get-lpc/1635340/513b6dac-ff6b-45d4-a0df-465d460f9f33/orig",
    adresse: "15 Rue de la Paix, Paris",
  },
  {
    id: '4',
    vehicule: 'Audi A6',
    debut: '2024-01-18',
    fin: '2024-01-19',
    status: 'terminee',
    prix: 280,
    type: 'trajet',
    image: "https://avatars.mds.yandex.net/get-lpc/12373972/5311e932-0e95-408e-833e-3f49e775ba4a/orig",
    adresse: "Gare de Lyon, Paris",
  }
];

const getStatusTag = (status) => {
  const statusConfig = {
    en_cours: { color: 'processing', text: 'En cours', icon: <ClockCircleOutlined /> },
    en_attente: { color: 'warning', text: 'En attente', icon: <ClockCircleOutlined /> },
    terminee: { color: 'success', text: 'Terminée', icon: <CheckCircleOutlined /> },
    annulee: { color: 'error', text: 'Annulée', icon: <CloseCircleOutlined /> },
  };

  const config = statusConfig[status];
  return (
    <Tag 
      color={config.color} 
      className="flex items-center gap-1 px-3 py-1 rounded-sm"
      icon={config.icon}
    >
      {config.text}
    </Tag>
  );
};

const Reservations = () => {
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const groupByMonth = (data) => {
    const grouped = data.reduce((acc, item) => {
      const date = new Date(item.debut);
      const key = date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});

    return Object.entries(grouped).sort((a, b) => {
      const dateA = new Date(a[1][0].debut);
      const dateB = new Date(b[1][0].debut);
      return dateB - dateA;
    });
  };

  const renderTimeline = (data) => {
    const groupedData = groupByMonth(data);

    return (
      <div className="max-w-4xl mx-auto">
        {groupedData.map(([month, items]) => (
          <div key={month} className="mb-8 sm:mb-12">
            <Divider orientation="left" className="text-base sm:text-lg font-semibold text-gray-900">
              {month}
            </Divider>
            <Timeline
              className="mt-4 sm:mt-6"
              mode="left"
              items={items.map(item => ({
                dot: item.type === 'location' ? 
                  <CarOutlined className="text-primary text-lg sm:text-xl" /> : 
                  <EnvironmentOutlined className="text-primary text-lg sm:text-xl" />,
                children: (
                  <div className="bg-white border border-gray-200 p-3 sm:p-4 md:p-6 hover:border-primary transition-all cursor-pointer ml-4 sm:ml-6">
                    <div className="relative">
                      {/* Date en haut de la carte */}
                      <div className="absolute -top-7 left-0 text-xs sm:text-sm text-gray-500">
                        {new Date(item.debut).toLocaleDateString('fr-FR', { 
                          day: 'numeric',
                          month: 'long'
                        })}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-6">
                        <div className="w-full sm:w-32 h-24 overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.vehicule} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow w-full">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 sm:mb-3">
                            <div>
                              <h3 className="text-base sm:text-lg font-semibold text-gray-900">{item.vehicule}</h3>
                              <div className="text-xs sm:text-sm text-gray-500 flex items-center gap-2 mt-1">
                                <EnvironmentOutlined />
                                {item.adresse}
                              </div>
                            </div>
                            <div className="text-left sm:text-right mt-2 sm:mt-0">
                              <div className="text-base sm:text-lg font-semibold text-primary">{item.prix} €</div>
                              {getStatusTag(item.status)}
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <CalendarOutlined />
                              Durée : {Math.ceil((new Date(item.fin) - new Date(item.debut)) / (1000 * 60 * 60 * 24))} jour(s)
                            </div>
                            <div className="flex items-center gap-1">
                              <ClockCircleOutlined />
                              Jusqu'au {new Date(item.fin).toLocaleDateString('fr-FR', { 
                                day: 'numeric',
                                month: 'long'
                              })}
                            </div>
                          </div>
                          <div className="mt-3 sm:mt-4 flex gap-4">
                            <Button type="text" className="text-xs sm:text-sm text-gray-600 hover:text-primary px-0">
                              Voir les détails
                            </Button>
                            {item.status !== 'terminee' && item.status !== 'annulee' && (
                              <Button type="text" className="text-xs sm:text-sm text-gray-600 hover:text-red-500 px-0">
                                Annuler
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              }))}
            />
          </div>
        ))}
      </div>
    );
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  // Fonction pour calculer le total des commandes du mois en cours
  const getCurrentMonthOrders = () => {
    const now = new Date();
    return mockData.filter(item => {
      const itemDate = new Date(item.debut);
      return itemDate.getMonth() === now.getMonth() && 
             itemDate.getFullYear() === now.getFullYear();
    }).length;
  };

  const items = [
    {
      key: 'all',
      label: 'Tout',
      children: renderTimeline(mockData),
    },
    {
      key: 'location',
      label: 'Locations',
      children: renderTimeline(mockData.filter(item => item.type === 'location')),
    },
    {
      key: 'trajet',
      label: 'Trajets',
      children: renderTimeline(mockData.filter(item => item.type === 'trajet')),
    },
  ];

  return (
    <div className="-m-6">
      {/* En-tête avec statistiques */}
      <div className="bg-primary p-4 sm:p-6 md:p-8 text-white">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-xl sm:text-2xl font-druk mb-4 sm:mb-6">Mon historique</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <CalendarOutlined className="text-xl sm:text-2xl" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm opacity-80">Total des commandes</div>
                  <div className="text-xl sm:text-2xl font-semibold">{mockData.length}</div>
                  <div className="text-xs sm:text-sm opacity-60 mt-1">Depuis le début</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <ClockCircleOutlined className="text-xl sm:text-2xl" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm opacity-80">Commandes ce mois</div>
                  <div className="text-xl sm:text-2xl font-semibold">{getCurrentMonthOrders()}</div>
                  <div className="text-xs sm:text-sm opacity-60 mt-1">
                    {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 md:p-8">
        <div className="flex justify-end mb-4 sm:mb-6">
          <Search
            placeholder="Rechercher dans l'historique..."
            onSearch={handleSearch}
            className="w-full sm:max-w-md [&_.ant-input]:rounded-none [&_.ant-input-search-button]:rounded-none"
            allowClear
            enterButton={<SearchOutlined />}
          />
        </div>

        <Tabs 
          items={items} 
          onChange={setActiveTab} 
          activeKey={activeTab}
          className="[&_.ant-tabs-tab]:rounded-none [&_.ant-tabs-tab-active]:text-primary [&_.ant-tabs-ink-bar]:bg-primary [&_.ant-tabs-nav]:overflow-x-auto [&_.ant-tabs-nav-wrap]:overflow-x-auto [&_.ant-tabs-nav-list]:flex-nowrap"
        />
      </div>
    </div>
  );
};

export default Reservations;
