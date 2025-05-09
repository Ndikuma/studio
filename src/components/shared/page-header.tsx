import type { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
}

export function PageHeader({ title, description, icon: Icon, action }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="h-8 w-8 text-primary hidden sm:block" />}
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{title}</h1>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {description && <p className="mt-2 text-muted-foreground">{description}</p>}
    </div>
  );
}
