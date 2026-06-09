'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import SpeciesForm from '@/components/shared/species-form';

export default function EditPostPage() {
  const params = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/posts/${params.id}`).then(r => r.json()).then(d => {
      setData(d);
      setLoading(false);
    });
  }, [params.id]);

  if (loading) return <p className="text-[#6B7280]">Memuat...</p>;
  if (!data) return <p className="text-[#DC2626]">Data tidak ditemukan</p>;

  return <SpeciesForm initialData={data} isEdit speciesId={String(params.id)} />;
}