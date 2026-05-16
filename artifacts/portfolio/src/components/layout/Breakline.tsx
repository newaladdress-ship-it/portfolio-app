interface BreaklineProps {
  className?: string;
}

export default function Breakline({ className = "" }: BreaklineProps) {
  return (
    <div
      className={`my-4 border-t border-neutral-300 dark:border-neutral-700 ${className}`}
    />
  );
}
