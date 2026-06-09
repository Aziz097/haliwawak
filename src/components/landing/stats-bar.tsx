export default function StatsBar({ speciesCount, areaHa, foundedYear }: { speciesCount: number | string; areaHa: number | string; foundedYear: number | string }) {
  const items = [
    { value: speciesCount, label: 'Spesies Terdokumentasi' },
    { value: `${areaHa}+`, label: 'Hektar Kawasan' },
    { value: `Sejak ${foundedYear}`, label: 'Cagar Budaya Nasional' },
  ];
  return (
    <section className="bg-section-dark border-y border-white/10">
      <div className="page-container py-10">
        <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-16 text-center">
          {items.map((item) => (
            <div key={item.label}>
              <p className="font-heading text-4xl sm:text-5xl font-bold text-[#4ADE80] mb-1">{item.value}</p>
              <p className="text-white/60 text-sm font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
