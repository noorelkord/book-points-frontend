import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="mx-auto max-w-3xl space-y-6 py-10 text-center">
      <h1 className="text-3xl font-bold">Welcome to BookPoints</h1>
      <p className="text-gray-600 dark:text-gray-300">Find and share books and flashcards with your college community.</p>
      <div className="flex justify-center gap-3">
        <Link to="/items" className="rounded bg-blue-600 px-4 py-2 text-white">Browse Items</Link>
        <Link to="/search" className="rounded border px-4 py-2">Search</Link>
      </div>
    </section>
  );
}


