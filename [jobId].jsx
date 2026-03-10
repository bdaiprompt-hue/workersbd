// pages/jobs/[jobId].jsx - Individual Job Listing Page
import { useState } from 'react';
import SEOHead from '../../components/SEOHead';
import { generateJobPostingSchema, generateBreadcrumbSchema } from '../../lib/seo';

export default function JobPage({ job, relatedJobs, locale }) {
  const [isApplying, setIsApplying] = useState(false);
  const isBangla = locale === 'bn';

  // SEO Configuration
  const pageTitle = `${job.title} at ${job.company} - ${job.location}`;
  const pageTitleBn = `${job.titlebn || job.title} - ${job.companybn || job.company} - ${job.locationbn || job.location}`;
  const pageDescription = `Apply for ${job.title} position at ${job.company} in ${job.location}. Salary: ${job.salary}. ${job.employmentType}. Required: ${job.skills.join(', ')}`;
  const pageDescriptionBn = `${job.company} তে ${job.title} পদের জন্য আবেদন করুন। বেতন: ${job.salary}। প্রয়োজনীয় দক্ষতা: ${job.skills.join(', ')}`;

  // Structured Data
  const jobSchema = generateJobPostingSchema(job);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://workersbd.com' },
    { name: 'Jobs', url: 'https://workersbd.com/jobs' },
    { name: job.title, url: `https://workersbd.com/jobs/${job.id}` }
  ]);

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [jobSchema, breadcrumbSchema]
  };

  const keywords = [
    job.title,
    job.company,
    job.location,
    job.category,
    ...job.skills,
    'Bangladesh jobs',
    'job vacancy',
    'employment'
  ];

  return (
    <>
      <SEOHead
        title={pageTitle}
        titlebn={pageTitleBn}
        description={pageDescription}
        descriptionbn={pageDescriptionBn}
        canonical={`https://workersbd.com/jobs/${job.id}`}
        locale={locale}
        keywords={keywords}
        structuredData={structuredData}
        ogImage={job.image || `https://workersbd.com/og/job-${job.id}.jpg`}
      />

      <div className="job-page" style={styles.page}>
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" style={styles.breadcrumb}>
          <ol style={styles.breadcrumbList}>
            <li><a href="/">{isBangla ? 'হোম' : 'Home'}</a></li>
            <li><a href="/jobs">{isBangla ? 'চাকরি' : 'Jobs'}</a></li>
            <li><a href={`/district/${job.location.toLowerCase()}`}>{job.location}</a></li>
            <li aria-current="page">{job.title}</li>
          </ol>
        </nav>

        {/* Job Header Card */}
        <div className="container" style={styles.container}>
          <article className="job-header" style={styles.jobHeader}>
            <div className="company-logo" style={styles.logoContainer}>
              {job.companyLogo ? (
                <img 
                  src={job.companyLogo} 
                  alt={`${job.company} logo`}
                  style={styles.logo}
                  loading="lazy"
                />
              ) : (
                <div style={styles.logoPlaceholder}>
                  {job.company.charAt(0)}
                </div>
              )}
            </div>

            <div className="job-info" style={styles.jobInfo}>
              <h1 style={styles.title}>{job.title}</h1>
              <div className="company-name" style={styles.company}>
                {job.company}
              </div>
              
              <div className="job-meta-pills" style={styles.metaPills}>
                <span style={styles.pill}>📍 {job.location}</span>
                <span style={styles.pill}>💰 {job.salary}</span>
                <span style={styles.pill}>⏰ {isBangla ? job.employmentTypebn : job.employmentType}</span>
                <span style={styles.pill}>📅 {isBangla ? 'পোস্ট করা হয়েছে:' : 'Posted:'} {job.datePosted}</span>
              </div>

              {/* Application Deadline Badge */}
              {job.deadline && (
                <div style={styles.deadline}>
                  ⚠️ {isBangla ? 'আবেদনের শেষ তারিখ:' : 'Deadline:'} {job.deadline}
                </div>
              )}
            </div>

            {/* Sticky Apply Button for Mobile */}
            <button 
              style={styles.applyButton}
              onClick={() => setIsApplying(true)}
              aria-label={`Apply for ${job.title}`}
            >
              {isBangla ? 'এখনই আবেদন করুন' : 'Apply Now'}
            </button>
          </article>

          {/* Main Content Grid */}
          <div className="content-grid" style={styles.contentGrid}>
            
            {/* Left Column - Job Details */}
            <div className="job-details" style={styles.jobDetails}>
              
              {/* Job Description */}
              <section style={styles.section}>
                <h2 style={styles.sectionTitle}>
                  {isBangla ? 'চাকরির বিবরণ' : 'Job Description'}
                </h2>
                <div style={styles.description}>
                  {job.description}
                </div>
              </section>

              {/* Responsibilities */}
              <section style={styles.section}>
                <h2 style={styles.sectionTitle}>
                  {isBangla ? 'দায়িত্বসমূহ' : 'Key Responsibilities'}
                </h2>
                <ul style={styles.list}>
                  {job.responsibilities.map((item, index) => (
                    <li key={index} style={styles.listItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Requirements */}
              <section style={styles.section}>
                <h2 style={styles.sectionTitle}>
                  {isBangla ? 'প্রয়োজনীয়তা' : 'Requirements'}
                </h2>
                <ul style={styles.list}>
                  {job.requirements.map((item, index) => (
                    <li key={index} style={styles.listItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Skills */}
              <section style={styles.section}>
                <h2 style={styles.sectionTitle}>
                  {isBangla ? 'প্রয়োজনীয় দক্ষতা' : 'Required Skills'}
                </h2>
                <div style={styles.skillTags}>
                  {job.skills.map((skill, index) => (
                    <span key={index} style={styles.skillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* Benefits */}
              {job.benefits && job.benefits.length > 0 && (
                <section style={styles.section}>
                  <h2 style={styles.sectionTitle}>
                    {isBangla ? 'সুবিধাসমূহ' : 'Benefits & Perks'}
                  </h2>
                  <ul style={styles.list}>
                    {job.benefits.map((benefit, index) => (
                      <li key={index} style={styles.listItem}>
                        ✅ {benefit}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* Right Sidebar - Company Info & Quick Apply */}
            <aside className="sidebar" style={styles.sidebar}>
              
              {/* Quick Apply Card */}
              <div className="quick-apply-card" style={styles.card}>
                <h3 style={styles.cardTitle}>
                  {isBangla ? 'দ্রুত আবেদন' : 'Quick Apply'}
                </h3>
                <button 
                  style={styles.applyButtonLarge}
                  onClick={() => setIsApplying(true)}
                >
                  {isBangla ? 'এখনই আবেদন করুন' : 'Apply Now'}
                </button>
                <p style={styles.note}>
                  {isBangla 
                    ? 'আবেদন করতে আপনার প্রোফাইল তৈরি করুন বা লগইন করুন'
                    : 'Create your profile or login to apply'
                  }
                </p>
              </div>

              {/* Company Info Card */}
              <div className="company-card" style={styles.card}>
                <h3 style={styles.cardTitle}>
                  {isBangla ? 'কোম্পানির তথ্য' : 'About Company'}
                </h3>
                <div style={styles.companyInfo}>
                  <p><strong>{job.company}</strong></p>
                  <p style={styles.companyDetail}>
                    📍 {job.companyAddress}
                  </p>
                  <p style={styles.companyDetail}>
                    🏢 {job.companySize} {isBangla ? 'কর্মচারী' : 'employees'}
                  </p>
                  {job.companyWebsite && (
                    <a 
                      href={job.companyWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.companyLink}
                    >
                      🔗 {isBangla ? 'ওয়েবসাইট পরিদর্শন করুন' : 'Visit Website'}
                    </a>
                  )}
                </div>
              </div>

              {/* Job Stats */}
              <div className="stats-card" style={styles.card}>
                <h3 style={styles.cardTitle}>
                  {isBangla ? 'চাকরির তথ্য' : 'Job Stats'}
                </h3>
                <div style={styles.stats}>
                  <div style={styles.statItem}>
                    <span style={styles.statLabel}>
                      {isBangla ? 'প্রকাশিত' : 'Published'}
                    </span>
                    <span style={styles.statValue}>{job.datePosted}</span>
                  </div>
                  <div style={styles.statItem}>
                    <span style={styles.statLabel}>
                      {isBangla ? 'আবেদন' : 'Applications'}
                    </span>
                    <span style={styles.statValue}>{job.applications || 0}</span>
                  </div>
                  <div style={styles.statItem}>
                    <span style={styles.statLabel}>
                      {isBangla ? 'ভ্যাকেন্সি' : 'Vacancies'}
                    </span>
                    <span style={styles.statValue}>{job.vacancies || 1}</span>
                  </div>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="share-card" style={styles.card}>
                <h3 style={styles.cardTitle}>
                  {isBangla ? 'শেয়ার করুন' : 'Share Job'}
                </h3>
                <div style={styles.shareButtons}>
                  <button style={styles.shareButton} aria-label="Share on Facebook">
                    Facebook
                  </button>
                  <button style={styles.shareButton} aria-label="Share on WhatsApp">
                    WhatsApp
                  </button>
                  <button style={styles.shareButton} aria-label="Copy link">
                    Copy Link
                  </button>
                </div>
              </div>
            </aside>
          </div>

          {/* Related Jobs */}
          <section className="related-jobs" style={styles.relatedSection}>
            <h2 style={styles.sectionTitle}>
              {isBangla ? 'অনুরূপ চাকরি' : 'Similar Jobs'}
            </h2>
            <div style={styles.relatedGrid}>
              {relatedJobs.map(relJob => (
                <a 
                  key={relJob.id}
                  href={`/jobs/${relJob.id}`}
                  style={styles.relatedCard}
                >
                  <h3 style={styles.relatedTitle}>{relJob.title}</h3>
                  <p style={styles.relatedCompany}>{relJob.company}</p>
                  <div style={styles.relatedMeta}>
                    <span>📍 {relJob.location}</span>
                    <span>💰 {relJob.salary}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Mobile Sticky Footer */}
      <div style={styles.stickyFooter}>
        <button 
          style={styles.stickyApplyButton}
          onClick={() => setIsApplying(true)}
          aria-label={`Apply for ${job.title}`}
        >
          {isBangla ? 'এখনই আবেদন করুন' : 'Apply Now'}
        </button>
      </div>
    </>
  );
}

// Mobile-First Styles
const styles = {
  page: {
    minHeight: '100vh',
    background: '#f8f9fa',
    paddingBottom: '80px' // Space for sticky footer
  },
  breadcrumb: {
    background: 'white',
    padding: '1rem',
    borderBottom: '1px solid #eee'
  },
  breadcrumbList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    fontSize: '0.875rem'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem'
  },
  jobHeader: {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
  },
  logoContainer: {
    marginBottom: '1rem'
  },
  logo: {
    width: '80px',
    height: '80px',
    borderRadius: '12px',
    objectFit: 'cover'
  },
  logoPlaceholder: {
    width: '80px',
    height: '80px',
    borderRadius: '12px',
    background: '#0066cc',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    fontWeight: '700'
  },
  jobInfo: {
    marginBottom: '1.5rem'
  },
  title: {
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    fontWeight: '700',
    marginBottom: '0.5rem',
    color: '#1a1a1a'
  },
  company: {
    fontSize: '1.125rem',
    color: '#0066cc',
    marginBottom: '1rem',
    fontWeight: '600'
  },
  metaPills: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1rem'
  },
  pill: {
    padding: '0.5rem 1rem',
    background: '#e9ecef',
    borderRadius: '20px',
    fontSize: '0.875rem',
    color: '#495057'
  },
  deadline: {
    padding: '0.75rem',
    background: '#fff3cd',
    borderRadius: '8px',
    fontSize: '0.875rem',
    color: '#856404',
    fontWeight: '600'
  },
  applyButton: {
    width: '100%',
    padding: '1rem',
    background: '#0066cc',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.2s'
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1rem'
  },
  jobDetails: {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
  },
  section: {
    marginBottom: '2rem'
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#1a1a1a'
  },
  description: {
    fontSize: '1rem',
    lineHeight: '1.7',
    color: '#495057'
  },
  list: {
    paddingLeft: '1.5rem',
    margin: 0
  },
  listItem: {
    marginBottom: '0.75rem',
    fontSize: '0.9375rem',
    lineHeight: '1.6',
    color: '#495057'
  },
  skillTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem'
  },
  skillTag: {
    padding: '0.5rem 1rem',
    background: '#e7f3ff',
    color: '#0066cc',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: '500'
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  card: {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
  },
  cardTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#1a1a1a'
  },
  applyButtonLarge: {
    width: '100%',
    padding: '1rem',
    background: '#0066cc',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '0.75rem'
  },
  note: {
    fontSize: '0.875rem',
    color: '#6c757d',
    textAlign: 'center'
  },
  companyInfo: {
    fontSize: '0.9375rem'
  },
  companyDetail: {
    marginTop: '0.5rem',
    color: '#6c757d'
  },
  companyLink: {
    display: 'inline-block',
    marginTop: '1rem',
    color: '#0066cc',
    textDecoration: 'none',
    fontWeight: '500'
  },
  stats: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  statItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  statLabel: {
    fontSize: '0.875rem',
    color: '#6c757d'
  },
  statValue: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1a1a1a'
  },
  shareButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  shareButton: {
    padding: '0.75rem',
    background: '#e9ecef',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.875rem'
  },
  relatedSection: {
    marginTop: '2rem'
  },
  relatedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1rem',
    marginTop: '1rem'
  },
  relatedCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    textDecoration: 'none',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    border: '1px solid #eee',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  relatedTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '0.5rem'
  },
  relatedCompany: {
    fontSize: '0.875rem',
    color: '#0066cc',
    marginBottom: '0.75rem'
  },
  relatedMeta: {
    display: 'flex',
    gap: '1rem',
    fontSize: '0.875rem',
    color: '#6c757d'
  },
  stickyFooter: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'white',
    padding: '1rem',
    boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
    zIndex: 1000
  },
  stickyApplyButton: {
    width: '100%',
    padding: '1rem',
    background: '#0066cc',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer'
  }
};

// Server-side rendering
export async function getServerSideProps({ params, locale }) {
  const { jobId } = params;
  
  // Fetch job data (replace with actual API call)
  const job = await fetchJobById(jobId);
  
  if (!job) {
    return { notFound: true };
  }

  // Fetch related jobs
  const relatedJobs = await fetchRelatedJobs(job.category, jobId);

  return {
    props: {
      job,
      relatedJobs,
      locale: locale || 'en'
    }
  };
}

// Mock function - replace with actual API
async function fetchJobById(id) {
  return {
    id,
    title: 'Senior Software Engineer',
    titlebn: 'সিনিয়র সফটওয়্যার ইঞ্জিনিয়ার',
    company: 'Tech Solutions BD',
    companybn: 'টেক সলিউশনস বিডি',
    location: 'Dhaka',
    locationbn: 'ঢাকা',
    salary: '৳50,000 - ৳80,000',
    employmentType: 'Full-time',
    employmentTypebn: 'ফুল-টাইম',
    datePosted: '2 days ago',
    deadline: 'November 30, 2025',
    category: 'it-software',
    description: 'We are seeking a talented Senior Software Engineer to join our growing team...',
    responsibilities: [
      'Design and develop scalable web applications',
      'Lead code reviews and mentor junior developers',
      'Collaborate with cross-functional teams',
      'Ensure code quality and best practices'
    ],
    requirements: [
      '5+ years of software development experience',
      'Strong proficiency in JavaScript, React, and Node.js',
      'Experience with database design and optimization',
      'Bachelor\'s degree in Computer Science or related field'
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
    benefits: [
      'Competitive salary and bonuses',
      'Health insurance',
      'Flexible working hours',
      'Professional development opportunities',
      'Annual paid leave'
    ],
    companyLogo: null,
    companyAddress: 'Gulshan, Dhaka 1212',
    companySize: '50-100',
    companyWebsite: 'https://techsolutions.com',
    applications: 45,
    vacancies: 2
  };
}

async function fetchRelatedJobs(category, excludeId) {
  return Array.from({ length: 3 }, (_, i) => ({
    id: `related-${i}`,
    title: `Related Job ${i + 1}`,
    company: `Company ${i + 1}`,
    location: 'Dhaka',
    salary: '৳30,000 - ৳50,000'
  }));
}
