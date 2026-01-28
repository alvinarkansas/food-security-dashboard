'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, TrendingUp, Clock, DollarSign, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { suppliers } from '@/lib/mock-data'

export default function AlternativeSuppliersPage() {
  const [commodity, setCommodity] = useState('')
  const [volume, setVolume] = useState('')
  const [region, setRegion] = useState('')
  const [resultsVisible, setResultsVisible] = useState(false)

  const findAlternatives = () => {
    if (commodity && volume && region) {
      setResultsVisible(true)
    }
  }

  // Filter and rank suppliers based on criteria
  const rankedSuppliers = suppliers
    .filter(s => !commodity || s.commodity === commodity)
    .sort((a, b) => b.reliability - a.reliability)
    .slice(0, 5)

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Alternative Supplier Ranking"
        description="Critical decision feature: ranked alternatives with confidence scores"
      />

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Search Criteria */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Search Criteria</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="commodity">Commodity</Label>
                <Select value={commodity} onValueChange={setCommodity}>
                  <SelectTrigger id="commodity">
                    <SelectValue placeholder="Select commodity..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Rice">Rice</SelectItem>
                    <SelectItem value="Wheat">Wheat</SelectItem>
                    <SelectItem value="Corn">Corn</SelectItem>
                    <SelectItem value="Vegetables">Vegetables</SelectItem>
                    <SelectItem value="Dairy">Dairy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="volume">Required Volume (MT)</Label>
                <Input
                  id="volume"
                  type="number"
                  placeholder="e.g., 5000"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger id="region">
                    <SelectValue placeholder="Select region..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Southeast Asia">Southeast Asia</SelectItem>
                    <SelectItem value="South Asia">South Asia</SelectItem>
                    <SelectItem value="East Asia">East Asia</SelectItem>
                    <SelectItem value="Any">Any Region</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgency">Urgency</Label>
                <Select defaultValue="normal">
                  <SelectTrigger id="urgency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (60+ days)</SelectItem>
                    <SelectItem value="normal">Normal (30-60 days)</SelectItem>
                    <SelectItem value="high">High (7-30 days)</SelectItem>
                    <SelectItem value="critical">Critical (&lt;7 days)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                className="w-full mt-6" 
                onClick={findAlternatives}
                disabled={!commodity || !volume || !region}
              >
                <Search className="mr-2 h-4 w-4" />
                Find Alternatives
              </Button>
            </div>
          </Card>

          {/* Ranked Results */}
          <Card className="xl:col-span-2 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Ranked Alternatives</h3>
            
            {!resultsVisible ? (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <div className="text-center">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">Enter criteria and search to see ranked alternatives</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {rankedSuppliers.map((supplier, index) => {
                  const confidence = supplier.reliability
                  const rank = index + 1
                  
                  return (
                    <div
                      key={supplier.id}
                      className="p-5 rounded-lg border-2 border-border bg-card hover:border-primary transition-all cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        {/* Rank Badge */}
                        <div className="flex-shrink-0">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                            rank === 1 ? 'bg-primary text-primary-foreground' :
                            rank === 2 ? 'bg-chart-2/20 text-chart-2' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {rank}
                          </div>
                        </div>

                        {/* Supplier Details */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="text-lg font-semibold text-foreground">{supplier.name}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline">{supplier.country}</Badge>
                                <Badge variant="outline">{supplier.commodity}</Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-success">{confidence}%</div>
                              <div className="text-xs text-muted-foreground">Confidence</div>
                            </div>
                          </div>

                          {/* Key Metrics */}
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-info" />
                              <div>
                                <div className="text-xs text-muted-foreground">Delivery</div>
                                <div className="text-sm font-medium text-foreground">{supplier.leadTime}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-success" />
                              <div>
                                <div className="text-xs text-muted-foreground">Availability</div>
                                <div className="text-sm font-medium text-success">Available</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-warning" />
                              <div>
                                <div className="text-xs text-muted-foreground">Price</div>
                                <div className="text-sm font-medium text-foreground">{supplier.priceRange}</div>
                              </div>
                            </div>
                          </div>

                          {/* Downstream Impact */}
                          <div className="p-3 rounded-lg bg-muted/30">
                            <div className="text-xs font-medium text-foreground mb-2">Downstream Impact Analysis</div>
                            <div className="grid grid-cols-2 gap-3 text-xs">
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Supply Chain Delay:</span>
                                <span className="font-medium text-foreground">+2 days</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Cost Impact:</span>
                                <span className="font-medium text-warning">+3.2%</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Quality Match:</span>
                                <span className="font-medium text-success">98%</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Capacity Match:</span>
                                <span className="font-medium text-success">Suitable</span>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2 mt-4">
                            <Button size="sm" variant="default">
                              Select Supplier
                            </Button>
                            <Button size="sm" variant="outline">
                              View Full Profile
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Recommendation Badge for Top Choice */}
                      {rank === 1 && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <div className="flex items-center gap-2 text-xs text-primary">
                            <TrendingUp className="w-3 h-3" />
                            <span className="font-medium">Recommended: Best balance of reliability, cost, and delivery time</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </Card>
        </div>

        {/* Decision Factors */}
        {resultsVisible && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Ranking Methodology</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-muted/30">
                <div className="text-sm font-medium text-foreground mb-2">Reliability Score</div>
                <div className="text-xs text-muted-foreground">Historical performance and fulfillment rate</div>
                <div className="mt-2 text-xs font-medium text-primary">Weight: 40%</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <div className="text-sm font-medium text-foreground mb-2">Delivery Time</div>
                <div className="text-xs text-muted-foreground">Lead time and logistics efficiency</div>
                <div className="mt-2 text-xs font-medium text-primary">Weight: 25%</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <div className="text-sm font-medium text-foreground mb-2">Cost Efficiency</div>
                <div className="text-xs text-muted-foreground">Price competitiveness and payment terms</div>
                <div className="mt-2 text-xs font-medium text-primary">Weight: 20%</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <div className="text-sm font-medium text-foreground mb-2">Risk Assessment</div>
                <div className="text-xs text-muted-foreground">Geographic and operational risk factors</div>
                <div className="mt-2 text-xs font-medium text-primary">Weight: 15%</div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
