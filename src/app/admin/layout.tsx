import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { accounts } from '@/db/schema';
import AdminSidebar from '@/components/admin/sidebar';
import ToastContainer from '@/components/shared/toast';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const userId = cookieStore.get('auth_session')?.value;
  if (!userId) redirect('/login');

  const user = await db.select({ name: accounts.name, role: accounts.role })
    .from(accounts).where(eq(accounts.id, Number(userId))).limit(1).then(r => r[0]);

  return (
    <div className="min-h-screen flex bg-kiosk-bg">
      <AdminSidebar user={user} />
      <div className="flex-1 ml-[260px] min-h-screen">
        <main className="p-3 md:p-8 max-w-[1200px] text-kiosk-ink">
          {children}
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}