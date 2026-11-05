import WritingLayout from '../components/WritingLayout';

export default function ArtFeature() {
  return (
    <WritingLayout>
      <div style={{textAlign: 'center', backgroundColor: 'var(--soft)', padding: '20px', borderRadius: '10px', marginBottom: '30px'}}>
        <p style={{margin: 0}}>Featured in the inaugural issue of Hippocratic Collective's magazine Ex Vivo.</p>
      </div>

      {/* Large artwork image */}
      <div style={{textAlign: 'center', marginBottom: '40px'}}>
        <img
          src="/mohs map.jpeg"
          alt="Mohs Map artwork"
          style={{
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
          }}
        />
      </div>

      {/* Magazine link */}
      <div style={{textAlign: 'center', marginTop: '40px'}}>
        <a
          href="https://www.hippocratic-collective.com/ex-vivo/2025"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '12px 30px',
            backgroundColor: 'color-mix(in srgb, var(--fg) 80%, transparent)',
            color: 'var(--bg)',
            textDecoration: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--fg)'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'color-mix(in srgb, var(--fg) 80%, transparent)'}
        >
          View Ex Vivo Magazine →
        </a>
      </div>
    </WritingLayout>
  );
}
