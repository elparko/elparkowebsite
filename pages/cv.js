import Link from 'next/link';
import WritingLayout from '../components/WritingLayout';
import styles from '@/styles/Writing.module.css';

const SECTIONS = [
  {
    heading: 'Now',
    rows: [
      ['2026–', <>Building <Link href="/smile-msi">SMILE-MSI</Link>, an open-source MALDI mass spectrometry imaging analysis tool, with the Garcia Lab at Vanderbilt University Medical Center (VUMC). Used on human facial nerve samples for a facial nerve palsy project.</>],
      ['2026–', <>AI in facial reconstruction and rhinoplasty planning: a four-arm study at the VUMC Department of Otolaryngology on data-driven surgical planning and how interface design affects clinician decisions.</>],
      ['2026–', <>Founder of <Link href="/pereste-health">Pereste Health</Link>, building AI tools that explain health information at the reader's literacy level.</>],
      ['2025–', <><Link href="/crswne-keto-research">Diet and chronic rhinosinusitis with nasal polyps (CRSwNP)</Link> in a mouse model, Rom Lab, LSU Health Shreveport. Also studying the ketogenic diet's effect on the liver in type 2 inflammation.</>],
      ['2026–', <>Tools for myself: a <Link href="/mirror">mirror</Link> display, a <Link href="/voice-assistant">voice assistant</Link>, and <a href="https://github.com/elparko/fa-reader">fa-reader</a>, a Mac app for annotating First Aid.</>],
    ],
  },
  {
    heading: 'Presentations',
    rows: [
      ['2026-10-18', <>&ldquo;Dietary Modulation of Type 2 Inflammation and Olfaction in a Murine Model of CRSwNP.&rdquo; Smith PJ, Chow K, Matabele MN. AAO-HNSF Annual Meeting &amp; OTO EXPO, Los Angeles.</>],
      ['2026-06', <>Same title. Otolaryngology Research Day, LSU Health Shreveport.</>],
      ['2026-02', <>Journal club: &ldquo;Nasal Reconstruction after Mohs Cancer Resection: Lessons Learned from 2553 Consecutive Cases&rdquo; (Thornton et al., 2021). Plastic Surgery Interest Group, LSU Health Shreveport.</>],
      ['2026-02', <>Guest speaker, Swamp Medics, Captain Shreve High School.</>],
    ],
  },
  {
    heading: 'Publications',
    rows: [
      ['2025', <>&ldquo;UHRF1 is critical for tumor-promoting inflammation and tumorigenesis in retinoblastoma.&rdquo; bioRxiv preprint. <a href="https://doi.org/10.1101/2025.03.02.641083">doi:10.1101/2025.03.02.641083</a></>],
      ['2018', <>Third author, <em>Proteomics</em>. <a href="https://doi.org/10.1002/pmic.201800353">doi:10.1002/pmic.201800353</a></>],
    ],
  },
  {
    heading: 'Research and clinical work',
    rows: [
      ['2026–', <>Garcia Lab, VUMC. SMILE-MSI and facial nerve imaging.</>],
      ['2025–', <>Rom Lab, LSU Health Shreveport. Medical student researcher. LSU Health Shreveport's nominee for the AΩA Carolyn L. Kuckein Student Research Fellowship.</>],
      ['2023–2025', <>Dermatology tech, Mohs surgery, Franklin Dermatology Group.</>],
      ['2021–2023', <>Benavente Lab, UC Irvine. Beckman Scholar. UHRF1 in retinoblastoma.</>],
      ['2017–2018', <>Zhao Lab, LSU Health Sciences Center Shreveport. UCP2 in melanoma.</>],
    ],
  },
  {
    heading: 'Leadership and service',
    rows: [
      ['2025–', <>Pre-Med Day Chair, SHIP (Support for Humanitarianism through Intercontinental Projects).</>],
      ['2025–', <>Volunteer tutor, Renzi Center, Shreveport.</>],
      ['2023–2025', <>Volunteer and website maintenance, Beyond Fistula. Worked at the Gynocare Women's and Fistula Hospital, Eldoret, Kenya, September 2023.</>],
      ['2021–2023', <>Founder and president, <a href="https://www.instagram.com/migrainesofuci">The Migraine Club at UCI</a>.</>],
    ],
  },
  {
    heading: 'Education',
    rows: [
      ['2025–', <>MD candidate, LSU Health Shreveport.</>],
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
