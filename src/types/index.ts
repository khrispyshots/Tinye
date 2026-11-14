export type Environment = 'testnet' | 'demo';

export interface Goal {
  id: string;
  name: string;
  category: 'emergency' | 'laptop' | 'housing' | 'education' | 'travel' | 'custom';
  currentAmount: string;
  reservedAmount?: string;
  targetAmount: string;
  asset: string;
  targetDate?: string;
  createdAt: string;
  status: 'active' | 'completed';
  notes?: string;
}

export type TransactionType = 'deposit' | 'withdrawal' | 'simulated_bank_deposit' | 'reward_redemption';
export type TransactionStatus = 'confirmed' | 'pending' | 'failed' | 'rejected' | 'unknown';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: string;
  asset: string;
  status: TransactionStatus;
  timestamp: string;
  goalId?: string;
  goalName?: string;
  receiptId: string;
  environment: Environment;
  fiatAmount?: number;
  fiatCurrency?: string;
  reference?: string;
  txHash?: string;
  explorerUrl?: string;
}

export interface DemoFundingIntent {
  id: string;
  userId: string;
  countryCode: string;
  currencyCode: string;
  fiatAmount: number;
  demoRateVersion: string;
  demoNearUnits: number;
  nonPayableReference: string;
  state: 'draft' | 'ready' | 'simulating' | 'simulated_completed' | 'simulation_failed';
  createdAt: string;
}

export interface RewardMilestone {
  id: string;
  title: string;
  description: string;
  points: number;
  achieved: boolean;
  claimed: boolean;
  date?: string;
  category: 'streak' | 'amount' | 'habit';
}

export interface RewardPerk {
  id: string;
  title: string;
  description: string;
  pointCost: number;
  claimed: boolean;
  category: 'perk' | 'nft' | 'pass';
  claimedAt?: string;
  receiptId?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  walletAddress: string;
  environment: Environment;
  joinedAt: string;
  points: number;
  streakDays: number;
  currency: string;
}
