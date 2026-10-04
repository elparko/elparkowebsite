import Link from 'next/link';
import WritingLayout from '../components/WritingLayout';
import styles from '@/styles/Writing.module.css';

const SECTIONS = [
  {
    heading: 'Now',
    rows: [
      ['2026–', <>Building <Link href="/smile-msi">SMILE-MSI</Link>, an open-source visual analysis tool for MALDI mass spectrometry imaging, with the Garcia Lab at Vanderbilt University Medical Center (VUMC). Validated against a parallel SCiLS Lab analysis. Used in a facial nerve palsy project on human nerve samples collected across institutions.</>],
      ['2026–', <>AI in facial reconstruction and rhinoplasty planning, VUMC Department of Otolaryngology: whether data can augment surgical planning.</>],
      ['2026–', <>Discharge disposition after free flap reconstruction for head and neck cancer, using Epic Cosmos data.</>],
      ['2026–', <>&ldquo;What Survivors Find Online&rdquo;: the readability, quality, and sources of web information on late effects of head and neck cancer.</>],
      ['2025–', <><Link href="/crswne-keto-research">Diet and chronic rhinosinusitis</Link> in a mouse model, Rom Lab, LSU Health Shreveport. AΩA Carolyn L. Kuckein Research Fellow.</>],
      ['2026–', <>Founder of <Link href="/pereste-health">Pereste Health</Link>, building AI tools that explain health information at the reader's literacy level.</>],
      ['2026–', <><Link href="/tools">Tools for myself</Link>: a <Link href="/mirror">mirror</Link> display, a <Link href="/voice-assistant">voice assistant</Link>, and <a href="https://github.com/elparko/fa-reader">fa-reader</a>, a Mac app for annotating First Aid.</>],
    ],
  },
  {
    heading: 'Presentations and awards',
    rows: [
      ['2026-10', <>Oral presentation, AAO-HNSF Annual Meeting: &ldquo;Dietary Metabolites Regulate NLRP3 Inflammasome Activation and Disease Severity in a Mouse Model of Chronic Rhinosinusitis.&rdquo;</>],
      ['2026-09', <>First place, Epic Cosmos Datathon, LSU Health Shreveport: &ldquo;Social and Clinical Determinants of Discharge Disposition After Free Flap Reconstruction for Head and Neck Cancer.&rdquo;</>],
      ['2026-06', <>Otolaryngology Research Day, LSU Health Shreveport: &ldquo;Dietary Modulation of Type 2 Inflammation and Olfaction in a Murine Model of CRSwNP.&rdquo;</>],
      ['2026-02', <>Journal club, Plastic Surgery Interest Group: &ldquo;Nasal Reconstruction after Mohs Cancer Resection: Lessons Learned from 2553 Consecutive Cases&rdquo; (Thornton et al., 2021).</>],
      ['2026-02', <>Guest speaker, Swamp Medics, Captain Shreve High School.</>],
    ],
  },
  {
    heading: 'Publications',
    rows: [
      ['2026', <>&ldquo;Mapping the Neuromuscular Junctions of the Gracilis Free Flap.&rdquo; Little CC, Dorjsuren N, Smith P, Brown M, Abbas S, Rossi-Meyer M, Patel PN, Yang SF, Stephan SJ, Brown B, Garcia JA. Under review.</>],
      ['2025', <>&ldquo;UHRF1 is critical for tumor-promoting inflammation and tumorigenesis in retinoblastoma.&rdquo; bioRxiv preprint. <a href="https://doi.org/10.1101/2025.03.02.641083">doi:10.1101/2025.03.02.641083</a></>],
      ['2018', <>Third author, <em>Proteomics</em>. <a href="https://doi.org/10.1002/pmic.201800353">doi:10.1002/pmic.201800353</a></>],
    ],
  },
  {
    heading: 'Past work',
    rows: [
      ['2023–2025', <>Dermatology tech, Mohs surgery, Franklin Dermatology Group.</>],
      ['2021–2023', <>Beckman Scholar, Benavente Lab, UC Irvine.</>],
      ['2017–2018', <>Research assistant, Zhao Lab, LSU Health Sciences Center Shreveport.</>],
    ],
  },
  {
    heading: 'Leadership and service',
    rows: [
      ['2025–', <>Pre-Med Day Chair, SHIP (Support for Humanitarianism through Intercontinental Projects).</>],
      ['2025–', <>Volunteer tutor, Renzi Center.</>],
      ['2023–2025', <>Volunteer and website maintenance, Beyond Fistula.</>],
      ['2021–2023', <>Founder and president, <a href="https://www.instagram.com/migrainesofuci">The Migraine Club at UCI</a>.</>],
    ],
  },
  {
    heading: 'Education',
    rows: [
      ['2025–', <>LSU Health Shreveport, MD, class of 2029.</>],
      ['2023', <>BS, Biological Sciences, University of California, Irvine.</>],
      ['2019–2021', <>Moorpark College.</>],
      ['2018–2019', <>University of Michigan.</>],
    ],
  },
];

export default function CV() {
  return (
    <WritingLayout>
      {SECTIONS.map(({ heading, rows }) => (
        <div key={heading} style={{marginBottom: '2rem', textAlign: 'left'}}>
          <h3 style={{marginBottom: '0.75rem'}}>{heading}</h3>
          {rows.map(([date, text], i) => (
            <div key={i} className={styles.logEntry}>
              <span className={styles.logDate}>{date}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      ))}
    </WritingLayout>
  );
}
