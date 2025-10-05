import { cn } from "@/lib/utils"

interface SubcategoryBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  subcategory: 'Micro Project' | 'Capstone Project';
}

const badgeColors = {
  'Micro Project': 'bg-blue-900 text-blue-300 rounded-full',
  'Capstone Project': 'bg-purple-900 text-purple-300 rounded-full'
}

export function SubcategoryBadge({ subcategory, className, ...props }: SubcategoryBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset",
        badgeColors[subcategory],
        "ring-blue-700/30",
        className
      )}
      {...props}
    >
      {subcategory}
    </span>
  )
}
