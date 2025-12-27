'use client';

import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';

export const PulseHeader = () => {
  return (
    <>
      <DesktopHeader />
      <MobileHeader />
    </>
  );
};
