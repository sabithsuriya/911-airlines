import Link from "next/link";
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
    <Link
      href={action.href}
      className="group flex flex-1 flex-col items-center gap-2 px-4 py-2 text-center"
    >
      <span className="relative inline-flex">
        <Icon className="h-7 w-7 text-blue-600 transition-transform group-hover:scale-105" />
        {action.badge && (
          <span
            className={`absolute -right-3 -top-2 rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none ${BADGE_STYLES[action.badge]}`}
          >
            {action.badge}
          </span>
        )}
      </span>
      <span className="text-sm font-medium text-slate-800">
        {action.label}
      </span>
    </Link>
  );
}

export default function QuickActionsBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="flex flex-wrap items-stretch divide-y divide-slate-200 sm:flex-nowrap sm:divide-x sm:divide-y-0">
        {quickActions.map((action) => (
          <div key={action.id} className="flex flex-1 basis-1/2 sm:basis-auto">
            <QuickActionItem action={action} />
          </div>
        ))}
      </div>
    </nav>
  );
}
