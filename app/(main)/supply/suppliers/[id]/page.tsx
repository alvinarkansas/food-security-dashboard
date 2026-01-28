'use client'

import { use } from 'react'
import { PageHeader } from '@/components/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Package, Clock, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react'
import { suppliers } from '@/lib/mock-data'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function SupplierDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const supplier = suppliers.find((s) => s.id === Number.parseInt(id))

  if (!supplier) {
    return <div>Supplier not found</div>
  }

  const getRiskColor = (tier: string) => {
    switch (tier) {
      case 'Low':
        return 'bg-success text-success-foreground'
      case 'Medium':
        return 'bg-warning text-warning-foreground'
      case 'High':
        return 'bg-destructive text-destructive-foreground'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  // Mock historical data
  const fulfillmentHistory = [
    { month: 'Jan', rate: 95.2 },
    { month: 'Feb', rate: 96.1 },
    { month: 'Mar', rate: 97.8 },
    { month: 'Apr', rate: 96.5 },
    { month: 'May', rate: 97.2 },
    { month: 'Jun', rate: supplier.reliability },
  ]

  const priceHistory = [
    { month: 'Jan', price: 440 },
    { month: 'Feb', price: 445 },
    { month: 'Mar', price: 450 },
    { month: 'Apr', price: 465 },
    { month: 'May', price: 470 },
    { month: 'Jun', price: 465 },
  ]

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title={supplier.name}
        description={`${supplier.commodity} supplier based in ${supplier.country}`}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Contact Supplier</Button>
            <Button size="sm">Place Order</Button>
          </div>
        }
      />

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Key Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Location</div>
                <div className="text-sm font-semibold text-foreground">{supplier.country}</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Package className="w-5 h-5 text-success" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Capacity</div>
                <div className="text-sm font-semibold text-foreground">{supplier.capacity}</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-info/10">
                <Clock className="w-5 h-5 text-info" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Lead Time</div>
                <div className="text-sm font-semibold text-foreground">{supplier.leadTime}</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <DollarSign className="w-5 h-5 text-warning" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Price Range</div>
                <div className="text-sm font-semibold text-foreground">{supplier.priceRange}</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Performance Metrics */}
          <Card className="xl:col-span-2 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Performance Overview</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-muted/30">
                <div className="text-xs text-muted-foreground mb-2">Reliability Score</div>
                <div className="text-3xl font-semibold text-success">{supplier.reliability}%</div>
                <div className="flex items-center gap-1 text-xs text-success mt-2">
                  <TrendingUp className="w-3 h-3" />
                  <span>+2.1% vs last quarter</span>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <div className="text-xs text-muted-foreground mb-2">Risk Tier</div>
                <Badge className={getRiskColor(supplier.riskTier)} variant="default">
                  {supplier.riskTier}
                </Badge>
                <div className="text-xs text-muted-foreground mt-3">
                  Based on 12-month assessment
                </div>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <div className="text-xs text-muted-foreground mb-2">Orders Fulfilled</div>
                <div className="text-3xl font-semibold text-foreground">147</div>
                <div className="text-xs text-muted-foreground mt-2">
                  Last 12 months
                </div>
              </div>
            </div>

            {/* Fulfillment History Chart */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Fulfillment Rate History</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={fulfillmentHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    domain={[90, 100]}
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
                    dataKey="rate" 
                    stroke="hsl(var(--success))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--success))', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Risk Flags and Details */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Risk Assessment</h3>
            <div className="space-y-4">
              {supplier.riskTier === 'Low' ? (
                <>
                  <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-success mt-1.5" />
                      <div>
                        <div className="text-sm font-medium text-foreground">Stable Supplier</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          No significant risk factors identified
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-success mt-1.5" />
                      <div>
                        <div className="text-sm font-medium text-foreground">Financial Health</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Strong financial position
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-warning mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-foreground">Weather Exposure</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Located in monsoon-prone region
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-warning mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-foreground">Capacity Constraints</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Operating near maximum capacity
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="pt-4 border-t border-border">
                <div className="text-sm font-medium text-foreground mb-3">Certifications</div>
                <div className="space-y-2">
                  <Badge variant="outline">ISO 9001</Badge>
                  <Badge variant="outline" className="ml-2">HACCP</Badge>
                  <Badge variant="outline" className="ml-2">GAP</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Price History */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Historical Pricing</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={priceHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                label={{ value: '$/MT', angle: -90, position: 'insideLeft', style: { fill: 'hsl(var(--muted-foreground))' } }}
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
                dataKey="price" 
                stroke="hsl(var(--chart-4))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--chart-4))', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Current Range: {supplier.priceRange}</span>
            <span className="text-foreground">6-Month Avg: $456/MT</span>
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Supplier Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground mb-1">Primary Contact</div>
              <div className="text-foreground">operations@{supplier.name.toLowerCase().replace(/ /g, '')}.com</div>
            </div>
            <div>
              <div className="text-muted-foreground mb-1">Phone</div>
              <div className="text-foreground">+84 123 456 7890</div>
            </div>
            <div>
              <div className="text-muted-foreground mb-1">Account Manager</div>
              <div className="text-foreground">Sarah Chen</div>
            </div>
            <div>
              <div className="text-muted-foreground mb-1">Last Contact</div>
              <div className="text-foreground">3 days ago</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
