import WritingLayout from '../components/WritingLayout';

export default function PeresteParse() {
  return (
    <WritingLayout title="PeresteParse" date="02/2026">
      <p style={{ marginBottom: '20px', textAlign: 'center', fontSize: '1.1rem' }}>
        A privacy-focused macOS study application that transforms voice recordings
        into Anki flashcards using locally-run large language models.
      </p>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <a
          href="https://github.com/elparko/PeresteParse/releases/latest"
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
          Download Latest Version for macOS
        </a>
      </div>

      <h3>Overview</h3>
      <p>
        PeresteParse combines voice recording, speech-to-text transcription, and LLM-powered
        parsing to streamline the creation of study flashcards. All processing happens locally
        on your device, ensuring complete privacy of your study materials.
      </p>

      <h3>Key Features</h3>
      <ul>
        <li>Voice recording with Parakeet MLX speech-to-text transcription</li>
        <li>LLM-powered flashcard generation (Claude API or local Qwen3-4B)</li>
        <li>Export to Anki (.apkg) or CSV formats</li>
        <li>Session tracking and statistics</li>
        <li>Local data storage for complete privacy</li>
        <li>Automatic recording duration tracking</li>
      </ul>

      <h3>System Requirements</h3>
      <ul>
        <li>macOS 11.0 or later</li>
        <li>4GB+ RAM (8GB+ recommended for local LLM)</li>
        <li>5GB available storage</li>
      </ul>

      <h3>Technical Details</h3>
      <p>
        Built with SwiftUI for a native macOS experience, PeresteParse leverages state-of-the-art
        machine learning models for speech recognition and natural language processing. The app
        supports both cloud-based (Claude API) and fully local (Qwen3-4B) LLM processing, giving
        you flexibility based on your privacy preferences and internet connectivity.
      </p>

      <p style={{ marginTop: '30px', textAlign: 'center', fontSize: '0.9rem' }}>
        <a
          href="https://github.com/elparko/PeresteParse"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#000000', textDecoration: 'underline' }}
        >
          View source code on GitHub
        </a>
      </p>
    </WritingLayout>
  );
}
