export type RiskLevel = "low" | "medium" | "high";

export type AlertCategory = "diseases" | "geopolitical" | "policy" | "logistics" | "weather";

export interface CountryMarker {
  country: string;
  coordinates: [number, number]; // [latitude, longitude]
  risk: RiskLevel;
  title: string;
  category: AlertCategory;
  description: string;
  riskScore: number;
}

export const CATEGORY_LABELS: Record<AlertCategory, string> = {
  diseases: "Diseases",
  geopolitical: "Geo political",
  policy: "Policy decision",
  logistics: "Logistics disruption",
  weather: "Weather",
};

export const countryMarkers: CountryMarker[] = [
  {
    country: "United States",
    coordinates: [39.83, -98.58],
    risk: "low",
    title: "Supply Chain Risk Alert – Trade Tariff Review",
    category: "policy",
    description: "Ongoing tariff reviews may affect import costs and trade flows for agricultural commodities. Monitoring policy developments and adjusting procurement strategies is recommended to mitigate potential cost increases.",
    riskScore: 35,
  },
  {
    country: "Netherlands",
    coordinates: [52.13, 5.29],
    risk: "low",
    title: "Supply Chain Risk Alert – Ukraine War (Netherlands)",
    category: "geopolitical",
    description: "Netherlands's role as a primary logistics hub for Ukraine exposes food supply routes to congestion, policy shifts, and regional escalation risks. Agricultural exports, transit capacity, and pricing may be impacted during heightened military or diplomatic activity, requiring contingency sourcing and buffer stock planning.",
    riskScore: 58,
  },
  {
    country: "India",
    coordinates: [20.59, 78.96],
    risk: "medium",
    title: "Supply Chain Risk Alert – Nipah Virus",
    category: "diseases",
    description: "Localised outbreaks may disrupt agricultural labour, transport, and export inspections. Short-term delays and price volatility are possible if containment measures escalate. Monitoring health advisories and border controls is recommended to reduce exposure and rebalance sourcing where needed.",
    riskScore: 62,
  },
  {
    country: "China",
    coordinates: [35.86, 104.20],
    risk: "high",
    title: "Supply Chain Risk Alert – Export Restrictions",
    category: "geopolitical",
    description: "Recent export restrictions on key agricultural commodities pose significant supply chain risks. Potential shortages and price spikes expected. Immediate action required to identify alternative suppliers and secure buffer stocks for affected product categories.",
    riskScore: 78,
  },
  {
    country: "Vietnam",
    coordinates: [14.06, 108.28],
    risk: "medium",
    title: "Supply Chain Risk Alert – Port Congestion",
    category: "logistics",
    description: "Major ports experiencing congestion due to increased export volumes and infrastructure constraints. Shipment delays of 7-14 days expected. Consider alternative routing through secondary ports and pre-booking vessel slots to minimize disruption.",
    riskScore: 55,
  },
  {
    country: "Brazil",
    coordinates: [-14.24, -51.93],
    risk: "low",
    title: "Supply Chain Risk Alert – Drought Conditions",
    category: "weather",
    description: "Moderate drought conditions in key agricultural regions may affect upcoming harvest yields. Current impact limited but monitoring recommended. Contingency sourcing plans should be prepared if conditions deteriorate further.",
    riskScore: 42,
  },
  {
    country: "South Africa",
    coordinates: [-30.56, 22.94],
    risk: "medium",
    title: "Supply Chain Risk Alert – Agricultural Policy Shift",
    category: "policy",
    description: "Proposed changes to agricultural export policies may affect trade flows and pricing structures. Regulatory uncertainty creating planning challenges for long-term contracts. Engagement with local partners recommended to navigate evolving requirements.",
    riskScore: 51,
  },
  {
    country: "Malaysia",
    coordinates: [4.21, 101.98],
    risk: "low",
    title: "Supply Chain Risk Alert – Monsoon Season",
    category: "weather",
    description: "Annual monsoon season approaching with potential for localized flooding and transport disruptions. Historical patterns suggest manageable impact with proper planning. Pre-positioning inventory and flexible logistics arrangements advised.",
    riskScore: 45,
  },
  {
    country: "Indonesia",
    coordinates: [-0.79, 113.92],
    risk: "medium",
    title: "Supply Chain Risk Alert – Crop Disease Outbreak",
    category: "diseases",
    description: "Localized crop disease affecting key agricultural zones. Yield reductions of 10-15% projected in affected areas. Diversifying sourcing across unaffected regions and monitoring disease spread patterns recommended.",
    riskScore: 58,
  },
  {
    country: "Australia",
    coordinates: [-25.27, 133.78],
    risk: "low",
    title: "Supply Chain Risk Alert – Bushfire Season",
    category: "weather",
    description: "Elevated bushfire risk during dry season may affect transport routes and regional production. Current conditions within normal parameters. Contingency routing and supplier communication protocols should be reviewed.",
    riskScore: 38,
  },
  {
    country: "Thailand",
    coordinates: [15.87, 100.99],
    risk: "high",
    title: "Supply Chain Risk Alert – Export Delays",
    category: "logistics",
    description: "Significant export processing delays due to labor shortages and regulatory bottlenecks. Lead times extended by 2-3 weeks. Critical shipments require expedited handling arrangements and alternative supplier activation may be necessary.",
    riskScore: 72,
  },
  {
    country: "New Zealand",
    coordinates: [-40.90, 174.89],
    risk: "low",
    title: "Supply Chain Risk Alert – Food Safety Standards",
    category: "policy",
    description: "New food safety compliance requirements being implemented may require documentation updates and process adjustments. Transition period allows adequate preparation time. Coordination with suppliers on certification requirements recommended.",
    riskScore: 28,
  },
];

export const getRiskColor = (risk: RiskLevel): string => {
  console.log("Getting color for risk level:", risk);
  switch (risk) {
    case "low":
      return "green";
    case "medium":
      return "goldenrod";
    case "high":
      return "red";
    default:
      return "blue";
  }
};
