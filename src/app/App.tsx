import React, { useState } from 'react';
import { DesignSystemPage } from './components/DesignSystemPage';
import { ConsoleLayoutPage } from './components/ConsoleLayoutPage';
import { SideNavDemo } from './components/SideNavDemo';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'design-system' | 'console' | 'sidenav'>('console');

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'design-system' && <DesignSystemPage onNavigate={setCurrentPage} />}
      {currentPage === 'console' && <ConsoleLayoutPage onNavigate={setCurrentPage} />}
      {currentPage === 'sidenav' && <SideNavDemo onNavigate={setCurrentPage} />}
    </div>
  );
}