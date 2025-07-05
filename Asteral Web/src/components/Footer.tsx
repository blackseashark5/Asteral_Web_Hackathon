import React from 'react';
import { Star, Github, Mail, Heart, Rocket } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-gray-900/80 backdrop-blur-md border-t border-blue-500/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Star className="w-8 h-8 text-blue-400 animate-pulse" aria-hidden="true" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Cosmic Explorer
              </span>
            </div>
            <p className="descriptive-text text-base leading-relaxed mb-6 max-w-md">
              Journey through the infinite cosmos with real-time data, immersive experiences, and the wonder of space exploration history.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <span className="descriptive-text-secondary">Made with</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" aria-hidden="true" />
              <span className="descriptive-text-secondary">for space enthusiasts everywhere</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Explore</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="descriptive-text-secondary hover:text-blue-400 transition-colors text-sm">
                  Today's Events
                </a>
              </li>
              <li>
                <a href="#" className="descriptive-text-secondary hover:text-blue-400 transition-colors text-sm">
                  3D Timeline
                </a>
              </li>
              <li>
                <a href="#" className="descriptive-text-secondary hover:text-blue-400 transition-colors text-sm">
                  Space AI Chat
                </a>
              </li>
              <li>
                <a href="https://extraordinary-licorice-8c4294.netlify.app/" target="_blank" rel="noopener noreferrer" className="descriptive-text-secondary hover:text-blue-400 transition-colors text-sm">
                  Constellation Explorer
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://www.nasa.gov/" target="_blank" rel="noopener noreferrer" className="descriptive-text-secondary hover:text-blue-400 transition-colors text-sm">
                  NASA Official Site
                </a>
              </li>
              <li>
                <a href="https://www.esa.int/" target="_blank" rel="noopener noreferrer" className="descriptive-text-secondary hover:text-blue-400 transition-colors text-sm">
                  European Space Agency
                </a>
              </li>
              <li>
                <a href="https://www.spacex.com/" target="_blank" rel="noopener noreferrer" className="descriptive-text-secondary hover:text-blue-400 transition-colors text-sm">
                  SpaceX
                </a>
              </li>
              <li>
                <a href="https://hubblesite.org/" target="_blank" rel="noopener noreferrer" className="descriptive-text-secondary hover:text-blue-400 transition-colors text-sm">
                  Hubble Space Telescope
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="cosmic-separator"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <p className="descriptive-text-secondary text-sm">
              © 2024 Cosmic Explorer. Exploring the universe, one discovery at a time.
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a 
              href="mailto:hello@cosmicexplorer.space" 
              className="text-gray-400 hover:text-blue-400 transition-colors"
              aria-label="Contact us via email"
            >
              <Mail className="w-5 h-5" aria-hidden="true" />
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
              aria-label="View source code on GitHub"
            >
              <Github className="w-5 h-5" aria-hidden="true" />
            </a>
            <div className="flex items-center space-x-2 text-sm">
              <Rocket className="w-4 h-4 text-purple-400 animate-bounce" aria-hidden="true" />
              <span className="descriptive-text-secondary">Keep exploring!</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;