import WritingLayout from '../components/WritingLayout';

const PHOTOS = [
  { src: '/sauna-framing.jpeg', alt: 'Sauna wall frames laid out on a shop floor' },
  { src: '/Sauna1.jpeg', alt: 'Cedar-paneled sauna walls going up' },
  { src: '/sauna2.jpeg', alt: 'Sauna exterior with the door off' },
  { src: '/sauna-inside.jpeg', alt: 'Inside the finished sauna under red light' },
  { src: '/sauna3.jpeg', alt: 'Finished sauna from outside', wide: true },
];

export default function SaunaBuild() {
  return (
    <WritingLayout>
      <p style={{marginBottom: '30px', textAlign: 'center'}}>
        Built a sauna by hand. It's not pretty, but it's hot.
      </p>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '15px', maxWidth: '520px', margin: '20px auto 0'}}>
        {PHOTOS.map(({ src, alt, wide }) => (
          <img
            key={src}
            src={src}
            alt={alt}
            style={{
              gridColumn: wide ? 'span 2' : 'auto',
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
            }}
          />
        ))}
      </div>
    </WritingLayout>
  );
}
