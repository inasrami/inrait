export default {
  // ── Nav ──────────────────────────────────────────────────
  nav: {
    work:     'Work',
    about:    'About',
    stack:    'Stack',
    process:  'Process',
    services: 'Services',
    blog:     'Blog',
    letsTalk: "Let's Talk",
  },

  // ── Hero ─────────────────────────────────────────────────
  hero: {
    available:    'Open for projects · Sofia, Bulgaria',
    line1:        'WEB',
    line2:        'ENGINEERING',
    line3:        'THAT HITS.',
    sub:          'We build fast, scalable, obsessively crafted digital products — the kind clients remember and users keep coming back to.',
    cta:          'Start a project',
    ctaWork:      'See our work',
    statProjectsVal: '5',
    statYearsVal:    '2+',
    statCodeVal:     '100%',
    statProjects: 'Portfolio Projects',
    statYears:    'Years Building',
    statCode:     'Custom Code',
  },

  // ── Philosophy ───────────────────────────────────────────
  philosophy: {
    label:          'Philosophy',
    headline:       'Most websites exist. The best ones',
    headlineEm:     ' speak',
    headlineSuffix: ". We build the kind that make visitors stop scrolling and start trusting — before they've read a single word.",
    pillars: [
      { title: 'Speed is design.',   body: 'Every millisecond costs conversions. We write lean, optimized code because a beautiful interface that loads slow is a broken interface.' },
      { title: 'UX is psychology.',  body: "Users don't read — they feel. Every layout decision, every micro-interaction guides attention and builds confidence without a word." },
      { title: 'Code is craft.',     body: 'Scalable architecture, clean components, semantic HTML. Code you can hand off to any senior dev without embarrassment.' },
    ],
  },

  // ── Stats ────────────────────────────────────────────────
  stats: {
    label:        'By the numbers',
    projectsVal:  '5',
    yearsVal:     '2+',
    codeVal:      '100%',
    projects:     'Portfolio Projects',
    satisfaction: 'Years of Craft',
    performance:  'Custom Built',
    delivery:     'Pixel Precision',
  },

  // ── Services data (drives services.js dynamically) ───────
  servicesData: {
    website: {
      title: 'Business Website',
      tag:   'Most Popular',
      body:  'Custom-built websites that establish credibility and convert visitors into clients. Architecture, design, performance, and deployment — end to end.',
      deliverables: [
        'Vue.js SPA or multi-page site',
        'Mobile-first responsive design',
        'SEO markup & Core Web Vitals optimisation',
        'Git handoff + deployment support',
      ],
      addons: [
        { label: 'CMS integration (editable content)',    price: 200 },
        { label: 'Blog / news section',                   price: 150 },
        { label: 'Advanced SEO audit + schema markup',    price: 180 },
        { label: 'Multilingual support (2 languages)',    price: 250 },
        { label: 'Premium animations (GSAP)',             price: 300 },
      ],
    },
    booking: {
      title: 'Custom Booking System',
      tag:   'For Hospitality',
      body:  'Tailor-made reservation platforms for hotels, guesthouses, barbershops, and service businesses. Cut commission fees and own your bookings entirely.',
      deliverables: [
        'Real-time availability calendar',
        'Admin dashboard for managing bookings',
        'Automated confirmation emails',
        'Mobile-optimised booking flow',
      ],
      addons: [
        { label: 'Online payment (Stripe / PayPal)',       price: 250 },
        { label: 'SMS & email confirmation automation',    price: 200 },
        { label: 'Google Calendar two-way sync',          price: 150 },
        { label: 'Multi-property / multi-staff support',  price: 350 },
        { label: 'Promo codes & discount engine',         price: 180 },
      ],
    },
    ecommerce: {
      title: 'E-commerce Store',
      tag:   'Sell Online',
      body:  'Full-featured online stores built for performance. Product management, checkout, payments — designed to sell from day one and scale with your catalogue.',
      deliverables: [
        'Product catalogue & variant management',
        'Secure checkout & payment gateway',
        'Order & inventory management',
        'Mobile-optimised shopping experience',
      ],
      addons: [
        { label: 'Multi-gateway checkout (Stripe + PayPal)', price: 200 },
        { label: 'Advanced inventory & variant management',  price: 250 },
        { label: 'Product reviews & ratings system',         price: 180 },
        { label: 'Sales analytics dashboard',               price: 220 },
        { label: 'Discount codes & flash sale engine',       price: 160 },
      ],
    },
    automation: {
      title: 'Workflow Automation',
      tag:   'Save Time',
      body:  'n8n automation pipelines that eliminate repetitive work — lead capture, CRM syncing, invoice generation, notification flows, and multi-system integrations.',
      deliverables: [
        'Custom n8n workflow design & build',
        'CRM, email & calendar integrations',
        'Self-hosted or cloud deployment',
        'Full documentation & handover',
      ],
      addons: [
        { label: 'CRM integration (HubSpot / Pipedrive)',  price: 200 },
        { label: 'Automated invoicing pipeline',           price: 180 },
        { label: 'Lead capture + follow-up sequence',      price: 220 },
        { label: 'Self-hosted n8n server setup',           price: 250 },
        { label: 'Automated weekly reporting emails',      price: 150 },
      ],
    },
    identity: {
      title: 'Visual Identity & Design',
      tag:   'Brand First',
      body:  'Brand identity systems, UI/UX design, and marketing assets. We build brands that look intentional — from logo to colour palette to every client touchpoint.',
      deliverables: [
        'Logo design & brand guidelines',
        'Adobe Suite production files',
        'Typography & colour system',
        'Social media & marketing assets',
      ],
      addons: [
        { label: 'Full brand guidelines document',          price: 150 },
        { label: 'Social media template pack (10 assets)', price: 180 },
        { label: 'Print assets (business card, letterhead)', price: 120 },
        { label: 'UI design for web (Figma screens)',       price: 300 },
        { label: 'Animated logo / intro (After Effects)',   price: 250 },
      ],
    },
    photography: {
      title: 'Photography & Media',
      tag:   'Visual Content',
      body:  'Commercial photography and post-production for businesses that need their visual content to match the quality of their product.',
      deliverables: [
        'Commercial & brand photography',
        'Professional retouching & colour grading',
        'Delivered in web & print formats',
        'Usage rights — full commercial licence',
      ],
      addons: [
        { label: 'Additional half-day shoot',              price: 200 },
        { label: 'Drone aerial photography',               price: 300 },
        { label: 'Short promo video edit (60–90 sec)',     price: 350 },
        { label: '360° virtual tour (hotels / venues)',    price: 400 },
        { label: '48hr rush delivery',                     price: 150 },
      ],
    },
  },

  // ── Services (homepage section) ──────────────────────────
  services: {
    label:          'What We Build',
    title:          'SERVICES',
    viewAll:        'View all 6 services',
    from:           'Starting from',
    details:        'Details',
    alsoOffer:      'We also offer',
    alsoOfferItems: 'E-commerce, Visual Identity & Photography.',
    bundle:         'Combine services for up to',
    bundleOff:      '15% off.',
    disclaimer:     'All prices are estimates — final cost is agreed after a free consultation.',
    buildPackage:   'Build your package',
    caseStudy:      'Case study',
  },

  // ── Client logos ─────────────────────────────────────────
  logos: {
    trusted:  'Trusted by businesses across Bulgaria and Europe',
    yourLogo: 'Your brand here?',
    letsTalk: "Let's talk.",
  },

  // ── Projects ─────────────────────────────────────────────
  projects: {
    label:       'Selected Work',
    title:       'PROJECTS',
    viewCase:    'Case study',
    backToWork:  'Back to work',
    viewSite:    'View live site',
    overview:    'Overview',
    challenge:   'The Challenge',
    solution:    'The Solution',
    outcome:     'The Outcome',
    nextProject: 'Next project',
    dragHint:    'Drag to explore',
    notFound:    'Project not found.',
    likeThis:    'LIKE THIS?',
    metaYear:    'Year',
    metaCategory:'Category',
    metaStack:   'Stack',
    metaLive:    'Live site',
    filter: {
      all:        'All',
      web:        'Web',
      design:     'Design',
      automation: 'Automation',
    },
  },

  // ── About ────────────────────────────────────────────────
  about: {
    label:        'The Studio',
    title:        'ABOUT INRAIT',
    available:    'Open for projects',
    statement:    'INRAIT is a boutique digital studio based in Sofia. We work with hospitality businesses, service providers, and growing brands across Bulgaria and Europe — building the digital infrastructure they need to compete and convert.',
    location:     'Sofia, Bulgaria · Serving clients across the EU · Remote-ready',
    startProject: 'Start a project',
    values: [
      { title: 'Direct communication', body: 'You talk to the person doing the work. No account managers, no handoffs.' },
      { title: 'Deadline-driven',      body: 'Agreed timelines are commitments. We scope carefully so we can deliver on time.' },
      { title: 'Full ownership',       body: "Clean, documented code. You own everything — no lock-in, ever." },
      { title: 'Outcome-focused',      body: "We build what generates results, not what looks impressive in a proposal." },
    ],
  },

  // ── Tech specs ───────────────────────────────────────────
  techSpecs: {
    label: 'Under the Hood',
    title: 'THE STACK',
    sub:   'The tools we use are chosen for performance, maintainability, and longevity — not trends.',
    categories: ['Frontend & Frameworks', 'Backend & Data', 'Tools & Workflow', 'Visual & Creative'],
  },

  // ── Testimonials ─────────────────────────────────────────
  testimonials: {
    label: 'Client Results',
    title: 'TESTIMONIALS',
    items: [
      {
        quote:   'Working with INRAIT was unlike any agency experience we have had. The attention to detail was extraordinary — every interaction on our platform felt intentional. Delivered on time, on budget, zero surprises.',
        name:    'Client Name',
        role:    'Founder',
        company: 'Company Name',
      },
      {
        quote:   'We needed a booking system that felt premium enough for our clientele. What we received exceeded our expectations. The interface is fast, intuitive, and our guests actually compliment us on it.',
        name:    'Client Name',
        role:    'Owner',
        company: 'Company Name',
      },
      {
        quote:   'The team has a rare combination of engineering precision and design sensibility. The result speaks for itself. We have already started planning our second project together.',
        name:    'Client Name',
        role:    'CEO',
        company: 'Company Name',
      },
    ],
  },

  // ── Process ──────────────────────────────────────────────
  process: {
    label:  'How We Work',
    title:  'THE PROCESS',
    cta:    'Ready to build something extraordinary together?',
    ctaBtn: 'Start the conversation',
    steps: [
      { title: 'Discovery & Strategy',  body: 'We align on the real problem first. Who is this for? What do they need to feel? What does success look like in 6 months?' },
      { title: 'Design Architecture',   body: 'We map the user journey, define the component structure, and establish the visual language before touching code.' },
      { title: 'Engineering & Build',   body: 'Clean Vue components, semantic HTML, optimized assets, performance budgets from day one. No technical debt shipped.' },
      { title: 'Review & Refinement',   body: "Cross-device testing, performance audits, accessibility checks. We don't ship until it meets the standard set at the start." },
    ],
  },

  // ── CTA ──────────────────────────────────────────────────
  cta: {
    label: 'Ready?',
    line1: "LET'S BUILD",
    line2: 'TOGETHER.',
    sub:   "Whether you have a clear vision or just a problem that needs solving — we want to hear it.",
    start: 'Start a project',
    email: 'Send an email',
    avail: 'Open for new projects — let\'s talk',
  },

  // ── Marquee ──────────────────────────────────────────────
  marquee: {
    powered:    'POWERED BY',
    vuejs:      'VUE.JS',
    drivenBy:   'DRIVEN BY',
    design:     'DESIGN',
    engineered: 'ENGINEERED FOR',
    scale:      'SCALE',
  },

  // ── Footer ───────────────────────────────────────────────
  footer: {
    tagline:    'Web engineering from Sofia, Bulgaria. Clean code. Absolute performance. Built to scale.',
    available:  'Open for projects',
    colWork:    'Work',
    colNav:     'Navigate',
    colConnect: 'Connect',
    navBlog:     'Blog',
    navServices: 'Services',
    navPhilo:    'Philosophy',
    navStack:    'Stack',
    navProcess:  'Process',
    navContact:  'Contact',
    copyright:  '© 2025 INRAIT Web Engineering · Sofia, Bulgaria. All rights reserved.',
    privacy:    'Privacy Policy',
    engineered: 'Engineered with precision.',
  },

  // ── Contact page ─────────────────────────────────────────
  contact: {
    label:        'Get In Touch',
    line1:        "LET'S",
    line2:        'BUILD IT.',
    sub:          "Tell us about your project. We'll get back to you within 24 hours.",
    name:         'Your name',
    namePh:       'Alex Johnson',
    email:        'Email address',
    emailPh:      'alex@company.com',
    type:         'Project type',
    typePh:       'Select a service',
    budget:       'Budget range',
    budgetPh:     'Select budget',
    message:      'Tell us about the project',
    messagePh:    "What problem are you solving? Who is it for? What's the timeline?",
    send:         'Send message',
    sending:      'Sending…',
    sent:         "Sent! We'll be in touch soon.",
    errorFill:    'Please fill in your name, email, and message.',
    errorFail:    'Something went wrong. Please email us directly at inkorami27@gmail.com',
    directTitle:  'Direct contact',
    onlineTitle:  'Find us online',
    emailLabel:   'Email',
    phoneLabel:   'Phone',
    locationLabel:'Location',
    locationVal:  'Sofia, Bulgaria · Remote-Ready',
    availTitle:   'Currently available',
    availBody:    'Open for new projects. Every enquiry gets a personal response — usually within 24 hours.',
    setupNote:    'To activate email sending, replace',
    setupLink:    'emailjs.com',
    types: [
      'Business Website',
      'Custom Booking System',
      'E-commerce Store',
      'Workflow Automation (n8n)',
      'Visual Identity & Design',
      'Photography & Media',
      'Something else',
    ],
    budgets: [
      'Under €500',
      '€500 – €1,000',
      '€1,000 – €3,000',
      '€3,000 – €8,000',
      '€8,000+',
    ],
  },

  // ── Services page ────────────────────────────────────────
  servicesPage: {
    label:            'What We Build',
    title:            'SERVICES',
    sub:              'Select the services you need. Combine them to unlock automatic bundle discounts — the more you build together, the better the deal.',
    disclaimerStrong: 'All prices shown are starting estimates only.',
    disclaimerBody:   'Final pricing is determined after a free consultation — every project is scoped individually based on complexity, timeline, and requirements. It can be lower or higher. No surprises.',
    bannerLabel:      'applied to your estimate',
    bannerMax:        'Maximum bundle discount unlocked.',
    bannerNext:       'Add one more service to unlock 15% off.',
    basePrice:        'Estimate from',
    addons:           'Add-ons',
    addonsTitle:      'Optional add-ons — click to include in estimate',
    added:            'Added',
    estimate:         'estimate',
    getQuote:         'Get a quote',
    bottomNote:       'All estimates on this page are indicative starting points. Final pricing is agreed after a free discovery consultation.',
    bookCall:         'Book a free call',
    visitSite:        'Visit site',
    selectServices:   'Select the services you need.',
    combineServices:  'Combine them to unlock automatic bundle discounts — the more you build together, the better the deal.',
  },

  // ── Privacy ──────────────────────────────────────────────
  privacy: {
    label:    'Legal',
    title:    'PRIVACY POLICY',
    updated:  'Last updated: January 2025',
    backHome: 'Back to home',
    contact:  'Contact us',
    sections: {
      who:          { heading: '1. Who We Are', body: 'INRAIT ("we", "us", "our") is a web engineering and digital studio based in Sofia, Bulgaria. We operate the website at inrait.com (the "Site"). For any privacy-related questions, contact us at inkorami27@gmail.com.' },
      what:         { heading: '2. What Data We Collect', intro: 'We collect personal data only when you voluntarily provide it:', items: ['Contact form: your name, email address, project type, budget range, and message content.', 'Direct contact: any information you send us by email or phone.'], outro: 'We do not use tracking pixels, advertising networks, or third-party analytics tools. We do not collect data automatically beyond what your browser sends to any web server (e.g. IP address in server logs).' },
      how:          { heading: '3. How We Use Your Data', intro: 'The data you submit through our contact form is used exclusively to:', items: ['Respond to your project inquiry', 'Communicate with you about potential or ongoing work', 'Send project-related correspondence'], outro: 'We do not use your data for marketing, profiling, or automated decision-making. We do not sell or share your data with third parties for commercial purposes.' },
      legal:        { heading: '4. Legal Basis for Processing (GDPR)', intro: 'We process your personal data under the following legal bases as defined by the EU General Data Protection Regulation (GDPR):', items: ['Legitimate interests (Art. 6(1)(f)): responding to business inquiries you initiate.', 'Contractual necessity (Art. 6(1)(b)): fulfilling a service agreement if we enter into one.', 'Consent (Art. 6(1)(a)): where you have explicitly opted in (e.g. cookie consent).'] },
      retention:    { heading: '5. Data Retention', body: 'We retain inquiry data for up to 2 years after last contact, or for the duration of any active business relationship, whichever is longer. After this period, data is securely deleted. You may request deletion at any time (see Section 7).' },
      thirdParty:   { heading: '6. Third-Party Services', emailjs: 'Our contact form uses EmailJS to deliver your message to our inbox. EmailJS processes form submissions on their infrastructure. You can review their privacy policy at emailjs.com/legal/privacy-policy.', hosting: 'Our website is hosted on infrastructure that may log standard server access data (IP address, browser type, timestamp) for security and operational purposes. These logs are not used for profiling and are retained for a maximum of 30 days.' },
      rights:       { heading: '7. Your Rights Under GDPR', intro: 'As a data subject in the EU/EEA, you have the right to:', items: ['Access — request a copy of the personal data we hold about you', 'Rectification — request correction of inaccurate data', 'Erasure — request deletion of your data ("right to be forgotten")', 'Restriction — request that we limit how we process your data', 'Portability — receive your data in a structured, machine-readable format', 'Object — object to processing based on legitimate interests'], contact: 'To exercise any of these rights, email us at inkorami27@gmail.com. We will respond within 30 days.', complaint: 'You also have the right to lodge a complaint with the Bulgarian Commission for Personal Data Protection (CPDP): cpdp.bg.' },
      cookies:      { heading: '8. Cookies', body: 'This website uses only essential cookies necessary for the site to function. We do not use advertising cookies, social media tracking cookies, or third-party analytics cookies without your consent. A cookie consent banner is presented on your first visit where applicable.' },
      children:     { heading: "9. Children's Privacy", body: 'Our services are directed at businesses and adults. We do not knowingly collect personal data from individuals under the age of 16.' },
      changes:      { heading: '10. Changes to This Policy', body: 'We may update this Privacy Policy from time to time. When we do, we will update the "last updated" date at the top of this page. Continued use of the Site after changes constitutes acceptance of the updated policy.' },
      contactSection: { heading: '11. Contact', body: 'For any privacy questions or requests:' },
    },
  },

  // ── 404 ──────────────────────────────────────────────────
  notFound: {
    title:   'PAGE NOT FOUND',
    sub:     "The page you're looking for doesn't exist or has been moved. Let's get you back on track.",
    home:    'Back to home',
    contact: 'Contact us',
    orGoTo:  'Or go to:',
    quickLinks: [
      { to: '/services', label: 'Services' },
      { to: '/#work',    label: 'Our Work' },
      { to: '/#about',   label: 'About'   },
      { to: '/contact',  label: 'Contact' },
      { to: '/privacy',  label: 'Privacy' },
    ],
  },

  // ── Blog ─────────────────────────────────────────────────
  blog: {
    label:          'Insights',
    title:          'BLOG',
    sub:            'Practical thinking on web engineering, digital strategy, and what makes businesses grow online.',
    readMore:       'Read article',
    minRead:        'min read',
    backBlog:       'Back to blog',
    ctaTitle:       'Ready to build something?',
    ctaSub:         "Let's talk about your project. We respond within 24 hours.",
    loading:        'Loading posts…',
    loadingArticle: 'Loading article…',
    empty:          'No articles yet.',
    allPosts:       'All articles',
    articleNotFound:'Article not found.',
  },

  // ── Cookie banner ────────────────────────────────────────
  cookie: {
    text:    'We use essential cookies to keep the site running. No tracking, no advertising.',
    policy:  'Privacy Policy',
    accept:  'Accept',
    decline: 'Decline',
  },

  // ── WhatsApp ─────────────────────────────────────────────
  whatsapp: {
    label:     'Chat on WhatsApp',
    ariaLabel: 'Chat on WhatsApp',
  },

  // ── Timeline ─────────────────────────────────────────────
  timeline: {
    title: 'The Architecture.',
    items: [
      { date: '09/2025 - PRESENT', title: 'Software Developer Training',  subtitle: 'University of Telecommunications and Post, Sofia' },
      { date: '2025 (JAN - DEC)',  title: 'Full JavaScript Track',         subtitle: 'SoftUni. Mastered JS Basics, Fundamentals, Advanced, and JS Applications.' },
      { date: '2019 - PRESENT',   title: 'Freelance Media Production',    subtitle: 'Professional photographer, videographer, and photo editor. Building an elite visual foundation for digital design.' },
      { date: '2020 - 2024',      title: 'Client Relations & QA',         subtitle: 'Roles at Alorica and Webhelp. Managed user content compliance and provided high-level customer support.' },
    ],
  },

  // ── Skills Strip ─────────────────────────────────────────
  skillsStrip: {
    row1: ['Vue.js 3', 'Tailwind CSS', 'JavaScript ES6+', 'MongoDB', 'Responsive Design', 'Git & GitHub', 'CSS Grid', 'Performance Optimization'],
    row2: ['UX Engineering', 'Component Architecture', 'REST APIs', 'Adobe Suite', 'Photography', 'SEO-Ready Markup', 'Dark UI Design', 'Vite Build System'],
  },

  // ── Loader ───────────────────────────────────────────────
  loader: {
    loading: 'Loading…',
  },

  // ── FAQ ──────────────────────────────────────────────────
  faq: {
    label: 'Got questions?',
    title: 'FAQ',
    items: [
      {
        q: 'How long does a website take to build?',
        a: 'A standard business website takes 2–4 weeks from kick-off to launch. A booking system or e-commerce store typically takes 4–8 weeks. Timeline depends on how quickly feedback rounds move — we keep things tight.',
      },
      {
        q: 'Do I need to provide content and images?',
        a: 'Yes — you know your business best. We can advise on structure and copy direction, and we offer photography services if you need visuals. Final text and key assets come from you.',
      },
      {
        q: 'Will I be able to update the site myself?',
        a: 'If you want a CMS (editable content panel), we add one as an add-on. Otherwise the site is developer-maintained — which keeps it fast, clean, and secure. We\'re always available for content updates.',
      },
      {
        q: 'What happens after the site launches?',
        a: 'You get all source files, full ownership, and deployment support. There\'s no retainer required. We\'re available for updates, new features, or a second project whenever you\'re ready.',
      },
      {
        q: 'Do you work with clients outside Bulgaria?',
        a: 'Yes. We work fully remotely and have served clients across the EU. Communication is in English or Bulgarian — your choice. Payments in EUR.',
      },
      {
        q: 'What if I\'m not happy with the result?',
        a: 'Every project includes revision rounds built into the timeline. We don\'t close a project until you\'re satisfied. We scope carefully upfront so expectations are always aligned.',
      },
    ],
    ctaTitle: 'Still have questions?',
    ctaSub:   'We respond to every enquiry personally — usually the same day.',
  },

  // ── Comparison table ─────────────────────────────────────
  comparison: {
    label:    'Why INRAIT?',
    title:    'HOW WE COMPARE',
    sub:      'Not a freelancer who disappears. Not an agency that charges for meetings. Something better.',
    col1:     'INRAIT',
    col2:     'Freelancer',
    col3:     'Agency',
    rows: [
      { feature: 'Custom code',           inrait: true,    freelancer: 'varies', agency: true    },
      { feature: 'Direct communication',  inrait: true,    freelancer: true,     agency: false   },
      { feature: 'Fixed timeline',        inrait: true,    freelancer: 'varies', agency: 'varies'},
      { feature: 'You own everything',    inrait: true,    freelancer: true,     agency: 'varies'},
      { feature: 'Bilingual (EN / BG)',   inrait: true,    freelancer: 'varies', agency: 'varies'},
      { feature: 'Ongoing availability',  inrait: true,    freelancer: 'varies', agency: true    },
      { feature: 'Starting price',        inrait: '€900',  freelancer: '€300',   agency: '€5 000'},
    ],
    yes:    'Yes',
    no:     'No',
    varies: 'Varies',
  },
}