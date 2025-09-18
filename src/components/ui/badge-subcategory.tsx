import { cn } from "@/lib/utils"

interface SubcategoryBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  subcategory: 'Micro Project' | 'Capstone Project';
}

const badgeColors = {
  'Micro Project': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'Capstone Project': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
}

export function SubcategoryBadge({ subcategory, className, ...props }: SubcategoryBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
        badgeColors[subcategory],
        "ring-blue-700/10 dark:ring-blue-700/30",
        className
      )}
      {...props}
    >
      {subcategory}
    </span>
  )
}
