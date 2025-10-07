'use client';

import { motion } from 'framer-motion';

const MiniChart = ({ isActive }: { isActive: boolean }) => {
  const barCount = 12;
  return (
    <div className="flex items-end justify-center w-full h-full gap-0.5">
      {Array.from({ length: barCount }).map((_, i) => {
        const activeHeight = Math.random() * 80 + 20; // 20% to 100%
        const inactiveHeight = Math.random() * 20 + 5; // 5% to 25%
        
        return (
            <motion.div
                key={i}
                className="w-full rounded-t-sm bg-primary/50"
                initial={{ height: '10%' }}
                animate={{
                    height: isActive ? `${activeHeight}%` : `${inactiveHeight}%`,
                }}
                transition={{
                    duration: isActive ? 0.3 + Math.random() * 0.5 : 0.5,
                    repeat: isActive ? Infinity : 0,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                    delay: i * 0.05,
                }}
            />
        )
    })}
    </div>
  );
};

export default MiniChart;
