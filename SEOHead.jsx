// components/SEOHead.jsx - Comprehensive SEO Component
import Head from 'next/head';
import { siteConfig } from '../lib/seo';

export default function SEOHead({
  title,
  titlebn,
  description,
  descriptionbn,
  canonical,
  locale = 'en',
  ogImage,
  keywords = [],
  structuredData = null,
  noindex = false
}) {
  const isBangla = locale === 'bn';
  const finalTitle = isBangla && titlebn ? titlebn : title;
  const finalDescription = isBangla && descriptionbn ? descriptionbn : description;
  const fullTitle = finalTitle ? `${finalTitle} | ${isBangla ? siteConfig.namebn : siteConfig.name}` : (isBangla ? siteConfig.namebn : siteConfig.name);
  const finalCanonical = canonical || siteConfig.url;
  const finalOgImage = ogImage || siteConfig.ogImage;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={keywords.join(', ')} />
      
      {/* Viewport and Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
      <meta name="HandheldFriendly" content="true" />
      <meta name="MobileOptimized" content="width" />
      <meta name="format-detection" content="telephone=yes" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonical} />
      
      {/* Language Alternates */}
      <link rel="alternate" hrefLang="en" href={finalCanonical.replace('/bn/', '/en/')} />
      <link rel="alternate" hrefLang="bn" href={finalCanonical.replace('/en/', '/bn/')} />
      <link rel="alternate" hrefLang="x-default" href={finalCanonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={isBangla ? siteConfig.namebn : siteConfig.name} />
      <meta property="og:locale" content={locale === 'bn' ? 'bn_BD' : 'en_US'} />
      <meta property="fb:app_id" content={siteConfig.fbAppId} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={finalCanonical} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={finalDescription} />
      <meta property="twitter:image" content={finalOgImage} />
      <meta property="twitter:site" content={siteConfig.twitterHandle} />
      <meta property="twitter:creator" content={siteConfig.twitterHandle} />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Theme Color for Mobile Browsers */}
      <meta name="theme-color" content="#0066cc" />
      <meta name="msapplication-TileColor" content="#0066cc" />
      
      {/* Robots Meta */}
      {noindex ? (
        <>
          <meta name="robots" content="noindex, nofollow" />
          <meta name="googlebot" content="noindex, nofollow" />
        </>
      ) : (
        <>
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
          <meta name="googlebot" content="index, follow" />
        </>
      )}
      
      {/* Geo Tags for Bangladesh */}
      <meta name="geo.region" content="BD" />
      <meta name="geo.placename" content="Bangladesh" />
      <meta name="geo.position" content="23.685;90.3563" />
      <meta name="ICBM" content="23.685, 90.3563" />
      
      {/* Author and Publisher */}
      <meta name="author" content="WorkersBD" />
      <meta name="publisher" content="WorkersBD" />
      <meta name="copyright" content="WorkersBD" />
      
      {/* DNS Prefetch and Preconnect for Performance */}
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  );
}
