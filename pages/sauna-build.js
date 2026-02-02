import WritingLayout from '../components/WritingLayout';

export default function SaunaBuild() {
  return (
    <WritingLayout title="Sauna Build" date="01/2026-01/2026">
      <p style={{marginBottom: '30px', textAlign: 'center'}}>
        Built a sauna by hand. It's not pretty, but it's hot.
      </p>

      {/* Sauna photos */}
      <div style={{display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center', marginTop: '20px'}}>
        {/* Top row - portrait photos side by side */}
        <div style={{display: 'flex', gap: '15px', justifyContent: 'center'}}>
          <img
            src="/sauna1.jpeg"
            alt="Sauna build photo 1"
            style={{
              maxWidth: '200px',
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
              objectFit: 'contain'
            }}
          />
          <img
            src="/sauna2.jpeg"
            alt="Sauna build photo 2"
            style={{
              maxWidth: '200px',
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
              objectFit: 'contain'
            }}
          />
        </div>
        {/* Bottom row - landscape photo centered */}
        <img
          src="/sauna3.jpeg"
          alt="Sauna build photo 3"
          style={{
            maxWidth: '400px',
            height: 'auto',
            borderRadius: '8px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
            objectFit: 'contain'
          }}
        />
      </div>
    </WritingLayout>
  );
}
