'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Search, Eye, FileText } from 'lucide-react'
import { riskRegister } from '@/lib/mock-data'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function RiskRegisterPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEvent, setSelectedEvent] = useState<typeof riskRegister[0] | null>(null)

  const filteredEvents = riskRegister.filter((event) =>
    event.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.geography.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.commodity.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getEffectivenessColor = (score: number) => {
    if (score >= 85) return 'text-success'
    if (score >= 70) return 'text-warning'
    return 'text-destructive'
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Risk Register"
        description="Historical disruption events and mitigation effectiveness"
        actions={
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Export Register
          </Button>
        }
      />

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Search and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <Card className="lg:col-span-3 p-4">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search events by type, geography, or commodity..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
          </Card>

          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-semibold text-foreground">{riskRegister.length}</div>
              <div className="text-xs text-muted-foreground mt-1">Total Events</div>
            </div>
          </Card>
        </div>

        {/* Info Banner */}
        <Card className="p-4 bg-muted/30 border-l-4 border-l-info">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-info shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-foreground mb-1">
                Audit-Safe Memory Layer
              </div>
              <div className="text-xs text-muted-foreground">
                This register is read-only for most users to maintain audit integrity. 
                Historical disruptions inform risk assessment and decision intelligence models.
              </div>
            </div>
          </div>
        </Card>

        {/* Events Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Geography</TableHead>
                <TableHead>Commodity</TableHead>
                <TableHead>Outcome</TableHead>
                <TableHead>Effectiveness</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{event.eventType}</TableCell>
                  <TableCell className="text-muted-foreground">{event.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{event.geography}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{event.commodity}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{event.outcome}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${getEffectivenessColor(event.effectiveness)}`}>
                        {event.effectiveness}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedEvent(event)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{event.eventType}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Date</div>
                              <div className="text-sm font-medium text-foreground">{event.date}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Geography</div>
                              <Badge variant="outline">{event.geography}</Badge>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Commodity</div>
                              <Badge variant="outline">{event.commodity}</Badge>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Effectiveness Score</div>
                              <div className={`text-sm font-medium ${getEffectivenessColor(event.effectiveness)}`}>
                                {event.effectiveness}%
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="text-sm text-muted-foreground mb-2">What Happened</div>
                            <Card className="p-4 bg-muted/30">
                              <p className="text-sm text-foreground">{event.outcome}</p>
                            </Card>
                          </div>

                          <div>
                            <div className="text-sm text-muted-foreground mb-2">Mitigation Action</div>
                            <Card className="p-4 bg-muted/30">
                              <p className="text-sm text-foreground">{event.mitigation}</p>
                            </Card>
                          </div>

                          <div>
                            <div className="text-sm text-muted-foreground mb-2">Lessons Learned</div>
                            <Card className="p-4 bg-muted/30">
                              <ul className="text-sm text-foreground space-y-1 list-disc list-inside">
                                <li>Early warning systems proved effective in detection</li>
                                <li>Alternative supplier network activation time can be improved</li>
                                <li>Communication protocols with stakeholders were adequate</li>
                              </ul>
                            </Card>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Average Effectiveness</div>
            <div className="text-3xl font-semibold text-success">
              {Math.round(riskRegister.reduce((sum, e) => sum + e.effectiveness, 0) / riskRegister.length)}%
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Most Common Event</div>
            <div className="text-xl font-semibold text-foreground">Weather Disruption</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Avg. Resolution Time</div>
            <div className="text-3xl font-semibold text-foreground">12 days</div>
          </Card>
        </div>
      </div>
    </div>
  )
}
