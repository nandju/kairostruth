import React from 'react';
import { Modal, Form, Input, Select, Checkbox, Button, Progress } from 'antd';
import { ToolOutlined, CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';

const DiagnosticModal = ({ open, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then(values => {
      onSubmit(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      title="Diagnostic du véhicule"
      open={open}
      onCancel={onCancel}
      width={700}
      footer={[
        <Button key="cancel" onClick={onCancel} className="!rounded-none">
          Annuler
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          onClick={handleSubmit}
          className="!rounded-none"
        >
          Enregistrer le diagnostic
        </Button>
      ]}
      className="[&_.ant-modal-content]:!rounded-none"
    >
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-medium">État général du véhicule</span>
          <span className="text-green-500 font-medium">92%</span>
        </div>
        <Progress 
          percent={92} 
          strokeColor="#52c41a"
          className="!rounded-none"
        />
      </div>

      <Form
        form={form}
        layout="vertical"
      >
        {/* Points de contrôle mécaniques */}
        <div className="mb-6">
          <h3 className="font-medium mb-4">Points de contrôle mécaniques</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="moteur"
              label="État du moteur"
            >
              <Select
                className="[&_.ant-select-selector]:!rounded-none"
                options={[
                  { value: 'excellent', label: 'Excellent' },
                  { value: 'bon', label: 'Bon' },
                  { value: 'moyen', label: 'Moyen' },
                  { value: 'mauvais', label: 'Mauvais' },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="freins"
              label="Système de freinage"
            >
              <Select
                className="[&_.ant-select-selector]:!rounded-none"
                options={[
                  { value: 'excellent', label: 'Excellent' },
                  { value: 'bon', label: 'Bon' },
                  { value: 'moyen', label: 'Moyen' },
                  { value: 'mauvais', label: 'Mauvais' },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="suspension"
              label="Suspension"
            >
              <Select
                className="[&_.ant-select-selector]:!rounded-none"
                options={[
                  { value: 'excellent', label: 'Excellent' },
                  { value: 'bon', label: 'Bon' },
                  { value: 'moyen', label: 'Moyen' },
                  { value: 'mauvais', label: 'Mauvais' },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="pneus"
              label="État des pneus"
            >
              <Select
                className="[&_.ant-select-selector]:!rounded-none"
                options={[
                  { value: 'excellent', label: 'Excellent' },
                  { value: 'bon', label: 'Bon' },
                  { value: 'moyen', label: 'Moyen' },
                  { value: 'mauvais', label: 'Mauvais' },
                ]}
              />
            </Form.Item>
          </div>
        </div>

        {/* Points de contrôle fluides */}
        <div className="mb-6">
          <h3 className="font-medium mb-4">Niveaux des fluides</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="huileMoteur"
              label="Huile moteur"
            >
              <Select
                className="[&_.ant-select-selector]:!rounded-none"
                options={[
                  { value: 'plein', label: 'Niveau plein' },
                  { value: 'moyen', label: 'Niveau moyen' },
                  { value: 'bas', label: 'Niveau bas' },
                  { value: 'critique', label: 'Niveau critique' },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="liquideFrein"
              label="Liquide de frein"
            >
              <Select
                className="[&_.ant-select-selector]:!rounded-none"
                options={[
                  { value: 'plein', label: 'Niveau plein' },
                  { value: 'moyen', label: 'Niveau moyen' },
                  { value: 'bas', label: 'Niveau bas' },
                  { value: 'critique', label: 'Niveau critique' },
                ]}
              />
            </Form.Item>
          </div>
        </div>

        {/* Observations et recommandations */}
        <div className="mb-6">
          <h3 className="font-medium mb-4">Observations et recommandations</h3>
          <Form.Item
            name="observations"
            rules={[{ required: true, message: 'Veuillez saisir vos observations' }]}
          >
            <Input.TextArea
              className="!rounded-none"
              rows={4}
              placeholder="Notez ici vos observations et recommandations..."
            />
          </Form.Item>
        </div>

        {/* Actions recommandées */}
        <div>
          <h3 className="font-medium mb-4">Actions recommandées</h3>
          <Form.Item name="actionsRecommandees">
            <Checkbox.Group className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Checkbox value="vidange">Vidange d'huile nécessaire</Checkbox>
              <Checkbox value="freins">Remplacement plaquettes de frein</Checkbox>
              <Checkbox value="pneus">Rotation des pneus</Checkbox>
              <Checkbox value="filtres">Remplacement des filtres</Checkbox>
              <Checkbox value="suspension">Vérification suspension</Checkbox>
              <Checkbox value="batterie">Test de la batterie</Checkbox>
            </Checkbox.Group>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default DiagnosticModal; 