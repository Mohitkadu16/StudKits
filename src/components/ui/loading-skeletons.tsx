'use client';

import { motion } from 'framer-motion';
import { Skeleton } from './skeleton';

interface ProjectCardSkeletonProps {
  count?: number;
}

export function ProjectCardSkeleton({ count = 1 }: ProjectCardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="w-full px-2 sm:px-4"
        >
          <div className="w-full sm:max-w-md mx-auto flex flex-col h-full overflow-hidden rounded-3xl border-2 border-border p-0">
            {/* Image skeleton */}
            <Skeleton className="aspect-[3/2] w-full rounded-t-3xl" />
            
            {/* Content skeleton */}
            <div className="p-4 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              
              {/* Badges skeleton */}
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
            </div>

            {/* Footer skeleton */}
            <div className="p-4 pt-0 mt-auto">
              <Skeleton className="h-10 w-full rounded-full" />
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
}

export function StatsCounterSkeleton() {
  return (
    <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
      <Skeleton className="w-14 h-14 rounded-full" />
      <div className="text-center space-y-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

export function CarouselItemSkeleton() {
  return (
    <div className="flex flex-col items-center bg-[rgba(15,23,42,0.7)] p-4 rounded-xl border-2 border-border h-60 w-full">
      <Skeleton className="w-16 h-16 rounded-full mb-6" />
      <div className="text-center space-y-3 w-full">
        <Skeleton className="h-6 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}
