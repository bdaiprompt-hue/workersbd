import Head from 'next/head';
import { useRouter } from 'next/router';
import { siteConfig, generateMetaTags } from '../lib/seo';
import { translations } from '../lib/translations';

export default function Home() {
  const router = useRouter();
  const locale = router.locale || 'en';
  const t = translations[locale]?.home || translations['en'].home;
  const common = translations[locale]?.common || translations['en'].common;

  const metaTags = generateMetaTags({
    title: 'Find Jobs & Skilled Workers in Bangladesh | WorkersBD',
    titlebn: 'বাংলাদেশে চাকরি এবং দক্ষ কর্মী খুঁজুন | ওয়ার্কার্স বিডি',
    description: siteConfig.description,
    descriptionbn: siteConfig.descriptionbn,
    canonical: siteConfig.url,
    locale,
    ogImage: siteConfig.ogImage,
    keywords: ['jobs bangladesh', 'workers bangladesh', 'employment', 'skilled workers', 'job portal bd']
  });

  return (
    <>
      <Head>
        <title>{metaTags.title}</title>
        <meta name="description" content={metaTags.description} />
        <meta name="keywords" content="jobs, workers, bangladesh, employment, dhaka" />
        <link rel="canonical" href={metaTags.canonical} />
        
        {/* Open Graph */}
        <meta property="og:title" content={metaTags.title} />
        <meta property="og:description" content={metaTags.description} />
        <meta property="og:image" content={metaTags.openGraph.images[0].url} />
        <meta property="og:url" content={metaTags.canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={locale === 'bn' ? 'bn_BD' : 'en_US'} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTags.title} />
        <meta name="twitter:description" content={metaTags.description} />
        <meta name="twitter:image" content={metaTags.openGraph.images[0].url} />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="px-4 py-20 md:py-32 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary-600">
                {t.title}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {t.subtitle}
              </p>

              {/* Search Box */}
              <div className="flex gap-2 mb-8">
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
                  {common.search}
                </button>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
                  {t.browseJobs || 'Browse Jobs'}
                </button>
                <button className="px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-medium">
                  {t.browseWorkers || 'Find Workers'}
                </button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="hidden md:flex justify-center">
              <div className="w-full h-96 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center">
                <svg className="w-full h-full p-8" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="100" r="80" fill="currentColor" className="text-primary-200" />
                  <circle cx="100" cy="60" r="20" fill="currentColor" className="text-primary-600" />
                  <path d="M 80 90 Q 100 100 120 90" stroke="currentColor" className="text-primary-600" strokeWidth="3" />
                  <rect x="85" y="110" width="30" height="40" fill="currentColor" className="text-primary-600" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-20 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              {locale === 'bn' ? 'আমরা কীভাবে সাহায্য করি' : 'How We Help'}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  en: 'Find Quality Jobs',
                  bn: 'গুণমানের চাকরি খুঁজুন',
                  desc_en: 'Browse thousands of job listings from reputable employers across Bangladesh',
                  desc_bn: 'বাংলাদেশ জুড়ে সুনামধন্য নিয়োগকর্তাদের থেকে হাজার হাজার চাকরির তালিকা ব্রাউজ করুন'
                },
                {
                  en: 'Connect with Workers',
                  bn: 'শ্রমিকদের সাথে সংযোগ করুন',
                  desc_en: 'Find skilled professionals ready to take on your project',
                  desc_bn: 'আপনার প্রকল্পে কাজ করার জন্য প্রস্তুত দক্ষ পেশাদারদের খুঁজুন'
                },
                {
                  en: 'Build Your Career',
                  bn: 'আপনার ক্যারিয়ার তৈরি করুন',
                  desc_en: 'Showcase your skills and grow professionally with verified opportunities',
                  desc_bn: 'আপনার দক্ষতা প্রদর্শন করুন এবং যাচাইকৃত সুযোগের সাথে পেশাগতভাবে বৃদ্ধি পান'
                }
              ].map((feature, idx) => (
                <div key={idx} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold mb-3">
                    {locale === 'bn' ? feature.bn : feature.en}
                  </h3>
                  <p className="text-gray-600">
                    {locale === 'bn' ? feature.desc_bn : feature.desc_en}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-4 py-20 bg-primary-600 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { value: '10K+', label: locale === 'bn' ? 'চাকরি' : 'Jobs' },
                { value: '5K+', label: locale === 'bn' ? 'শ্রমিক' : 'Workers' },
                { value: '64+', label: locale === 'bn' ? 'জেলা' : 'Districts' },
                { value: '100%', label: locale === 'bn' ? 'নিরাপদ' : 'Safe' }
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-primary-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              {locale === 'bn' ? 'আজই শুরু করুন' : 'Get Started Today'}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {locale === 'bn'
                ? 'আপনার স্বপ্নের চাকরি খুঁজে পান বা দক্ষ কর্মী নিয়োগ করুন'
                : 'Find your dream job or hire skilled professionals'}
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
                {common.signup}
              </button>
              <button className="px-8 py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-medium">
                {common.login}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-white font-bold mb-4">WorkersBD</h4>
            <p className="text-sm">{siteConfig.description}</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">{common.jobs}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">All Jobs</a></li>
              <li><a href="#" className="hover:text-white">By Category</a></li>
              <li><a href="#" className="hover:text-white">By Location</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">{common.workers}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Find Workers</a></li>
              <li><a href="#" className="hover:text-white">Top Rated</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:support@workersbd.com" className="hover:text-white">Email Us</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><a href="#" className="hover:text-white">Support</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2025 WorkersBD. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
