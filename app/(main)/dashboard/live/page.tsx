'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  MapPin, 
  AlertCircle, 
  TrendingUp,
  Globe,
  Package
} from 'lucide-react'
import { activeAlerts, worldMapData, shipmentData, productionData } from '@/lib/mock-data'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

export default function LiveDashboardPage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-destructive text-destructive-foreground'
      case 'high':
        return 'bg-warning text-warning-foreground'
      case 'medium':
        return 'bg-info text-info-foreground'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

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

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Live Food Security Dashboard"
        description="Real-time monitoring and control centre"
        actions={
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-card border border-border">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm text-foreground">Live</span>
            </div>
            <Button variant="outline" size="sm">Refresh</Button>
          </div>
        }
      />

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 xl:grid-cols-3 h-full">
          {/* Main Map Area */}
          <div className="xl:col-span-2 p-6 space-y-6">
            {/* World Map Visualization */}
            <Card className="p-6 h-[500px]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Global Supply Network</h3>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline">Import Origins</Badge>
                  <Badge variant="outline">Distribution Centers</Badge>
                </div>
              </div>
              
              {/* Simplified World Map Representation */}
              <div className="relative h-[400px] bg-muted/20 rounded-lg border border-border flex items-center justify-center overflow-hidden">
                {/* Grid overlay */}
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 opacity-10">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="border border-border" />
                  ))}
                </div>
                
                {/* Country markers */}
                <div className="absolute inset-0">
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
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                        style={{ left: pos.x, top: pos.y }}
                        onClick={() => setSelectedCountry(origin.country)}
                      >
                        {/* Pulse ring */}
                        <div className={`absolute inset-0 w-12 h-12 -ml-6 -mt-6 rounded-full ${getRiskColor(origin.risk)} opacity-20 animate-ping`} />
                        
                        {/* Marker */}
                        <div className={`relative w-3 h-3 rounded-full ${getRiskColor(origin.risk)} ring-4 ring-background`} />
                        
                        {/* Tooltip */}
                        <div className="absolute left-6 top-0 hidden group-hover:block z-10 w-48 p-3 bg-popover border border-border rounded-lg shadow-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-sm text-foreground">{origin.country}</span>
                            <Badge className={getSeverityColor(origin.risk)}>
                              {origin.risk}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Volume:</span>
                              <span className="text-foreground font-medium">{origin.value.toLocaleString()} MT</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Risk Level:</span>
                              <span className="text-foreground font-medium capitalize">{origin.risk}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 text-xs">
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
              </div>
            </Card>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Production by Country */}
              <Card className="p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Production by Country
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={productionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="country" 
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
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              {/* Shipment Trend */}
              <Card className="p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Shipped Tonnage (6M)
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={shipmentData}>
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
                    <Line 
                      type="monotone" 
                      dataKey="shipped" 
                      stroke="hsl(var(--chart-2))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--chart-2))', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </div>

          {/* Right Panel - Alerts & Status */}
          <div className="border-l border-border bg-card/30 p-6">
            <div className="space-y-6">
              {/* Status Summary */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Active Alerts
                </h3>
                <div className="space-y-2">
                  {activeAlerts.slice(0, 6).map((alert) => (
                    <div
                      key={alert.id}
                      className="p-3 rounded-lg border border-border bg-card hover:bg-card/80 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <Badge className={getSeverityColor(alert.severity)} variant="default">
                          {alert.severity}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                      </div>
                      <h4 className="text-xs font-medium text-foreground mb-1">{alert.title}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">{alert.description}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{alert.country}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Labels */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">System Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-xs text-foreground">Overall Status</span>
                    <Badge className="bg-success text-success-foreground">Stable</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-xs text-foreground">Supply Chain</span>
                    <Badge className="bg-warning text-warning-foreground">Risky</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-xs text-foreground">Price Stability</span>
                    <Badge className="bg-success text-success-foreground">Stable</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
