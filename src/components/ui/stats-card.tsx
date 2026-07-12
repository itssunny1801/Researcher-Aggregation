interface StatsCardProps {
  value: string;
  label: string;
  icon: string;
  color: string;
  bg: string;
  iconBg: string;
  delay?: number;
}

export default function StatsCard({
  value,
  label,
  icon,
  delay = 0,
}: StatsCardProps) {
  return (
    <div
      className="animate-slide-up opacity-0 surface-card rounded-2xl p-5 shadow-3d flex items-center gap-4"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className="w-10 h-10 rounded-xl bg-academic-accent/10 text-academic-accent flex items-center justify-center flex-shrink-0 [&>svg]:w-5 [&>svg]:h-5"
        dangerouslySetInnerHTML={{ __html: icon }}
      />
      <div>
        <p className="text-xl font-bold text-academic-primary tracking-tight leading-none">
          {value}
        </p>
        <p className="text-[11px] text-academic-muted mt-0.5 font-medium">{label}</p>
      </div>
    </div>
  );
}
