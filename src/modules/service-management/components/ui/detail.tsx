export function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">{children}</div>;
}

export function FullRow({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function Field({ label, value }: { label: string; value?: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
      <div className="mt-1 text-base font-semibold text-gray-800 dark:text-white/90">
        {value || '-'}
      </div>
    </div>
  );
}

export function Skeleton() {
  return (
    <div className="grid animate-pulse grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="h-20 rounded-xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-800"
        />
      ))}
    </div>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export function Section({ title, children, action }: SectionProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">{title}</h3>

        {action && <div className="shrink-0">{action}</div>}
      </div>

      {/* Content */}
      <div className="space-y-4">{children}</div>
    </div>
  );
}
