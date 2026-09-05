import { PlaneTakeoff, CreditCard, Users, MapPinned, BellRing } from "lucide-react";
import type { ComponentType } from "react";
import type { QuickAction } from "./types";
import { quickActions } from "./data";

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  PlaneTakeoff,
  CreditCard,
  Users,
  MapPinned,
  BellRing,
};

const BADGE_STYLES: Record<string, string> = {
  Pro: "bg-orange-500 text-white",
  Free: "bg-emerald-500 text-white",
};

function QuickActionItem({ action, isLast }: { action: QuickAction; isLast: boolean }) {
  const Icon = ICONS[action.icon];

  return (
    <a
      href={action.href}
      className={`group flex flex-1 flex-col items-center justify-center gap-1.5 px-2 py-3 text-center transition-colors hover:bg-slate-50 relative ${
        !isLast ? "border-b sm:border-b-0 sm:border-r border-slate-100" : ""
      }`}
    >
      <span className="relative inline-flex items-center justify-center pt-1">
        {action.badge && (
          <span
            className={`absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 text-[10px] font-bold leading-none ${BADGE_STYLES[action.badge]}`}
          >
            {action.badge}
          </span>
        )}
        <Icon className="h-6 w-6 text-blue-600 transition-transform group-hover:scale-105" />
      </span>
      <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
        {action.label}
      </span>
    </a>
  );
}

export default function QuickActionsBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="w-full rounded-2xl bg-white shadow-sm border border-slate-100/80 overflow-hidden"
    >
      <div className="grid grid-cols-2 sm:grid-cols-5 w-full">
        {quickActions.map((action, idx) => (
          <QuickActionItem
            key={action.id}
            action={action}
            isLast={idx === quickActions.length - 1}
          />
        ))}
      </div>
    </nav>
  );
}

