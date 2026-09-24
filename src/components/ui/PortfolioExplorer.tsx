import React from 'react';
import { ComponentSectionId } from '../../data/portfolioData';
import { DesktopExplorer } from './DesktopExplorer';
import { MobileExplorer } from './MobileExplorer';
import { useBreakpoint } from '../../hooks/useBreakpoint';

interface PortfolioExplorerProps {
  isDark: boolean;
  isExploded: boolean;
  activeSection: ComponentSectionId;
  onSelectSection: (id: ComponentSectionId) => void;
  onReassemble: () => void;
}

export const PortfolioExplorer: React.FC<PortfolioExplorerProps> = (props) => {
  const { isTouchLayout } = useBreakpoint();

  if (!props.isExploded) return null;

  if (isTouchLayout) {
    return <MobileExplorer {...props} />;
  }

  return <DesktopExplorer {...props} />;
};
