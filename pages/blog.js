import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Link from 'next/link';

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Sample Blog Post 1",
      date: "October 9, 2024",
      excerpt: "This is a sample blog post excerpt. Click to read more...",
      content: "Full content of the first blog post goes here."
    },
    {
      id: 2,
      title: "Sample Blog Post 2",
      date: "October 8, 2024",
      excerpt: "Another sample blog post excerpt. Click to read more...",
      content: "Full content of the second blog post goes here."
    },
    {
      id: 3,
      title: "Sample Blog Post 3",
      date: "October 7, 2024",
      excerpt: "Yet another sample blog post excerpt. Click to read more...",
      content: "Full content of the third blog post goes here."
    }
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Blog - Parker Smith</title>
        <meta name="description" content="Parker Smith's blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className={styles.menu}>
        <div className={styles.menuToggle}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul>
          <li><Link href="/#home" className={styles.menuLink}>Home</Link></li>
          <li><Link href="/#about" className={styles.menuLink}>About</Link></li>
          <li><Link href="/#projects" className={styles.menuLink}>Projects</Link></li>
          <li><Link href="/#blog" className={styles.menuLink}>Blog</Link></li>
          <li><Link href="/#contact" className={styles.menuLink}>Contact</Link></li>
        </ul>
      </nav>

      <Link href="/#home" className={styles.topArrow}>
        <i className="fas fa-arrow-up"></i>
      </Link>

      <section className={`${styles.section} ${styles.projects}`}>
        <h1 className={styles.sectionTitle}>Blog</h1>
        <div className={styles.projectGrid}>
          {blogPosts.map(post => (
            <div key={post.id} className={styles.projectCard}>
              <div className={styles.projectFront}>
                <i className="fas fa-newspaper"></i>
                <h3>{post.title}</h3>
                <p style={{fontSize: '0.9rem', marginTop: '10px'}}>{post.date}</p>
              </div>
              <div className={styles.projectBack}>
                <p>{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2024 Parker Smith</p>
      </footer>
    </div>
  );
}
