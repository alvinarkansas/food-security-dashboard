'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowRight } from 'lucide-react'
import { heatmapData } from '@/lib/mock-data'

export default function RiskHeatmapPage() {
  const [riskType, setRiskType] = useState('inherent')
  const [commodity, setCommodity] = useState('all')

  const getCellColor = (count: number) => {
    if (count === 0) return 'bg-muted/20'
    if (count <= 2) return 'bg-chart-3/30'
    if (count <= 4) return 'bg-chart-4/40'
    if (count <= 6) return 'bg-warning/50'
    return 'bg-destructive/60'
  }

  const getRiskAtCell = (likelihood: number, impact: number) => {
    return heatmapData.risks.filter(
      (risk) => risk.likelihood === likelihood && risk.impact === impact
    )
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Risk Intelligence"
        description="Likelihood × Impact analysis and risk assessment"
        actions={
          <div className="flex gap-2">
            <Link href="/risk/register">
              <Button variant="outline" size="sm">Risk Register</Button>
            </Link>
            <Link href="/risk/scenarios">
              <Button size="sm">
                Run Scenario
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        }
      />

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Filters */}
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Risk Type:</span>
              <Tabs value={riskType} onValueChange={setRiskType}>
                <TabsList>
                  <TabsTrigger value="inherent">Inherent</TabsTrigger>
                  <TabsTrigger value="residual">Residual</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Commodity:</span>
              <Select value={commodity} onValueChange={setCommodity}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Commodities</SelectItem>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="corn">Corn</SelectItem>
                  <SelectItem value="vegetables">Vegetables</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-muted-foreground">Time Window:</span>
              <Select defaultValue="30">
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 Days</SelectItem>
                  <SelectItem value="60">60 Days</SelectItem>
                  <SelectItem value="90">90 Days</SelectItem>
                  <SelectItem value="180">180 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Heat Map */}
          <Card className="xl:col-span-2 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground">Risk Heat Map</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Click on cells to view detailed risk information
              </p>
            </div>

            <div className="overflow-x-auto">
              <div className="inline-block min-w-full">
                {/* Heat map grid */}
                <div className="flex gap-2">
                  {/* Y-axis labels */}
                  <div className="flex flex-col justify-between py-12">
                    <div className="text-xs text-muted-foreground writing-mode-vertical transform rotate-180">
                      IMPACT →
                    </div>
                  </div>

                  <div className="flex flex-col">
                    {/* Main grid with Y-axis values */}
                    <div className="flex gap-2">
                      {/* Y-axis values */}
                      <div className="flex flex-col-reverse gap-2">
                        {heatmapData.impact.map((label, index) => (
                          <div key={index} className="h-20 flex items-center">
                            <span className="text-xs text-muted-foreground w-20 text-right pr-3">
                              {label}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Grid cells */}
                      <div className="flex flex-col-reverse gap-2">
                        {heatmapData.impact.map((_, impactIndex) => (
                          <div key={impactIndex} className="flex gap-2">
                            {heatmapData.likelihood.map((_, likelihoodIndex) => {
                              const risks = getRiskAtCell(likelihoodIndex, impactIndex)
                              const totalCount = risks.reduce((sum, r) => sum + r.count, 0)
                              
                              return (
                                <button
                                  key={likelihoodIndex}
                                  className={`w-20 h-20 rounded-lg border border-border ${getCellColor(totalCount)} hover:ring-2 hover:ring-primary transition-all flex flex-col items-center justify-center group relative`}
                                >
                                  <span className="text-lg font-semibold text-foreground">
                                    {totalCount}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {totalCount === 1 ? 'risk' : 'risks'}
                                  </span>
                                  
                                  {/* Tooltip */}
                                  {risks.length > 0 && (
                                    <div className="absolute left-full ml-2 top-0 hidden group-hover:block z-10 w-64 p-3 bg-popover border border-border rounded-lg shadow-lg">
                                      <div className="space-y-2">
                                        {risks.map((risk, idx) => (
                                          <div key={idx} className="text-xs">
                                            <div className="font-medium text-foreground">{risk.label}</div>
                                            <div className="text-muted-foreground">{risk.count} occurrences</div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </button>
                              )
                            })}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* X-axis labels */}
                    <div className="flex gap-2 ml-[92px] mt-2">
                      {heatmapData.likelihood.map((label, index) => (
                        <div key={index} className="w-20">
                          <span className="text-xs text-muted-foreground block text-center">
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground text-center mt-2 ml-[92px]">
                      ← LIKELIHOOD
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Risk Summary */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Risk Summary</h3>
            <div className="space-y-4">
              {/* Total Risks */}
              <div className="p-4 rounded-lg bg-muted/30">
                <div className="text-sm text-muted-foreground mb-1">Total Active Risks</div>
                <div className="text-3xl font-semibold text-foreground">
                  {heatmapData.risks.reduce((sum, r) => sum + r.count, 0)}
                </div>
              </div>

              {/* By Severity */}
              <div>
                <div className="text-sm font-medium text-foreground mb-3">By Severity</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded bg-destructive/10">
                    <span className="text-sm text-foreground">Critical</span>
                    <Badge className="bg-destructive text-destructive-foreground">3</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-warning/10">
                    <span className="text-sm text-foreground">High</span>
                    <Badge className="bg-warning text-warning-foreground">6</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-info/10">
                    <span className="text-sm text-foreground">Medium</span>
                    <Badge className="bg-info text-info-foreground">9</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-sm text-foreground">Low</span>
                    <Badge variant="outline">5</Badge>
                  </div>
                </div>
              </div>

              {/* Top Risk Categories */}
              <div>
                <div className="text-sm font-medium text-foreground mb-3">Top Categories</div>
                <div className="space-y-2">
                  {heatmapData.risks.slice(0, 4).map((risk) => (
                    <div key={risk.label} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{risk.label}</span>
                      <span className="text-sm font-medium text-foreground">{risk.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full mt-4 bg-transparent" variant="outline">
                Export Risk Report
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
