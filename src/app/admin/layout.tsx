import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/sidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  if (!cookieStore.get('auth_session')) redirect('/login');

  return (
    <div className="min-h-screen flex bg-[#F9FAFB]">
      <AdminSidebar />
      <div className="flex-1 ml-[260px] min-h-screen">
        <main className="p-3 md:p-8 max-w-[1200px] text-[#111827]">
          {children}
        </main>
      </div>
    </div>
  );
}