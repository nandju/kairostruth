import React from 'react';

const Footer = () => {
  const footerLinks = {
    services: {
      title: 'Services',
      links: [
        { name: 'Réservation VTC', href: '#' },
        { name: 'Service Premium', href: '#' },
        { name: 'Transport professionnel', href: '#' },
        { name: 'Événements spéciaux', href: '#' }
      ]
    },
    company: {
      title: 'Entreprise',
      links: [
        { name: 'À propos', href: '#' },
        { name: 'Carrières', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Contact', href: '#' }
      ]
    },
    legal: {
      title: 'Légal',
      links: [
        { name: 'Mentions légales', href: '#' },
        { name: 'Politique de confidentialité', href: '#' },
        { name: 'CGV', href: '#' },
        { name: 'Cookies', href: '#' }
      ]
    }
  };

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: 'fab fa-facebook' },
    { name: 'Instagram', href: '#', icon: 'fab fa-instagram' },
    { name: 'Twitter', href: '#', icon: 'fab fa-twitter' },
    { name: 'LinkedIn', href: '#', icon: 'fab fa-linkedin' }
  ];

  return (
    <footer className="bg-black text-white">
      <div className="max-w-[1540px] mx-auto">
        {/* Section principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-6 py-16">
          {/* Logo et description */}
          <div className="space-y-6">
            <img src="/logo.webp" alt="KAIROS" className="h-8" />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Votre partenaire de confiance pour des trajets confortables et abordables partout au Sénégal.
            </p>
            {/* Réseaux sociaux */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <i className={`${social.icon} text-xl`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Liens de navigation */}
          {Object.values(footerLinks).map((category) => (
            <div key={category.title}>
              <h3 className="text-lg font-monument mb-6">{category.title}</h3>
              <ul className="space-y-4">
                {category.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Barre de copyright */}
        <div className="border-t border-white/10">
          <div className="px-6 py-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} KAIROS. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Aide
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 