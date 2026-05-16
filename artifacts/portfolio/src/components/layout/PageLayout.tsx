interface PageLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function PageLayout({ title, description, children }: PageLayoutProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">{title}</h1>
        {description && (
          <p className="text-neutral-600 dark:text-neutral-400">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}
