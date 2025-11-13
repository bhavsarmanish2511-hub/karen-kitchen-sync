import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Filter,
  Globe,
  Factory,
  Package,
  Truck,
  AlertCircle,
  Activity,
} from "lucide-react";
import { useDashboardFilters } from "@/contexts/DashboardFiltersContext";
import {
  products,
  regions,
  getFilteredPlants,
  getFilteredSKUs,
  getFilteredSuppliers,
} from "@/data/dashboardFiltersData";

import logo from "../../assets/Castrol.png";

export function CommandHeader() {
  const { filters, setFilters } = useDashboardFilters();

  // Get filtered options based on parent selections
  const availablePlants = getFilteredPlants(filters.selectedProduct, filters.selectedRegion);
  const availableSKUs = getFilteredSKUs(filters.selectedProduct, filters.selectedRegion);
  const availableSuppliers = getFilteredSuppliers(filters.selectedProduct, filters.selectedRegion);

  return (
    <div className="bg-gradient-card border-b border-border">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <img
                  src={logo}
                  alt="Castrol Logo"
                  className="h-12 w-13 object-contain"
                />
                {/* <Activity className="h-6 w-6 text-primary" /> */}
                <h1 className="text-2xl font-bold text-foreground">
                  Supply Chain Command Center
                </h1>
              </div>
              <Badge
                variant="secondary"
                className="bg-success/20 text-success border-success/30"
              >
                <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
                LIVE
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Real-time visibility and control across the Castrol supply chain
              network
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Badge
              variant="outline"
              className="border-critical/30 text-critical"
            >
              <AlertCircle className="h-3 w-3 mr-1" />6 Critical Alerts
            </Badge>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Last 7 Days
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-3 text-sm flex-wrap">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Filters:</span>
          </div>

          <Select
            value={filters.selectedProduct}
            onValueChange={(value) => setFilters({ selectedProduct: value })}
          >
            <SelectTrigger className="h-8 w-[200px] bg-background">
              <Package className="h-3 w-3 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background z-50">
              {products.map((product) => (
                <SelectItem key={product} value={product}>
                  {product}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.selectedRegion}
            onValueChange={(value) => setFilters({ selectedRegion: value })}
          >
            <SelectTrigger className="h-8 w-[160px] bg-background">
              <Globe className="h-3 w-3 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background z-50">
              {regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.selectedPlant}
            onValueChange={(value) => setFilters({ selectedPlant: value })}
          >
            <SelectTrigger className="h-8 w-[160px] bg-background">
              <Factory className="h-3 w-3 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background z-50">
              {availablePlants.map((plant) => (
                <SelectItem key={plant} value={plant}>
                  {plant}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.selectedSKU}
            onValueChange={(value) => setFilters({ selectedSKU: value })}
          >
            <SelectTrigger className="h-8 w-[160px] bg-background">
              <Package className="h-3 w-3 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background z-50">
              {availableSKUs.map((sku) => (
                <SelectItem key={sku} value={sku}>
                  {sku}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.selectedSupplier}
            onValueChange={(value) => setFilters({ selectedSupplier: value })}
          >
            <SelectTrigger className="h-8 w-[160px] bg-background">
              <Truck className="h-3 w-3 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background z-50">
              {availableSuppliers.map((supplier) => (
                <SelectItem key={supplier} value={supplier}>
                  {supplier}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
