import Link from "next/link";

export default function Home() {
  return (
    <main>
      <nav className="nav">
        <div className="brand"><span className="bird">🐦</span> Page Pigeon</div>
        <Link className="textLink" href="/sign-in">Sign in</Link>
      </nav>

      <section className="hero">
        <div className="stamp">BOOKS WORTH PASSING ON</div>
        <h1>Send a story.<br />Get a story.</h1>
        <p className="lede">
          Turn your bookshelf into part of a community library. Lend the books you love,
          borrow your next read, and follow every story on its journey.
        </p>
        <div className="actions">
          <Link className="button primary" href="/onboarding">Get started</Link>
          <Link className="button secondary" href="/discover">Explore books</Link>
        </div>
      </section>

      <section className="cards">
        <article><div>📚</div><h2>Share your shelf</h2><p>Scan books you are ready to send to their next reader.</p></article>
        <article><div>🐦</div><h2>Borrow from readers</h2><p>Find available copies nearby or have a book mailed to you.</p></article>
        <article><div>💌</div><h2>Read together</h2><p>Join clubs, talk about books, and keep great stories moving.</p></article>
      </section>
    </main>
  );
}
