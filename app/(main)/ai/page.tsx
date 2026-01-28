'use client'

import { PageHeader } from '@/components/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Cpu, CheckCircle2, ArrowRight, Eye } from 'lucide-react'
import Link from 'next/link'

const agents = [
  {
    id: 1,
    name: 'Risk Aggregation',
    description: 'Aggregates risk signals from multiple sources',
    status: 'active',
    inputs: ['Weather Data', 'Price Feeds', 'News Events'],
    outputs: ['Risk Score', 'Alert Triggers'],
    confidence: 94.2
  },
  {
    id: 2,
    name: 'Supplier Ranking',
    description: 'Ranks alternative suppliers by reliability and cost',
    status: 'active',
    inputs: ['Supplier Database', 'Performance Metrics', 'Capacity Data'],
    outputs: ['Ranked List', 'Confidence Scores'],
    confidence: 96.5
  },
  {
    id: 3,
    name: 'Report Generation',
    description: 'Generates executive-ready reports and summaries',
    status: 'idle',
    inputs: ['Dashboard Metrics', 'Risk Data', 'Supply Data'],
    outputs: ['PDF Report', 'PowerPoint Slides'],
    confidence: 91.8
  },
  {
    id: 4,
    name: 'Forecast Synthesis',
    description: 'Synthesizes forecasts from multiple models',
    status: 'active',
    inputs: ['Price Model', 'Demand Model', 'Weather Model'],
    outputs: ['Unified Forecast', 'Uncertainty Bands'],
    confidence: 89.3
  }
]

export default function AIAgenticPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="AI Agent Orchestration"
        description="Visual agent workflow - deterministic flows only, no free-text chat"
        actions={
          <Link href="/ai/training">
            <Button size="sm">Model Training</Button>
          </Link>
        }
      />

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Info Banner */}
        <Card className="p-4 bg-primary/10 border-l-4 border-l-primary">
          <div className="flex items-start gap-3">
            <Cpu className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-foreground mb-1">
                Deterministic AI Workflows
              </div>
              <div className="text-xs text-muted-foreground">
                This platform uses structured agent flows with predefined inputs/outputs. 
                All AI operations are traceable, auditable, and explainable for regulatory compliance.
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Agent Canvas */}
          <Card className="xl:col-span-2 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Agent Workflow Canvas</h3>
            
            {/* Simplified visual flow */}
            <div className="relative">
              {/* Flow visualization */}
              <div className="space-y-6">
                {/* Input Layer */}
                <div>
                  <div className="text-xs font-medium text-muted-foreground mb-3">INPUT LAYER</div>
                  <div className="flex gap-3 flex-wrap">
                    {['Weather Data', 'Price Feeds', 'Supplier DB', 'News Events'].map((input, i) => (
                      <div key={i} className="px-3 py-2 rounded-lg bg-muted border border-border text-xs font-medium text-foreground">
                        {input}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Flow connector */}
                <div className="flex justify-center">
                  <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90" />
                </div>

                {/* Processing Layer */}
                <div>
                  <div className="text-xs font-medium text-muted-foreground mb-3">PROCESSING LAYER</div>
                  <div className="grid grid-cols-2 gap-3">
                    {agents.slice(0, 4).map((agent) => (
                      <div key={agent.id} className="p-4 rounded-lg border-2 border-border bg-card hover:border-primary transition-all cursor-pointer">
                        <div className="flex items-center gap-2 mb-2">
                          <Cpu className="w-4 h-4 text-primary" />
                          <span className="text-sm font-semibold text-foreground">{agent.name}</span>
                        </div>
                        <Badge 
                          variant={agent.status === 'active' ? 'default' : 'outline'}
                          className={agent.status === 'active' ? 'bg-success text-success-foreground' : ''}
                        >
                          {agent.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Flow connector */}
                <div className="flex justify-center">
                  <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90" />
                </div>

                {/* Output Layer */}
                <div>
                  <div className="text-xs font-medium text-muted-foreground mb-3">OUTPUT LAYER</div>
                  <div className="flex gap-3 flex-wrap">
                    {['Risk Scores', 'Ranked Suppliers', 'Forecasts', 'Reports'].map((output, i) => (
                      <div key={i} className="px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
                        {output}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-muted/30">
              <div className="text-xs text-muted-foreground">
                <strong>Note:</strong> This is a visual representation of deterministic agent flows. 
                All operations follow predefined logic paths with no generative AI or free-text processing.
              </div>
            </div>
          </Card>

          {/* Agent Details Panel */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Active Agents</h3>
            <div className="space-y-4">
              {agents.map((agent) => (
                <div key={agent.id} className="p-4 rounded-lg border border-border bg-card/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">{agent.name}</span>
                    </div>
                    {agent.status === 'active' && (
                      <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{agent.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Confidence</span>
                    <span className="text-sm font-semibold text-success">{agent.confidence}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Trace Panel */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Execution Trace</h3>
          <div className="space-y-3">
            {[
              { agent: 'Risk Aggregation', action: 'Processed 247 signals', confidence: 94.2, time: '2s ago' },
              { agent: 'Supplier Ranking', action: 'Ranked 5 alternatives', confidence: 96.5, time: '5s ago' },
              { agent: 'Forecast Synthesis', action: 'Generated 30-day forecast', confidence: 89.3, time: '12s ago' },
            ].map((trace, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <div>
                    <div className="text-sm font-medium text-foreground">{trace.agent}</div>
                    <div className="text-xs text-muted-foreground">{trace.action}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Confidence</div>
                    <div className="text-sm font-semibold text-success">{trace.confidence}%</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{trace.time}</div>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
