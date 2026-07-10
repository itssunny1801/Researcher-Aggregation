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
  bg,
  iconBg,
  delay = 0,
}: StatsCardProps) {
  return (
    <div
      className={`animate-slide-up opacity-0 surface-card rounded-2xl p-5 shadow-3d shadow-inner-3d ${bg} flex flex-col items-center justify-center text-center`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center text-xl flex-shrink-0`}
      >
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-academic-primary tracking-tight leading-none">
          {value}
        </p>
        <p className="text-xs text-academic-muted mt-1 font-medium">{label}</p>
      </div>
    </div>
  );
}
