import React, { useState } from 'react';
import { Card, Avatar, Button, Form, Input, Upload, Progress, Tag, Divider, message } from 'antd';
import {
  UserOutlined,
  EditOutlined,
  UploadOutlined,
  PhoneOutlined,
  MailOutlined,
  IdcardOutlined,
  CarOutlined,
  SafetyCertificateOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  StarOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

const ProfileConducteur = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  // Données simulées du conducteur
  const conducteur = {
    nom: 'John Doe',
    photo: null,
    telephone: '+221 77 123 45 67',
    email: 'john.doe@example.com',
    adresse: 'Dakar, Sénégal',
    dateInscription: '15/01/2024',
    dateNaissance: '12/05/1990',
    numeroPermis: 'DK123456789',
    vehicule: {
      marque: 'Toyota',
      modele: 'Corolla',
      annee: '2020',
      immatriculation: 'DK-123-AB',
      couleur: 'Blanc',
      nombrePlaces: 4,
    },
    statistiques: {
      courses: 150,
      notation: 4.8,
      completionRate: 98,
      heuresConduite: 280,
      satisfaction: 92,
      acceptation: 88,
      ponctualite: 95,
    },
    documents: [
      {
        nom: 'Permis de conduire',
        statut: 'valide',
        expiration: '12/12/2025',
        dateUpload: '15/01/2024',
      },
      {
        nom: 'Assurance véhicule',
        statut: 'valide',
        expiration: '31/12/2024',
        dateUpload: '15/01/2024',
      },
      {
        nom: 'Carte grise',
        statut: 'valide',
        expiration: 'N/A',
        dateUpload: '15/01/2024',
      },
      {
        nom: 'Contrôle technique',
        statut: 'valide',
        expiration: '30/06/2024',
        dateUpload: '15/01/2024',
      },
    ],
  };

  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue({
      nom: conducteur.nom,
      telephone: conducteur.telephone,
      email: conducteur.email,
      adresse: conducteur.adresse,
      dateNaissance: conducteur.dateNaissance,
    });
  };

  const handleSave = () => {
    form.validateFields().then(values => {
      console.log('Nouvelles valeurs:', values);
      setIsEditing(false);
      message.success('Profil mis à jour avec succès');
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const handleUpload = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} téléchargé avec succès`);
    } else if (info.file.status === 'error') {
      message.error(`Erreur lors du téléchargement de ${info.file.name}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête du profil */}
      <div className="bg-white p-6 shadow-sm !rounded-none">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative group">
            <Avatar 
              size={96} 
              icon={<UserOutlined />} 
              className="!bg-primary/10 !text-primary border-2 border-primary/20"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full">
              <Upload 
                showUploadList={false}
                onChange={handleUpload}
              >
                <Button 
                  type="text" 
                  icon={<UploadOutlined className="text-white" />}
                  className="!text-white"
                >
                  Modifier
                </Button>
              </Upload>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-clash font-semibold text-gray-800">
                  {conducteur.nom}
                </h1>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                  <CalendarOutlined />
                  Membre depuis {conducteur.dateInscription}
                </p>
              </div>
              {!isEditing && (
                <Button 
                  icon={<EditOutlined />} 
                  onClick={handleEdit}
                  className="!rounded-none w-full sm:w-auto"
                >
                  Modifier le profil
                </Button>
              )}
            </div>
            
            {/* Statistiques rapides */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="bg-gray-50 p-4 !rounded-none">
                <p className="text-sm text-gray-500">Courses effectuées</p>
                <p className="text-lg font-semibold">{conducteur.statistiques.courses}</p>
              </div>
              <div className="bg-gray-50 p-4 !rounded-none">
                <p className="text-sm text-gray-500">Note moyenne</p>
                <p className="text-lg font-semibold flex items-center gap-1">
                  {conducteur.statistiques.notation}
                  <StarOutlined className="text-yellow-400 text-base" />
                </p>
              </div>
              <div className="bg-gray-50 p-4 !rounded-none">
                <p className="text-sm text-gray-500">Taux de complétion</p>
                <p className="text-lg font-semibold">{conducteur.statistiques.completionRate}%</p>
              </div>
              <div className="bg-gray-50 p-4 !rounded-none">
                <p className="text-sm text-gray-500">Heures de conduite</p>
                <p className="text-lg font-semibold">{conducteur.statistiques.heuresConduite}h</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations personnelles et véhicule */}
        <div className="lg:col-span-2 space-y-6">
          <Card bordered={false} className="!rounded-none">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-clash font-medium">Informations personnelles</h2>
              {isEditing && (
                <div className="flex gap-2">
                  <Button onClick={handleCancel} className="!rounded-none">
                    Annuler
                  </Button>
                  <Button type="primary" onClick={handleSave} className="!rounded-none">
                    Enregistrer
                  </Button>
                </div>
              )}
            </div>

            {isEditing ? (
              <Form
                form={form}
                layout="vertical"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item
                    name="nom"
                    label="Nom complet"
                    rules={[{ required: true, message: 'Le nom est requis' }]}
                  >
                    <Input className="!rounded-none" />
                  </Form.Item>
                  <Form.Item
                    name="dateNaissance"
                    label="Date de naissance"
                    rules={[{ required: true, message: 'La date de naissance est requise' }]}
                  >
                    <Input className="!rounded-none" />
                  </Form.Item>
                  <Form.Item
                    name="telephone"
                    label="Téléphone"
                    rules={[{ required: true, message: 'Le téléphone est requis' }]}
                  >
                    <Input className="!rounded-none" />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: 'L\'email est requis' },
                      { type: 'email', message: 'Email invalide' }
                    ]}
                  >
                    <Input className="!rounded-none" />
                  </Form.Item>
                  <Form.Item
                    name="adresse"
                    label="Adresse"
                    rules={[{ required: true, message: 'L\'adresse est requise' }]}
                  >
                    <Input className="!rounded-none" />
                  </Form.Item>
                  <Form.Item
                    name="numeroPermis"
                    label="Numéro de permis"
                    rules={[{ required: true, message: 'Le numéro de permis est requis' }]}
                  >
                    <Input className="!rounded-none" />
                  </Form.Item>
                </div>
              </Form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Téléphone</p>
                    <p className="flex items-center gap-2 mt-1">
                      <PhoneOutlined className="text-primary" />
                      {conducteur.telephone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="flex items-center gap-2 mt-1">
                      <MailOutlined className="text-primary" />
                      {conducteur.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date de naissance</p>
                    <p className="flex items-center gap-2 mt-1">
                      <CalendarOutlined className="text-primary" />
                      {conducteur.dateNaissance}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Adresse</p>
                    <p className="flex items-center gap-2 mt-1">
                      <EnvironmentOutlined className="text-primary" />
                      {conducteur.adresse}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Numéro de permis</p>
                    <p className="flex items-center gap-2 mt-1">
                      <IdcardOutlined className="text-primary" />
                      {conducteur.numeroPermis}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <Divider />

            <div>
              <h2 className="text-lg font-clash font-medium mb-4">Informations du véhicule</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Véhicule</p>
                    <p className="flex items-center gap-2 mt-1">
                      <CarOutlined className="text-primary" />
                      {conducteur.vehicule.marque} {conducteur.vehicule.modele} ({conducteur.vehicule.annee})
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Couleur</p>
                    <p className="flex items-center gap-2 mt-1">
                      <span className="text-primary">●</span>
                      {conducteur.vehicule.couleur}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Immatriculation</p>
                    <p className="flex items-center gap-2 mt-1">
                      <SafetyCertificateOutlined className="text-primary" />
                      {conducteur.vehicule.immatriculation}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Nombre de places</p>
                    <p className="flex items-center gap-2 mt-1">
                      <UserOutlined className="text-primary" />
                      {conducteur.vehicule.nombrePlaces} places
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Statistiques détaillées */}
          <Card bordered={false} className="!rounded-none">
            <h2 className="text-lg font-clash font-medium mb-4">Statistiques détaillées</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 !rounded-none">
                <div className="flex items-center gap-2">
                  <StarOutlined className="text-yellow-400 text-lg" />
                  <span className="text-sm text-gray-600">Satisfaction</span>
                </div>
                <span className="text-base font-medium">{conducteur.statistiques.satisfaction}%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 !rounded-none">
                <div className="flex items-center gap-2">
                  <ClockCircleOutlined className="text-blue-500 text-lg" />
                  <span className="text-sm text-gray-600">Ponctualité</span>
                </div>
                <span className="text-base font-medium">{conducteur.statistiques.ponctualite}%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 !rounded-none">
                <div className="flex items-center gap-2">
                  <CheckCircleOutlined className="text-green-500 text-lg" />
                  <span className="text-sm text-gray-600">Complétion</span>
                </div>
                <span className="text-base font-medium">{conducteur.statistiques.completionRate}%</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Documents */}
        <Card bordered={false} className="!rounded-none h-fit">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-clash font-medium">Documents</h2>
            <Upload
              showUploadList={false}
              onChange={handleUpload}
            >
              <Button icon={<UploadOutlined />} className="!rounded-none">
                Ajouter
              </Button>
            </Upload>
          </div>

          <div className="space-y-5">
            {conducteur.documents.map((doc, index) => (
              <div 
                key={index}
                className="p-5 border border-gray-200 !rounded-none hover:border-primary/20 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-base">{doc.nom}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Expire le: {doc.expiration}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Ajouté le {doc.dateUpload}
                    </p>
                  </div>
                  <Tag 
                    color="success" 
                    icon={<CheckCircleOutlined />}
                    className="!rounded-none"
                  >
                    Valide
                  </Tag>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfileConducteur; 