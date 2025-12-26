'use client';

import { ReactNode } from 'react';
import './BondingTooltip.css';

interface BondingTooltipProps {
  children: ReactNode;
  bondingProgress: number;
  className?: string;
  // isFirstCard?: boolean;
}

// Determine color shade based on bonding progress
const getBondingShade = (progress: number): string => {
  if (progress >= 80) return 'high'; // Green shade
  if (progress >= 50) return 'medium'; // Cyan/blue shade
  if (progress >= 20) return 'low'; // Yellow/orange shade
  return 'critical'; // Red shade
};

export const BondingTooltip = ({
  children,
  bondingProgress,
  className = '',
}: // isFirstCard = false,
BondingTooltipProps) => {
  const shade = getBondingShade(bondingProgress);

  return (
    <div
      className={`bonding-tooltip-wrapper ${className}`}
      data-bonding-tooltip={`Bonding: ${bondingProgress.toFixed(2)}%`}
      data-bonding-shade={shade}
      // data-first-card={isFirstCard}
    >
      {children}
    </div>
  );
};
