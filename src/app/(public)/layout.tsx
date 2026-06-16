import NavbarWrapper from '@/components/landing/navbar-wrapper';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarWrapper />
      {children}
    </>
  );
}
