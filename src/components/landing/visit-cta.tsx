import Link from 'next/link';
import { Clock, Ticket, ChevronRight } from 'lucide-react';

export default function VisitCta() {
  return (
    <section className="py-20 px-4 bg-primary relative overflow-hidden">
      <div className="page-container text-center text-white relative z-10">
        <Ticket className="w-12 h-12 mx-auto mb-6 text-white/60" />
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Rencanakan Kunjungan Anda</h2>
        <p className="text-white/70 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
          Saksikan langsung keindahan alam Pugung Raharjo dan berinteraksi dengan keanekaragaman kupu-kupu polinator.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8 text-sm font-medium">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/20">
            <Clock className="w-4 h-4" /> Sen–Min, 08.00–16.00 WIB
          </span>
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/20">
            <Ticket className="w-4 h-4" /> Tiket Masuk Rp 5.000
          </span>
        </div>
        <Link href="/kunjungi" className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-3.5 rounded-xl hover:bg-white/90 transition-colors shadow-lg">
          Informasi Lengkap <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
