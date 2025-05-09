import { Coins } from 'lucide-react';

export function EarnHubLogo() {
  return (
    <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
      <Coins className="h-7 w-7 text-primary" />
      <h1 className="text-2xl font-bold text-primary">
        Earn<span className="text-accent">Hub</span>
      </h1>
    </div>
  );
}

export function EarnHubLogoIcon() {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground p-1">
      <Coins className="h-6 w-6" />
    </div>
  );
}
