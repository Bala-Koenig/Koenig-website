export default function PowerPlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: '#041825', color: '#E4F7FF', minHeight: '100vh' }}>
      {children}
    </div>
  );
}
