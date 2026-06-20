interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
}

export default function Skeleton({ className = '', width, height, borderRadius = '8px' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-slate-200 dark:bg-slate-700 ${className}`}
      style={{ width, height, borderRadius }}
    />
  );
}

export function SkeletonStatCard() {
  return (
    <div className="glass-panel p-5 border border-slate-200/60 dark:border-slate-800/40 space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton width={40} height={40} borderRadius="10px" />
        <div className="flex-1 space-y-2">
          <Skeleton height={10} width="60%" />
          <Skeleton height={18} width="40%" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="glass-panel p-6 border border-slate-200/60 dark:border-slate-800/40 space-y-4">
      <Skeleton height={14} width={180} />
      <Skeleton height={200} borderRadius="12px" />
    </div>
  );
}

export function SkeletonCourseCard() {
  return (
    <div className="glass-card p-4 flex items-center gap-4 border border-slate-200/60 dark:border-white/5">
      <Skeleton width={64} height={44} borderRadius="8px" />
      <div className="flex-1 space-y-2">
        <Skeleton height={14} width="70%" />
        <div className="flex items-center gap-3">
          <Skeleton height={6} width={96} borderRadius="999px" />
          <Skeleton height={10} width={30} />
        </div>
      </div>
      <Skeleton width={14} height={14} borderRadius="4px" />
    </div>
  );
}

export function SkeletonActivityItem() {
  return (
    <div className="flex items-start gap-3">
      <Skeleton width={32} height={32} borderRadius="8px" />
      <div className="flex-1 space-y-1.5">
        <Skeleton height={10} width="85%" />
        <Skeleton height={8} width="40%" />
      </div>
    </div>
  );
}

export function SkeletonAssignmentCard() {
  return (
    <div className="glass-card p-5 border border-slate-200/60 dark:border-white/5 space-y-3">
      <div className="flex justify-between">
        <Skeleton height={10} width={100} />
        <Skeleton height={14} width={50} borderRadius="999px" />
      </div>
      <Skeleton height={14} width="75%" />
      <div className="flex justify-between">
        <Skeleton height={10} width={80} />
        <Skeleton height={12} width={50} />
      </div>
    </div>
  );
}

export function SkeletonLessonItem() {
  return (
    <div className="flex items-center gap-2.5 px-3 py-2">
      <Skeleton width={11} height={11} borderRadius="4px" />
      <Skeleton height={11} width="75%" />
      <Skeleton height={9} width={30} />
    </div>
  );
}

export function SkeletonMilestone() {
  return (
    <div className="timeline-item">
      <Skeleton width={24} height={24} borderRadius="999px" />
      <div className="glass-card timeline-content-card border border-slate-200/60 dark:border-white/5 p-4 space-y-2">
        <Skeleton height={9} width={120} />
        <Skeleton height={12} width="60%" />
        <Skeleton height={10} width="45%" />
        <div className="flex gap-4">
          <Skeleton height={10} width={80} />
          <Skeleton height={10} width={100} />
        </div>
      </div>
    </div>
  );
}

export function SkeletonTableRow() {
  return (
    <tr>
      <td className="py-3"><Skeleton height={12} width={100} /></td>
      <td className="py-3"><Skeleton height={12} width={160} /></td>
      <td className="py-3"><Skeleton height={12} width={120} /></td>
      <td className="py-3"><Skeleton height={20} width={50} borderRadius="999px" /></td>
      <td className="py-3"><Skeleton height={12} width={90} /></td>
    </tr>
  );
}
