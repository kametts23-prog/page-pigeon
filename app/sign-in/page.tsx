import Link from "next/link";
import { signIn } from "@/app/auth/actions";

export default async function SignIn({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;

  return (
    <main className="authWrap">
      <section className="authCard">
        <div className="brand authBrand">🐦 Page Pigeon</div>
        <div className="stamp">MEMBER POST</div>
        <h1 className="authTitle">Welcome back.</h1>
        <p>Sign in and see where your books have flown.</p>
        {params.error && <p className="notice error">{params.error}</p>}
        <form action={signIn} className="authForm">
          <label>Email<input name="email" type="email" required autoComplete="email" /></label>
          <label>Password<input name="password" type="password" required autoComplete="current-password" /></label>
          <button className="button primary formButton">Sign in</button>
        </form>
        <p>New here? <Link className="textLink" href="/sign-up">Create an account</Link></p>
      </section>
    </main>
  );
}
