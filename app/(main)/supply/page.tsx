'use client'

import { PageHeader } from '@/components/page-header'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Globe, MapPin, TrendingUp } from 'lucide-react'
import { worldMapData } from '@/lib/mock-data'
import Link from 'next/link'

export default function SupplyMapPage() {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-success'
      case 'medium':
        return 'bg-warning'
      case 'high':
        return 'bg-destructive'
      default:
        return 'bg-muted'
    }
  }

  const totalVolume = worldMapData.origins.reduce((sum, o) => sum + o.value, 0)

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Supply Network"
        description="Global import dependency and distribution visualization"
        actions={
          <div className="flex gap-2">
            <Link href="/supply/demand-vs-supply">
              <Button variant="outline" size="sm">Demand vs Supply</Button>
            </Link>
            <Link href="/supply/suppliers">
              <Button size="sm">Supplier Directory</Button>
            </Link>
          </div>
        }
      />

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Filters */}
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Commodity:</span>
              <Select defaultValue="all">
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
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Time Period:</span>
              <Select defaultValue="30">
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 Days</SelectItem>
                  <SelectItem value="30">Last 30 Days</SelectItem>
                  <SelectItem value="90">Last 90 Days</SelectItem>
                  <SelectItem value="365">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* World Map */}
          <Card className="xl:col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Import Origins</h3>
              </div>
              <Badge variant="outline">Live Data</Badge>
            </div>
            
            {/* Map Visualization */}
            <div className="relative h-[500px] bg-muted/20 rounded-lg border border-border overflow-hidden">
              {/* Grid overlay */}
              <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 opacity-5">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="border border-foreground" />
                ))}
              </div>
              
              {/* Country markers with flows */}
              <div className="absolute inset-0">
                {/* Flow lines (simplified) */}
                <svg className="absolute inset-0 w-full h-full opacity-30">
                  {worldMapData.origins.map((origin, index) => {
                    const positionMap: Record<string, { x: number; y: number }> = {
                      Vietnam: { x: 65, y: 45 },
                      Thailand: { x: 60, y: 48 },
                      India: { x: 48, y: 42 },
                      Malaysia: { x: 62, y: 52 },
                      Indonesia: { x: 68, y: 54 }
                    }
                    const pos = positionMap[origin.country] || { x: 50, y: 50 }
                    const centerX = 20
                    const centerY = 30
                    
                    return (
                      <line
                        key={index}
                        x1={`${pos.x}%`}
                        y1={`${pos.y}%`}
                        x2={`${centerX}%`}
                        y2={`${centerY}%`}
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                    )
                  })}
                </svg>

                {/* Destination (home) marker */}
                <div
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: '20%', top: '30%' }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 w-16 h-16 -ml-8 -mt-8 rounded-full bg-primary opacity-20 animate-pulse" />
                    <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
                    <div className="absolute left-6 top-0 bg-popover border border-border rounded-lg p-2 text-xs font-medium whitespace-nowrap">
                      Distribution Center
                    </div>
                  </div>
                </div>

                {/* Origin markers */}
                {worldMapData.origins.map((origin, index) => {
                  const positionMap: Record<string, { x: string; y: string }> = {
                    Vietnam: { x: '65%', y: '45%' },
                    Thailand: { x: '60%', y: '48%' },
                    India: { x: '48%', y: '42%' },
                    Malaysia: { x: '62%', y: '52%' },
                    Indonesia: { x: '68%', y: '54%' }
                  }
                  const pos = positionMap[origin.country] || { x: '50%', y: '50%' }
                  
                  return (
                    <div
                      key={index}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                      style={{ left: pos.x, top: pos.y }}
                    >
                      {/* Pulse ring */}
                      <div className={`absolute inset-0 w-12 h-12 -ml-6 -mt-6 rounded-full ${getRiskColor(origin.risk)} opacity-20 group-hover:animate-ping`} />
                      
                      {/* Marker */}
                      <div className={`relative w-3 h-3 rounded-full ${getRiskColor(origin.risk)} ring-4 ring-background group-hover:scale-125 transition-transform`} />
                      
                      {/* Tooltip */}
                      <div className="absolute left-6 top-0 hidden group-hover:block z-10 w-56 p-4 bg-popover border border-border rounded-lg shadow-xl">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-semibold text-sm text-foreground">{origin.country}</span>
                          <Badge variant={origin.risk === 'low' ? 'outline' : 'default'} className={
                            origin.risk === 'high' ? 'bg-destructive text-destructive-foreground' :
                            origin.risk === 'medium' ? 'bg-warning text-warning-foreground' :
                            'bg-success text-success-foreground'
                          }>
                            {origin.risk}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Monthly Volume:</span>
                            <span className="text-foreground font-medium">{origin.value.toLocaleString()} MT</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Dependency:</span>
                            <span className="text-foreground font-medium">{Math.round((origin.value / totalVolume) * 100)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Risk Level:</span>
                            <span className="text-foreground font-medium capitalize">{origin.risk}</span>
                          </div>
                          <div className="mt-3 pt-3 border-t border-border">
                            <div className="text-muted-foreground mb-1">Active Suppliers: 3</div>
                            <div className="text-muted-foreground">Avg. Lead Time: 16 days</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="absolute bottom-6 left-6 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-4 text-xs">
                <div className="font-semibold text-foreground mb-3">Risk Levels</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-foreground">Low Risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-warning" />
                    <span className="text-foreground">Medium Risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-destructive" />
                    <span className="text-foreground">High Risk</span>
                  </div>
                </div>
              </div>

              {/* Stats overlay */}
              <div className="absolute top-6 right-6 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-4">
                <div className="text-xs text-muted-foreground mb-1">Total Import Volume</div>
                <div className="text-2xl font-semibold text-foreground">{totalVolume.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">MT/month</div>
              </div>
            </div>
          </Card>

          {/* Origin Breakdown */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Import Origins</h3>
            <div className="space-y-4">
              {worldMapData.origins.map((origin) => (
                <div key={origin.country} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{origin.country}</span>
                    </div>
                    <Badge variant="outline" className={
                      origin.risk === 'high' ? 'border-destructive text-destructive' :
                      origin.risk === 'medium' ? 'border-warning text-warning' :
                      'border-success text-success'
                    }>
                      {origin.risk}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Volume</span>
                      <span className="font-medium text-foreground">{origin.value.toLocaleString()} MT</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${getRiskColor(origin.risk)}`}
                        style={{ width: `${(origin.value / totalVolume) * 100}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground text-right">
                      {Math.round((origin.value / totalVolume) * 100)}% dependency
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Diversification Score</span>
                <span className="text-lg font-semibold text-foreground">6.8/10</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-warning">
                <TrendingUp className="w-3 h-3" />
                <span>Consider expanding supplier base</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
