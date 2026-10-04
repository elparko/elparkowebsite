import WritingLayout from '../components/WritingLayout';
import styles from '@/styles/Writing.module.css';

const READ = [
  { year: 2025, books: [
    { title: 'Fourth Wing', author: 'Rebecca Yarros' },
    { title: 'Iron Flame', author: 'Rebecca Yarros' },
    { title: 'Onyx Storm', author: 'Rebecca Yarros' },
    { title: 'The Name of the Wind', author: 'Patrick Rothfuss' },
    { title: 'The Wise Man\'s Fear', author: 'Patrick Rothfuss' },
    { title: 'The House of Cross', author: 'James Patterson' },
    { title: 'The Plague', author: 'Albert Camus' },
    { title: 'The Final Empire', author: 'Brandon Sanderson' },
    { title: 'The Well of Ascension', author: 'Brandon Sanderson' },
    { title: 'The Hero of Ages', author: 'Brandon Sanderson' },
  ] },
  { year: 2026, books: [
    { title: 'Tress of the Emerald Sea', author: 'Brandon Sanderson' },
    { title: 'Piranesi', author: 'Susanna Clarke' },
    { title: 'The Way of Kings', author: 'Brandon Sanderson' },
    { title: 'Words of Radiance', author: 'Brandon Sanderson' },
    { title: 'Oathbringer', author: 'Brandon Sanderson' },
    { title: 'Rhythm of War', author: 'Brandon Sanderson' },
    { title: 'The Last Unicorn', author: 'Peter S. Beagle', note: 'Whimsical and fun. I can\'t believe I hadn\'t heard of it before.' },
    { title: 'Klara and the Sun', author: 'Kazuo Ishiguro', note: 'Beautiful and profound. I think they\'re going to butcher the movie.' },
    { title: 'To Be Taught, If Fortunate', author: 'Becky Chambers', note: 'Existential and interstellar. Pretty sad, and I really enjoy melancholy books.' },
  ] },
];

const READING = [
  { title: 'A Psalm for the Wild-Built', author: 'Becky Chambers' },
  { title: 'The Technological Republic', author: 'Alexander C. Karp and Nicholas W. Zamiska' },
];

const NEXT = [
  { title: 'A Prayer for the Crown-Shy', author: 'Becky Chambers', note: 'The sequel to A Psalm for the Wild-Built.' },
];

function Book({ b }) {
  return (
    <div className={styles.book}>
      <h4>{b.title}</h4>
      <p className={styles.bookMeta}>{b.author}</p>
      {b.note && <p>{b.note}</p>}
    </div>
  );
}

export default function Books() {
  return (
    <WritingLayout>
      <p style={{marginBottom: '30px', textAlign: 'center', fontSize: '1.1rem'}}>
        Books I've read, oldest first, with a few notes on some of them.
      </p>

      {READ.map(({ year, books }) => (
        <div key={year}>
          <h3 className={styles.bookHeading}>{year}</h3>
          {books.map((b) => <Book key={b.title} b={b} />)}
        </div>
      ))}

      <h3 className={styles.bookHeading}>Reading now</h3>
      {READING.map((b) => <Book key={b.title} b={b} />)}

      <h3 className={styles.bookHeading}>Up next</h3>
      {NEXT.map((b) => <Book key={b.title} b={b} />)}
    </WritingLayout>
  );
}
