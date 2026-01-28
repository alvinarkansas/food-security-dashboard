import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { StatCard } from '@/components/stat-card'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Users,
  ArrowRight,
  AlertTriangle
} from 'lucide-react'
import { dashboardMetrics, activeAlerts, productionData } from '@/lib/mock-data'

export default function DashboardPage() {
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

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Executive Overview"
        description="High-level situational awareness and key performance indicators"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Export</Button>
            <Link href="/dashboard/live">
              <Button size="sm">
                Live Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        }
      />

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* KPI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            title="Food Security Index"
            value={dashboardMetrics.food_security_index}
            icon={Shield}
            variant="success"
            trend={{ value: '+2.1%', positive: true }}
          />
          <StatCard
            title="Availability Risk"
            value={dashboardMetrics.availability_risk}
            icon={AlertTriangle}
            variant="warning"
          />
          <StatCard
            title="Lead Time Risk"
            value={dashboardMetrics.lead_time_risk}
            icon={Clock}
            variant="success"
          />
          <StatCard
            title="Price Volatility"
            value={dashboardMetrics.price_volatility}
            icon={DollarSign}
            variant="default"
          />
          <StatCard
            title="Supplier Concentration"
            value={dashboardMetrics.supplier_concentration}
            icon={Users}
            variant="destructive"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Alerts */}
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Active Alerts</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {dashboardMetrics.alerts_active} alerts requiring attention
                </p>
              </div>
              <Link href="/risk">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {activeAlerts.slice(0, 5).map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start gap-4 p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                    </div>
                    <h4 className="text-sm font-medium text-foreground mb-1">{alert.title}</h4>
                    <p className="text-xs text-muted-foreground">{alert.description}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                        {alert.country}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                        {alert.commodity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Risks & Production Summary */}
          <div className="space-y-6">
            {/* Forecasted Disruptions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Forecast Window</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Next 30 days</span>
                  <Badge variant="outline" className="text-warning">Medium Risk</Badge>
                </div>
                <div className="space-y-2">
                  {dashboardMetrics.top_risks.map((risk, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm p-2 rounded bg-muted/30"
                    >
                      <AlertTriangle className="w-3 h-3 text-warning shrink-0" />
                      <span className="text-foreground text-xs">{risk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Production by Country */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Top Production Centers
              </h3>
              <div className="space-y-3">
                {productionData.map((item) => (
                  <div key={item.country}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-foreground">{item.country}</span>
                      <span className="text-sm font-medium text-foreground">
                        {item.value.toLocaleString()} MT
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
