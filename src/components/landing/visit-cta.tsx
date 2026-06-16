import Link from 'next/link';
import { Clock, Ticket, ChevronRight } from 'lucide-react';

export default function VisitCta() {
  return (
    <section className="relative overflow-hidden bg-kiosk-accent-teal py-20 px-4">
      <div className="page-container relative z-10 text-center text-white">
        <Ticket className="mx-auto mb-6 h-12 w-12 text-white/70" />
        <h2 className="font-heading text-3xl font-bold md:text-4xl">Rencanakan Kunjungan Anda</h2>
        <p className="mx-auto mb-8 mt-4 max-w-xl text-lg leading-relaxed text-white/80">
          Saksikan langsung keindahan alam Pugung Raharjo dan berinteraksi dengan keanekaragaman kupu-kupu polinator.
        </p>
        <div className="mb-8 flex flex-col justify-center gap-3 text-sm font-medium sm:flex-row">
          <span className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 backdrop-blur-sm">
            <Clock className="h-4 w-4" /> Sen–Min, 08.00–16.00 WIB
          </span>
          <span className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 backdrop-blur-sm">
            <Ticket className="h-4 w-4" /> Tiket Masuk Gratis
          </span>
        </div>
        <Link
          href="/kunjungi"
          className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 font-bold text-kiosk-accent-teal shadow-lg transition-colors hover:bg-white/90"
        >
          Informasi Lengkap <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}