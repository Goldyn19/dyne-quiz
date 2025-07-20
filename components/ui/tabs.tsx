import * as React from "react";

interface Tab {
  label: string;
  content: React.ReactNode;
}

export function Tabs({ tabs, defaultIndex = 0 }: { tabs: Tab[]; defaultIndex?: number }) {
  const [active, setActive] = React.useState(defaultIndex);

  return (
    <div>
      <div className="flex border-b border-border mb-4">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            className={`px-4 py-2 text-sm font-medium focus:outline-none transition-colors border-b-2 ${
              active === idx
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-primary"
            }`}
            onClick={() => setActive(idx)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs[active].content}</div>
    </div>
  );
} 