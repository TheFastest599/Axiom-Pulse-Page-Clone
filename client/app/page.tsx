import { TokenGrid } from './components/tokens';

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      {/* Header placeholder - will be built later */}
      <header className="h-14 border-b border-gray-800 flex items-center px-4">
        <h1 className="text-lg font-semibold">Pulse</h1>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-hidden">
        <TokenGrid />
      </main>
    </div>
  );
}
