// Mobile-Optimized District Page Component
// Full SEO implementation with Bangla/English support

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { generateJobPostingSchema, generateBreadcrumbSchema, generateFAQSchema, generateLocalKeywords } from '../utils/seo';

const DistrictPage = ({ district, jobs, language = 'en', workers, stats }) => {
  const [currentLang, setCurrentLang] = useState(language);
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const content = {
    en: {
      title: `Jobs in ${district.name}, Bangladesh`,
      heading: `Find Jobs & Skilled Workers in ${district.name}`,
      description: `Discover ${stats.totalJobs}+ job opportunities and connect with ${stats.totalWorkers}+ skilled workers in ${district.name}, ${district.division} Division. WorkersBD is Bangladesh's leading platform for employment.`,
      jobsAvailable: 'Jobs Available',
      skillledWorkers: 'Skilled Workers',
      categories: 'Job Categories',
      latestJobs: 'Latest Job Postings',
      topWorkers: 'Top Skilled Workers',
      aboutDistrict: `About ${district.name}`,
      districtInfo: `${district.name} is a major ${district.division === district.name ? 'divisional' : 'district'} city in ${district.division} Division with a population of over ${(district.population / 1000000).toFixed(1)} million. The area has growing opportunities in construction, garments, IT, and service sectors.`,
      popularCategories: 'Popular Job Categories in',
      whyChoose: `Why Choose WorkersBD in ${district.name}?`,
      benefits: [
        'Verified workers and employers',
        'Quick job matching with AI',
        'Secure messaging system',
        'Mobile-friendly platform',
        'Free job postings',
        'Local payment options (bKash, Nagad)',
        '24/7 customer support in Bangla',
        'Fair pricing and transparency'
      ],
      ctaTitle: `Ready to Hire or Find Work in ${district.name}?`,
      ctaEmployer: 'Post a Job',
      ctaWorker: 'Find Jobs',
      applyNow: 'Apply Now',
      viewProfile: 'View Profile',
      salaryRange: 'Salary',
      postedOn: 'Posted',
      location: 'Location',
      nearby: 'Nearby Districts',
      faqTitle: 'Frequently Asked Questions',
      allCategories: 'All Categories',
      filterByCategory: 'Filter by Category'
    },
    bn: {
      title: `${district.bn || district.name}, বাংলাদেশে চাকরি`,
      heading: `${district.bn || district.name} এ চাকরি এবং দক্ষ কর্মী খুঁজুন`,
      description: `${district.bn || district.name}, ${district.division} বিভাগে ${stats.totalJobs}+ চাকরির সুযোগ আবিষ্কার করুন এবং ${stats.totalWorkers}+ দক্ষ কর্মীদের সাথে সংযুক্ত হন। ওয়ার্কার্সবিডি বাংলাদেশের শীর্ষস্থানীয় কর্মসংস্থান প্ল্যাটফর্ম।`,
      jobsAvailable: 'চাকরি উপলব্ধ',
      skillledWorkers: 'দক্ষ কর্মী',
      categories: 'চাকরির বিভাগ',
      latestJobs: 'সর্বশেষ চাকরির পোস্ট',
      topWorkers: 'শীর্ষ দক্ষ কর্মী',
      aboutDistrict: `${district.bn || district.name} সম্পর্কে`,
      districtInfo: `${district.bn || district.name} ${district.division} বিভাগের একটি প্রধান ${district.division === district.name ? 'বিভাগীয়' : 'জেলা'} শহর যেখানে ${(district.population / 10000).toFixed(0)}+ লক্ষ জনসংখ্যা রয়েছে। এই এলাকায় নির্মাণ, গার্মেন্টস, আইটি এবং সেবা খাতে ক্রমবর্ধমান সুযোগ রয়েছে।`,
      popularCategories: 'জনপ্রিয় চাকরির বিভাগ',
      whyChoose: `${district.bn || district.name} এ কেন ওয়ার্কার্সবিডি বেছে নেবেন?`,
      benefits: [
        'যাচাইকৃত কর্মী এবং নিয়োগকর্তা',
        'এআই দিয়ে দ্রুত চাকরি মিলান',
        'সুরক্ষিত মেসেজিং সিস্টেম',
        'মোবাইল-বান্ধব প্ল্যাটফর্ম',
        'বিনামূল্যে চাকরি পোস্ট',
        'স্থানীয় পেমেন্ট (বিকাশ, নগদ)',
        '২৪/৭ বাংলায় সহায়তা',
        'ন্যায্য মূল্য ও স্বচ্ছতা'
      ],
      ctaTitle: `${district.bn || district.name} এ নিয়োগ বা কাজ খুঁজতে প্রস্তুত?`,
      ctaEmployer: 'চাকরি পোস্ট করুন',
      ctaWorker: 'চাকরি খুঁজুন',
      applyNow: 'এখনই আবেদন করুন',
      viewProfile: 'প্রোফাইল দেখুন',
      salaryRange: 'বেতন',
      postedOn: 'পোস্ট করা হয়েছে',
      location: 'অবস্থান',
      nearby: 'কাছাকাছি জেলা',
      faqTitle: 'প্রায়শই জিজ্ঞাসিত প্রশ্ন',
      allCategories: 'সকল বিভাগ',
      filterByCategory: 'বিভাগ অনুযায়ী ফিল্টার করুন'
    }
  };

  const t = content[currentLang];

  // FAQs for the district
  const faqs = [
    {
      question: currentLang === 'en' 
        ? `How many jobs are available in ${district.name}?` 
        : `${district.bn || district.name} এ কতটি চাকরি উপলব্ধ?`,
      answer: currentLang === 'en'
        ? `Currently, there are ${stats.totalJobs}+ active job postings in ${district.name} across various categories including construction, garments, IT, and more.`
        : `বর্তমানে ${district.bn || district.name} এ নির্মাণ, গার্মেন্টস, আইটি সহ বিভিন্ন বিভাগে ${stats.totalJobs}+ সক্রিয় চাকরির পোস্ট রয়েছে।`
    },
    {
      question: currentLang === 'en'
        ? `Is WorkersBD free to use in ${district.name}?`
        : `${district.bn || district.name} এ ওয়ার্কার্সবিডি কি বিনামূল্যে ব্যবহার করা যায়?`,
      answer: currentLang === 'en'
        ? `Yes! Workers can search and apply for jobs completely free. Employers can post jobs for free with optional premium features.`
        : `হ্যাঁ! কর্মীরা সম্পূর্ণ বিনামূল্যে চাকরি খুঁজতে এবং আবেদন করতে পারেন। নিয়োগকর্তারা ঐচ্ছিক প্রিমিয়াম বৈশিষ্ট্য সহ বিনামূল্যে চাকরি পোস্ট করতে পারেন।`
    },
    {
      question: currentLang === 'en'
        ? `What types of jobs are most common in ${district.name}?`
        : `${district.bn || district.name} এ কোন ধরনের চাকরি সবচেয়ে সাধারণ?`,
      answer: currentLang === 'en'
        ? `Popular categories include ${district.topCategories?.slice(0, 3).join(', ') || 'construction, garments, and IT work'}. The job market is diverse with opportunities for both skilled and entry-level workers.`
        : `জনপ্রিয় বিভাগগুলির মধ্যে রয়েছে ${district.topCategories?.slice(0, 3).join(', ') || 'নির্মাণ, গার্মেন্টস এবং আইটি কাজ'}। দক্ষ এবং প্রবেশ স্তরের কর্মী উভয়ের জন্য সুযোগ সহ চাকরির বাজার বৈচিত্র্যময়।`
    }
  ];

  // Breadcrumb for SEO
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Districts', url: '/districts' },
    { name: district.name, url: `/districts/${district.slug}` }
  ];

  // Generate keywords
  const keywords = generateLocalKeywords('jobs workers employment', district.name, currentLang);

  // Filter jobs by category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(jobs.filter(job => job.category === selectedCategory));
    }
  }, [selectedCategory, jobs]);

  return (
    <>
      <Head>
        <title>{t.title} | WorkersBD</title>
        <meta name="description" content={t.description} />
        <meta name="keywords" content={keywords.join(', ')} />
        
        {/* Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#10B981" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Open Graph */}
        <meta property="og:title" content={t.title} />
        <meta property="og:description" content={t.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://workersbd.com/districts/${district.slug}`} />
        <meta property="og:image" content={`https://workersbd.com/og-images/${district.slug}.jpg`} />
        <meta property="og:locale" content={currentLang === 'bn' ? 'bn_BD' : 'en_US'} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.title} />
        <meta name="twitter:description" content={t.description} />
        
        {/* Canonical & Alternates */}
        <link rel="canonical" href={`https://workersbd.com/districts/${district.slug}`} />
        <link rel="alternate" hrefLang="en" href={`https://workersbd.com/en/districts/${district.slug}`} />
        <link rel="alternate" hrefLang="bn" href={`https://workersbd.com/bn/districts/${district.slug}`} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbSchema(breadcrumbs))}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(generateFAQSchema(faqs))}
        </script>
        {jobs.slice(0, 10).map(job => (
          <script key={job.id} type="application/ld+json">
            {JSON.stringify(generateJobPostingSchema(job, currentLang))}
          </script>
        ))}
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Language Toggle - Sticky on Mobile */}
        <div className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
            <div className="text-sm font-semibold text-gray-700">
              {district.name} {district.bn && `• ${district.bn}`}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentLang('en')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  currentLang === 'en'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-label="Switch to English"
              >
                English
              </button>
              <button
                onClick={() => setCurrentLang('bn')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  currentLang === 'bn'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-label="বাংলায় পরিবর্তন করুন"
              >
                বাংলা
              </button>
            </div>
          </div>
        </div>

        {/* Hero Section - Mobile Optimized */}
        <section className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              {t.heading}
            </h1>
            <p className="text-lg md:text-xl text-emerald-50 mb-8 max-w-3xl">
              {t.description}
            </p>
            
            {/* Stats Cards - Mobile Responsive */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6">
                <div className="text-3xl md:text-4xl font-bold mb-1">{stats.totalJobs}+</div>
                <div className="text-sm md:text-base text-emerald-50">{t.jobsAvailable}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6">
                <div className="text-3xl md:text-4xl font-bold mb-1">{stats.totalWorkers}+</div>
                <div className="text-sm md:text-base text-emerald-50">{t.skillledWorkers}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 col-span-2 md:col-span-1">
                <div className="text-3xl md:text-4xl font-bold mb-1">{stats.categories}+</div>
                <div className="text-sm md:text-base text-emerald-50">{t.categories}</div>
              </div>
            </div>

            {/* CTA Buttons - Mobile Friendly */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`/districts/${district.slug}/post-job`}
                className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold text-center hover:bg-emerald-50 transition-colors shadow-lg"
              >
                {t.ctaEmployer}
              </a>
              <a
                href={`/districts/${district.slug}/jobs`}
                className="bg-emerald-800 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-emerald-900 transition-colors"
              >
                {t.ctaWorker}
              </a>
            </div>
          </div>
        </section>

        {/* Category Filter - Mobile Optimized with Horizontal Scroll */}
        <section className="bg-white border-b border-gray-200 sticky top-14 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t.allCategories}
              </button>
              {district.topCategories?.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Jobs Section - Mobile Cards */}
        <section className="py-12 max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
            {t.latestJobs}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredJobs.map(job => (
              <article
                key={job.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
                      {job.title}
                    </h3>
                    <span className="ml-2 px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded">
                      {job.category}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span>📍</span>
                      <span>{job.location}</span>
                    </div>
                    {job.salary && (
                      <div className="flex items-center gap-2">
                        <span>💰</span>
                        <span className="font-medium text-gray-900">{job.salary} BDT</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <span>{new Date(job.datePosted).toLocaleDateString(currentLang === 'bn' ? 'bn-BD' : 'en-US')}</span>
                    </div>
                  </div>

                  <a
                    href={`/jobs/${job.id}`}
                    className="block w-full bg-emerald-600 text-white text-center py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                  >
                    {t.applyNow}
                  </a>
                </div>
              </article>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl">
              <p className="text-gray-500 text-lg">
                {currentLang === 'en' 
                  ? 'No jobs found in this category.' 
                  : 'এই বিভাগে কোন চাকরি পাওয়া যায়নি।'}
              </p>
            </div>
          )}
        </section>

        {/* About District Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
              {t.aboutDistrict}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>{t.districtInfo}</p>
            </div>
          </div>
        </section>

        {/* Why Choose Section - Mobile Optimized */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 text-center">
              {t.whyChoose}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {t.benefits.map((benefit, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                  <div className="text-3xl mb-3">✓</div>
                  <p className="text-gray-800 font-medium">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 text-center">
            {t.faqTitle}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <summary className="px-5 py-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50">
                  {faq.question}
                </summary>
                <div className="px-5 pb-4 text-gray-700">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA - Mobile Optimized */}
        <section className="py-12 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t.ctaTitle}
            </h2>
            <p className="text-lg text-emerald-50 mb-8">
              {currentLang === 'en'
                ? 'Join thousands of workers and employers in Bangladesh'
                : 'বাংলাদেশে হাজার হাজার কর্মী এবং নিয়োগকর্তার সাথে যোগ দিন'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/register/employer"
                className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-bold hover:bg-emerald-50 transition-colors shadow-lg"
              >
                {t.ctaEmployer}
              </a>
              <a
                href="/register/worker"
                className="bg-emerald-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-emerald-900 transition-colors"
              >
                {t.ctaWorker}
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Mobile-specific CSS for smooth scrolling */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default DistrictPage;
