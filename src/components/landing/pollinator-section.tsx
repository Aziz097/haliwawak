import { Bug, Flower2, Leaf, Wheat } from 'lucide-react';

const POLLINATORS = [
  { icon: Bug, label: 'Kupu-kupu', sub: 'Terbang dan hinggap' },
  { icon: Flower2, label: 'Penyerbukan', sub: 'Serbuk sari berpindah' },
  { icon: Leaf, label: 'Tanaman Berbuah', sub: 'Hasil panen meningkat' },
  { icon: Wheat, label: 'Ketahanan Pangan', sub: 'Ketersediaan pangan' },
];

export default function PollinatorSection() {
  return (
    <section className="py-24 px-4 bg-section-dark text-white relative overflow-hidden">
      <div className="page-container relative z-10">
        <div className="text-center mb-16">
          <p className="text-[#4ADE80] text-xs font-bold tracking-[0.16em] uppercase mb-3">Mengapa Ini Penting?</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Peran Polinator dalam Ketahanan Pangan</h2>
          <p className="text-white/60 max-w-xl mx-auto text-base leading-relaxed">
            Kupu-kupu bukan sekadar indah — mereka adalah agen penyerbukan kritis yang menjaga ekosistem pertanian kita tetap berjalan.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {POLLINATORS.map((p, i) => (
            <div key={p.label} className="flex flex-col items-center text-center group">
              <div className="icon-slot icon-slot-lg rounded-2xl bg-primary/20 border border-primary/40 mb-5 group-hover:bg-primary/30 transition-colors">
                <p.icon className="w-7 h-7 text-[#4ADE80]" />
              </div>
              <p className="font-heading font-semibold text-white text-lg mb-2">{p.label}</p>
              <p className="text-sm text-white/50">{p.sub}</p>
            </div>
          ))}
        </div>
        <blockquote className="mt-16 max-w-2xl mx-auto text-center">
          <p className="font-serif text-lg md:text-xl italic text-white/70 border-t border-white/10 pt-8">
            &ldquo;Kupu-kupu adalah agen penyerbukan yang tak tergantikan bagi ekosistem.&rdquo;
          </p>
        </blockquote>
      </div>
    </section>
  );
}
