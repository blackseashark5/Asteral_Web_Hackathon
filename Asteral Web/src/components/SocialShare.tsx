import React, { useState } from 'react';
import { Share2, Twitter, Facebook, Link, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SocialShareProps {
  title: string;
  description: string;
  url?: string;
  hashtags?: string[];
}

const SocialShare: React.FC<SocialShareProps> = ({ 
  title, 
  description, 
  url = window.location.href,
  hashtags = ['space', 'astronomy', 'cosmos']
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareData = {
    title,
    text: description,
    url
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      setIsOpen(true);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.log('Error copying to clipboard:', error);
    }
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(`${title} - ${description}`);
    const hashtag = encodeURIComponent(hashtags.join(' #'));
    const shareUrl = encodeURIComponent(url);
    window.open(`https://twitter.com/intent/tweet?text=${text}&hashtags=${hashtag}&url=${shareUrl}`, '_blank');
  };

  const shareToFacebook = () => {
    const shareUrl = encodeURIComponent(url);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
  };

  return (
    <>
      <button
        onClick={handleNativeShare}
        className="bg-blue-600/30 text-blue-400 p-3 rounded-lg hover:bg-blue-600/40 transition-colors border border-blue-500/30 flex items-center space-x-2"
        title="Share this discovery"
      >
        <Share2 className="w-4 h-4" />
        <span className="hidden sm:inline">Share</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="cosmic-card max-w-sm w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Share Discovery</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <button
                  onClick={shareToTwitter}
                  className="w-full flex items-center space-x-3 p-4 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors border border-blue-500/30"
                >
                  <Twitter className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-medium">Share on Twitter</span>
                </button>

                <button
                  onClick={shareToFacebook}
                  className="w-full flex items-center space-x-3 p-4 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-colors border border-blue-600/30"
                >
                  <Facebook className="w-5 h-5 text-blue-500" />
                  <span className="text-white font-medium">Share on Facebook</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center space-x-3 p-4 bg-gray-600/20 hover:bg-gray-600/30 rounded-lg transition-colors border border-gray-500/30"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <Link className="w-5 h-5 text-gray-400" />
                  )}
                  <span className="text-white font-medium">
                    {copied ? 'Copied!' : 'Copy Link'}
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SocialShare;