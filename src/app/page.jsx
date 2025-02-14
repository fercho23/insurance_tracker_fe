import Link from 'next/link';
import classes from './page.module.css';

export default function Home() {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.slideshow}>
          {/* <ImageSlideshow /> */}
        </div>
        <div>
          <div className={classes.hero}>
            <h1>Insurance Tracker: Your Lifeline in Times of Need.</h1>
            <p>Get the data and find the information you want!</p>
          </div>
          <div className={classes.links}>
            <Link className="btn btn-primary" href="/import">Import Data</Link>
            <Link className="btn btn-primary" href="/data_processed">Data Processed</Link>
          </div>
        </div>
      </header>

      <main>
        <section className={classes.section}>
          <h2>How it works</h2>
          <p>
            This platform helps you obtain information regarding health insurance.
          </p>
          <p>
            A tool to help you get better coverage!
          </p>
        </section>
      </main>
    </>
  );
}