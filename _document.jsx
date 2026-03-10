// pages/_document.jsx - Custom Document with Bilingual Support
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document({ locale }) {
  const lang = locale || 'en';
  const dir = lang === 'bn' ? 'ltr' : 'ltr'; // Both Bengali and English are LTR

  return (
    <Html lang={lang} dir={dir}>
      <Head>
        {/* Primary Font - Inter for English */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        
        {/* Bengali Font - Hind Siliguri */}
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0066cc" />

        {/* Theme Colors for Mobile Browsers */}
        <meta name="msapplication-TileColor" content="#0066cc" />
        <meta name="theme-color" content="#0066cc" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Preload Critical Resources */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* DNS Prefetch for Performance */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />

        {/* Security Headers */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />

        {/* OpenGraph Image Default */}
        <meta property="og:image" content="https://workersbd.com/og-default.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@workersbd" />

        {/* Bing Webmaster Verification */}
        <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />

        {/* Google Site Verification */}
        <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />

        {/* Schema.org for Google+ */}
        <link rel="publisher" href="https://plus.google.com/+WorkersBD" />

        {/* iOS Web App Tags */}
        <meta name="apple-mobile-web-app-title" content="WorkersBD" />
        
        {/* Microsoft Tiles */}
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </Head>
      <body className={lang === 'bn' ? 'font-bengali' : 'font-sans'}>
        {/* Google Tag Manager (noscript) */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        {/* Skip to Content Link for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-primary-500 focus:text-white"
        >
          {lang === 'bn' ? 'মূল কন্টেন্টে যান' : 'Skip to main content'}
        </a>

        <Main id="main-content" />
        <NextScript />

        {/* No-JS Fallback Message */}
        <noscript>
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            padding: '1rem',
            background: '#ff6b35',
            color: 'white',
            textAlign: 'center',
            zIndex: 9999
          }}>
            {lang === 'bn' 
              ? 'এই ওয়েবসাইটটি সঠিকভাবে কাজ করার জন্য JavaScript প্রয়োজন।'
              : 'This website requires JavaScript to function properly.'
            }
          </div>
        </noscript>
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx) => {
  const initialProps = await ctx.defaultGetInitialProps(ctx);
  return {
    ...initialProps,
    locale: ctx.locale || 'en'
  };
};
