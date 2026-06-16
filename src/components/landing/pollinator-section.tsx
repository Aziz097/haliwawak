import { Bug, Flower2, Leaf, Wheat } from 'lucide-react';

const POLLINATORS = [
  { icon: Bug, label: 'Kupu-kupu', sub: 'Terbang dan hinggap' },
  { icon: Flower2, label: 'Penyerbukan', sub: 'Serbuk sari berpindah' },
  { icon: Leaf, label: 'Tanaman Berbuah', sub: 'Hasil panen meningkat' },
  { icon: Wheat, label: 'Ketahanan Pangan', sub: 'Ketersediaan pangan' },
];

export default function PollinatorSection() {
  return (
    <section className="relative overflow-hidden bg-kiosk-surface py-20 px-4">
      <div className="page-container relative z-10">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-kiosk-accent-teal">Mengapa Ini Penting?</p>
          <h2 className="font-heading text-3xl font-medium text-kiosk-ink md:text-4xl">
            Peran Polinator dalam Ketahanan Pangan
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-kiosk-ink-muted">
            Kupu-kupu bukan sekadar indah - mereka adalah agen penyerbukan kritis yang menjaga ekosistem pertanian kita tetap berjalan.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-12">
          {POLLINATORS.map((p) => (
            <div key={p.label} className="flex flex-col items-center text-center group">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-kiosk-accent-teal/30 bg-kiosk-accent-teal/10 transition-colors group-hover:bg-kiosk-accent-teal/20">
                <p.icon className="h-7 w-7 text-kiosk-accent-teal" />
              </div>
              <p className="font-heading text-lg font-semibold text-kiosk-ink">{p.label}</p>
              <p className="mt-1 text-sm text-kiosk-ink-muted">{p.sub}</p>
            </div>
          ))}
        </div>
        <blockquote className="mx-auto mt-14 max-w-2xl text-center">
          <p className="border-t border-kiosk-surface-tint pt-8 font-serif text-lg italic leading-relaxed text-kiosk-ink-muted md:text-xl">
            “Kupu-kupu adalah agen penyerbukan yang tak tergantikan bagi ekosistem.”
          </p>
        </blockquote>
      </div>
    </section>
  );
}