'use client'

import { PageHeader } from '@/components/page-header'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react'
import { demandSupplyData } from '@/lib/mock-data'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts'

export default function DemandVsSupplyPage() {
  const latestData = demandSupplyData[demandSupplyData.length - 1]
  const gap = latestData.demand - latestData.supply
  const gapPercentage = ((gap / latestData.demand) * 100).toFixed(1)

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Demand vs Supply Analysis"
        description="Structural gap detection and seasonality trends"
        actions={
          <Button variant="outline" size="sm">Export Data</Button>
        }
      />

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-xs text-muted-foreground mb-2">Current Demand</div>
            <div className="text-2xl font-semibold text-foreground">{latestData.demand.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">MT/month</div>
          </Card>
          <Card className="p-4">
            <div className="text-xs text-muted-foreground mb-2">Current Supply</div>
            <div className="text-2xl font-semibold text-foreground">{latestData.supply.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">MT/month</div>
          </Card>
          <Card className="p-4">
            <div className="text-xs text-muted-foreground mb-2">Import Dependency</div>
            <div className="text-2xl font-semibold text-warning">{latestData.imports.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">MT/month</div>
          </Card>
          <Card className="p-4 border-l-4 border-l-destructive">
            <div className="text-xs text-muted-foreground mb-2">Supply Gap</div>
            <div className="text-2xl font-semibold text-destructive">{gap.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-xs text-destructive mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>{gapPercentage}% shortfall</span>
            </div>
          </Card>
        </div>

        {/* Alert Banner */}
        {gap > 5000 && (
          <Card className="p-4 bg-warning/10 border-l-4 border-l-warning">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-foreground mb-1">
                  Structural Supply Gap Detected
                </div>
                <div className="text-xs text-muted-foreground">
                  Current demand exceeds domestic supply by {gap.toLocaleString()} MT/month. 
                  Import dependency at {Math.round((latestData.imports / latestData.demand) * 100)}%. 
                  Consider activating alternative suppliers or increasing buffer stock.
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Main Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Demand vs Supply Trend (6 Months)</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={demandSupplyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                label={{ value: 'MT/month', angle: -90, position: 'insideLeft', style: { fill: 'hsl(var(--muted-foreground))' } }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.5rem',
                  color: 'hsl(var(--popover-foreground))'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="demand" 
                stroke="hsl(var(--destructive))" 
                strokeWidth={3}
                name="Demand"
                dot={{ fill: 'hsl(var(--destructive))', r: 5 }}
              />
              <Line 
                type="monotone" 
                dataKey="supply" 
                stroke="hsl(var(--success))" 
                strokeWidth={3}
                name="Domestic Supply"
                dot={{ fill: 'hsl(var(--success))', r: 5 }}
              />
              <Line 
                type="monotone" 
                dataKey="imports" 
                stroke="hsl(var(--warning))" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Imports"
                dot={{ fill: 'hsl(var(--warning))', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Seasonality Overlay */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Supply Gap Analysis</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={demandSupplyData.map(d => ({
                ...d,
                gap: d.demand - d.supply
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem',
                    color: 'hsl(var(--popover-foreground))'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="gap" 
                  stroke="hsl(var(--destructive))" 
                  fill="hsl(var(--destructive))"
                  fillOpacity={0.3}
                  name="Supply Gap"
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Average Monthly Gap:</span>
                <span className="font-medium text-foreground">
                  {Math.round(demandSupplyData.reduce((sum, d) => sum + (d.demand - d.supply), 0) / demandSupplyData.length).toLocaleString()} MT
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Peak Gap Month:</span>
                <span className="font-medium text-destructive">Jun (8,000 MT)</span>
              </div>
            </div>
          </Card>

          {/* Insights and Recommendations */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Key Insights</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/30">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-foreground mb-1">
                      Rising Demand Trend
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Demand has increased 22% over 6 months, outpacing domestic supply growth of 11%.
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-muted/30">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-foreground mb-1">
                      Import Dependency Risk
                    </div>
                    <div className="text-xs text-muted-foreground">
                      12.3% of demand now relies on imports, up from 8.4% in January. Consider diversification.
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-muted/30">
                <div className="flex items-start gap-3">
                  <TrendingDown className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-foreground mb-1">
                      Seasonal Pattern Identified
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Supply gap widens in Q2 due to pre-monsoon demand surge. Plan buffer stock accordingly.
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="text-sm font-medium text-foreground mb-3">Recommended Actions</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <Badge className="bg-primary text-primary-foreground">1</Badge>
                    <span className="text-muted-foreground">Increase buffer stock to 45-day coverage</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Badge className="bg-primary text-primary-foreground">2</Badge>
                    <span className="text-muted-foreground">Activate 2-3 new import suppliers</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Badge className="bg-primary text-primary-foreground">3</Badge>
                    <span className="text-muted-foreground">Negotiate long-term supply contracts</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
