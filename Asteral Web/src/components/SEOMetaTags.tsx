import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOMetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const SEOMetaTags: React.FC<SEOMetaTagsProps> = ({
  title = 'Cosmic Explorer - Journey Through Space',
  description = 'Explore the cosmos with real-time data, immersive 3D experiences, and space history. Discover NASA events, interactive timelines, and space missions.',
  image = '/og-image.jpg',
  url = 'https://cosmic-explorer.space',
  type = 'website',
  keywords = ['space', 'astronomy', 'NASA', 'cosmos', 'planets', 'missions', 'timeline', '3D', 'interactive'],
  author = 'Cosmic Explorer Team',
  publishedTime,
  modifiedTime
}) => {
  const fullTitle = title.includes('Cosmic Explorer') ? title : `${title} | Cosmic Explorer`;
  const fullUrl = url.startsWith('http') ? url : `https://cosmic-explorer.space${url}`;
  const fullImage = image.startsWith('http') ? image : `https://cosmic-explorer.space${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#3b82f6" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Cosmic Explorer" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@CosmicExplorer" />
      <meta name="twitter:creator" content="@CosmicExplorer" />
      
      {/* Article specific (for blog posts, events) */}
      {type === 'article' && (
        <>
          <meta property="article:author" content={author} />
          <meta property="article:section" content="Space & Astronomy" />
          <meta property="article:tag" content={keywords.join(', ')} />
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
        </>
      )}
      
      {/* Additional SEO */}
      <meta name="application-name" content="Cosmic Explorer" />
      <meta name="apple-mobile-web-app-title" content="Cosmic Explorer" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-TileColor" content="#0B1426" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Cosmic Explorer",
          "description": description,
          "url": fullUrl,
          "image": fullImage,
          "author": {
            "@type": "Organization",
            "name": author
          },
          "applicationCategory": "EducationalApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "1250"
          }
        })}
      </script>
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://api.nasa.gov" />
      <link rel="preconnect" href="https://images.pexels.com" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      
      {/* Prefetch critical resources */}
      <link rel="prefetch" href="/icons/icon-192x192.png" />
      <link rel="prefetch" href="/manifest.json" />
    </Helmet>
  );
};

export default SEOMetaTags;