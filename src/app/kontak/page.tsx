import { MapPin, Phone, Mail } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontak — Eduwisata Polinator',
};

export default function KontakPage() {
  return (
    <main className="min-h-screen bg-bg">
      <section className="bg-section-dark text-white py-24 px-4">
        <div className="page-container text-center">
          <Mail className="w-12 h-12 text-[#4ADE80] mx-auto mb-6" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">Kontak</h1>
          <p className="text-white/60 max-w-xl mx-auto text-lg leading-relaxed">
            Hubungi kami untuk informasi lebih lanjut tentang program Eduwisata Polinator.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="page-container grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { icon: MapPin, title: 'Alamat', content: 'Jl. Pugung Raharjo, Lampung Timur 34192' },
            { icon: Phone, title: 'Telepon', content: '(0725) 123-456' },
            { icon: Mail, title: 'Email', content: 'info@eduwisatapolinator.id' },
          ].map((item) => (
            <div key={item.title} className="bg-card-bg border border-card-border rounded-2xl p-8 text-center">
              <item.icon className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-heading font-bold text-fg text-lg mb-2">{item.title}</h3>
              <p className="text-fg-muted text-sm">{item.content}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
