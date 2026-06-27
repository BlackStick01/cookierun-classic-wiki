import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[65vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-4xl font-black text-[#4a2315]">Page not found</h1>
      <p className="mt-4 text-slate-600">This route does not match an existing CookieRun Classic wiki page.</p>
      <Link href="/" className="mt-7 rounded-md bg-orange-500 px-5 py-3 text-sm font-black text-white hover:bg-orange-600">
        Back to home
      </Link>
    </main>
  );
}
