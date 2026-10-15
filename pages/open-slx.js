import WritingLayout from '../components/WritingLayout';

const linkStyle = { color: '#000000', textDecoration: 'underline' };
const listStyle = { marginTop: '12px', marginBottom: '24px', marginLeft: '20px', lineHeight: '1.6' };
const itemStyle = { marginBottom: '0.6em' };
const codeBlockStyle = {
  overflowX: 'auto',
  whiteSpace: 'pre-wrap',
  overflowWrap: 'anywhere',
  textAlign: 'left',
  lineHeight: '1.5',
  margin: '12px 0 20px',
  padding: '10px 12px',
  background: '#f4f4f4',
  borderRadius: '4px',
};
const headingStyle = { marginTop: '1.8em', marginBottom: '0.5em' };

function Link({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={linkStyle}>
      {children}
    </a>
  );
}

export default function OpenSLX() {
  return (
    <WritingLayout>
      <p style={{ marginBottom: '20px', textAlign: 'center', fontSize: '1.1rem' }}>
        Other tools cannot open SCiLS Lab projects. open-slx turns them into
        imzML, the open format that other mass spectrometry imaging tools read.
        It needs no SCiLS Lab and no licence key.
      </p>

      <h3 style={headingStyle}>What it does</h3>
      <p>
        Mass spectrometry imaging (MSI) maps the mass spectra of a tissue
        section, spot by spot.
      </p>
      <p>
        Other tools cannot open SCiLS Lab projects.
        I wanted to use my data in other tools.
        So I wrote open-slx.
      </p>
      <p>
        The .slx file holds the project settings.
        The .sbd file holds the spectra.
        open-slx reads both directly.
        It never changes your files.
        The format details are in the{' '}
        <Link href="https://github.com/elparko/open-slx/tree/main/docs">repo docs</Link>.
      </p>

      <h3 style={headingStyle}>What you need</h3>
      <p>Two files from your SCiLS Lab project, in one folder:</p>
      <ul style={listStyle}>
        <li style={itemStyle}><code>PROJECT.slx</code></li>
        <li style={itemStyle}><code>PROJECT.sbd</code></li>
      </ul>
      <p>
        The .sbd file is often several gigabytes.
        Do not copy only the .slx file.
        You do not need the original Bruker .d folder.
      </p>

      <h3 style={headingStyle}>How to run it</h3>
      <p>
        Install it with <Link href="https://docs.astral.sh/uv/">uv</Link>, a Python installer:
      </p>
      <pre style={codeBlockStyle}>
        <code>uv tool install git+https://github.com/elparko/open-slx</code>
      </pre>
      <p>Then convert a project:</p>
      <pre style={codeBlockStyle}>
        <code>open-slx PROJECT.slx -o OUT</code>
      </pre>

      <h3 style={headingStyle}>What you get</h3>
      <ul style={listStyle}>
        <li style={itemStyle}>
          <code>OUT.imzML</code> and <code>OUT.ibd</code>.
          Keep these two files together.
          Other tools need both.
        </li>
        <li style={itemStyle}>
          If the project has more than one raster, you get one pair for each:
          {' '}<code>OUT_r00</code>, <code>OUT_r01</code>, and so on.
          A raster is one scanned area of tissue.
        </li>
        <li style={itemStyle}>
          <code>OUT_features.csv</code>: the feature list from the project.
        </li>
        <li style={itemStyle}>
          <code>OUT_metadata.json</code>: the project metadata.
        </li>
      </ul>

      <h3 style={headingStyle}>What is tested and what is not</h3>
      <p>Tested:</p>
      <ul style={listStyle}>
        <li style={itemStyle}>
          macOS on Apple silicon.
        </li>
        <li style={itemStyle}>
          300 spots of a public SCiLS Lab 14 dataset (Zenodo 21251439).
          pyimzML, a Python imzML reader, opens the output.
        </li>
        <li style={itemStyle}>
          An automated test converts 200 spots.
          The total ion count of each spot matches the value SCiLS stored,
          within 0.01 percent.
        </li>
      </ul>
      <p>Not tested:</p>
      <ul style={listStyle}>
        <li style={itemStyle}>A full-size conversion.</li>
        <li style={itemStyle}>Resampled timsTOF projects.</li>
        <li style={itemStyle}>
          M2aia, Cardinal, and METASPACE.
          They are expected to open the files. I have not tested them.
        </li>
        <li style={itemStyle}>Linux and Windows.</li>
      </ul>
      <p>
        open-slx reads SCiLS Lab 14 files with centroid data only.
        For other files, it stops with an error and writes no imzML file.
      </p>

      <h3 style={headingStyle}>Credits</h3>
      <ul style={listStyle}>
        <li style={itemStyle}>
          <Link href="https://github.com/CeMOS-Mannheim/slx2imzml">slx2imzml</Link>{' '}
          from CeMOS (Center for Mass Spectrometry and Optical Spectroscopy,
          Mannheim University of Applied Sciences) does the same
          job through the SCiLS Lab Python application programming interface (API).
          I used it to learn what an export contains.
          open-slx has no code from it.
        </li>
        <li style={itemStyle}>
          The test data is Zenodo record 21251439 (CC BY 4.0).
          It comes from the RomicsProcessor project of PNNL (Pacific Northwest
          National Laboratory).
        </li>
      </ul>
      <p>
        open-slx is not affiliated with Bruker.
        Bruker does not endorse it.
        SCiLS is a trademark of Bruker.
      </p>

      <p style={{ marginTop: '30px', textAlign: 'center', fontSize: '0.9rem' }}>
        <Link href="https://github.com/elparko/open-slx">View source code on GitHub</Link>
      </p>
    </WritingLayout>
  );
}
