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
        The search runs in your browser. It matches your question to the pages here and to answers I wrote in advance.
        Typing in the search bar only narrows the list of pages, and that text stays on your device.
      </p>
      <h3>Parker-bot</h3>
      <p style={{marginBottom: '20px'}}>
        When you send a question and no written answer matches, a small AI model also replies, labelled Parker-bot. It is
        an impression of me built from an interview and from these pages. It does not represent me and it can be wrong.
        To get that reply, your question is sent to a model that runs on Cloudflare. This site does not store it.
      </p>
    </WritingLayout>
  );
}
