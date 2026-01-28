import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LineChart, Activity, CheckCircle2, Loader2, TrendingUp } from 'lucide-react'
import { models } from '@/lib/mock-data'

export default function ModelsPage() {
  const runningCount = models.filter(m => m.status === 'running').length
  const completedCount = models.filter(m => m.status === 'completed').length
  const avgQuality = (models.reduce((sum, m) => sum + m.predictionQuality, 0) / models.length).toFixed(1)

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Model Registry"
        description="Forecasting models, status, and prediction quality"
        actions={
          <div className="flex flex-col sm:flex-row gap-2">
            <Link href="/models/performance">
              <Button variant="outline" size="sm">Model Performance</Button>
            </Link>
            <Link href="/models/forecast">
              <Button size="sm">Create Forecast</Button>
            </Link>
          </div>
        }
      />

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-xs text-muted-foreground mb-2">Total Models</div>
            <div className="text-2xl font-semibold text-foreground">{models.length}</div>
          </Card>
          <Card className="p-4 border-l-4 border-l-primary">
            <div className="text-xs text-muted-foreground mb-2">Running</div>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-semibold text-primary">{runningCount}</div>
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
            </div>
          </Card>
          <Card className="p-4 border-l-4 border-l-success">
            <div className="text-xs text-muted-foreground mb-2">Completed</div>
            <div className="text-2xl font-semibold text-success">{completedCount}</div>
          </Card>
          <Card className="p-4 border-l-4 border-l-chart-2">
            <div className="text-xs text-muted-foreground mb-2">Avg. Quality</div>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-semibold text-foreground">{avgQuality}%</div>
              <TrendingUp className="w-4 h-4 text-success" />
            </div>
          </Card>
        </div>

        {/* Model Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {models.map((model) => (
            <Card key={model.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    {model.status === 'running' ? (
                      <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{model.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{model.type}</p>
                  </div>
                </div>
                <Badge 
                  variant={model.status === 'running' ? 'default' : 'outline'}
                  className={model.status === 'running' ? 'bg-primary text-primary-foreground' : 'bg-success text-success-foreground'}
                >
                  {model.status}
                </Badge>
              </div>

              <div className="space-y-4">
                {/* Prediction Quality */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Prediction Quality</span>
                    <span className="text-sm font-medium text-foreground">{model.predictionQuality}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        model.predictionQuality >= 90 ? 'bg-success' :
                        model.predictionQuality >= 85 ? 'bg-chart-2' :
                        'bg-warning'
                      }`}
                      style={{ width: `${model.predictionQuality}%` }}
                    />
                  </div>
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-muted-foreground mb-1">Last Updated</div>
                    <div className="text-foreground">{model.lastUpdated}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Model Type</div>
                    <div className="text-foreground">{model.type}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Activity className="mr-2 h-3 w-3" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <LineChart className="mr-2 h-3 w-3" />
                    Performance
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Model Performance Summary */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Performance Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">High Performance (≥90%)</div>
              <div className="text-2xl font-semibold text-success">
                {models.filter(m => m.predictionQuality >= 90).length} models
              </div>
              <div className="text-xs text-muted-foreground">Excellent prediction accuracy</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Good Performance (85-89%)</div>
              <div className="text-2xl font-semibold text-chart-2">
                {models.filter(m => m.predictionQuality >= 85 && m.predictionQuality < 90).length} models
              </div>
              <div className="text-xs text-muted-foreground">Reliable for decision support</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Needs Improvement (&lt;85%)</div>
              <div className="text-2xl font-semibold text-warning">
                {models.filter(m => m.predictionQuality < 85).length} models
              </div>
              <div className="text-xs text-muted-foreground">May require retraining</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
