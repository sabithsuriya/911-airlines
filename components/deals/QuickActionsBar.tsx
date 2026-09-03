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
  Free: "bg-emerald-600 text-white",
};

function QuickActionItem({ action }: { action: QuickAction }) {
  const Icon = ICONS[action.icon];

  return (
    <a
      href={action.href}
      className="group flex flex-1 flex-col items-center justify-center gap-2.5 px-3 py-3.5 sm:py-4 text-center transition-all duration-200 hover:bg-slate-100/80 rounded-xl sm:rounded-2xl"
    >
      <span className="relative inline-flex items-center justify-center">
        <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-blue-600 transition-transform duration-300 group-hover:scale-110" />
        {action.badge && (
          <span
            className={`absolute -right-3 -top-2.5 rounded-full px-2 py-0.5 text-[10px] font-bold leading-none shadow-md ${BADGE_STYLES[action.badge]}`}
          >
            {action.badge}
          </span>
        )}
      </span>
      <span className="text-xs sm:text-sm md:text-base font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
        {action.label}
      </span>
    </a>
  );
}

export default function QuickActionsBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="w-full rounded-2xl sm:rounded-3xl border border-white/50 bg-white/95 backdrop-blur-xl shadow-2xl overflow-hidden p-2 sm:p-3"
    >
      <div className="grid grid-cols-2 sm:grid-cols-5 w-full divide-y sm:divide-y-0 sm:divide-x divide-slate-200/70">
        {quickActions.map((action) => (
          <div key={action.id} className="flex w-full">
            <QuickActionItem action={action} />
          </div>
        ))}
      </div>
    </nav>
  );
}
