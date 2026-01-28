'use client'

import { useState } from 'react'
import Link from 'next/link'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, ArrowRight } from 'lucide-react'
import { suppliers } from '@/lib/mock-data'

export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [countryFilter, setCountryFilter] = useState('all')
  const [riskFilter, setRiskFilter] = useState('all')

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.commodity.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCountry = countryFilter === 'all' || supplier.country === countryFilter
    const matchesRisk = riskFilter === 'all' || supplier.riskTier === riskFilter
    
    return matchesSearch && matchesCountry && matchesRisk
  })

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

  const getReliabilityColor = (score: number) => {
    if (score >= 95) return 'text-success'
    if (score >= 90) return 'text-warning'
    return 'text-destructive'
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Supplier Directory"
        description="Master supplier database with performance metrics"
        actions={
          <Link href="/supply/alternatives">
            <Button size="sm">
              Alternative Suppliers
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        }
      />

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Filters */}
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 flex items-center gap-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search suppliers by name or commodity..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            <div>
              <Select value={countryFilter} onValueChange={setCountryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  <SelectItem value="Vietnam">Vietnam</SelectItem>
                  <SelectItem value="Thailand">Thailand</SelectItem>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="Malaysia">Malaysia</SelectItem>
                  <SelectItem value="Indonesia">Indonesia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Risk Tiers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Tiers</SelectItem>
                  <SelectItem value="Low">Low Risk</SelectItem>
                  <SelectItem value="Medium">Medium Risk</SelectItem>
                  <SelectItem value="High">High Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-xs text-muted-foreground mb-2">Total Suppliers</div>
            <div className="text-2xl font-semibold text-foreground">{suppliers.length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-xs text-muted-foreground mb-2">Average Reliability</div>
            <div className="text-2xl font-semibold text-success">
              {(suppliers.reduce((sum, s) => sum + s.reliability, 0) / suppliers.length).toFixed(1)}%
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-xs text-muted-foreground mb-2">Low Risk Tier</div>
            <div className="text-2xl font-semibold text-foreground">
              {suppliers.filter(s => s.riskTier === 'Low').length}
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-xs text-muted-foreground mb-2">Countries Covered</div>
            <div className="text-2xl font-semibold text-foreground">
              {new Set(suppliers.map(s => s.country)).size}
            </div>
          </Card>
        </div>

        {/* Suppliers Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Commodity</TableHead>
                <TableHead>Reliability</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Lead Time</TableHead>
                <TableHead>Risk Tier</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.map((supplier) => (
                <TableRow key={supplier.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{supplier.country}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{supplier.commodity}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${getReliabilityColor(supplier.reliability)}`}>
                      {supplier.reliability}%
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{supplier.capacity}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{supplier.leadTime}</TableCell>
                  <TableCell>
                    <Badge className={getRiskColor(supplier.riskTier)}>
                      {supplier.riskTier}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/supply/suppliers/${supplier.id}`}>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Risk Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Low Risk</h3>
              <Badge className="bg-success text-success-foreground">
                {suppliers.filter(s => s.riskTier === 'Low').length}
              </Badge>
            </div>
            <div className="space-y-2">
              {suppliers.filter(s => s.riskTier === 'Low').map(s => (
                <div key={s.id} className="text-xs text-muted-foreground">
                  {s.name} - {s.reliability}%
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Medium Risk</h3>
              <Badge className="bg-warning text-warning-foreground">
                {suppliers.filter(s => s.riskTier === 'Medium').length}
              </Badge>
            </div>
            <div className="space-y-2">
              {suppliers.filter(s => s.riskTier === 'Medium').map(s => (
                <div key={s.id} className="text-xs text-muted-foreground">
                  {s.name} - {s.reliability}%
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">High Risk</h3>
              <Badge className="bg-destructive text-destructive-foreground">
                {suppliers.filter(s => s.riskTier === 'High').length}
              </Badge>
            </div>
            <div className="space-y-2">
              {suppliers.filter(s => s.riskTier === 'High').map(s => (
                <div key={s.id} className="text-xs text-muted-foreground">
                  {s.name} - {s.reliability}%
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
