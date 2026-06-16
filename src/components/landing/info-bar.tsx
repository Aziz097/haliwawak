import { MapPin, Clock, Ticket } from 'lucide-react';

const ITEMS = [
  { icon: MapPin, label: 'Lokasi', value: 'Lampung Timur, Lampung' },
  { icon: Clock, label: 'Jam Operasional', value: 'Sen–Min, 08.00–16.00 WIB' },
  { icon: Ticket, label: 'Tiket Masuk', value: 'Gratis' },
];

export default function InfoBar() {
  return (
    <section className="bg-kiosk-surface py-8">
      <div className="page-container">
        <div className="grid grid-cols-1 gap-4 rounded-[2rem] border-2 border-kiosk-surface-tint bg-kiosk-bg p-6 sm:grid-cols-3">
          {ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-kiosk-accent-teal/10 text-kiosk-accent-teal">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-kiosk-ink-muted">{item.label}</p>
                  <p className="font-heading text-lg font-semibold text-kiosk-ink">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}