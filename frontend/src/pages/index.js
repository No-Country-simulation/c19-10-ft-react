// pages/index.js
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-2 bg-gray-800">
      <h1 className="text-4xl font-bold text-primary">Primary</h1>
      <h2 className="text-4xl font-bold text-secondary">Secondary</h2>
      <h3 className="text-4xl font-bold text-background">Background</h3>
      <h4 className="text-4xl font-bold text-accent">Accent</h4>
    </div>
  );
}
