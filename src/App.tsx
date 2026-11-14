'use client';
import { GroupsView } from './views/GroupsView';

import React from 'react';
import { useApp } from './context/AppContext';
import { OnboardingWelcome } from './components/OnboardingWelcome';
import { AppShell } from './components/AppShell';
import { WalletView } from './views/WalletView';
import { HomeView } from './views/HomeView';
import { GoalsView } from './views/GoalsView';
import { ActivityView } from './views/ActivityView';
import { RewardsView } from './views/RewardsView';
import { ProfileView } from './views/ProfileView';
import { AdminView } from './views/AdminView';
import { HelpView } from './views/HelpView';
import { DepositModal } from './components/DepositModal';
import { WithdrawModal } from './components/WithdrawModal';
import { CreateGoalModal } from './components/CreateGoalModal';
import { DemoBankTransferModal } from './components/DemoBankTransferModal';
import { HelpModal } from './components/HelpModal';

export const App: React.FC = () => {
  const {
    isOnboarded,
    setIsOnboarded,
    activeTab,
    isSaveModalOpen,
    setIsSaveModalOpen,
    isWithdrawModalOpen,
    setIsWithdrawModalOpen,
    isCreateGoalOpen,
    setIsCreateGoalOpen,
    isDemoTransferOpen,
    setIsDemoTransferOpen,
    isHelpModalOpen,
    setIsHelpModalOpen
  } = useApp();

  // If user has not onboarded, strictly show the Option 3 Welcome Screen
  if (!isOnboarded) {
    return <OnboardingWelcome onComplete={() => setIsOnboarded(true)} />;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'wallet':
        return <WalletView />;
      case 'home':
        return <HomeView />;
      case 'goals':
        return <GoalsView />;
      case 'groups':
        return <GroupsView />;
      case 'activity':
        return <ActivityView />;
      case 'rewards':
        return <RewardsView />;
      case 'profile':
        return <ProfileView />;
      case 'admin':
        return <AdminView />;
      case 'help':
        return <HelpView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <AppShell>
      {renderActiveTab()}

      {/* Global Modals */}
      <DepositModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onOpenDemoBank={() => setIsDemoTransferOpen(true)}
      />

      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
      />

      <CreateGoalModal
        isOpen={isCreateGoalOpen}
        onClose={() => setIsCreateGoalOpen(false)}
      />

      <DemoBankTransferModal
        isOpen={isDemoTransferOpen}
        onClose={() => setIsDemoTransferOpen(false)}
      />

      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </AppShell>
  );
};
export default App;
