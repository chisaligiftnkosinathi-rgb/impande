import { Network, Database, ShieldCheck, Share2 } from 'lucide-react';

export default function EcosystemPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-16 pt-8 px-6 lg:px-0">
      <header className="border-b border-neutral-800 pb-8">
        <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
          <Share2 className="w-10 h-10 text-blue-400" />
          Platform Ecosystem
        </h1>
        <p className="text-xl text-neutral-400">
          Implementations of the Computational Continuity Framework (CCF)
        </p>
      </header>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-neutral-300">
          This platform is one part of a broader research initiative exploring how digital continuity can be preserved, 
          governed, and verified across disparate domains. The foundational architecture is built upon the 
          <strong> Computational Continuity Framework (CCF)</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#0a0a0a] border border-blue-900/50 rounded-lg p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <Database className="w-8 h-8 text-blue-400 mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">iPhande Continuity Platform</h2>
          <p className="text-neutral-400 mb-6">
            The platform you are currently viewing. iPhande is a public-facing continuity platform demonstrating that the same append-only algorithms securing scientific data can preserve human history, community heritage, and multi-domain commercial records.
          </p>
          <div className="text-sm font-mono text-blue-500/80">Current Environment</div>
        </div>

        <div className="bg-[#0a0a0a] border border-emerald-900/50 rounded-lg p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <ShieldCheck className="w-8 h-8 text-emerald-400 mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">AXIS Evidence Governance</h2>
          <p className="text-neutral-400 mb-6">
            AXIS explores constitutional governance of digital evidence within institutional, laboratory, and scientific environments. It utilizes Evidence Passports and Constitutional Validation to ensure rigorous chain-of-custody.
          </p>
          <a href="#" className="text-sm font-mono text-emerald-400 hover:text-emerald-300 underline">
            Visit AXIS Explorer &rarr;
          </a>
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8 mt-12 text-center">
        <Network className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Future Interoperability</h3>
        <p className="text-neutral-400 max-w-2xl mx-auto">
          While AXIS and iPhande operate independently to serve their distinct domains, their shared CCF foundation ensures they speak the same mathematical and architectural language. In the future, a federation layer will enable cross-domain trust discovery and identity resolution.
        </p>
      </div>
    </div>
  );
}
