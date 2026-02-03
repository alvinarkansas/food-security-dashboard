// Mock data for Food Security Dashboard

export const dashboardMetrics = {
  food_security_index: 72.4,
  availability_risk: 'Medium',
  lead_time_risk: 'Low',
  price_volatility: '12.3%',
  supplier_concentration: 'High',
  alerts_active: 5,
  forecast_window: '30 days',
  top_risks: ['Rice imports - Vietnam', 'Vegetables - Malaysia', 'Wheat - Ukraine']
}

export const activeAlerts = [
  {
    id: 1,
    title: 'Rice Import Delay',
    description: 'Shipment from Vietnam delayed by 7 days due to port congestion',
    severity: 'high',
    country: 'Vietnam',
    commodity: 'Rice',
    category: 'logistics',
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    title: 'Wheat Price Spike',
    description: 'Wheat prices increased 18% due to export restrictions',
    severity: 'critical',
    country: 'Ukraine',
    commodity: 'Wheat',
    category: 'policy',
    timestamp: '5 hours ago'
  },
  {
    id: 3,
    title: 'Monsoon Weather Alert',
    description: 'Heavy rainfall forecasted may impact vegetable production',
    severity: 'medium',
    country: 'Malaysia',
    commodity: 'Vegetables',
    category: 'weather',
    timestamp: '1 day ago'
  },
  {
    id: 4,
    title: 'Supply Chain Disruption',
    description: 'Transportation strike affecting dairy distribution',
    severity: 'medium',
    country: 'India',
    commodity: 'Dairy',
    category: 'logistics',
    timestamp: '2 days ago'
  },
  {
    id: 5,
    title: 'Supplier Capacity Issue',
    description: 'Primary corn supplier operating at 65% capacity',
    severity: 'low',
    country: 'Thailand',
    commodity: 'Corn',
    category: 'diseases',
    timestamp: '3 days ago'
  }
]

export const productionData = [
  { country: 'Vietnam', value: 245000, percentage: 28 },
  { country: 'Thailand', value: 198000, percentage: 23 },
  { country: 'India', value: 167000, percentage: 19 },
  { country: 'Malaysia', value: 134000, percentage: 15 },
  { country: 'Indonesia', value: 131000, percentage: 15 }
]

export const shipmentData = [
  { month: 'Jan', shipped: 45000, value: 12.5 },
  { month: 'Feb', shipped: 52000, value: 14.2 },
  { month: 'Mar', shipped: 48000, value: 13.1 },
  { month: 'Apr', shipped: 61000, value: 16.8 },
  { month: 'May', shipped: 58000, value: 15.9 },
  { month: 'Jun', shipped: 64000, value: 17.5 }
]

export const suppliers = [
  {
    id: 1,
    name: 'AgriCorp Vietnam',
    country: 'Vietnam',
    commodity: 'Rice',
    reliability: 97.1,
    capacity: '50,000 MT/month',
    riskTier: 'Low',
    leadTime: '14-18 days',
    priceRange: '$450-480/MT'
  },
  {
    id: 2,
    name: 'Thai Grain Co.',
    country: 'Thailand',
    commodity: 'Rice',
    reliability: 96.3,
    capacity: '42,000 MT/month',
    riskTier: 'Low',
    leadTime: '16-20 days',
    priceRange: '$460-490/MT'
  },
  {
    id: 3,
    name: 'India Foods Ltd',
    country: 'India',
    commodity: 'Wheat',
    reliability: 94.8,
    capacity: '38,000 MT/month',
    riskTier: 'Medium',
    leadTime: '20-25 days',
    priceRange: '$380-410/MT'
  },
  {
    id: 4,
    name: 'Malaysia Produce',
    country: 'Malaysia',
    commodity: 'Vegetables',
    reliability: 92.5,
    capacity: '15,000 MT/month',
    riskTier: 'Medium',
    leadTime: '5-7 days',
    priceRange: '$1200-1400/MT'
  },
  {
    id: 5,
    name: 'Indonesia Agro',
    country: 'Indonesia',
    commodity: 'Corn',
    reliability: 89.7,
    capacity: '28,000 MT/month',
    riskTier: 'High',
    leadTime: '18-22 days',
    priceRange: '$320-350/MT'
  }
]

export const riskRegister = [
  {
    id: 1,
    eventType: 'Weather Disruption',
    date: '2024-03-15',
    geography: 'Southeast Asia',
    commodity: 'Rice',
    outcome: 'Production reduced by 12%',
    mitigation: 'Activated alternative suppliers',
    effectiveness: 85
  },
  {
    id: 2,
    eventType: 'Export Ban',
    date: '2024-02-08',
    geography: 'India',
    commodity: 'Wheat',
    outcome: 'Price spike 23%',
    mitigation: 'Diversified to Australia, Canada',
    effectiveness: 78
  },
  {
    id: 3,
    eventType: 'Port Strike',
    date: '2024-01-22',
    geography: 'Thailand',
    commodity: 'Corn',
    outcome: 'Shipment delays 10-14 days',
    mitigation: 'Increased buffer stock',
    effectiveness: 92
  },
  {
    id: 4,
    eventType: 'Disease Outbreak',
    date: '2023-12-10',
    geography: 'Vietnam',
    commodity: 'Vegetables',
    outcome: 'Crop loss 18%',
    mitigation: 'Emergency imports from China',
    effectiveness: 67
  }
]

export const models = [
  {
    id: 1,
    name: 'Rice Price Forecast',
    predictionQuality: 94.2,
    status: 'running',
    type: 'Time Series',
    lastUpdated: '2 hours ago'
  },
  {
    id: 2,
    name: 'Supply Chain Risk',
    predictionQuality: 91.7,
    status: 'completed',
    type: 'Classification',
    lastUpdated: '1 day ago'
  },
  {
    id: 3,
    name: 'Demand Forecasting',
    predictionQuality: 88.5,
    status: 'running',
    type: 'Regression',
    lastUpdated: '3 hours ago'
  },
  {
    id: 4,
    name: 'Weather Impact Model',
    predictionQuality: 86.3,
    status: 'completed',
    type: 'ML Ensemble',
    lastUpdated: '12 hours ago'
  }
]

export const incidents = [
  {
    id: 1,
    title: 'Vietnam Rice Shipment Delay',
    status: 'in-progress',
    priority: 'high',
    owner: 'Operations Team',
    slaTimer: '4h 23m remaining',
    created: '2024-06-15T10:30:00Z'
  },
  {
    id: 2,
    title: 'Thailand Port Congestion',
    status: 'monitoring',
    priority: 'medium',
    owner: 'Logistics Team',
    slaTimer: '1d 8h remaining',
    created: '2024-06-14T14:15:00Z'
  },
  {
    id: 3,
    title: 'Wheat Quality Issue - India',
    status: 'resolved',
    priority: 'high',
    owner: 'Quality Team',
    slaTimer: 'Completed',
    created: '2024-06-12T09:00:00Z'
  }
]

export const playbooks = [
  {
    id: 1,
    name: 'Monsoon Response',
    category: 'Weather',
    steps: 8,
    lastUsed: '15 days ago',
    description: 'Standard operating procedure for monsoon season disruptions'
  },
  {
    id: 2,
    name: 'Export Ban Response',
    category: 'Policy',
    steps: 12,
    lastUsed: '42 days ago',
    description: 'Protocol for handling sudden export restrictions'
  },
  {
    id: 3,
    name: 'Supplier Failure',
    category: 'Supply Chain',
    steps: 10,
    lastUsed: '8 days ago',
    description: 'Contingency plan for primary supplier disruption'
  },
  {
    id: 4,
    name: 'Price Volatility Management',
    category: 'Financial',
    steps: 6,
    lastUsed: '3 days ago',
    description: 'Strategy for managing commodity price spikes'
  }
]

export const heatmapData = {
  likelihood: ['Very Low', 'Low', 'Medium', 'High', 'Very High'],
  impact: ['Negligible', 'Minor', 'Moderate', 'Major', 'Severe'],
  risks: [
    { likelihood: 4, impact: 4, count: 3, label: 'Weather Events' },
    { likelihood: 2, impact: 3, count: 5, label: 'Supplier Delays' },
    { likelihood: 3, impact: 4, count: 2, label: 'Export Bans' },
    { likelihood: 1, impact: 2, count: 8, label: 'Quality Issues' },
    { likelihood: 3, impact: 3, count: 4, label: 'Price Volatility' },
    { likelihood: 2, impact: 4, count: 1, label: 'Port Disruptions' }
  ]
}

export const demandSupplyData = [
  { month: 'Jan', demand: 95000, supply: 92000, imports: 8000 },
  { month: 'Feb', demand: 98000, supply: 94000, imports: 9500 },
  { month: 'Mar', demand: 102000, supply: 96000, imports: 11000 },
  { month: 'Apr', demand: 108000, supply: 98000, imports: 14000 },
  { month: 'May', demand: 105000, supply: 100000, imports: 12000 },
  { month: 'Jun', demand: 110000, supply: 102000, imports: 13500 }
]

export const worldMapData = {
  origins: [
    { country: 'Vietnam', lat: 16.0, lon: 108.0, value: 245000, risk: 'low' },
    { country: 'Thailand', lat: 15.0, lon: 101.0, value: 198000, risk: 'low' },
    { country: 'India', lat: 20.0, lon: 77.0, value: 167000, risk: 'medium' },
    { country: 'Malaysia', lat: 4.0, lon: 102.0, value: 134000, risk: 'medium' },
    { country: 'Indonesia', lat: -2.0, lon: 118.0, value: 131000, risk: 'high' }
  ]
}
