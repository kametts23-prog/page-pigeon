import Link from "next/link";
import { signUp } from "@/app/auth/actions";

export default async function SignUp({ searchParams }: { searchParams: Promise<{ error?: string; message?: string }> }) {
  const params = await searchParams;

  return (
    <main className="authWrap">
      <section className="authCard">
        <div className="brand authBrand">🐦 Page Pigeon</div>
        <div className="stamp">JOIN THE FLOCK</div>
        <h1 className="authTitle">Start your shelf.</h1>
        <p>Create your account, list three books, and earn your first two Book Credits.</p>
        {params.error && <p className="notice error">{params.error}</p>}
        {params.message && <p className="notice success">{params.message}</p>}
        <form action={signUp} className="authForm">
          <label>Display name<input name="displayName" required autoComplete="name" /></label>
          <label>Email<input name="email" type="email" required autoComplete="email" /></label>
          <label>Password<input name="password" type="password" minLength={8} required autoComplete="new-password" /></label>
          <button className="button primary formButton">Create account</button>
        </form>
        <p>Already a member? <Link className="textLink" href="/sign-in">Sign in</Link></p>
      </section>
    </main>
  );
}
