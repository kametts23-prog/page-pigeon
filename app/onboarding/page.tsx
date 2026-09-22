import Link from "next/link";

export default function Onboarding() {
  return (
    <main className="hero">
      <div className="stamp">WELCOME, READER</div>
      <h1>Build your first shelf.</h1>
      <p className="lede">
        Add three books you would be happy to lend. Once your shelf is live,
        you will receive two starter Book Credits.
      </p>
      <div className="actions">
        <Link className="button primary" href="/library/add">Scan my first book</Link>
      </div>
    </main>
  );
}
