/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { SpaceManagement } from './components/SpaceManagement';

export default function App() {
  return (
    <div className="flex h-screen w-full bg-gray-50 font-sans text-gray-900 antialiased">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <SpaceManagement />
      </div>
    </div>
  );
}

