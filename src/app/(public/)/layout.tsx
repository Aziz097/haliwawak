import NavbarWrapper from '@/components/landing/navbar-wrapper';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div data-testid="public-layout-marker">PUBLIC LAYOUT</div>
      <NavbarWrapper />
      {children}
    </>
  );
}
