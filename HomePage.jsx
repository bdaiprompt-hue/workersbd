// Mobile-Optimized Homepage Component
// Advanced SEO, Schema markup, Bangla/English support

import React, { useState } from 'react';
import Head from 'next/head';
import { bangladeshDistricts, jobCategories, generateFAQSchema } from '../utils/seo';

const HomePage = ({ stats, featuredJobs, topWorkers, testimonials, language = 'en' }) => {
  const [currentLang, setCurrentLang] = useState(language);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  const content = {
    en: {
      title: 'WorkersBD - Find Jobs & Skilled Workers in Bangladesh',
      description: 'Bangladesh\'s #1 platform connecting skilled workers with employers. Find jobs in construction, garments, IT, driving, and more. Free to use, mobile-friendly, and available in Bangla.',
      hero: {
        title: 'Find Your Next Opportunity',
        subtitle: 'Connect with ',
        highlight: '50,000+ Jobs',
        subtitle2: ' and ',
        highlight2: '100,000+ Skilled Workers',
        subtitle3: ' across Bangladesh',
        searchPlaceholder: 'Job title, skills, or category...',
        locationPlaceholder: 'District or city...',
        searchButton: 'Search Jobs',
        popularSearches: 'Popular:',
        searches: ['Electrician Dhaka', 'Driver Chattogram', 'Construction', 'Garments Worker']
      },
      howItWorks: {
        title: 'How WorkersBD Works',
        subtitle: 'Simple, fast, and effective job matching',
        steps: [
          {
            icon: '📝',
            title: 'Create Profile',
            description: 'Sign up in 2 minutes. Add your skills, experience, and availability.'
          },
          {
            icon: '🔍',
            title: 'Search & Match',
            description: 'Browse thousands of jobs or let employers find you with AI matching.'
          },
          {
            icon: '💬',
            title: 'Connect & Chat',
            description: 'Message directly with employers or workers. Negotiate terms safely.'
          },
          {
            icon: '🎉',
            title: 'Get Hired',
            description: 'Accept offers, start working, and build your career in Bangladesh.'
          }
        ]
      },
      categories: {
        title: 'Popular Job Categories',
        subtitle: 'Explore opportunities across Bangladesh',
        viewAll: 'View All Categories'
      },
      districts: {
        title: 'Jobs by District',
        subtitle: 'Find opportunities near you',
        viewAll: 'View All Districts'
      },
      features: {
        title: 'Why Choose WorkersBD?',
        items: [
          {
            icon: '🇧🇩',
            title: 'Made for Bangladesh',
            description: 'Built specifically for the Bangladeshi job market with Bangla support'
          },
          {
            icon: '✓',
            title: 'Verified Profiles',
            description: 'All users verified through phone and national ID for safety'
          },
          {
            icon: '📱',
            title: 'Mobile First',
            description: 'Works perfectly on any phone, even with slow internet'
          },
          {
            icon: '💰',
            title: 'Free to Use',
            description: 'Workers never pay. Employers post jobs for free'
          },
          {
            icon: '🔒',
            title: 'Secure Payments',
            description: 'Integrated with bKash, Nagad, and Rocket for safe transactions'
          },
          {
            icon: '🤝',
            title: 'Fair & Transparent',
            description: 'Clear job terms, no hidden fees, worker protection'
          }
        ]
      },
      cta: {
        worker: {
          title: 'Looking for Work?',
          description: 'Create your profile and get discovered by top employers',
          button: 'Find Jobs Now'
        },
        employer: {
          title: 'Need Workers?',
          description: 'Post jobs and connect with skilled professionals',
          button: 'Hire Workers'
        }
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            question: 'Is WorkersBD free to use?',
            answer: 'Yes! Workers can create profiles and apply for jobs completely free. Employers can post jobs for free with optional premium features for better visibility.'
          },
          {
            question: 'How do I verify my profile?',
            answer: 'After registration, you\'ll receive an SMS with a verification code. You can also verify using your National ID for a trusted badge.'
          },
          {
            question: 'Can I use WorkersBD in Bangla?',
            answer: 'Absolutely! The entire platform is available in both Bangla and English. Switch languages anytime with one click.'
          },
          {
            question: 'What payment methods are supported?',
            answer: 'We support bKash, Nagad, Rocket, bank transfers, and cash payments. All transactions are secure.'
          },
          {
            question: 'How quickly can I find a job?',
            answer: 'Many workers get responses within 24-48 hours. The more complete your profile, the faster you\'ll get matched.'
          }
        ]
      },
      stats: {
        jobs: 'Active Jobs',
        workers: 'Skilled Workers',
        employers: 'Employers',
        matches: 'Successful Matches'
      }
    },
    bn: {
      title: 'ওয়ার্কার্সবিডি - বাংলাদেশে চাকরি এবং দক্ষ কর্মী খুঁজুন',
      description: 'দক্ষ কর্মীদের নিয়োগকর্তাদের সাথে সংযুক্ত করার বাংলাদেশের #১ প্ল্যাটফর্ম। নির্মাণ, গার্মেন্টস, আইটি, ড্রাইভিং এবং আরও অনেক কিছুতে চাকরি খুঁজুন। ব্যবহার বিনামূল্যে, মোবাইল-বান্ধব, এবং বাংলায় উপলব্ধ।',
      hero: {
        title: 'আপনার পরবর্তী সুযোগ খুঁজুন',
        subtitle: 'সংযুক্ত হন ',
        highlight: '৫০,০০০+ চাকরি',
        subtitle2: ' এবং ',
        highlight2: '১,০০,০০০+ দক্ষ কর্মীর',
        subtitle3: ' সাথে সারা বাংলাদেশ জুড়ে',
        searchPlaceholder: 'চাকরির শিরোনাম, দক্ষতা বা বিভাগ...',
        locationPlaceholder: 'জেলা বা শহর...',
        searchButton: 'চাকরি খুঁজুন',
        popularSearches: 'জনপ্রিয়:',
        searches: ['ইলেকট্রিশিয়ান ঢাকা', 'ড্রাইভার চট্টগ্রাম', 'নির্মাণ', 'গার্মেন্টস কর্মী']
      },
      howItWorks: {
        title: 'ওয়ার্কার্সবিডি কিভাবে কাজ করে',
        subtitle: 'সহজ, দ্রুত এবং কার্যকর চাকরি মিলান',
        steps: [
          {
            icon: '📝',
            title: 'প্রোফাইল তৈরি করুন',
            description: '২ মিনিটে সাইন আপ করুন। আপনার দক্ষতা, অভিজ্ঞতা এবং প্রাপ্যতা যোগ করুন।'
          },
          {
            icon: '🔍',
            title: 'খুঁজুন এবং মিলান',
            description: 'হাজার হাজার চাকরি ব্রাউজ করুন বা নিয়োগকর্তাদের এআই মিলান দিয়ে আপনাকে খুঁজে নিতে দিন।'
          },
          {
            icon: '💬',
            title: 'সংযুক্ত হন এবং চ্যাট করুন',
            description: 'নিয়োগকর্তা বা কর্মীদের সাথে সরাসরি বার্তা পাঠান। নিরাপদে শর্তাবলী আলোচনা করুন।'
          },
          {
            icon: '🎉',
            title: 'নিয়োগ পান',
            description: 'অফার গ্রহণ করুন, কাজ শুরু করুন এবং বাংলাদেশে আপনার ক্যারিয়ার তৈরি করুন।'
          }
        ]
      },
      categories: {
        title: 'জনপ্রিয় চাকরির বিভাগ',
        subtitle: 'সারা বাংলাদেশ জুড়ে সুযোগ অন্বেষণ করুন',
        viewAll: 'সকল বিভাগ দেখুন'
      },
      districts: {
        title: 'জেলা অনুযায়ী চাকরি',
        subtitle: 'আপনার কাছাকাছি সুযোগ খুঁজুন',
        viewAll: 'সকল জেলা দেখুন'
      },
      features: {
        title: 'কেন ওয়ার্কার্সবিডি বেছে নেবেন?',
        items: [
          {
            icon: '🇧🇩',
            title: 'বাংলাদেশের জন্য তৈরি',
            description: 'বাংলা সমর্থন সহ বাংলাদেশের চাকরির বাজারের জন্য বিশেষভাবে তৈরি'
          },
          {
            icon: '✓',
            title: 'যাচাইকৃত প্রোফাইল',
            description: 'নিরাপত্তার জন্য ফোন এবং জাতীয় পরিচয়পত্রের মাধ্যমে সকল ব্যবহারকারী যাচাই করা'
          },
          {
            icon: '📱',
            title: 'মোবাইল প্রথম',
            description: 'ধীর ইন্টারনেট সহ যেকোনো ফোনে নিখুঁতভাবে কাজ করে'
          },
          {
            icon: '💰',
            title: 'ব্যবহার বিনামূল্যে',
            description: 'কর্মীরা কখনো টাকা দেয় না। নিয়োগকর্তারা বিনামূল্যে চাকরি পোস্ট করেন'
          },
          {
            icon: '🔒',
            title: 'নিরাপদ পেমেন্ট',
            description: 'নিরাপদ লেনদেনের জন্য বিকাশ, নগদ এবং রকেটের সাথে একীভূত'
          },
          {
            icon: '🤝',
            title: 'ন্যায্য ও স্বচ্ছ',
            description: 'স্পষ্ট চাকরির শর্ত, কোন লুকানো ফি নেই, কর্মী সুরক্ষা'
          }
        ]
      },
      cta: {
        worker: {
          title: 'কাজ খুঁজছেন?',
          description: 'আপনার প্রোফাইল তৈরি করুন এবং শীর্ষ নিয়োগকর্তাদের দ্বারা আবিষ্কৃত হন',
          button: 'এখনই চাকরি খুঁজুন'
        },
        employer: {
          title: 'কর্মী প্রয়োজন?',
          description: 'চাকরি পোস্ট করুন এবং দক্ষ পেশাদারদের সাথে সংযুক্ত হন',
          button: 'কর্মী নিয়োগ করুন'
        }
      },
      faq: {
        title: 'প্রায়শই জিজ্ঞাসিত প্রশ্ন',
        items: [
          {
            question: 'ওয়ার্কার্সবিডি কি ব্যবহার করা বিনামূল্যে?',
            answer: 'হ্যাঁ! কর্মীরা সম্পূর্ণ বিনামূল্যে প্রোফাইল তৈরি করতে এবং চাকরির জন্য আবেদন করতে পারেন। নিয়োগকর্তারা ভাল দৃশ্যমানতার জন্য ঐচ্ছিক প্রিমিয়াম বৈশিষ্ট্য সহ বিনামূল্যে চাকরি পোস্ট করতে পারেন।'
          },
          {
            question: 'আমি কিভাবে আমার প্রোফাইল যাচাই করব?',
            answer: 'নিবন্ধনের পরে, আপনি একটি যাচাইকরণ কোড সহ একটি এসএমএস পাবেন। বিশ্বস্ত ব্যাজের জন্য আপনি আপনার জাতীয় পরিচয়পত্র ব্যবহার করেও যাচাই করতে পারেন।'
          },
          {
            question: 'আমি কি বাংলায় ওয়ার্কার্সবিডি ব্যবহার করতে পারি?',
            answer: 'অবশ্যই! সম্পূর্ণ প্ল্যাটফর্ম বাংলা এবং ইংরেজি উভয় ভাষায় উপলব্ধ। যেকোনো সময় এক ক্লিকে ভাষা পরিবর্তন করুন।'
          },
          {
            question: 'কোন পেমেন্ট পদ্ধতি সমর্থিত?',
            answer: 'আমরা বিকাশ, নগদ, রকেট, ব্যাংক স্থানান্তর এবং নগদ পেমেন্ট সমর্থন করি। সকল লেনদেন নিরাপদ।'
          },
          {
            question: 'আমি কত দ্রুত একটি চাকরি খুঁজে পেতে পারি?',
            answer: 'অনেক কর্মী ২৪-৪৮ ঘন্টার মধ্যে প্রতিক্রিয়া পান। আপনার প্রোফাইল যত সম্পূর্ণ হবে, তত দ্রুত আপনি মিলবেন।'
          }
        ]
      },
      stats: {
        jobs: 'সক্রিয় চাকরি',
        workers: 'দক্ষ কর্মী',
        employers: 'নিয়োগকর্তা',
        matches: 'সফল মিল'
      }
    }
  };

  const t = content[currentLang];

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'WorkersBD',
    alternateName: 'ওয়ার্কার্সবিডি',
    url: 'https://workersbd.com',
    logo: 'https://workersbd.com/logo.png',
    description: t.description,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BD'
    },
    sameAs: [
      'https://facebook.com/workersbd',
      'https://twitter.com/workersbd',
      'https://linkedin.com/company/workersbd'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+880-1234-567890',
      contactType: 'Customer Service',
      availableLanguage: ['Bengali', 'English']
    }
  };

  // Website Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'WorkersBD',
    url: 'https://workersbd.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://workersbd.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(searchLocation)}`;
  };

  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
        <meta name="keywords" content="Bangladesh jobs, চাকরি, skilled workers, নিয়োগ, employment Bangladesh, কর্মী, job portal, চাকরি খুঁজুন" />
        
        {/* Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#10B981" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Open Graph */}
        <meta property="og:title" content={t.title} />
        <meta property="og:description" content={t.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://workersbd.com" />
        <meta property="og:image" content="https://workersbd.com/og-image.jpg" />
        <meta property="og:locale" content={currentLang === 'bn' ? 'bn_BD' : 'en_US'} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.title} />
        <meta name="twitter:description" content={t.description} />
        <meta name="twitter:image" content="https://workersbd.com/twitter-card.jpg" />
        
        {/* Canonical & Alternates */}
        <link rel="canonical" href="https://workersbd.com" />
        <link rel="alternate" hrefLang="en" href="https://workersbd.com/en" />
        <link rel="alternate" hrefLang="bn" href="https://workersbd.com/bn" />
        <link rel="alternate" hrefLang="x-default" href="https://workersbd.com" />
        
        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(generateFAQSchema(t.faq.items))}
        </script>
      </Head>

      <div className="min-h-screen bg-white">
        {/* Header with Language Toggle */}
        <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="WorkersBD" className="h-8 w-auto" />
              <span className="font-bold text-xl text-emerald-600 hidden sm:inline">
                WorkersBD
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentLang('en')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  currentLang === 'en'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setCurrentLang('bn')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  currentLang === 'bn'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                বাং
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section - Mobile Optimized */}
        <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto mb-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                {t.hero.title}
              </h1>
              <p className="text-lg md:text-2xl text-emerald-50">
                {t.hero.subtitle}
                <span className="font-bold text-yellow-300">{t.hero.highlight}</span>
                {t.hero.subtitle2}
                <span className="font-bold text-yellow-300">{t.hero.highlight2}</span>
                {t.hero.subtitle3}
              </p>
            </div>

            {/* Search Form - Mobile Friendly */}
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-3 bg-white rounded-xl p-2 shadow-2xl">
                <input
                  type="text"
                  placeholder={t.hero.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="text"
                  placeholder={t.hero.locationPlaceholder}
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors whitespace-nowrap"
                >
                  {t.hero.searchButton}
                </button>
              </div>
            </form>

            {/* Popular Searches */}
            <div className="text-center text-emerald-100 text-sm">
              <span className="font-medium">{t.hero.popularSearches}</span>
              {' '}
              {t.hero.searches.map((search, idx) => (
                <span key={idx}>
                  <a href={`/search?q=${encodeURIComponent(search)}`} className="underline hover:text-white">
                    {search}
                  </a>
                  {idx < t.hero.searches.length - 1 && ', '}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-300">{stats.jobs.toLocaleString()}</div>
                <div className="text-sm text-emerald-100 mt-1">{t.stats.jobs}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-300">{stats.workers.toLocaleString()}</div>
                <div className="text-sm text-emerald-100 mt-1">{t.stats.workers}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-300">{stats.employers.toLocaleString()}</div>
                <div className="text-sm text-emerald-100 mt-1">{t.stats.employers}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-300">{stats.matches.toLocaleString()}</div>
                <div className="text-sm text-emerald-100 mt-1">{t.stats.matches}</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {t.howItWorks.title}
              </h2>
              <p className="text-lg text-gray-600">{t.howItWorks.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.howItWorks.steps.map((step, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
                  <div className="text-5xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Categories */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {t.categories.title}
              </h2>
              <p className="text-lg text-gray-600">{t.categories.subtitle}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {jobCategories.slice(0, 12).map(cat => (
                <a
                  key={cat.id}
                  href={`/categories/${cat.id}`}
                  className="bg-gray-50 hover:bg-emerald-50 p-6 rounded-xl text-center transition-all hover:shadow-md border border-gray-200 hover:border-emerald-300"
                >
                  <div className="text-4xl mb-3">{cat.icon}</div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {currentLang === 'bn' ? cat.bn : cat.en}
                  </div>
                </a>
              ))}
            </div>
            <div className="text-center mt-8">
              <a
                href="/categories"
                className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                {t.categories.viewAll}
              </a>
            </div>
          </div>
        </section>

        {/* Districts Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {t.districts.title}
              </h2>
              <p className="text-lg text-gray-600">{t.districts.subtitle}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {bangladeshDistricts.slice(0, 16).map(district => (
                <a
                  key={district.name}
                  href={`/districts/${district.name.toLowerCase()}`}
                  className="bg-white hover:bg-emerald-50 p-4 rounded-lg text-center transition-all hover:shadow-md border border-gray-200 hover:border-emerald-300"
                >
                  <div className="font-semibold text-gray-900 text-sm mb-1">
                    {currentLang === 'bn' ? district.bn : district.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    📍 {district.division}
                  </div>
                </a>
              ))}
            </div>
            <div className="text-center mt-8">
              <a
                href="/districts"
                className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                {t.districts.viewAll}
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              {t.features.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.features.items.map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="text-4xl flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Dual */}
        <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">{t.cta.worker.title}</h2>
                <p className="text-lg text-emerald-50 mb-6">{t.cta.worker.description}</p>
                <a
                  href="/register/worker"
                  className="inline-block bg-white text-emerald-600 px-8 py-3 rounded-lg font-bold hover:bg-emerald-50 transition-colors shadow-lg"
                >
                  {t.cta.worker.button}
                </a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">{t.cta.employer.title}</h2>
                <p className="text-lg text-emerald-50 mb-6">{t.cta.employer.description}</p>
                <a
                  href="/register/employer"
                  className="inline-block bg-white text-emerald-600 px-8 py-3 rounded-lg font-bold hover:bg-emerald-50 transition-colors shadow-lg"
                >
                  {t.cta.employer.button}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              {t.faq.title}
            </h2>
            <div className="space-y-4">
              {t.faq.items.map((faq, idx) => (
                <details
                  key={idx}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group"
                >
                  <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50 flex justify-between items-center">
                    <span>{faq.question}</span>
                    <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
