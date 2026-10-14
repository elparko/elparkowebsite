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
        section, spot by spot. imzML is the open file format for MSI. Many
        tools read it.
      </p>
      <p>
        open-slx reads a SCiLS Lab project and writes imzML 1.1. It is pure
        Python and the licence is MIT. I tested it on macOS (Apple silicon).
        I did not test it on Linux or Windows.
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
        from CeMOS (Center for Mass Spectrometry and Optical Spectroscopy,
        Mannheim University of Applied Sciences), exports through the proprietary SCiLS Lab Python API.
        open-slx needs no SCiLS Lab installation, no SCiLS Python API, and no
        licence key.
      </p>

      <h3>The two input files</h3>
      <p>A SCiLS Lab project has two files. open-slx needs both.</p>
      <ul>
        <li>
          <code>PROJECT.slx</code>: project metadata. It holds no spectra, no
          intensities, and no spot coordinates.
        </li>
        <li>
          <code>PROJECT.sbd</code>: the spectra and the spot coordinates.
        </li>
      </ul>
      <p>
        The <code>.sbd</code> file normally has the same base name as the{' '}
        <code>.slx</code> file and sits in the same folder. It is usually
        several gigabytes. A common mistake is to copy only the{' '}
        <code>.slx</code> file. The original Bruker <code>.d</code> folder is
        not necessary.
      </p>

      <h3>How it works</h3>
      <p>
        The <code>.slx</code> file is an SQLite database. open-slx reads the
        feature lists, the region tree, and the project settings from it.
      </p>
      <p>
        The <code>.sbd</code> file is an HDF5 file (Hierarchical Data Format
        5). For each spot, it stores the intensities as float32 values.
      </p>
      <p>
        For the m/z values, the file stores the gaps between neighbouring
        peaks. It compresses the gaps with Zstandard (zstd). open-slx decodes the gaps and
        adds them to get the m/z values.
      </p>
      <p>
        I decoded the format from public data. open-slx only reads your files.
        It never writes to them.
      </p>

      <h3>What is verified</h3>
      <ul>
        <li>
          Test data: the Zenodo 21251439 <code>.sbd</code> file. SCiLS Lab
          14.00.17781 wrote it. It has 283631 spots and centroid peak lists.
        </li>
        <li>
          The automated test converts the first 200 spots. For every spot, the
          sum of intensities equals the stored SCiLS Total Ion Count
          normalization times its target value, within 1e-4 relative. The m/z
          range of these spots is 249.6509 to 1098.3752.
        </li>
        <li>
          A manual run on macOS (Apple silicon) converted 300 spots with
          pixels of 50 x 50 um. The m/z range is 249.2955 to 1098.3752.
          pyimzML opens the output.
        </li>
      </ul>

      <h3>Readers</h3>
      <p>
        pyimzML opens the output (tested). The files follow imzML 1.1, so
        other imzML readers such as M2aia, Cardinal, and METASPACE are
        expected to open them. These readers are not tested yet.
      </p>

      <h3>Limits</h3>
      <ul>
        <li>
          open-slx reads SCiLS Lab 14 files (version 14.00.17781).
        </li>
        <li>
          open-slx reads centroid data only. It checks <code>Version</code> and{' '}
          <code>SpectraType</code>. If the file version is not supported, or{' '}
          <code>SpectraType</code> is not <code>Peaks</code>, it stops with
          exit code 4 and writes no imzML file.
        </li>
        <li>A full conversion of a large dataset is not tested.</li>
        <li>
          Resampled timsTOF projects are not tested. They can store spectra
          another way.
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
        This writes <code>OUT.imzML</code> and <code>OUT.ibd</code>. For more
        than one raster, it writes <code>OUT_r00.imzML</code>,{' '}
        <code>OUT_r01.imzML</code>, and so on. It also writes <code>OUT_features.csv</code> and{' '}
        <code>OUT_metadata.json</code>.
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
        open-slx is not affiliated with Bruker. Bruker does not endorse it. SCiLS
        is a trademark of Bruker.
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
