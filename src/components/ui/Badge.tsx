//برای نمایش برچسب، تگ، وضعیت یا دسته‌بندی فیلم
interface BadgeProps {
  label: string;
  color?: "cyan" | "green" | "red" | "yellow" | "purple";
}

const colorMap = {
  cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  green: "bg-green-500/10 text-green-400 border-green-500/20",
  red: "bg-red-500/10 text-red-400 border-red-500/20",
  yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

function Badge({ label, color = "cyan" }: BadgeProps) {
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full border ${colorMap[color]}`}>
      {label}
    </span>
  );
}

export default Badge;
