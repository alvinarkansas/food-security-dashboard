"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, AlertCircle, TrendingUp, Globe, Package } from "lucide-react";
import { MapContainer } from "@/components/map/map-container";
import { activeAlerts, shipmentData, productionData } from "@/lib/mock-data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import Link from "next/link";

const ALERT_CATEGORIES = [
  { value: "all", label: "All categories" },
  { value: "weather", label: "Weather" },
  { value: "diseases", label: "Diseases" },
  { value: "geopolitical", label: "Geo political" },
  { value: "policy", label: "Policy decision" },
  { value: "logistics", label: "Logistics disruption" },
];

const getCategoryLabel = (value: string): string => {
  return ALERT_CATEGORIES.find((cat) => cat.value === value)?.label || value;
};

export default function DashboardPage() {
  const [alertCategory, setAlertCategory] = useState<string>("all");
  const [alertTab, setAlertTab] = useState<"government" | "commercial">(
    "government",
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-destructive text-destructive-foreground";
      case "high":
        return "bg-warning text-warning-foreground";
      case "medium":
        return "bg-info text-info-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

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
            <Link href="/overview">
              <Button variant="default" size="sm">
                Alert
              </Button>
            </Link>
          </div>
        }
      />

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 xl:grid-cols-3 h-full">
          {/* Main Map Area */}
          <div className="xl:col-span-2 p-6 space-y-6">
            {/* World Map Visualization */}
            <Card className="pb-0 sm:p-6 h-125">
              <div className="flex flex-col sm:flex-row gap-2 items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Global Supply Network
                  </h3>
                </div>
                <div className="flex gap-2 items-center relative z-[1001]">
                  <div className="hidden lg:flex shrink-0 px-3 py-1.5 rounded-md bg-card border border-border">
                    <span className="text-sm text-foreground">
                      Import Origins
                    </span>
                  </div>
                  <div className="hidden lg:flex shrink-0 px-3 py-1.5 rounded-md bg-card border border-border">
                    <span className="text-sm text-foreground">
                      Distribution Centers
                    </span>
                  </div>
                  <Select
                    value={alertCategory}
                    onValueChange={setAlertCategory}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent className="z-[1002]">
                      {ALERT_CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Interactive World Map */}
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <MapContainer />

                {/* Legend */}
                <div className="absolute bottom-4 left-4 z-[1000] bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 text-xs">
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
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="grey"
                    />
                    <XAxis
                      dataKey="country"
                      stroke="black"
                      fontSize={12}
                    />
                    <YAxis
                      stroke="black"
                      fontSize={12}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid grey",
                        borderRadius: "0.5rem",
                        color: "hsl(var(--popover-foreground))",
                      }}
                    />
                    <Bar
                      dataKey="value"
                      fill="#2955d3"
                      radius={[4, 4, 0, 0]}
                    />
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
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
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
                        backgroundColor: "white",
                        border: "1px solid grey",
                        borderRadius: "0.5rem",
                        color: "hsl(var(--popover-foreground))",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="shipped"
                      stroke="#2955d3"
                      strokeWidth={2}
                      dot={{ fill: "#2955d3", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </div>

          {/* Right Panel - Alerts & Status */}
          <div className="border-l border-border bg-card/30 p-6">
            <div className="space-y-6">
              {/* Alerts with Tabs */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Active Alerts
                  </h3>
                </div>

                <Tabs
                  value={alertTab}
                  onValueChange={(val) =>
                    setAlertTab(val as "government" | "commercial")
                  }
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="government">Government</TabsTrigger>
                    <TabsTrigger value="commercial">Commercial</TabsTrigger>
                  </TabsList>

                  <TabsContent value="government" className="space-y-2">
                    {activeAlerts.slice(0, 6).map((alert) => (
                      <div
                        key={alert.id}
                        className="p-3 rounded-lg border border-border bg-card hover:bg-card/80 transition-colors cursor-pointer relative"
                      >
                        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                          <Badge variant="secondary" className="text-xs">
                            {getCategoryLabel(alert.category)}
                          </Badge>
                          <span className="text-xs font-semibold text-primary">
                            Risk: {alert.riskScore}/100
                          </span>
                        </div>
                        <div className="flex items-start gap-2 mb-2">
                          <Badge
                            className={getSeverityColor(alert.severity)}
                            variant="default"
                          >
                            {alert.severity}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {alert.timestamp}
                          </span>
                        </div>
                        <h4 className="text-xs font-medium text-foreground mb-2">
                          {alert.title}
                        </h4>

                        {/* Recommended Actions */}
                        <div className="mb-2 space-y-1">
                          <span className="text-xs font-semibold text-foreground">
                            Recommended Actions:
                          </span>
                          {alert.government.slice(0, 2).map((action, idx) => (
                            <div
                              key={idx}
                              className="text-xs text-muted-foreground flex gap-2"
                            >
                              <span className="text-primary">•</span>
                              <span>{action}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {alert.country}
                          </span>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="commercial" className="space-y-2">
                    {activeAlerts.slice(0, 6).map((alert) => (
                      <div
                        key={alert.id}
                        className="p-3 rounded-lg border border-border bg-card hover:bg-card/80 transition-colors cursor-pointer relative"
                      >
                        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                          <Badge variant="secondary" className="text-xs">
                            {getCategoryLabel(alert.category)}
                          </Badge>
                          <span className="text-xs font-semibold text-primary">
                            Risk: {alert.riskScore}/100
                          </span>
                        </div>
                        <div className="flex items-start gap-2 mb-2">
                          <Badge
                            className={getSeverityColor(alert.severity)}
                            variant="default"
                          >
                            {alert.severity}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {alert.timestamp}
                          </span>
                        </div>
                        <h4 className="text-xs font-medium text-foreground mb-2">
                          {alert.title}
                        </h4>

                        {/* Recommended Actions */}
                        <div className="mb-2 space-y-1">
                          <span className="text-xs font-semibold text-foreground">
                            Recommended Actions:
                          </span>
                          {alert.commercial.slice(0, 2).map((action, idx) => (
                            <div
                              key={idx}
                              className="text-xs text-muted-foreground flex gap-2"
                            >
                              <span className="text-primary">•</span>
                              <span>{action}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {alert.country}
                          </span>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </div>

              {/* Risk Labels */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  System Status
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-xs text-foreground">
                      Overall Status
                    </span>
                    <Badge className="bg-success text-success-foreground">
                      Stable
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-xs text-foreground">
                      Supply Chain
                    </span>
                    <Badge className="bg-warning text-warning-foreground">
                      Risky
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                    <span className="text-xs text-foreground">
                      Price Stability
                    </span>
                    <Badge className="bg-success text-success-foreground">
                      Stable
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
