export const SITE_URL = 'https://www.elparko.com';
export const X_HANDLE = '@parker5smith';

export const HOME = {
  slug: 'home',
  title: 'Parker Smith',
  description: 'Medical student who likes to build things.',
};

export const AREAS = {
  research: 'Research',
  'ai-code': 'AI and code',
  builds: 'Builds',
  writing: 'Writing',
  site: 'Site',
};

export const AUTHORSHIP = {
  human: { label: 'Parker' },
  'ai-edited': {
    label: 'AI edited',
    detail: 'I wrote it. A model edited the wording.',
  },
  'ai-drafted': {
    label: 'AI drafted',
    detail: 'A model drafted it from my notes, code, or dictation.',
  },
};

export function byline(page) {
  if (page.authorship === 'ai-drafted') return `by ${page.model} · AI drafted`;
  if (page.authorship === 'ai-edited') return `by Parker · AI edited with ${page.model}`;
  return 'by Parker';
}

export const PAGES = [
  {
    slug: 'smile-msi',
    title: 'SMILE-MSI',
    description: 'Open-source, fully-local desktop tool that turns raw mass spectrometry imaging data into annotated maps of tissue lipids.',
    icon: 'fa-microscope',
    area: 'ai-code',
    status: 'in-progress',
    authorship: 'ai-drafted',
    model: 'Claude Opus 4.8',
    created: '2026-06-10',
    updated: '2026-10-03',
    related: ['pereste-health'],
    log: [
      { date: '2026-06-10', text: 'First commit, as a script that matches masses to lipids.' },
      { date: '2026-06-14', text: 'Grew into a full desktop workspace for imaging analysis.' },
      { date: '2026-06-16', text: 'Windows packaging and automatic GitHub releases.' },
      { date: '2026-06-18', text: 'v1.0.0. Relicensed under Apache-2.0.' },
      { date: '2026-06-21', text: 'Drafted a paper for the Journal of Open Source Software.' },
      { date: '2026-07-10', text: 'v2.0.0: one linear workflow from raw file to report.' },
      { date: '2026-07-14', text: 'First public release on GitHub.' },
    ],
  },
  {
    slug: 'pereste-health',
    title: 'Pereste Health',
    description: 'A venture bringing AI to healthcare, focused on health literacy.',
    icon: 'fa-comment-medical',
    area: 'ai-code',
    status: 'in-progress',
    authorship: 'ai-drafted',
    model: 'Claude Opus 4.8',
    created: '2026-03',
    updated: '2026-10-03',
    related: ['smile-msi'],
    log: [
      { date: '2026-03', text: 'Founded Pereste Health.' },
      { date: '2026-04-18', text: 'First code: a patient literacy system grounded in a medical knowledge base.' },
      { date: '2026-05', text: 'Started the website and the iOS app.' },
      { date: '2026-06', text: 'Designed a guardrail against AI-generated medical advice and started training a safety model for it. Started the Android app and an app for clinician oversight.' },
    ],
  },
  {
    slug: 'crswne-keto-research',
    title: 'CRSwNP & Keto Research',
    description: 'Whether a ketogenic diet reduces inflammation in chronic rhinosinusitis with nasal polyps, in a mouse model.',
    icon: 'fa-flask',
    area: 'research',
    status: 'in-progress',
    authorship: 'ai-drafted',
    model: 'Claude Sonnet 4.5',
    created: '2025-11',
    updated: '2026-10-03',
    related: [],
    log: [
      { date: '2025-11', text: 'Joined the Rom Lab at LSU Health Shreveport.' },
      { date: '2026-01', text: 'Applied for the AΩA Carolyn L. Kuckein Student Research Fellowship as LSU Health Shreveport\'s nominee.' },
      { date: '2026-05', text: 'Named an AΩA Carolyn L. Kuckein Research Fellow.' },
      { date: '2026-03', text: 'Smell testing with a buried food pellet test.' },
      { date: '2026-06', text: 'Olfactory marker protein staining, and a tool to measure olfactory layer thickness.' },
      { date: '2026-06', text: 'Presented at Otolaryngology Research Day, LSU Health Shreveport.' },
      { date: '2026-09', text: 'H&E histology and a blinded scoring tool.' },
      { date: '2026-10-18', text: 'Oral presentation at the AAO-HNSF Annual Meeting.' },
    ],
  },
  {
    slug: 'learning-at-the-edge',
    title: 'Learning at the Edge of Knowledge',
    description: 'Cholinergic receptor history, Penrose and Orch-OR, and what we need to know to find out what we don\'t.',
    icon: 'fa-lightbulb',
    area: 'writing',
    status: 'finished',
    authorship: 'human',
    created: '2025-10-09',
    updated: '2025-10-09',
    related: [],
    log: [
      { date: '2025-10-09', text: 'Published.' },
    ],
  },
  {
    slug: 'sauna-build',
    title: 'Sauna Build',
    description: 'A sauna built by hand. Not pretty, but hot.',
    image: '/sauna-inside.jpeg',
    icon: 'fa-fire',
    area: 'builds',
    status: 'finished',
    authorship: 'human',
    created: '2026-01',
    updated: '2026-10-03',
    related: [],
    log: [
      { date: '2026-01', text: 'Built it.' },
      { date: '2026-10-03', text: 'Added build photos.' },
    ],
  },
  {
    slug: 'art-feature',
    title: 'Mohs Map',
    description: 'Artwork featured in the inaugural issue of the Hippocratic Collective magazine Ex Vivo.',
    image: '/mohs map.jpeg',
    icon: 'fa-palette',
    area: 'builds',
    status: 'finished',
    authorship: 'ai-drafted',
    model: 'Claude Sonnet 4.5',
    created: '2024',
    updated: '2026-10-03',
    related: [],
    log: [
      { date: '2025', text: 'Featured in the inaugural issue of Ex Vivo.' },
    ],
  },
  {
    slug: 'mirror',
    title: 'Mirror',
    description: 'A used fitness mirror rebuilt with a Raspberry Pi as a display for the house: time, sleep plan, calendar, weather.',
    image: '/mirror-display.jpeg',
    icon: 'fa-display',
    area: 'builds',
    status: 'in-progress',
    authorship: 'ai-drafted',
    model: 'Claude Opus 5.5',
    created: '2026-08-30',
    updated: '2026-10-03',
    related: ['voice-assistant'],
    log: [
      { date: '2026-08-30', text: 'Planned the conversion and ordered parts.' },
      { date: '2026-09-03', text: 'Wrote the software: on/off rules, the mirror page, phone controls, Pi setup, first animated backgrounds.' },
      { date: '2026-09-04', text: 'The unit arrived. It was a 2019 Model One with a 40-inch panel, not the unit I planned for.' },
      { date: '2026-09-13', text: 'Hung it portrait. Ruled out a mic and camera. Added a smart plug for mains power and ten more backgrounds.' },
      { date: '2026-09-15', text: 'The Pi can now switch the lamps directly over its own radio.' },
      { date: '2026-10-03', text: 'Added photos.' },
    ],
  },
  {
    slug: 'voice-assistant',
    title: 'Voice Assistant',
    description: 'A voice assistant for my house on my own server: custom wake word, local speech to text, and a classifier trained on the house.',
    image: '/elparko-icon.png',
    icon: 'fa-microphone',
    area: 'ai-code',
    status: 'in-progress',
    authorship: 'ai-drafted',
    model: 'Claude Opus 5.5',
    created: '2026-08-22',
    updated: '2026-10-03',
    related: ['mirror'],
    log: [
      { date: '2026-08-22', text: 'Hold-to-talk voice commands in the phone app, answered by Claude Haiku.' },
      { date: '2026-08-24', text: 'Added Siri phrases.' },
      { date: '2026-08-28', text: 'The Voice PE talks to my server directly, without Home Assistant.' },
      { date: '2026-08-29', text: 'Trained the first custom wake word on a rented GPU for $0.70.' },
      { date: '2026-08-30', text: 'Switched back to the stock wake word because it misfired less in the room.' },
      { date: '2026-08-31', text: 'Wake sensitivity tightens when I am in bed.' },
      { date: '2026-09-08', text: 'Moved speech to text to a larger Whisper model on the M2 Max.' },
      { date: '2026-09-23', text: 'Replaced the local language model with a classifier trained on the house\'s own commands.' },
    ],
  },
  {
    slug: 'tools',
    title: 'Tools I Built for Myself',
    description: 'A running list of software and automations I built for my own use: fa-reader, a writing program, a thermostat cost saver, and more.',
    image: '/elparko-icon.png',
    icon: 'fa-toolbox',
    area: 'ai-code',
    status: 'in-progress',
    authorship: 'ai-drafted',
    model: 'Claude Opus 5.5',
    created: '2026-10-03',
    updated: '2026-10-03',
    related: ['mirror', 'voice-assistant'],
    log: [
      { date: '2026-08-26', text: 'Thermostat cost saver.' },
      { date: '2026-09-29', text: 'fa-reader: first working version, built in a day.' },
      { date: '2026-10-02', text: 'Mac menu bar app for lights, alarm, and thermostats.' },
      { date: '2026-10-03', text: 'Started the writing program. fa-reader gained undo and redo, word snapping, and better search ranking.' },
    ],
  },
  {
    slug: 'cv',
    title: 'CV',
    description: 'Ongoing work, presentations, publications, and positions.',
    icon: 'fa-file-lines',
    area: 'site',
    status: 'in-progress',
    authorship: 'ai-drafted',
    model: 'Claude Opus 5.5',
    created: '2026-10-03',
    updated: '2026-10-03',
    related: [],
  },
  {
    slug: 'about-this-site',
    title: 'About This Site',
    description: 'What the AI edited and AI drafted bylines mean.',
    icon: 'fa-circle-info',
    area: 'site',
    status: 'in-progress',
    authorship: 'ai-drafted',
    model: 'Claude Opus 5.5',
    created: '2026-10-03',
    updated: '2026-10-03',
    related: [],
  },
];

export const EXTERNAL = [
  {
    title: 'MohsWoundCare',
    href: 'https://mohswoundcare.com',
    description: 'A guide to wound care and recovery after Mohs surgery.',
    icon: 'fa-user-doctor',
    area: 'builds',
  },
];

export const pageBySlug = Object.fromEntries(PAGES.map((p) => [p.slug, p]));

export function slugFromHref(href) {
  if (!href || !href.startsWith('/')) return null;
  const slug = href.split(/[?#]/)[0].replace(/^\/|\/$/g, '');
  return pageBySlug[slug] ? slug : null;
}
