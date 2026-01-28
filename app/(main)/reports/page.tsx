import { PageHeader } from '@/components/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText, Download, Calendar, FileImage, Eye } from 'lucide-react'

const reportTemplates = [
  {
    id: 1,
    name: 'Weekly Food Security Outlook',
    description: 'Executive summary of food security status, risks, and forecasts',
    frequency: 'Weekly',
    lastGenerated: '2 days ago',
    format: ['PDF', 'PPT']
  },
  {
    id: 2,
    name: 'Scenario Impact Analysis',
    description: 'Detailed analysis of simulated scenarios and recommended actions',
    frequency: 'On-Demand',
    lastGenerated: '5 days ago',
    format: ['PDF']
  },
  {
    id: 3,
    name: 'Supplier Performance Report',
    description: 'Quarterly assessment of supplier reliability and risk tiers',
    frequency: 'Quarterly',
    lastGenerated: '12 days ago',
    format: ['PDF', 'Excel']
  },
  {
    id: 4,
    name: 'Risk Register Summary',
    description: 'Historical disruptions and mitigation effectiveness',
    frequency: 'Monthly',
    lastGenerated: '8 days ago',
    format: ['PDF']
  },
  {
    id: 5,
    name: 'Model Performance Audit',
    description: 'AI model accuracy, stability, and explainability metrics',
    frequency: 'Monthly',
    lastGenerated: '3 days ago',
    format: ['PDF', 'PPT']
  }
]

const recentReports = [
  {
    id: 1,
    title: 'Weekly Outlook - June 2024',
    generated: 'Jun 15, 2024',
    type: 'Weekly Outlook',
    size: '2.4 MB'
  },
  {
    id: 2,
    title: 'Monsoon Scenario Impact',
    generated: 'Jun 12, 2024',
    type: 'Scenario Analysis',
    size: '1.8 MB'
  },
  {
    id: 3,
    title: 'Q2 2024 Supplier Assessment',
    generated: 'Jun 10, 2024',
    type: 'Supplier Report',
    size: '3.2 MB'
  }
]

export default function ReportsPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Reports"
        description="Executive-ready outputs and automated report generation"
      />

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-xs text-muted-foreground mb-2">Report Templates</div>
            <div className="text-2xl font-semibold text-foreground">{reportTemplates.length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-xs text-muted-foreground mb-2">Generated This Month</div>
            <div className="text-2xl font-semibold text-primary">24</div>
          </Card>
          <Card className="p-4">
            <div className="text-xs text-muted-foreground mb-2">Scheduled Reports</div>
            <div className="text-2xl font-semibold text-foreground">8</div>
          </Card>
          <Card className="p-4">
            <div className="text-xs text-muted-foreground mb-2">Export Formats</div>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline">PDF</Badge>
              <Badge variant="outline">PPT</Badge>
              <Badge variant="outline">Excel</Badge>
            </div>
          </Card>
        </div>

        {/* Report Templates */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Report Templates</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {reportTemplates.map((template) => (
              <div key={template.id} className="p-5 rounded-lg border border-border bg-card hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-foreground mb-1">
                      {template.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      {template.description}
                    </p>
                    
                    <div className="flex items-center gap-4 mb-4 text-xs">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{template.frequency}</span>
                      </div>
                      <div className="text-muted-foreground">
                        Last: {template.lastGenerated}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="default">
                        <Download className="mr-2 h-3 w-3" />
                        Generate
                      </Button>
                      <div className="flex gap-1">
                        {template.format.map((format) => (
                          <Badge key={format} variant="outline" className="text-xs">
                            {format}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Reports */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Recent Reports</h3>
            <Button variant="outline" size="sm">View Archive</Button>
          </div>
          <div className="space-y-3">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-muted">
                    <FileImage className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{report.title}</div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span>{report.type}</span>
                      <span>•</span>
                      <span>{report.generated}</span>
                      <span>•</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Export Options */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Export Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">PDF</span>
              </div>
              <p className="text-xs text-muted-foreground">
                High-quality PDF reports with charts and tables
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <FileImage className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">PowerPoint</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Presentation-ready slides for executive briefings
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Excel</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Raw data exports for further analysis
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
