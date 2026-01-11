export interface CreativeAsset {
  id: string;
  title: string;
  type: 'Film' | 'Music' | 'Literature';
  creator: string;
  imageUrl: string;
  totalValuation: number;
  availableEquity: number; // Percentage available for investors
  minInvestment: number;
  apy: number; // Projected annual yield
  rightsType: string[]; // e.g., ["Theatrical", "Streaming"]
  description: string;
  status: 'Funding' | 'Active' | 'Payout';
  trend: 'up' | 'down' | 'neutral';
}

export interface UserHolding {
  assetId: string;
  investedAmount: number;
  equityOwned: number; // Percentage
  currentValue: number;
  lastPayout: string;
}

export const MOCK_ASSETS: CreativeAsset[] = [
  {
    id: 'film-001',
    title: 'The Echo of Dawn',
    type: 'Film',
    creator: 'Lumina Studios',
    imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop',
    totalValuation: 2500000, // $2.5M
    availableEquity: 15, // 15% offered
    minInvestment: 50,
    apy: 12.4,
    rightsType: ['Theatrical Distribution', 'Global Streaming'],
    description: 'A sci-fi drama exploring the first contact with a digital consciousness. Already secured distribution in 3 territories.',
    status: 'Funding',
    trend: 'up'
  },
  {
    id: 'music-004',
    title: 'Neon Nights Anthology',
    type: 'Music',
    creator: 'Synthwave Collective',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2670&auto=format&fit=crop',
    totalValuation: 850000,
    availableEquity: 25,
    minInvestment: 20,
    apy: 8.9,
    rightsType: ['Master Recording', 'Sync Licensing'],
    description: 'A collection of 12 unreleased tracks from top synthwave artists. Targeting high-value sync placements in ads and games.',
    status: 'Active',
    trend: 'neutral'
  },
  {
    id: 'lit-021',
    title: 'Chronicles of Aether',
    type: 'Literature',
    creator: 'Elena Vance',
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2787&auto=format&fit=crop',
    totalValuation: 120000,
    availableEquity: 40,
    minInvestment: 10,
    apy: 15.2,
    rightsType: ['Print', 'Audiobook', 'TV Adaptation Rights'],
    description: 'Bestselling fantasy series seeking capital for global marketing push and audiobook production.',
    status: 'Funding',
    trend: 'up'
  },
  {
    id: 'film-003',
    title: 'Velvet Horizon',
    type: 'Film',
    creator: 'Noir Pictures',
    imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2659&auto=format&fit=crop',
    totalValuation: 1800000,
    availableEquity: 10,
    minInvestment: 100,
    apy: 10.5,
    rightsType: ['Streaming', 'Merchandising'],
    description: 'A modern noir thriller featuring A-list cast attachments. Production starts Q3 2026.',
    status: 'Funding',
    trend: 'up'
  }
];

export const MOCK_USER_HOLDINGS: UserHolding[] = [
  {
    assetId: 'music-004',
    investedAmount: 500,
    equityOwned: 0.058, // 0.058%
    currentValue: 540.25,
    lastPayout: '2025-12-15'
  }
];
