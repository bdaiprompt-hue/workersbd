// pages/district/[districtSlug].jsx - Mobile-Optimized District Page
import { useState } from 'react';
import SEOHead from '../../components/SEOHead';
import dynamic from 'next/dynamic';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateLocalBusinessSchema,
  bangladeshDistricts,
  jobCategories
} from '../../lib/seo';
import { getTranslation } from '../../lib/translations';

// Lazy load map component for better mobile performance
const MapComponent = dynamic(() => import('../../components/Map'), {
  ssr: false,
  loading: () => <div className="skeleton-map">Loading map...</div>
});

export default function DistrictPage({ district, jobs, locale }) {
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isBangla = locale === 'bn';
  const districtName = isBangla ? district.namebn : district.name;

  const pageTitle = `${districtName} Jobs - Find Latest Employment Opportunities`;
  const pageTitleBn = `${district.namebn} এ চাকরি - সর্বশেষ কর্মসংস্থানের সুযোগ খুঁজুন`;
  const pageDescription = `Browse ${jobs.length}+ jobs in ${districtName}, Bangladesh.`;
  const pageDescriptionBn = `${district.namebn}, বাংলাদেশে ${jobs.length}+ চাকরি ব্রাউজ করুন।`;

  const keywords = [
    `${districtName} jobs`,
    `jobs in ${districtName}`,
    `${districtName} employment`,
    'Bangladesh jobs',
    `${district.namebn} চাকরি`,
  ];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://workersbd.com' },
    { name: 'Districts', url: 'https://workersbd.com/districts' },
    { name: districtName, url: `https://workersbd.com/district/${district.slug}` }
  ]);

  const faqSchema = generateFAQSchema([
    {
      question: `How many jobs are available in ${districtName}?`,
      answer: `Currently, there are ${jobs.length}+ active job listings in ${districtName}, Bangladesh.`
    },
    {
      question: `What are the top industries hiring in ${districtName}?`,
      answer: `Top industries include construction, manufacturing, IT, healthcare, and education.`
    },
  ]);

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [breadcrumbSchema, faqSchema, generateLocalBusinessSchema()]
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setFilteredJobs(category === 'all' ? jobs : jobs.filter(j => j.category === category));
  };

  return (
    <>
      <SEOHead
        title={pageTitle}
        titlebn={pageTitleBn}
        description={pageDescription}
        descriptionbn={pageDescriptionBn}
        canonical={`https://workersbd.com/district/${district.slug}`}
        locale={locale}
        keywords={keywords}
        structuredData={structuredData}
      />

      <div style={{ background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)', color: 'white', padding: '2rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: '700', marginBottom: '0.5rem' }}>
            {isBangla ? `${district.namebn} এ চাকরি` : `Jobs in ${districtName}`}
          </h1>
          <p style={{ fontSize: '1rem', opacity: '0.9' }}>
            {isBangla ? `${jobs.length}+ সক্রিয় চাকরির তালিকা উপলব্ধ` : `${jobs.length}+ active job listings available`}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Map Section */}
        <section style={{ marginBottom: '2rem' }}>
          <h2>{isBangla ? `${district.namebn} এ চাকরির অবস্থান` : `Job Locations in ${districtName}`}</h2>
          <MapComponent district={district} jobs={jobs} />
        </section>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <button
            onClick={() => handleCategoryFilter('all')}
            style={{
              padding: '0.5rem 1rem', borderRadius: '20px',
              background: selectedCategory === 'all' ? '#0066cc' : 'white',
              color: selectedCategory === 'all' ? 'white' : '#333',
              border: '1px solid #ddd', cursor: 'pointer'
            }}
          >
            {isBangla ? 'সব' : 'All'} ({jobs.length})
          </button>
          {jobCategories.slice(0, 6).map(category => (
            <button
              key={category.slug}
              onClick={() => handleCategoryFilter(category.slug)}
              style={{
                padding: '0.5rem 1rem', borderRadius: '20px',
                background: selectedCategory === category.slug ? '#0066cc' : 'white',
                color: selectedCategory === category.slug ? 'white' : '#333',
                border: '1px solid #ddd', cursor: 'pointer'
              }}
            >
              {isBangla ? category.namebn : category.name}
            </button>
          ))}
        </div>

        {/* Jobs Grid */}
        <section>
          <h2>{isBangla ? 'সব চাকরি' : 'Available Jobs'}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {filteredJobs.map(job => (
              <div key={job.id} style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #eee' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.25rem' }}>{job.title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#666' }}>{job.company}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', margin: '1rem 0', fontSize: '0.875rem', color: '#666' }}>
                  <span>📍 {job.location}</span>
                  <span>💰 {job.salary}</span>
                  <span>⏰ {job.type}</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#444', lineHeight: '1.6', marginBottom: '1rem' }}>
                  {job.description.substring(0, 100)}...
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                  <span style={{ fontSize: '0.75rem', color: '#999' }}>{isBangla ? 'পোস্ট করা হয়েছে: ' : 'Posted: '}{job.datePosted}</span>
                  <a href={`/jobs/${job.id}`} style={{ padding: '0.5rem 1.25rem', background: '#0066cc', color: 'white', textDecoration: 'none', borderRadius: '6px', fontWeight: '600', fontSize: '0.875rem' }}>
                    {isBangla ? 'আবেদন করুন' : 'Apply Now'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related Districts */}
        <section style={{ marginTop: '2rem' }}>
          <h2>{isBangla ? 'অন্যান্য জেলায় চাকরি' : 'Jobs in Other Districts'}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {bangladeshDistricts.filter(d => d.name !== district.name).slice(0, 6).map(d => (
              <a key={d.slug} href={`/district/${d.name.toLowerCase()}`}
                style={{ padding: '0.5rem 1rem', background: '#e9ecef', borderRadius: '6px', textDecoration: 'none', color: '#495057', fontSize: '0.875rem' }}>
                {isBangla ? d.namebn : d.name}
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export async function getStaticProps({ params, locale }) {
  const { districtSlug } = params;
  const district = bangladeshDistricts.find(
    d => d.name.toLowerCase() === districtSlug.toLowerCase()
  );
  if (!district) return { notFound: true };
  const jobs = await fetchJobsByDistrict(district.name);
  return {
    props: { district, jobs, locale: locale || 'en' },
    revalidate: 3600
  };
}

export async function getStaticPaths() {
  const paths = bangladeshDistricts.flatMap(district =>
    ['en', 'bn'].map(locale => ({
      params: { districtSlug: district.name.toLowerCase() },
      locale
    }))
  );
  return { paths, fallback: 'blocking' };
}

async function fetchJobsByDistrict(district) {
  return Array.from({ length: 25 }, (_, i) => ({
    id: `${district}-${i}`,
    title: `Sample Job ${i + 1}`,
    company: `Company ${i + 1}`,
    location: district,
    salary: '৳15,000 - ৳25,000',
    type: 'Full-time',
    description: 'Quality employment opportunity for skilled workers and professionals.',
    datePosted: '2 days ago',
    category: jobCategories[i % jobCategories.length].slug
  }));
}
