import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";

export default async function MemberHome() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (!claims) redirect("/sign-in");

  const name = typeof claims.user_metadata?.display_name === "string"
    ? claims.user_metadata.display_name
    : "Reader";

  return (
    <main>
      <nav className="nav">
        <div className="brand">🐦 Page Pigeon</div>
        <form action={signOut}><button className="textButton">Sign out</button></form>
      </nav>
      <section className="dashboard">
        <p className="eyebrow">WELCOME HOME</p>
        <h1 className="dashboardTitle">Hi, {name}.</h1>
        <p className="lede left">Your Page Pigeon shelf is ready to take flight.</p>
        <div className="creditCard"><span>Book Credits</span><strong>2</strong><small>Starter credits unlock after your first 3 books are listed.</small></div>
        <div className="dashboardGrid">
          <article><h2>Build your shelf</h2><p>Add three books you are willing to lend to unlock borrowing.</p><Link className="button primary" href="/library/add">Add a book</Link></article>
          <article><h2>Discover</h2><p>See what other readers are sharing.</p><Link className="button secondary" href="/discover">Browse books</Link></article>
        </div>
      </section>
    </main>
  );
}
