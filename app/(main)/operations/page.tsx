import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { AlertCircle, Clock, CheckCircle2, Eye, BookOpen } from 'lucide-react'
import { incidents, playbooks } from '@/lib/mock-data'

export default function OperationsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'bg-warning text-warning-foreground'
      case 'monitoring':
        return 'bg-info text-info-foreground'
      case 'resolved':
        return 'bg-success text-success-foreground'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive text-destructive-foreground'
      case 'medium':
        return 'bg-warning text-warning-foreground'
      case 'low':
        return 'bg-info text-info-foreground'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Operations Center"
        description="Incident tracking and response playbooks"
        actions={
          <Link href="/operations/playbooks">
            <Button size="sm">
              <BookOpen className="mr-2 h-4 w-4" />
              View Playbooks
            </Button>
          </Link>
        }
      />

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-xs text-muted-foreground mb-2">Total Incidents</div>
            <div className="text-2xl font-semibold text-foreground">{incidents.length}</div>
          </Card>
          <Card className="p-4 border-l-4 border-l-warning">
            <div className="text-xs text-muted-foreground mb-2">In Progress</div>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-semibold text-warning">
                {incidents.filter(i => i.status === 'in-progress').length}
              </div>
              <AlertCircle className="w-4 h-4 text-warning" />
            </div>
          </Card>
          <Card className="p-4 border-l-4 border-l-info">
            <div className="text-xs text-muted-foreground mb-2">Monitoring</div>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-semibold text-info">
                {incidents.filter(i => i.status === 'monitoring').length}
              </div>
              <Eye className="w-4 h-4 text-info" />
            </div>
          </Card>
          <Card className="p-4 border-l-4 border-l-success">
            <div className="text-xs text-muted-foreground mb-2">Resolved</div>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-semibold text-success">
                {incidents.filter(i => i.status === 'resolved').length}
              </div>
              <CheckCircle2 className="w-4 h-4 text-success" />
            </div>
          </Card>
        </div>

        {/* Incidents Table */}
        <Card>
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Active Incidents</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Operational response tracking with SLA timers
            </p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Incident</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>SLA Timer</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incidents.map((incident) => (
                <TableRow key={incident.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="font-medium text-foreground">{incident.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Created: {new Date(incident.created).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(incident.status)}>
                      {incident.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(incident.priority)}>
                      {incident.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-foreground">
                    {incident.owner}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className={`text-sm font-medium ${
                        incident.status === 'resolved' ? 'text-success' :
                        incident.slaTimer.includes('remaining') ? 'text-foreground' :
                        'text-foreground'
                      }`}>
                        {incident.slaTimer}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Playbooks Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Response Playbooks</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Standardized response procedures for common incidents
              </p>
            </div>
            <Link href="/operations/playbooks">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {playbooks.map((playbook) => (
              <Card key={playbook.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-foreground mb-1">
                      {playbook.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      {playbook.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <Badge variant="outline">{playbook.category}</Badge>
                      </div>
                      <div className="text-muted-foreground">
                        {playbook.steps} steps
                      </div>
                      <div className="text-muted-foreground">
                        Last used: {playbook.lastUsed}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
