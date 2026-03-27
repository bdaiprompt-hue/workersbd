import Head from 'next/head';

/**
 * SEOHead component - Reusable SEO meta tags component
 * Handles title, description, OG tags, Twitter cards, canonical URLs, and JSON-LD
 */
export default function SEOHead({
  title,
  titlebn,
  description,
  descriptionbn,
  canonical,
  locale = 'en',
  keywords = [],
  structuredData,
  ogImage = '/og-image-default.svg',
}) {
  const isbengali = locale === 'bn';
  const displayTitle = isbengali && titlebn ? titlebn : title;
  const displayDescription = isBengali && descriptionbn ? descriptionbn : description;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://workersbd.com';
  const canonicalUrl = canonical || siteUrl;
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  return (
    <Head>
      <title>{displayTitle}</title>
      <meta name="description" content={displayDescription} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph */}
      <meta property="og:title" content={displayTitle} />
      <meta property="og:description" content={displayDescription} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="WorkersBD" />
      <meta property="og:locale" content={locale === 'bn' ? 'bn_BD' : 'en_US'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={displayTitle} />
      <meta name="twitter:description" content={displayDescription} />
      <meta name="twitter:image" content={ogImageUrl} />

      {/* Hreflang for bilingual support */}
      <link rel="alternate" hrefLang="en" href={`${siteUrl}${canonicalUrl.replace(siteUrl, '')}`} />
      <link rel="alternate" hrefLang="bn" href={`${siteUrl}/bn${canonicalUrl.replace(siteUrl, '')}`} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      {/* JSON-LD Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  );
}
