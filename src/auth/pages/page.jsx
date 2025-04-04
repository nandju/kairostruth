import React from 'react';
import { Typography } from 'antd';
import LoginForm from '../components/LoginForm';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const LoginPage = () => {
  return (
    <div className="flex flex-col justify-center w-full mx-auto font-styrene grow md:p-3">
      <main className="grid grid-cols-1 gap-4 min-[1000px]:grid-cols-2">
        <div className="flex items-center min-h-[97vh] w-full py-6">
          <div className="flex flex-col items-center justify-between w-full h-full">
            <Link to="/" className="flex items-center gap-4 pr-2 mt-8 transition-opacity cursor-pointer hover:opacity-80">
              <img src="/assets/logo.webp" alt="WeTravel Logo" className="h-12 mb-4 md:h-16" />
              <span className="text-4xl font-bold tracking-widest text-gray-800 md:text-6xl font-poppins">KAIROS</span>
            </Link>
            
            <div>
              <h2 className="text-center text-text-100 tracking-tighter font-copernicus mt-12 leading-[1em] min-[500px]:text-[3.5rem] min-[350px]:text-[3.2rem] text-[1.75rem]">
                <div>Voyagez autrement</div>
                <div>vivez l'aventure</div>
              </h2>
              
              <h3 className="flex flex-col gap-[0.3em] sm:gap-[0.15em] items-center text-center text-text-100 font-normal text-pretty tracking-tight font-tiempos mt-4 break-words leading-[1em] text-base md:text-lg leading-snug">
                Découvrez une nouvelle façon de voyager, plus authentique et personnalisée.
              </h3>

              <div className="mt-8 mx-4 sm:mx-auto p-7 max-w-md text-center border border-border-300 flex flex-col gap-6 bg-bg-100 shadow-[0_4px_24px_0_hsl(var(--always-black)/1.57%),0_4px_32px_0_hsl(var(--always-black)/1.57%),0_2px_64px_0_hsl(var(--always-black)/1.18%),0_16px_32px_0_hsl(var(--always-black)/1.18%)]">
                <LoginForm />
              </div>
            </div>

            <div className="h-16" /> {/* Spacer pour maintenir l'espacement vertical */}
          </div>
        </div>

        <div className="hidden min-[500px]:flex justify-center">
          <div className="relative bg-bg-200 h-[clamp(40rem,97vh,97vh)] w-[clamp(30rem,100%,100%)] flex justify-center items-center overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute w-full h-full"
            >
              <img 
                src="/assets/car-1.webp" 
                alt="Background" 
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute z-10 text-white bottom-20 left-10 right-10"
            >
              <h2 className="mb-4 text-4xl font-bold font-poppins">
                Votre prochaine aventure commence ici
              </h2>
              <p className="text-lg opacity-90">
                Des voyages uniques, des expériences inoubliables
              </p>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage; 