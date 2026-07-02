import WritingLayout from '../components/WritingLayout';

export default function SmileMSI() {
  return (
    <WritingLayout title="SMILE-MSI" date="07/2026">
      <p style={{ marginBottom: '20px', textAlign: 'center', fontSize: '1.1rem' }}>
        An open-source, fully-local desktop workspace that turns raw mass
        spectrometry imaging data into annotated, statistically defensible maps
        of tissue lipids — no code, no cloud upload, no proprietary software.
      </p>

      <h3>Overview</h3>
      <p>
        In a mass spectrometry imaging (MSI) experiment, an instrument records a
        full mass spectrum at every pixel of a thin tissue section, producing a
        data cube from which the spatial distribution of any molecule can be
        rendered as an image. SMILE-MSI (Spatial Mass Imaging of Lipid
        Environments) loads these datasets in the open imzML standard, lets you
        explore ion images and spectra interactively, extracts spatial and
        statistical structure, and assigns a putative lipid identity to every
        detected feature — entirely on your own machine, with no network
        connection required.
      </p>
      <p>
        The project exists to close a real workflow gap for wet-lab researchers
        who are not programmers. Getting from a raw file to an annotated,
        defensible list of discriminating lipids normally means stitching
        together several tools — an image viewer, a separate environment for
        segmentation and statistics, and a third step to translate masses into
        molecular identities — often behind a commercial license, driven by
        code, locked to a proprietary platform, or requiring you to upload your
        data to a web service. SMILE-MSI packages that entire path — load,
        explore, find structure, compare, identify, report — into one locally
        installed application that also exposes its engine as a clean Python
        library.
      </p>

      <h3>Key Features</h3>
      <ul>
        <li>Loads open-standard imzML/ibd data with a lazy, out-of-core backend, so files larger than RAM stay browsable</li>
        <li>Interactive ion imaging for any m/z with normalization, hotspot contrast, colormaps, and three-channel RGB overlays</li>
        <li>Preprocessing chain: baseline correction, smoothing, lock-mass recalibration, and a calibration-check tool</li>
        <li>Structure finding: peak picking, spatial-autocorrelation ranking, k-means and spatially-aware segmentation, PCA/NMF, and UMAP embeddings</li>
        <li>Rigorous region statistics: exact rank-based ROC AUC with Mann–Whitney p-values and Benjamini–Hochberg FDR, computed per-pixel</li>
        <li>In-silico lipid annotation with best ID plus alternatives, adduct and isotope corroboration, a confidence label, and a target-decoy FDR estimate</li>
        <li>Optional MS/MS confirmation against an importable spectral library</li>
        <li>Multi-sample cohort analysis with batch correction and pseudoreplication-aware controls</li>
        <li>Reproducibility tooling: versioned analysis profiles with a random seed and auto-generated provenance and methods reports</li>
        <li>Rich export: publication-ready ion images, formatted Excel reports, and a multi-page PDF data book with methods and references</li>
      </ul>

      <h3>What Makes It Interesting</h3>
      <p>
        The lipid identification database is generated entirely in silico by
        enumerating sum compositions from class backbone formulas, so there is
        no external database file to ship, version, or lose — every candidate
        mass is reproducible from first principles. Every quantitative method is
        reimplemented directly from its primary publication rather than ported
        from an existing tool, which keeps the codebase cleanly Apache-2.0
        licensed; a detailed METHODS.md maps each algorithm to its source with
        DOIs. A single registry of analysis steps backs the point-and-click GUI,
        an in-app Python script console, and a declarative replayable flow
        format, so the same result is produced no matter which interface invokes
        it.
      </p>

      <h3>Technical Details</h3>
      <p>
        SMILE-MSI is built as two things at once: a point-and-click desktop app
        (PySide6 + pyqtgraph) and an importable, scriptable engine
        (<code>import smile_msi</code>). The imzML backend is lazy and
        out-of-core, and a chunked, compressed Zarr cube cache keeps
        arbitrary-m/z ion images interactive while holding resident memory flat
        — so datasets larger than RAM stay workable on a laptop. The numeric core
        is built on NumPy, SciPy, scikit-learn, and pandas, and pre-built,
        no-Python-required Windows and macOS bundles are published automatically
        to GitHub Releases on each version tag.
      </p>

      <p style={{ marginTop: '30px', textAlign: 'center', fontSize: '0.9rem' }}>
        <a
          href="https://github.com/elparko/SMILE-MSI"
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
