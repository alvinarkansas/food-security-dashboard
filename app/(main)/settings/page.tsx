'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Database, Users, Building2, Upload } from 'lucide-react'

export default function SettingsPage() {
  const [tenantType, setTenantType] = useState('government')

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Settings"
        description="System configuration, data management, and user access"
      />

      <div className="flex-1 p-6 overflow-auto">
        <Tabs defaultValue="data" className="space-y-6">
          <TabsList>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="tenant">Tenant</TabsTrigger>
          </TabsList>

          {/* Data Settings */}
          <TabsContent value="data" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Database className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Data Onboarding</h3>
              </div>

              <div className="space-y-6">
                {/* CSV Upload */}
                <div className="space-y-3">
                  <Label>CSV Upload</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm font-medium text-foreground mb-1">
                      Drop CSV files here or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supported formats: supplier data, risk events, production metrics
                    </p>
                  </div>
                </div>

                {/* Refresh Cadence */}
                <div className="space-y-2">
                  <Label htmlFor="refresh">Data Refresh Cadence</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger id="refresh">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* API Connectors */}
                <div className="space-y-3">
                  <Label>API Connectors</Label>
                  <div className="space-y-2">
                    {['Weather API', 'Price Feeds', 'News Aggregator'].map((connector) => (
                      <div key={connector} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <span className="text-sm text-foreground">{connector}</span>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full">Save Data Settings</Button>
              </div>
            </Card>
          </TabsContent>

          {/* User Management */}
          <TabsContent value="users" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">User Management</h3>
                </div>
                <Button size="sm">Add User</Button>
              </div>

              <div className="space-y-4">
                {/* User List */}
                {[
                  { name: 'Sarah Chen', email: 'sarah.chen@gov.sg', role: 'Executive Viewer' },
                  { name: 'Michael Wong', email: 'michael.wong@gov.sg', role: 'Analyst' },
                  { name: 'Lisa Tan', email: 'lisa.tan@gov.sg', role: 'Operator' },
                  { name: 'Admin User', email: 'admin@gov.sg', role: 'Admin' }
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div>
                      <div className="text-sm font-medium text-foreground">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Select defaultValue={user.role}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Executive Viewer">Executive Viewer</SelectItem>
                          <SelectItem value="Analyst">Analyst</SelectItem>
                          <SelectItem value="Operator">Operator</SelectItem>
                          <SelectItem value="Admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="sm">Remove</Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Role Descriptions */}
              <div className="mt-6 p-4 rounded-lg bg-muted/30">
                <div className="text-sm font-medium text-foreground mb-3">Role Permissions</div>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div><strong>Executive Viewer:</strong> Read-only access to dashboards and reports</div>
                  <div><strong>Analyst:</strong> Risk analysis, scenarios, models</div>
                  <div><strong>Operator:</strong> Incidents, supplier switching, playbooks</div>
                  <div><strong>Admin:</strong> Full access including data, users, and configuration</div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Tenant Configuration */}
          <TabsContent value="tenant" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Tenant Configuration</h3>
              </div>

              <div className="space-y-6">
                {/* Tenant Type */}
                <div className="space-y-2">
                  <Label htmlFor="tenant-type">Tenant Type</Label>
                  <Select value={tenantType} onValueChange={setTenantType}>
                    <SelectTrigger id="tenant-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="government">Government Agency</SelectItem>
                      <SelectItem value="producer">Producer / Manufacturer</SelectItem>
                      <SelectItem value="distributor">Distributor / Wholesaler</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Determines available features and default terminology
                  </p>
                </div>

                {/* Organization Name */}
                <div className="space-y-2">
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input id="org-name" defaultValue="Food Security Authority" />
                </div>

                {/* Region */}
                <div className="space-y-2">
                  <Label htmlFor="region">Primary Region</Label>
                  <Select defaultValue="southeast-asia">
                    <SelectTrigger id="region">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="southeast-asia">Southeast Asia</SelectItem>
                      <SelectItem value="south-asia">South Asia</SelectItem>
                      <SelectItem value="east-asia">East Asia</SelectItem>
                      <SelectItem value="middle-east">Middle East</SelectItem>
                      <SelectItem value="africa">Africa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Feature Toggles */}
                <div className="space-y-3">
                  <Label>Feature Toggles</Label>
                  <div className="space-y-2">
                    {[
                      { name: 'Risk Heatmap', enabled: true },
                      { name: 'Scenario Simulator', enabled: true },
                      { name: 'AI Agents', enabled: true },
                      { name: 'Advanced Analytics', enabled: false }
                    ].map((feature) => (
                      <div key={feature.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <span className="text-sm text-foreground">{feature.name}</span>
                        <Button 
                          variant={feature.enabled ? "default" : "outline"} 
                          size="sm"
                        >
                          {feature.enabled ? 'Enabled' : 'Disabled'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Terminology Overrides */}
                <div className="space-y-3">
                  <Label>Terminology Overrides</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="term-supplier">Supplier Term</Label>
                      <Input id="term-supplier" defaultValue="Supplier" placeholder="e.g., Vendor, Partner" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="term-commodity">Commodity Term</Label>
                      <Input id="term-commodity" defaultValue="Commodity" placeholder="e.g., Product, Good" />
                    </div>
                  </div>
                </div>

                <Button className="w-full">Save Tenant Settings</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
