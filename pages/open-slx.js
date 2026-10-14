import WritingLayout from '../components/WritingLayout';

export default function OpenSLX() {
  return (
    <WritingLayout>
      <p style={{ marginBottom: '20px', textAlign: 'center', fontSize: '1.1rem' }}>
        open-slx converts SCiLS Lab projects to imzML. It does not need SCiLS
        Lab, its Python API, or a licence key.
      </p>

      <h3>What it does</h3>
      <p>
        Mass spectrometry imaging (MSI) maps the mass spectra of a tissue
        section, spot by spot. SCiLS Lab is the MSI software from Bruker. It
        stores a project in its own files. imzML is the open file format for
        MSI. Many tools read it.
      </p>
      <p>
        open-slx reads a SCiLS Lab project and writes imzML 1.1. It runs on
        macOS. I tested it on Apple silicon. It is pure Python and the licence
        is MIT.
      </p>
      <p>
        The existing exporter,{' '}
        <a
          href="https://github.com/CeMOS-Mannheim/slx2imzml"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#000000', textDecoration: 'underline' }}
        >
          slx2imzml
        </a>{' '}
        from CeMOS, needs the SCiLS Lab Python API and a licence. open-slx
        needs neither.
      </p>

      <h3>The two input files</h3>
      <p>A SCiLS Lab project has two files. open-slx needs both.</p>
      <ul>
        <li><code>PROJECT.slx</code>: project metadata. No spectra.</li>
        <li><code>PROJECT.sbd</code>: the spectra and the spot positions.</li>
      </ul>
      <p>
        The two files must have the same base name and sit in the same folder.
        The <code>.sbd</code> file is often several gigabytes. A common mistake
        is to copy only the <code>.slx</code> file.
      </p>

      <h3>How it works</h3>
      <p>
        The <code>.slx</code> file is an SQLite database. It holds the feature
        lists, the region tree, and the project settings.
      </p>
      <p>
        The <code>.sbd</code> file is an HDF5 file (Hierarchical Data Format
        5). It holds the intensities of each spot as numbers.
      </p>
      <p>
        For the m/z values, SCiLS Lab does not store each value. It stores the
        gap between one peak and the next. It compresses the gaps with zstd and
        splits them into byte planes. A 17-byte trailer holds a scale of
        500000 and the first m/z. open-slx decodes the gaps and adds them up to
        get the m/z of each peak.
      </p>
      <p>
        I decoded the format from public data. open-slx only reads your files.
        It never writes to them.
      </p>

      <h3>What is verified</h3>
      <ul>
        <li>
          I converted 300 spots of the public Zenodo 21251439 dataset, which
          SCiLS Lab 14 wrote. I did it on a Mac.
        </li>
        <li>pyimzML reads the output.</li>
        <li>
          For each spot, the sum of the intensities matches the Total Ion Count
          that SCiLS Lab stored, within 1e-4.
        </li>
      </ul>

      <h3>What is not verified</h3>
      <ul>
        <li>A full-size conversion.</li>
        <li>Projects from timsTOF data that SCiLS Lab resampled.</li>
        <li>
          Opening the output in M2aia, Cardinal, or METASPACE. The files follow
          imzML 1.1, so they must open, but I did not test it.
        </li>
      </ul>

      <h3>Install and run</h3>
      <pre style={{ overflowX: 'auto', textAlign: 'left', lineHeight: '1.5' }}>
        <code>
          {`uv tool install git+https://github.com/elparko/open-slx
open-slx PROJECT.slx -o OUT`}
        </code>
      </pre>
      <p>
        This writes <code>OUT.imzML</code> and <code>OUT.ibd</code>. It also
        writes a feature list and a metadata file.
      </p>

      <h3>Credits</h3>
      <ul>
        <li>
          <a
            href="https://github.com/CeMOS-Mannheim/slx2imzml"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#000000', textDecoration: 'underline' }}
          >
            slx2imzml
          </a>{' '}
          by CeMOS (Mannheim University of Applied Sciences). I used it as the
          reference for what an export contains. open-slx has no code from it.
        </li>
        <li>
          Test data: Zenodo record 21251439, licence CC BY 4.0. The project is
          RomicsProcessor from PNNL (Pacific Northwest National Laboratory).
        </li>
      </ul>
      <p>
        open-slx is not affiliated with Bruker. SCiLS is a trademark of Bruker.
      </p>
      <p>
        It pairs with <a href="/smile-msi" style={{ color: '#000000', textDecoration: 'underline' }}>SMILE-MSI</a>,
        which reads imzML.
      </p>

      <p style={{ marginTop: '30px', textAlign: 'center', fontSize: '0.9rem' }}>
        <a
          href="https://github.com/elparko/open-slx"
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
