import WritingLayout from '../components/WritingLayout';

export default function PeresteHealth() {
  return (
    <WritingLayout title="Pereste Health" date="07/2026">
      <p style={{ marginBottom: '20px', textAlign: 'center', fontSize: '1.1rem' }}>
        A venture bringing AI to healthcare, focused on health literacy and
        helping patients understand their own care.
      </p>

      <p style={{ textAlign: 'center' }}>
        More at pereste.com.
      </p>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <a
          href="https://www.pereste.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#000000',
            color: '#f5f5dc',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#f5f5dc';
            e.target.style.color = '#000000';
            e.target.style.border = '2px solid #000000';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#000000';
            e.target.style.color = '#f5f5dc';
            e.target.style.border = 'none';
          }}
        >
          Visit pereste.com
        </a>
      </div>
    </WritingLayout>
  );
}
