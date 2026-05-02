import React, { useState } from 'react';

const LandingPage = ({ onGetStarted }) => {
  const [demoTransactions, setDemoTransactions] = useState([]);
  const [showDemoResults, setShowDemoResults] = useState(false);
  const [showDemoPanel, setShowDemoPanel] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState('');

  const sampleData = [
    { id: 1, merchant: 'AWS', date: '14 Apr 2026', purpose: 'Cloud hosting', amount: '24.50', status: 'claimable' },
    { id: 2, merchant: 'Deliveroo', date: '12 Apr 2026', purpose: 'Client meal', amount: '18.80', status: 'review' },
    { id: 3, merchant: 'Shell', date: '09 Apr 2026', purpose: 'Fuel for business', amount: '42.20', status: 'claimable' },
    { id: 4, merchant: 'Adobe Creative Cloud', date: '05 Apr 2026', purpose: 'Design software', amount: '49.99', status: 'claimable' },
    { id: 5, merchant: 'HSBC Transfer', date: '02 Apr 2026', purpose: 'Client payment', amount: '560.00', status: 'income' },
    { id: 6, merchant: 'Nuffield Health', date: '29 Mar 2026', purpose: 'Gym membership', amount: '59.00', status: 'personal' },
  ];

  const banks = [
    { name: 'Monzo', initial: 'M', color: '#FF6B6B' },
    { name: 'Starling', initial: 'S', color: '#00D4AA' },
    { name: 'Barclays', initial: 'B', color: '#00AEEF' },
    { name: 'HSBC', initial: 'H', color: '#DB0011' },
    { name: 'Lloyds', initial: 'L', color: '#006A4D' },
    { name: 'NatWest', initial: 'N', color: '#5B2D8E' },
    { name: 'Halifax', initial: 'H', color: '#0058A0' },
  ];

  const loadSampleData = () => {
    setDemoTransactions(sampleData);
    setShowDemoResults(true);
  };

  const totalClaimable = demoTransactions
    .filter((item) => item.status === 'claimable')
    .reduce((sum, item) => sum + parseFloat(item.amount || '0'), 0)
    .toFixed(2);

  const handleDemoDrop = (e) => {
    e.preventDefault();
    setDemoTransactions(sampleData);
    setShowDemoResults(true);
  };

  const handleDemoDragOver = (e) => {
    e.preventDefault();
  };

  const handleScrollToDemo = () => {
    const element = document.getElementById('demo-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay} />
      <nav style={styles.nav}>
        <div style={styles.brand}>
          <div style={styles.logoBox}>£</div>
          <span style={styles.brandText}>TaxSide</span>
        </div>
        <div style={styles.navActions}>
          <button style={styles.ghostButton}>Sign In</button>
          <button style={styles.primaryButton} onClick={onGetStarted}>Get Started Free</button>
        </div>
      </nav>

      <main style={styles.heroContent}>
        <div style={styles.badge}>Making Tax Digital — Ready</div>
        <h1 style={styles.headline}>Find every expense you're missing</h1>
        <p style={styles.subheadline}>
          The UK's most proactive tax tool for the self-employed. We're on your side — not HMRC's.
        </p>
        <div style={styles.trustRow}>
          <span style={styles.trustItem}>✓ Free to start</span>
          <span style={styles.trustItem}>✓ No credit card</span>
          <span style={styles.trustItem}>✓ HMRC compliant</span>
        </div>
        <div style={styles.videoPlaceholder}>
          <div style={styles.videoPlaceholderContent}>
            <div style={styles.videoPlayButton}>▶</div>
            <div style={styles.videoCaption}>TaxSide in action — 60 second demo</div>
          </div>
        </div>
        <button style={styles.heroVideoButton} onClick={handleScrollToDemo}>
          Try it yourself — no account needed →
        </button>
      </main>

      <section id="demo-section" style={styles.teaserSection}>
        <div style={styles.teaserHeader}>
          <h2 style={styles.teaserTitle}>Your expenses. Found in seconds.</h2>
          <p style={styles.teaserSubtitle}>
            Upload a bank statement screenshot or CSV and our AI finds every claimable expense — instantly. No accountant needed.
          </p>
        </div>
        <div style={styles.teaserSteps}>
          <div style={styles.teaserStep}>
            <div style={styles.teaserStepNumber}>1</div>
            <div>
              <div style={styles.teaserStepTitle}>📂 Upload</div>
              <div style={styles.teaserStepText}>Drop a bank screenshot or CSV file.</div>
            </div>
          </div>
          <div style={styles.teaserStep}>
            <div style={styles.teaserStepNumber}>2</div>
            <div>
              <div style={styles.teaserStepTitle}>🤖 AI Analyses</div>
              <div style={styles.teaserStepText}>We find every claimable expense automatically.</div>
            </div>
          </div>
          <div style={styles.teaserStep}>
            <div style={styles.teaserStepNumber}>3</div>
            <div>
              <div style={styles.teaserStepTitle}>✅ Claim more</div>
              <div style={styles.teaserStepText}>See exactly what to claim and export for your accountant.</div>
            </div>
          </div>
        </div>
        <button style={styles.teaserButton} onClick={() => setShowDemoPanel((prev) => !prev)}>
          Try it yourself — upload your statement
          <span style={{ ...styles.teaserArrow, ...(showDemoPanel ? styles.teaserArrowOpen : {}) }}>→</span>
        </button>
        <div style={{
          ...styles.demoPanel,
          ...(showDemoPanel ? styles.demoPanelOpen : {}),
        }}>
          <div style={styles.demoCard}>
            <div
              style={styles.demoDropZone}
              onDrop={handleDemoDrop}
              onDragOver={handleDemoDragOver}
            >
              <p style={styles.demoDropTitle}>Drop your bank screenshot or CSV here</p>
              <p style={styles.demoDropHint}>PNG · JPG · CSV · OFX supported</p>
            </div>
            <button style={styles.demoSampleButton} onClick={loadSampleData}>
              Or try with sample data →
            </button>

            {showDemoResults && (
              <div style={styles.demoResults}>
                <div style={styles.demoSummaryBar}>
                  <div>
                    <span style={styles.demoSummaryLabel}>We found £{totalClaimable} claimable — sign up to save and export your results</span>
                  </div>
                  <button style={styles.demoSignUpButton} onClick={onGetStarted}>
                    Sign Up Free
                  </button>
                </div>
                <div style={styles.demoResultsList}>
                  {demoTransactions.map((item) => (
                    <div key={item.id} style={{ ...styles.transactionCard, ...(item.status === 'claimable' ? styles.claimableCard : item.status === 'review' ? styles.reviewCard : item.status === 'personal' ? styles.personalCard : styles.incomeCard) }}>
                      <div style={styles.transactionTop}>
                        <div style={styles.transactionMerchant}>{item.merchant}</div>
                        <div style={styles.transactionAmount}>£{parseFloat(item.amount).toFixed(2)}</div>
                      </div>
                      <div style={styles.transactionMeta}>
                        <span>{item.date}</span>
                        <span>•</span>
                        <span>{item.purpose}</span>
                      </div>
                      <div style={{
                        ...styles.transactionStatus,
                        ...(item.status === 'claimable' ? styles.claimableStatus :
                          item.status === 'review' ? styles.reviewStatus :
                          item.status === 'personal' ? styles.personalStatus : styles.incomeStatus),
                      }}>
                        {item.status === 'claimable' ? 'Claimable' : item.status === 'review' ? 'Review' : item.status === 'personal' ? 'Personal' : 'Income'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section style={styles.featuresSection}>
        <div style={styles.featuresHeader}>
          <h2 style={styles.featuresTitle}>Everything you need to keep more of what you earn</h2>
          <p style={styles.featuresSubtitle}>Built for UK freelancers, contractors and self-employed people</p>
        </div>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>📸</div>
            <h3 style={styles.featureName}>Bank Statement Scanner</h3>
            <p style={styles.featureText}>Upload a screenshot or CSV and we find every claimable expense automatically.</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🧾</div>
            <h3 style={styles.featureName}>Expense Library</h3>
            <p style={styles.featureText}>200+ claimable items personalised to your trade. Find what others miss.</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🚗</div>
            <h3 style={styles.featureName}>Mileage Tracker</h3>
            <p style={styles.featureText}>Log journeys at HMRC's 45p per mile rate. Export a compliant log instantly.</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>📅</div>
            <h3 style={styles.featureName}>MTD Timeline</h3>
            <p style={styles.featureText}>Never miss a Making Tax Digital deadline. All four quarters tracked automatically.</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>📈</div>
            <h3 style={styles.featureName}>Tax Planning</h3>
            <p style={styles.featureText}>Pension calculator, CGT guide and investment tax breaks. Keep more of what you earn.</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🤖</div>
            <h3 style={styles.featureName}>Ask TaxAI</h3>
            <p style={styles.featureText}>Unlimited UK tax questions answered instantly. Like having an accountant in your pocket.</p>
          </div>
        </div>
        <div style={styles.featuresBanner}>
          <p style={styles.featuresBannerText}>On average TaxSide users find £2,400 in claimable expenses in their first year</p>
        </div>
      </section>

      <section style={styles.pricingSection}>
        <div style={styles.pricingHeader}>
          <h2 style={styles.pricingTitle}>Simple, honest pricing</h2>
          <p style={styles.pricingSubtitle}>Start free. Upgrade when you're ready.</p>
        </div>
        <div style={styles.pricingGrid}>
          <div style={styles.pricingCard}>
            <div style={styles.pricingCardHeader}>
              <h3 style={styles.pricingCardName}>Free</h3>
              <p style={styles.pricingCardPrice}>£0/mo</p>
              <p style={styles.pricingCardSubtitle}>Get started today</p>
            </div>
            <div style={styles.pricingFeatureList}>
              <div style={styles.pricingFeatureItem}><span style={styles.tickIcon}>✓</span>Bank statement scanner</div>
              <div style={styles.pricingFeatureItem}><span style={styles.tickIcon}>✓</span>5 analyses per month</div>
              <div style={styles.pricingFeatureItem}><span style={styles.tickIcon}>✓</span>Expense library access</div>
              <div style={styles.pricingFeatureItem}><span style={styles.tickIcon}>✓</span>MTD timeline</div>
              <div style={styles.pricingFeatureItem}><span style={styles.tickIcon}>✓</span>Email support</div>
            </div>
            <button style={styles.pricingButtonOutlined}>Get Started Free</button>
          </div>

          <div style={{ ...styles.pricingCard, ...styles.pricingRecommendedCard }}>
            <div style={styles.pricingCardHeader}>
              <h3 style={styles.pricingCardName}>Core</h3>
              <p style={styles.pricingCardPrice}>£9/mo</p>
              <span style={styles.pricingBadge}>Most popular</span>
            </div>
            <div style={styles.pricingFeatureList}>
              <div style={styles.pricingFeatureItem}><span style={styles.tickIcon}>✓</span>Everything in Free</div>
              <div style={styles.pricingFeatureItem}><span style={styles.tickIcon}>✓</span>Unlimited analyses</div>
              <div style={styles.pricingFeatureItem}><span style={styles.tickIcon}>✓</span>Ask TaxAI — unlimited questions</div>
              <div style={styles.pricingFeatureItem}><span style={styles.tickIcon}>✓</span>Mileage tracker</div>
              <div style={styles.pricingFeatureItem}><span style={styles.tickIcon}>✓</span>CSV and PDF export</div>
              <div style={styles.pricingFeatureItem}><span style={styles.tickIcon}>✓</span>Priority support</div>
            </div>
            <button style={styles.pricingButtonSolid}>Start Core Free Trial</button>
          </div>

          <div style={styles.pricingCard}>
            <div style={styles.pricingCardHeader}>
              <h3 style={styles.pricingCardName}>Plus</h3>
              <p style={styles.pricingCardPrice}>£19/mo</p>
              <p style={styles.pricingCardSubtitle}>For serious earners</p>
            </div>
            <div style={styles.pricingFeatureList}>
              <div style={styles.pricingFeatureItem}><span style={styles.tickIcon}>✓</span>Everything in Core</div>
              <div style={styles.pricingFeatureItem}><span style={styles.tickIcon}>✓</span>Annual expense audit</div>
              <div style={styles.pricingFeatureItem}><span style={styles.tickIcon}>✓</span>Tax planning tools</div>
              <div style={styles.pricingFeatureItem}><span style={styles.tickIcon}>✓</span>Pension and CGT calculator</div>
              <div style={styles.pricingFeatureItem}><span style={styles.tickIcon}>✓</span>Accountant referral service</div>
              <div style={styles.pricingFeatureItem}><span style={styles.tickIcon}>✓</span>Mortgage ready reports</div>
              <div style={styles.pricingFeatureItem}><span style={styles.tickIcon}>✓</span>Dedicated support</div>
            </div>
            <button style={styles.pricingButtonOutlined}>Start Plus Free Trial</button>
          </div>
        </div>
        <p style={styles.pricingFooter}>All plans include a 14 day free trial. No credit card required.</p>
      </section>

      <section style={styles.bankSection}>
        <div style={styles.bankHeader}>
          <h2 style={styles.bankTitle}>Connect your bank — coming soon</h2>
          <p style={styles.bankSubtitle}>Skip the screenshots. Connect directly and we analyse every transaction automatically in real time.</p>
        </div>
        <div style={styles.bankLogos}>
          {banks.map((bank) => (
            <div key={bank.name} style={{ ...styles.bankPill, backgroundColor: bank.color }}>
              <div style={styles.bankAvatar}>{bank.initial}</div>
              <span>{bank.name}</span>
            </div>
          ))}
        </div>
        <div style={styles.stepsContainer}>
          <div style={styles.step}>
            <div style={styles.stepNumber}>1</div>
            <div style={styles.stepContent}>
              <div style={styles.stepTitle}>Connect securely via Open Banking</div>
              <div style={styles.stepDescription}>FCA regulated, read only access, bank level encryption</div>
            </div>
            <div style={styles.stepIcon}>🔒</div>
          </div>
          <div style={styles.step}>
            <div style={styles.stepNumber}>2</div>
            <div style={styles.stepContent}>
              <div style={styles.stepTitle}>Transactions analysed automatically</div>
              <div style={styles.stepDescription}>Every expense categorised the moment it lands</div>
            </div>
          </div>
        </div>
        {!showEmailInput ? (
          <button style={styles.notifyButton} onClick={() => setShowEmailInput(true)}>
            Notify me when available →
          </button>
        ) : (
          <div style={styles.emailContainer}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.emailInput}
            />
            <button style={styles.emailSubmit}>Notify Me</button>
          </div>
        )}
        <p style={styles.reassurance}>🔒 Read only access — we can never move or touch your money</p>
      </section>

      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerLeft}>
            <div style={styles.footerLogo}>
              <div style={styles.footerLogoBox}>£</div>
              <span style={styles.footerBrandText}>TaxSide</span>
            </div>
            <p style={styles.footerTagline}>On your side. Always.</p>
            <div style={styles.socialIcons}>
              <button style={styles.socialIcon} onMouseEnter={(e) => e.target.style.color = '#00D897'} onMouseLeave={(e) => e.target.style.color = 'rgba(249, 250, 251, 0.68)'}>𝕏</button>
              <button style={styles.socialIcon} onMouseEnter={(e) => e.target.style.color = '#00D897'} onMouseLeave={(e) => e.target.style.color = 'rgba(249, 250, 251, 0.68)'}>in</button>
              <button style={styles.socialIcon} onMouseEnter={(e) => e.target.style.color = '#00D897'} onMouseLeave={(e) => e.target.style.color = 'rgba(249, 250, 251, 0.68)'}>📷</button>
            </div>
          </div>

          <div style={styles.footerLinks}>
            <div style={styles.footerColumn}>
              <h4 style={styles.footerColumnTitle}>Product</h4>
              <button style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#00D897'} onMouseLeave={(e) => e.target.style.color = 'rgba(249, 250, 251, 0.68)'}>Features</button>
              <button style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#00D897'} onMouseLeave={(e) => e.target.style.color = 'rgba(249, 250, 251, 0.68)'}>Pricing</button>
              <button style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#00D897'} onMouseLeave={(e) => e.target.style.color = 'rgba(249, 250, 251, 0.68)'}>Demo</button>
              <button style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#00D897'} onMouseLeave={(e) => e.target.style.color = 'rgba(249, 250, 251, 0.68)'}>Roadmap</button>
            </div>
            <div style={styles.footerColumn}>
              <h4 style={styles.footerColumnTitle}>Resources</h4>
              <button style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#00D897'} onMouseLeave={(e) => e.target.style.color = 'rgba(249, 250, 251, 0.68)'}>Expense Library</button>
              <button style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#00D897'} onMouseLeave={(e) => e.target.style.color = 'rgba(249, 250, 251, 0.68)'}>HMRC Guides</button>
              <button style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#00D897'} onMouseLeave={(e) => e.target.style.color = 'rgba(249, 250, 251, 0.68)'}>MTD Explained</button>
              <button style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#00D897'} onMouseLeave={(e) => e.target.style.color = 'rgba(249, 250, 251, 0.68)'}>Tax Calculator</button>
            </div>
            <div style={styles.footerColumn}>
              <h4 style={styles.footerColumnTitle}>Company</h4>
              <button style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#00D897'} onMouseLeave={(e) => e.target.style.color = 'rgba(249, 250, 251, 0.68)'}>About</button>
              <button style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#00D897'} onMouseLeave={(e) => e.target.style.color = 'rgba(249, 250, 251, 0.68)'}>Blog</button>
              <button style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#00D897'} onMouseLeave={(e) => e.target.style.color = 'rgba(249, 250, 251, 0.68)'}>Careers</button>
              <button style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#00D897'} onMouseLeave={(e) => e.target.style.color = 'rgba(249, 250, 251, 0.68)'}>Press</button>
            </div>
            <div style={styles.footerColumn}>
              <h4 style={styles.footerColumnTitle}>Legal</h4>
              <button style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#00D897'} onMouseLeave={(e) => e.target.style.color = 'rgba(249, 250, 251, 0.68)'}>Privacy Policy</button>
              <button style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#00D897'} onMouseLeave={(e) => e.target.style.color = 'rgba(249, 250, 251, 0.68)'}>Terms of Service</button>
              <button style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#00D897'} onMouseLeave={(e) => e.target.style.color = 'rgba(249, 250, 251, 0.68)'}>Cookie Policy</button>
              <button style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#00D897'} onMouseLeave={(e) => e.target.style.color = 'rgba(249, 250, 251, 0.68)'}>GDPR</button>
            </div>
          </div>

          <div style={styles.footerRight}>
            <div style={styles.newsletterBox}>
              <div style={styles.newsletterHeader}>📧 Stay updated</div>
              <div style={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={styles.newsletterInput}
                />
                <button style={styles.newsletterButton}>Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.footerBottom}>
          <div style={styles.footerBottomLeft}>© 2026 TaxSide Ltd. All rights reserved.</div>
          <div style={styles.footerBadge}>Making Tax Digital software — HMRC recognised</div>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0A0F1C',
    color: '#F9FAFB',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'DM Sans', sans-serif",
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle at center, rgba(0, 216, 151, 0.12), transparent 30%), radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 25%)',
    pointerEvents: 'none',
  },
  nav: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '28px 32px 0',
    maxWidth: '1140px',
    margin: '0 auto',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  logoBox: {
    width: '44px',
    height: '44px',
    borderRadius: '14px',
    background: '#00D897',
    color: '#0A0F1C',
    display: 'grid',
    placeItems: 'center',
    fontWeight: 800,
    fontSize: '1.1rem',
  },
  brandText: {
    fontWeight: 800,
    fontSize: '1.2rem',
  },
  navActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  ghostButton: {
    border: '1px solid rgba(255,255,255,0.18)',
    background: 'transparent',
    color: '#F9FAFB',
    padding: '12px 18px',
    borderRadius: '14px',
    cursor: 'pointer',
    fontWeight: 700,
  },
  primaryButton: {
    border: 'none',
    background: '#00D897',
    color: '#0A0F1C',
    padding: '12px 20px',
    borderRadius: '14px',
    cursor: 'pointer',
    fontWeight: 700,
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
    minHeight: 'calc(100vh - 120px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '0 24px 60px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 16px',
    borderRadius: '999px',
    background: 'rgba(0, 216, 151, 0.16)',
    color: '#00D897',
    fontWeight: 700,
    fontSize: '0.92rem',
    marginBottom: '24px',
  },
  headline: {
    fontSize: 'clamp(3rem, 5vw, 5rem)',
    lineHeight: 1.02,
    fontWeight: 900,
    maxWidth: '900px',
    margin: '0 auto 20px',
  },
  subheadline: {
    fontSize: '1.05rem',
    color: 'rgba(249, 250, 251, 0.78)',
    maxWidth: '720px',
    margin: '0 auto 34px',
    lineHeight: 1.7,
  },
  heroActions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '14px',
    justifyContent: 'center',
    marginBottom: '32px',
  },
  heroVideoButton: {
    border: 'none',
    background: '#00D897',
    color: '#0A0F1C',
    padding: '18px 26px',
    borderRadius: '16px',
    cursor: 'pointer',
    fontWeight: 800,
    fontSize: '1rem',
    margin: '0 auto',
  },
  videoPlaceholder: {
    width: '100%',
    maxWidth: '900px',
    height: '500px',
    margin: '32px auto 28px',
    borderRadius: '16px',
    background: '#111827',
    border: '1px solid #1F2937',
    boxShadow: '0 0 80px rgba(0, 216, 151, 0.12)',
    display: 'grid',
    placeItems: 'center',
  },
  videoPlaceholderContent: {
    textAlign: 'center',
  },
  videoPlayButton: {
    width: '88px',
    height: '88px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.08)',
    color: 'rgba(249, 250, 251, 0.72)',
    display: 'grid',
    placeItems: 'center',
    fontSize: '2rem',
    margin: '0 auto 18px',
  },
  videoCaption: {
    color: 'rgba(249, 250, 251, 0.62)',
    fontSize: '1rem',
  },
  primaryButtonLarge: {
    border: 'none',
    background: '#00D897',
    color: '#0A0F1C',
    padding: '18px 26px',
    borderRadius: '16px',
    cursor: 'pointer',
    fontWeight: 800,
    fontSize: '1rem',
  },
  ghostButtonLarge: {
    border: '1px solid rgba(255,255,255,0.18)',
    background: 'transparent',
    color: '#F9FAFB',
    padding: '18px 26px',
    borderRadius: '16px',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '1rem',
  },
  trustRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '18px',
    justifyContent: 'center',
    color: 'rgba(249, 250, 251, 0.78)',
    fontSize: '0.98rem',
  },
  trustItem: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
  },
  demoSection: {
    background: '#0F172A',
    padding: '60px 24px 80px',
  },
  demoHeader: {
    textAlign: 'center',
    maxWidth: '760px',
    margin: '0 auto 32px',
  },
  demoHeading: {
    margin: 0,
    color: '#F9FAFB',
    fontSize: '2rem',
    fontWeight: 800,
  },
  demoSubheading: {
    margin: '14px auto 0',
    color: 'rgba(249, 250, 251, 0.68)',
    fontSize: '1rem',
    lineHeight: 1.8,
  },
  demoCard: {
    maxWidth: '980px',
    margin: '0 auto',
    display: 'grid',
    gap: '20px',
  },
  demoDropZone: {
    minHeight: '200px',
    borderRadius: '24px',
    border: '2px dashed rgba(0, 216, 151, 0.75)',
    background: '#111827',
    display: 'grid',
    placeItems: 'center',
    padding: '24px',
    color: '#F9FAFB',
    textAlign: 'center',
  },
  demoDropTitle: {
    margin: 0,
    fontSize: '1.05rem',
    fontWeight: 700,
  },
  demoDropHint: {
    margin: '12px 0 0',
    color: 'rgba(249, 250, 251, 0.65)',
    fontSize: '0.95rem',
  },
  demoSampleButton: {
    border: 'none',
    background: '#00D897',
    color: '#0A0F1C',
    padding: '16px 24px',
    borderRadius: '16px',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '1rem',
    justifySelf: 'center',
    width: 'max-content',
  },
  teaserSection: {
    background: '#0D1421',
    padding: '72px 24px 80px',
  },
  teaserHeader: {
    textAlign: 'center',
    maxWidth: '760px',
    margin: '0 auto 40px',
  },
  teaserTitle: {
    margin: 0,
    color: '#F9FAFB',
    fontSize: '2rem',
    fontWeight: 800,
  },
  teaserSubtitle: {
    margin: '18px auto 0',
    color: 'rgba(249, 250, 251, 0.68)',
    fontSize: '1rem',
    lineHeight: 1.8,
  },
  teaserSteps: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '18px',
    maxWidth: '980px',
    margin: '0 auto 40px',
  },
  teaserStep: {
    background: '#111827',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '20px',
    padding: '24px',
    display: 'grid',
    gap: '16px',
    textAlign: 'left',
  },
  teaserStepNumber: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: '#00D897',
    color: '#0A0F1C',
    display: 'grid',
    placeItems: 'center',
    fontWeight: 800,
    fontSize: '1rem',
  },
  teaserStepTitle: {
    margin: 0,
    fontWeight: 800,
    color: '#F9FAFB',
    fontSize: '1rem',
  },
  teaserStepText: {
    margin: 0,
    color: 'rgba(249, 250, 251, 0.68)',
    fontSize: '0.95rem',
    lineHeight: 1.7,
  },
  teaserButton: {
    border: 'none',
    background: '#00D897',
    color: '#0A0F1C',
    padding: '18px 26px',
    borderRadius: '16px',
    cursor: 'pointer',
    fontWeight: 800,
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    margin: '0 auto',
  },
  teaserArrow: {
    display: 'inline-block',
    transition: 'transform 0.3s ease',
  },
  teaserArrowOpen: {
    transform: 'rotate(90deg)',
  },
  demoPanel: {
    maxHeight: 0,
    opacity: 0,
    overflow: 'hidden',
    transition: 'max-height 0.45s ease, opacity 0.35s ease',
  },
  demoPanelOpen: {
    maxHeight: '1600px',
    opacity: 1,
  },
  demoResults: {
    display: 'grid',
    gap: '18px',
  },
  demoSummaryBar: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    borderRadius: '20px',
    background: 'rgba(0, 216, 151, 0.08)',
    border: '1px solid rgba(0, 216, 151, 0.18)',
    padding: '18px 22px',
  },
  demoSummaryLabel: {
    color: '#F9FAFB',
    fontSize: '1rem',
  },
  demoSignUpButton: {
    border: 'none',
    background: '#00D897',
    color: '#0A0F1C',
    padding: '14px 22px',
    borderRadius: '16px',
    cursor: 'pointer',
    fontWeight: 700,
  },
  demoResultsList: {
    display: 'grid',
    gap: '14px',
  },
  transactionCard: {
    borderRadius: '20px',
    padding: '18px 22px',
    background: '#111827',
    border: '1px solid rgba(255,255,255,0.08)',
    display: 'grid',
    gap: '10px',
  },
  transactionTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  transactionMerchant: {
    fontWeight: 800,
    color: '#F9FAFB',
  },
  transactionAmount: {
    fontWeight: 800,
    color: '#F9FAFB',
  },
  transactionMeta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    color: 'rgba(249, 250, 251, 0.65)',
    fontSize: '0.95rem',
  },
  transactionStatus: {
    width: 'fit-content',
    padding: '8px 12px',
    borderRadius: '999px',
    textTransform: 'uppercase',
    fontSize: '0.78rem',
    fontWeight: 700,
    letterSpacing: '0.04em',
    color: '#111827',
  },
  claimableStatus: {
    background: 'rgba(16, 185, 129, 0.18)',
    color: '#10B981',
  },
  reviewStatus: {
    background: 'rgba(245, 158, 11, 0.16)',
    color: '#F59E0B',
  },
  personalStatus: {
    background: 'rgba(255, 255, 255, 0.08)',
    color: 'rgba(249, 250, 251, 0.8)',
  },
  incomeStatus: {
    background: 'rgba(255, 255, 255, 0.08)',
    color: 'rgba(249, 250, 251, 0.8)',
  },
  claimableCard: {
    borderColor: '#10B981',
  },
  reviewCard: {
    borderColor: '#F59E0B',
  },
  personalCard: {
    borderColor: 'rgba(255,255,255,0.08)',
  },
  incomeCard: {
    borderColor: 'rgba(255,255,255,0.08)',
  },
  featuresSection: {
    background: '#0F172A',
    padding: '72px 24px 80px',
  },
  featuresHeader: {
    textAlign: 'center',
    maxWidth: '780px',
    margin: '0 auto 42px',
  },
  featuresTitle: {
    margin: 0,
    color: '#F9FAFB',
    fontSize: '2rem',
    fontWeight: 800,
    lineHeight: 1.1,
  },
  featuresSubtitle: {
    margin: '18px auto 0',
    color: 'rgba(249, 250, 251, 0.68)',
    fontSize: '1rem',
    lineHeight: 1.8,
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '20px',
    maxWidth: '1180px',
    margin: '0 auto 30px',
  },
  featureCard: {
    background: '#111827',
    border: '1px solid #1F2937',
    borderRadius: '24px',
    padding: '28px 24px',
    display: 'grid',
    gap: '16px',
  },
  featureIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '16px',
    background: '#0B4129',
    color: '#00D897',
    display: 'grid',
    placeItems: 'center',
    fontSize: '1.35rem',
  },
  featureName: {
    margin: 0,
    color: '#F9FAFB',
    fontSize: '1.1rem',
    fontWeight: 800,
  },
  featureText: {
    margin: 0,
    color: 'rgba(249, 250, 251, 0.72)',
    fontSize: '0.97rem',
    lineHeight: 1.75,
  },
  featuresBanner: {
    maxWidth: '980px',
    margin: '0 auto',
    background: 'rgba(16, 185, 129, 0.12)',
    border: '1px solid rgba(16, 185, 129, 0.2)',
    borderRadius: '20px',
    padding: '22px 26px',
  },
  featuresBannerText: {
    margin: 0,
    color: '#ECFDF5',
    fontSize: '1.05rem',
    fontWeight: 700,
    textAlign: 'center',
  },
  pricingSection: {
    background: '#0F172A',
    padding: '72px 24px 84px',
  },
  pricingHeader: {
    textAlign: 'center',
    maxWidth: '760px',
    margin: '0 auto 42px',
  },
  pricingTitle: {
    margin: 0,
    color: '#F9FAFB',
    fontSize: '2rem',
    fontWeight: 800,
  },
  pricingSubtitle: {
    margin: '18px auto 0',
    color: 'rgba(249, 250, 251, 0.68)',
    fontSize: '1rem',
    lineHeight: 1.8,
  },
  pricingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '24px',
    maxWidth: '1180px',
    margin: '0 auto 28px',
  },
  pricingCard: {
    background: '#111827',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '28px',
    padding: '32px 28px',
    display: 'grid',
    gap: '24px',
    minHeight: '520px',
  },
  pricingRecommendedCard: {
    borderColor: '#10B981',
    boxShadow: '0 24px 60px rgba(16, 185, 129, 0.16)',
    transform: 'scale(1.02)',
  },
  pricingCardHeader: {
    display: 'grid',
    gap: '12px',
  },
  pricingCardName: {
    margin: 0,
    color: '#F9FAFB',
    fontSize: '1.25rem',
    fontWeight: 800,
  },
  pricingCardPrice: {
    margin: 0,
    color: '#ECFDF5',
    fontSize: '2.5rem',
    fontWeight: 800,
    lineHeight: 1,
  },
  pricingCardSubtitle: {
    margin: 0,
    color: 'rgba(249, 250, 251, 0.68)',
    fontSize: '0.95rem',
  },
  pricingBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 14px',
    borderRadius: '999px',
    background: 'rgba(16, 185, 129, 0.16)',
    color: '#A7F3D0',
    fontWeight: 700,
    fontSize: '0.85rem',
    width: 'fit-content',
  },
  pricingFeatureList: {
    display: 'grid',
    gap: '12px',
  },
  pricingFeatureItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    color: 'rgba(249, 250, 251, 0.75)',
    fontSize: '0.96rem',
    lineHeight: 1.6,
  },
  tickIcon: {
    minWidth: '22px',
    minHeight: '22px',
    borderRadius: '8px',
    background: 'rgba(16, 185, 129, 0.16)',
    color: '#10B981',
    display: 'grid',
    placeItems: 'center',
    fontSize: '0.85rem',
    padding: '2px',
  },
  pricingButtonOutlined: {
    border: '1px solid rgba(255,255,255,0.18)',
    background: 'transparent',
    color: '#F9FAFB',
    padding: '14px 22px',
    borderRadius: '16px',
    cursor: 'pointer',
    fontWeight: 700,
  },
  pricingButtonSolid: {
    border: 'none',
    background: '#00D897',
    color: '#0A0F1C',
    padding: '14px 22px',
    borderRadius: '16px',
    cursor: 'pointer',
    fontWeight: 700,
  },
  pricingFooter: {
    margin: 0,
    textAlign: 'center',
    color: 'rgba(249, 250, 251, 0.62)',
    fontSize: '0.95rem',
  },
  bankSection: {
    background: '#0F172A',
    padding: '72px 24px 84px',
  },
  bankHeader: {
    textAlign: 'center',
    maxWidth: '760px',
    margin: '0 auto 42px',
  },
  bankTitle: {
    margin: 0,
    color: '#F9FAFB',
    fontSize: '2rem',
    fontWeight: 800,
  },
  bankSubtitle: {
    margin: '18px auto 0',
    color: 'rgba(249, 250, 251, 0.68)',
    fontSize: '1rem',
    lineHeight: 1.8,
  },
  bankLogos: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '48px',
  },
  bankPill: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    borderRadius: '24px',
    color: '#FFFFFF',
    fontWeight: 700,
    fontSize: '0.9rem',
  },
  bankAvatar: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    fontWeight: 800,
  },
  stepsContainer: {
    display: 'grid',
    gap: '24px',
    maxWidth: '800px',
    margin: '0 auto 48px',
  },
  step: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    background: '#111827',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '20px',
    padding: '24px',
  },
  stepNumber: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: '#00D897',
    color: '#0A0F1C',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 800,
    fontSize: '1.1rem',
    flexShrink: 0,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    color: '#F9FAFB',
    fontSize: '1.1rem',
    fontWeight: 700,
    marginBottom: '4px',
  },
  stepDescription: {
    color: 'rgba(249, 250, 251, 0.68)',
    fontSize: '0.95rem',
  },
  stepIcon: {
    fontSize: '1.5rem',
    flexShrink: 0,
  },
  notifyButton: {
    border: '2px solid #00D897',
    background: 'transparent',
    color: '#00D897',
    padding: '14px 24px',
    borderRadius: '16px',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '1rem',
    display: 'block',
    margin: '0 auto 24px',
  },
  emailContainer: {
    display: 'flex',
    gap: '12px',
    maxWidth: '400px',
    margin: '0 auto 24px',
  },
  emailInput: {
    flex: 1,
    padding: '14px 16px',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.18)',
    background: '#111827',
    color: '#F9FAFB',
    fontSize: '1rem',
  },
  emailSubmit: {
    border: 'none',
    background: '#00D897',
    color: '#0A0F1C',
    padding: '14px 24px',
    borderRadius: '16px',
    cursor: 'pointer',
    fontWeight: 700,
  },
  reassurance: {
    margin: 0,
    textAlign: 'center',
    color: 'rgba(249, 250, 251, 0.62)',
    fontSize: '0.95rem',
  },
  footer: {
    background: '#050D1A',
    borderTop: '1px solid #1F2937',
    padding: '48px 24px 0',
  },
  footerContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 1fr',
    gap: '48px',
    maxWidth: '1200px',
    margin: '0 auto 32px',
  },
  footerLeft: {
    display: 'grid',
    gap: '16px',
  },
  footerLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  footerLogoBox: {
    width: '44px',
    height: '44px',
    borderRadius: '14px',
    background: '#00D897',
    color: '#050D1A',
    display: 'grid',
    placeItems: 'center',
    fontWeight: 800,
    fontSize: '1.1rem',
  },
  footerBrandText: {
    fontWeight: 800,
    fontSize: '1.2rem',
    color: '#F9FAFB',
  },
  footerTagline: {
    color: 'rgba(249, 250, 251, 0.68)',
    fontSize: '0.95rem',
    margin: 0,
  },
  socialIcons: {
    display: 'flex',
    gap: '12px',
  },
  socialIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'rgba(249, 250, 251, 0.68)',
    border: 'none',
    cursor: 'pointer',
    display: 'grid',
    placeItems: 'center',
    fontSize: '1.1rem',
    transition: 'all 0.2s ease',
  },
  footerLinks: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '32px',
  },
  footerColumn: {
    display: 'grid',
    gap: '12px',
  },
  footerColumnTitle: {
    color: '#00D897',
    fontSize: '1rem',
    fontWeight: 700,
    margin: 0,
  },
  footerLink: {
    color: 'rgba(249, 250, 251, 0.68)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'color 0.2s ease',
  },
  footerRight: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  newsletterBox: {
    border: '2px solid #00D897',
    borderRadius: '16px',
    padding: '20px',
    background: 'transparent',
    maxWidth: '300px',
  },
  newsletterHeader: {
    color: '#F9FAFB',
    fontSize: '1rem',
    fontWeight: 700,
    marginBottom: '16px',
  },
  newsletterForm: {
    display: 'flex',
    gap: '8px',
  },
  newsletterInput: {
    flex: 1,
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    background: '#111827',
    color: '#F9FAFB',
    fontSize: '0.9rem',
  },
  newsletterButton: {
    border: 'none',
    background: '#00D897',
    color: '#050D1A',
    padding: '12px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '0.9rem',
  },
  footerBottom: {
    borderTop: '1px solid #1F2937',
    padding: '24px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  footerBottomLeft: {
    color: 'rgba(249, 250, 251, 0.62)',
    fontSize: '0.9rem',
  },
  footerBadge: {
    background: 'rgba(0, 216, 151, 0.12)',
    color: '#A7F3D0',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: 600,
  },
};

export default LandingPage;
