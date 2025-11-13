import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface DashboardFilters {
  selectedProduct: string;
  selectedRegion: string;
  selectedPlant: string;
  selectedSKU: string;
  selectedSupplier: string;
}

interface DashboardFiltersContextType {
  filters: DashboardFilters;
  setFilters: (filters: Partial<DashboardFilters>) => void;
  resetFilters: () => void;
}

const DashboardFiltersContext = createContext<DashboardFiltersContextType | undefined>(undefined);

const defaultFilters: DashboardFilters = {
  selectedProduct: 'All Products',
  selectedRegion: 'All Regions',
  selectedPlant: 'All Plants',
  selectedSKU: 'All SKUs',
  selectedSupplier: 'All Suppliers',
};

export function DashboardFiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFiltersState] = useState<DashboardFilters>(defaultFilters);

  const setFilters = (newFilters: Partial<DashboardFilters>) => {
    setFiltersState(prev => {
      const updated = { ...prev, ...newFilters };
      
      // Reset dependent filters when parent filter changes
      if (newFilters.selectedProduct !== undefined || newFilters.selectedRegion !== undefined) {
        // Reset plant, SKU, and supplier if product or region changes
        if (newFilters.selectedProduct !== prev.selectedProduct || 
            newFilters.selectedRegion !== prev.selectedRegion) {
          updated.selectedPlant = 'All Plants';
          updated.selectedSKU = 'All SKUs';
          updated.selectedSupplier = 'All Suppliers';
        }
      }
      
      return updated;
    });
  };

  const resetFilters = () => {
    setFiltersState(defaultFilters);
  };

  return (
    <DashboardFiltersContext.Provider value={{ filters, setFilters, resetFilters }}>
      {children}
    </DashboardFiltersContext.Provider>
  );
}

export function useDashboardFilters() {
  const context = useContext(DashboardFiltersContext);
  if (!context) {
    throw new Error('useDashboardFilters must be used within DashboardFiltersProvider');
  }
  return context;
}
