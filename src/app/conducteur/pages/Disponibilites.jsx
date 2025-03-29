import React from 'react';
import { Calendar, Card, Tag, Timeline, Statistic } from 'antd';
import { ClockCircleOutlined, CalendarOutlined, CarOutlined, CheckCircleOutlined, DollarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

dayjs.locale('fr');

const Disponibilites = () => {
  // Simulation de données enrichies
  const availabilities = [
    {
      date: '2024-03-18',
      timeRanges: [
        { start: '09:00', end: '12:00', type: 'standard' },
        { start: '14:00', end: '18:00', type: 'premium' }
      ],
      earnings: 180,
      courses: 5
    },
    {
      date: '2024-03-19',
      timeRanges: [
        { start: '08:00', end: '16:00', type: 'journée' }
      ],
      earnings: 240,
      courses: 6
    },
    {
      date: dayjs().format('YYYY-MM-DD'),
      timeRanges: [
        { start: '09:00', end: '13:00', type: 'standard' },
        { start: '15:00', end: '19:00', type: 'premium' }
      ],
      earnings: 200,
      courses: 4
    }
  ];

  const dateCellRender = (date) => {
    const dateStr = date.format('YYYY-MM-DD');
    const dayAvailability = availabilities.find(a => a.date === dateStr);
    
    if (dayAvailability) {
      return (
        <div className="h-full">
          <div className="text-xs text-green-600 mt-1">
            <ClockCircleOutlined /> Disponible
          </div>
          <div className="text-xs text-gray-500 mt-0.5">
            {dayAvailability.timeRanges.length} plage(s)
          </div>
        </div>
      );
    }
    return null;
  };

  const selectedDayAvailabilities = availabilities.find(a => 
    a.date === dayjs().format('YYYY-MM-DD')
  ) || null;

  const isCurrentlyAvailable = () => {
    if (!selectedDayAvailabilities) return false;
    const currentTime = dayjs().format('HH:mm');
    return selectedDayAvailabilities.timeRanges.some(range => 
      currentTime >= range.start && currentTime <= range.end
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 shadow-sm !rounded-none">
        <h1 className="text-2xl font-clash font-semibold text-gray-800">Mes Disponibilités</h1>
        <p className="text-gray-500 mt-1">Consultez vos plages horaires définies par l'administrateur</p>
      </div>

      {/* Nouveau widget de statut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-3 !rounded-none bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className={`w-4 h-4 ${isCurrentlyAvailable() ? 'bg-green-500' : 'bg-gray-400'} !rounded-none`} />
              <div className="text-center lg:text-left">
                <h2 className="text-4xl font-clash font-bold text-gray-800">
                  {isCurrentlyAvailable() ? 'DISPONIBLE' : 'NON DISPONIBLE'}
                </h2>
                <p className="text-gray-500 mt-2">
                  {isCurrentlyAvailable() 
                    ? 'Vous êtes actuellement en service'
                    : 'Vous n\'êtes pas en service pour le moment'}
                </p>
              </div>
            </div>
            
            {selectedDayAvailabilities && (
              <div className="grid grid-cols-3 gap-2 lg:gap-6 w-full">
                <Statistic 
                  title="Plages aujourd'hui"
                  value={selectedDayAvailabilities.timeRanges.length}
                  prefix={<ClockCircleOutlined />}
                  className="!text-primary [&_.ant-statistic-content]:!flex [&_.ant-statistic-content]:!items-center [&_.ant-statistic-content]:!gap-1 [&_.ant-statistic-content-value]:!text-sm lg:[&_.ant-statistic-content-value]:!text-base"
                />
                <Statistic 
                  title="Courses prévues"
                  value={selectedDayAvailabilities.courses}
                  prefix={<CarOutlined />}
                  className="!text-primary [&_.ant-statistic-content]:!flex [&_.ant-statistic-content]:!items-center [&_.ant-statistic-content]:!gap-1 [&_.ant-statistic-content-value]:!text-sm lg:[&_.ant-statistic-content-value]:!text-base"
                />
                <Statistic 
                  title="Gains estimés"
                  value={`${selectedDayAvailabilities.earnings} XOF`}
                  prefix={<DollarOutlined />}
                  className="!text-primary [&_.ant-statistic-content]:!flex [&_.ant-statistic-content]:!items-center [&_.ant-statistic-content]:!gap-1 [&_.ant-statistic-content-value]:!text-sm lg:[&_.ant-statistic-content-value]:!text-base [&_.ant-statistic-content-value]:!whitespace-nowrap"
                />
              </div>
            )}
          </div>
        </Card>

        {/* Calendrier */}
        <Card bordered={false} className="lg:col-span-2 shadow-sm !rounded-none">
          <Calendar 
            fullscreen={false} 
            cellRender={dateCellRender}
          />
        </Card>

        {/* Détails des disponibilités */}
        <Card 
          title={
            <div className="flex items-center gap-2 font-clash">
              <CalendarOutlined className="text-primary" />
              <span>Détails du jour</span>
            </div>
          }
          bordered={false}
          className="lg:col-span-1 shadow-sm !rounded-none"
        >
          <div className="space-y-6">
            <div>
              <p className="font-monument text-xs text-gray-600 mb-3">AUJOURD'HUI</p>
              <p className="text-lg font-clash">{dayjs().format('DD MMMM YYYY')}</p>
            </div>

            <div className="space-y-4">
              <p className="font-monument text-xs text-gray-600">PLAGES HORAIRES</p>
              {selectedDayAvailabilities ? (
                <Timeline
                  items={selectedDayAvailabilities.timeRanges.map((range, index) => ({
                    dot: <div className="w-2 h-2 bg-primary !rounded-none" />,
                    children: (
                      <div className="flex items-center gap-3">
                        <Tag color="primary" className="!rounded-none !m-0">
                          {range.start} - {range.end}
                        </Tag>
                        <Tag 
                          color={range.type === 'premium' ? 'gold' : 'default'} 
                          className="!rounded-none capitalize"
                        >
                          {range.type}
                        </Tag>
                      </div>
                    ),
                  }))}
                />
              ) : (
                <div className="text-gray-500 italic">
                  Aucune disponibilité définie pour aujourd'hui
                </div>
              )}
            </div>

            <div className="bg-primary/5 p-4 !rounded-none">
              <p className="text-primary font-medium mb-2">Note importante</p>
              <p className="text-sm text-gray-600">
                Vos disponibilités sont gérées par l'administrateur. Pour toute modification, veuillez le contacter directement.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Disponibilites; 