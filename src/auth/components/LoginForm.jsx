import React, { useState } from 'react';
import { Button, Input, Typography, message } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const { Text } = Typography;

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!showPassword) {
      setShowPassword(true);
    } else {
      const { success, role } = login(email, password);
      if (success) {
        message.success('Connexion réussie');
        if (role === 'conducteur') {
          navigate('/conducteur/dashboard');
        } else if (role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/client/dashboard');
        }
      } else {
        message.error('Email ou mot de passe incorrect');
      }
    }
  };

  const handleGoogleLogin = () => {
    message.info('Connexion Google à implémenter');
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Button
          icon={<GoogleOutlined />}
          onClick={handleGoogleLogin}
          className="inline-flex items-center justify-center relative h-11 px-5 min-w-[6rem] w-full gap-2 font-medium bg-always-white/90 hover:bg-always-white dark:bg-bg-100/50 dark:hover:bg-bg-100 !rounded-none"
        >
          Continuer avec Google
        </Button>

        <Text className="text-text-300 pb-px text-center text-xs uppercase">ou</Text>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Saisissez votre adresse e-mail"
            value={email}
            onChange={handleEmailChange}
            className="bg-bg-000 border border-border-200 hover:border-border-100 h-11 px-3 w-full !rounded-none"
            required
          />

          <AnimatePresence>
            {showPassword && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Input.Password
                  placeholder="Saisissez votre mot de passe"
                  value={password}
                  onChange={handlePasswordChange}
                  className="bg-bg-000 border border-border-200 hover:border-border-100 h-11 px-3 w-full !rounded-none"
                  required
                />
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            type="primary"
            htmlType="submit"
            className="inline-flex items-center justify-center relative h-11 px-5 min-w-[6rem] bg-accent-main-100 text-oncolor-100 font-medium !rounded-none"
          >
            {showPassword ? 'Se connecter' : 'Continuer avec l\'e-mail'}
          </Button>
        </form>
      </div>

      <div className="text-xs text-text-400 leading-relaxed tracking-tight">
        En continuant, vous acceptez les{' '}
        <a href="/terms" className="underline hover:text-text-100">
          Conditions générales
        </a>{' '}
        et la{' '}
        <a href="/privacy" className="underline hover:text-text-100">
          Politique de confidentialité
        </a>{' '}
        de WeTravel.
      </div>
    </div>
  );
};

export default LoginForm; 