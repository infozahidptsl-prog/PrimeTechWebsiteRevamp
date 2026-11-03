import React from "react";
import { BoxIcon } from "lucide-react";
type PageHeaderProps = {
  icon?: BoxIcon;
  title: string;
  description?: string;
  actions?: React.ReactNode;
};
export function PageHeader({
  icon: Icon,
  title,
  description,
  actions
}: PageHeaderProps) {
  return <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="flex items-start gap-4">
        {Icon && <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-brand shadow-sm ring-1 ring-line sm:flex">
            <Icon className="h-5 w-5" />
          </span>}
        <div>
          <h1 className="text-[26px] font-bold leading-tight tracking-tight text-ink md:text-[30px]">{title}</h1>
          {description && <p className="mt-1 max-w-[620px] text-[14px] leading-relaxed text-muted">{description}</p>}
        </div>
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>;
}