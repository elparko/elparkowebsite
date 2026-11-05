import WritingLayout from '../components/WritingLayout';

export default function AboutThisSite() {
  return (
    <WritingLayout>
      <h3>How the pages are written</h3>
      <p style={{marginBottom: '20px'}}>
        I write here about my research, the tools I build, and things I make. Most pages are drafted with AI models from my
        notes, code, data, and dictation, and most keep a dated log of what changed.
      </p>
      <h3>The search on the home page</h3>
      <p style={{marginBottom: '20px'}}>
        The search runs in your browser. It matches your question to the pages here and to answers written in advance, and it
        never writes new text. Nothing you type leaves the page.
      </p>
    </WritingLayout>
  );
}
