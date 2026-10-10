export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="6" fill="#ffd60a" />
        <path d="M6 9h20" stroke="#0b0b0c" strokeWidth="3" strokeLinecap="round" />
        <path d="M10 9v16M22 9v16" stroke="#0b0b0c" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <span className="font-display text-xl uppercase tracking-wide">
        StreetBar<span className="text-accent">Lab</span>
      </span>
    </span>
  );
}
