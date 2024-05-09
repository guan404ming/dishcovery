export default function ImageCard({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">{children}</div>
    );
  }
  