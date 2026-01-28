'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Play, RotateCcw, TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react'

export default function ScenariosPage() {
  const [scenario, setScenario] = useState('')
  const [country, setCountry] = useState('')
  const [commodity, setCommodity] = useState('')
  const [timeHorizon, setTimeHorizon] = useState('')
  const [resultsVisible, setResultsVisible] = useState(false)

  const runScenario = () => {
    if (scenario && country && commodity && timeHorizon) {
      setResultsVisible(true)
    }
  }

  const resetScenario = () => {
    setScenario('')
    setCountry('')
    setCommodity('')
    setTimeHorizon('')
    setResultsVisible(false)
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Scenario Simulator"
        description="Decision Intelligence simulator for risk assessment and planning"
      />

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Scenario Configuration */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Scenario Configuration</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="scenario">Scenario Type</Label>
                <Select value={scenario} onValueChange={setScenario}>
                  <SelectTrigger id="scenario">
                    <SelectValue placeholder="Select scenario type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monsoon">Monsoon / Heavy Rainfall</SelectItem>
                    <SelectItem value="drought">Drought / Water Shortage</SelectItem>
                    <SelectItem value="export-ban">Export Ban / Restriction</SelectItem>
                    <SelectItem value="price-spike">Price Spike</SelectItem>
                    <SelectItem value="port-strike">Port Strike / Labor Dispute</SelectItem>
                    <SelectItem value="disease">Crop Disease Outbreak</SelectItem>
                    <SelectItem value="supplier-failure">Supplier Failure</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country / Region</Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vietnam">Vietnam</SelectItem>
                    <SelectItem value="thailand">Thailand</SelectItem>
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="malaysia">Malaysia</SelectItem>
                    <SelectItem value="indonesia">Indonesia</SelectItem>
                    <SelectItem value="china">China</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="commodity">Commodity</Label>
                <Select value={commodity} onValueChange={setCommodity}>
                  <SelectTrigger id="commodity">
                    <SelectValue placeholder="Select commodity..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="corn">Corn</SelectItem>
                    <SelectItem value="vegetables">Vegetables</SelectItem>
                    <SelectItem value="dairy">Dairy</SelectItem>
                    <SelectItem value="meat">Meat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time Horizon</Label>
                <Select value={timeHorizon} onValueChange={setTimeHorizon}>
                  <SelectTrigger id="time">
                    <SelectValue placeholder="Select time horizon..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 Days</SelectItem>
                    <SelectItem value="30">30 Days</SelectItem>
                    <SelectItem value="60">60 Days</SelectItem>
                    <SelectItem value="90">90 Days</SelectItem>
                    <SelectItem value="180">180 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  className="flex-1" 
                  onClick={runScenario}
                  disabled={!scenario || !country || !commodity || !timeHorizon}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Run Simulation
                </Button>
                <Button variant="outline" onClick={resetScenario}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {resultsVisible && (
              <div className="mt-6 p-4 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-center gap-2 text-sm text-success">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  Simulation completed successfully
                </div>
              </div>
            )}
          </Card>

          {/* Scenario Outputs */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Simulation Results</h3>
            
            {!resultsVisible ? (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <div className="text-center">
                  <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">Configure and run a scenario to see results</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Risk Delta */}
                <div>
                  <div className="text-sm text-muted-foreground mb-3">Risk Delta</div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                    <TrendingUp className="w-8 h-8 text-destructive" />
                    <div>
                      <div className="text-2xl font-semibold text-destructive">+34%</div>
                      <div className="text-xs text-muted-foreground">Increased risk level</div>
                    </div>
                  </div>
                </div>

                {/* Shortfall Probability */}
                <div>
                  <div className="text-sm text-muted-foreground mb-3">Shortfall Probability</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Probability of Supply Gap</span>
                      <Badge className="bg-warning text-warning-foreground">67%</Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className="bg-warning h-3 rounded-full transition-all"
                        style={{ width: '67%' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Price Forecast */}
                <div>
                  <div className="text-sm text-muted-foreground mb-3">Price Band Forecast</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg border border-border bg-card">
                      <div className="text-xs text-muted-foreground mb-1">Current Price</div>
                      <div className="text-lg font-semibold text-foreground">$450/MT</div>
                    </div>
                    <div className="p-3 rounded-lg border border-border bg-destructive/10">
                      <div className="text-xs text-muted-foreground mb-1">Projected Price</div>
                      <div className="text-lg font-semibold text-destructive">$595-620/MT</div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-warning">
                    <AlertTriangle className="w-3 h-3" />
                    <span>+32% to +38% price increase expected</span>
                  </div>
                </div>

                {/* Recommended Actions */}
                <div>
                  <div className="text-sm text-muted-foreground mb-3">Recommended Actions</div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/30 text-sm">
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold shrink-0 mt-0.5">
                        1
                      </div>
                      <div>
                        <div className="font-medium text-foreground">Activate Alternative Suppliers</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Contact Thailand suppliers (capacity: 42,000 MT/month)
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/30 text-sm">
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold shrink-0 mt-0.5">
                        2
                      </div>
                      <div>
                        <div className="font-medium text-foreground">Increase Buffer Stock</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Build 30-day safety stock to mitigate shortfall risk
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/30 text-sm">
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold shrink-0 mt-0.5">
                        3
                      </div>
                      <div>
                        <div className="font-medium text-foreground">Negotiate Fixed Pricing</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Lock in current rates before price spike impacts market
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Historical Scenarios */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Simulations</h3>
          <div className="space-y-3">
            {[
              { type: 'Export Ban - India', date: '2 days ago', impact: 'High', result: 'Validated' },
              { type: 'Monsoon - Vietnam', date: '5 days ago', impact: 'Medium', result: 'Validated' },
              { type: 'Port Strike - Thailand', date: '1 week ago', impact: 'Low', result: 'False Alarm' },
            ].map((sim, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="text-sm font-medium text-foreground">{sim.type}</div>
                  <Badge variant="outline" className="text-xs">{sim.date}</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={
                    sim.impact === 'High' ? 'bg-destructive text-destructive-foreground' :
                    sim.impact === 'Medium' ? 'bg-warning text-warning-foreground' :
                    'bg-success text-success-foreground'
                  }>
                    {sim.impact}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{sim.result}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
