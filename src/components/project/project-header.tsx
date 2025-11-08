'use client';

import { Badge } from '@/components/ui/badge';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProjectHeaderProps {
  title: string;
  description: string;
  category: string;
  projectType?: 'capstone' | 'micro';
  onProjectTypeChange?: (type: 'capstone' | 'micro') => void;
}

export function ProjectHeader({ 
  title,
  description,
  category,
  projectType = 'micro',
  onProjectTypeChange 
}: ProjectHeaderProps) {
  return (
    <CardHeader className="p-0 mb-6 space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <CardTitle className="text-3xl font-bold text-primary">{title}</CardTitle>
          <p className="text-base text-[#4285F4]/90 dark:text-[#4285F4]/80 leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge variant="secondary" className="bg-[#4285F4]/10 dark:bg-[#4285F4]/20 text-[#4285F4] dark:text-[#4285F4] ml-2 shrink-0 text-sm py-1 px-3 border-[#4285F4]/20">
            {category}
          </Badge>
          <Select 
            value={projectType} 
            onValueChange={(value: 'capstone' | 'micro') => {
              onProjectTypeChange?.(value);
            }}
          >
            <SelectTrigger className="w-[180px] bg-[#4285F4]/5 dark:bg-[#4285F4]/10 border-[#4285F4]/20 text-[#4285F4] hover:bg-[#4285F4]/10">
              <SelectValue placeholder="Select project type" />
            </SelectTrigger>
            <SelectContent className="border-[#4285F4]/20">
              <SelectItem value="micro" className="text-[#4285F4] hover:bg-[#4285F4]/10">Micro Project</SelectItem>
              <SelectItem value="capstone" className="text-[#4285F4] hover:bg-[#4285F4]/10">Capstone Project</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </CardHeader>
  );
}