// Dashboard filter options data

export const products = [
  'All Products',
  'Motor Oil (2710.19)',
  'Industrial Lubricants (2710.19)',
  'Transmission Fluids (2710.19)',
  'Hydraulic Oils (2710.19)',
  'Gear Oils (2710.19)',
  'Marine Oils (2710.19)',
  'Additives (3811.21)',
  'Base Oils (2710.12)',
];

export const regions = [
  'All Regions',
  'EMEA',
  'Americas',
  'APAC',
  'India',
];

// Hierarchical data structure for filters
export const hierarchicalData: Record<string, Record<string, {
  plants: string[];
  skus: string[];
  suppliers: string[];
}>> = {
  'Motor Oil (2710.19)': {
    'EMEA': {
      plants: ['Castrol Hamburg', 'Castrol Berlin'],
      skus: ['Premium Motor Oil 5W-30', 'Premium Motor Oil 5W-40', 'Synthetic Blend 10W-40', 'High Mileage 5W-20'],
      suppliers: ['Shell Pernis', 'TotalEnergies Additives', 'BP Castrol Ltd', 'FUCHS Petrolub SE']
    },
    'Americas': {
      plants: ['Castrol Texas', 'Castrol Ohio'],
      skus: ['Premium Motor Oil 5W-30', 'Synthetic Blend 10W-30', 'High Mileage 10W-30', 'Diesel Engine Oil 15W-40'],
      suppliers: ['ExxonMobil Refinery', 'Chevron Base Oils', 'Valvoline International']
    },
    'APAC': {
      plants: ['Castrol Singapore', 'Castrol Kuala Lumpur'],
      skus: ['Premium Motor Oil 5W-40', 'Motorcycle Oil 10W-50', 'Motorcycle Oil 20W-50'],
      suppliers: ['Petronas Lubricants', 'SK Lubricants', 'Motul Tech']
    },
    'India': {
      plants: ['Castrol Silvassa', 'Castrol Patalganga'],
      skus: ['Premium Motor Oil 5W-30', 'Motorcycle Oil 10W-50', 'Diesel Engine Oil 15W-40', 'Motorcycle Oil 20W-50'],
      suppliers: ['HPCL Mumbai', 'Indian Oil Corporation', 'Bharat Petroleum', 'BP Castrol Ltd']
    }
  },
  'Industrial Lubricants (2710.19)': {
    'EMEA': {
      plants: ['Castrol Hamburg', 'Castrol Berlin'],
      skus: ['Industrial Gear Oil 80W-90', 'Industrial Gear Oil 75W-90', 'Hydraulic Oil ISO 46', 'Hydraulic Oil ISO 68'],
      suppliers: ['Shell Pernis', 'BASF Performance Chemicals', 'Evonik Specialty Chemicals']
    },
    'Americas': {
      plants: ['Castrol Texas', 'Castrol Ohio'],
      skus: ['Industrial Gear Oil 80W-90', 'Hydraulic Oil ISO 46', 'Grease NLGI 2', 'Grease NLGI 3'],
      suppliers: ['ExxonMobil Refinery', 'Lubrizol Corporation', 'Afton Chemical']
    },
    'APAC': {
      plants: ['Castrol Singapore'],
      skus: ['Hydraulic Oil ISO 46', 'Hydraulic Oil ISO 68', 'Industrial Gear Oil 80W-90'],
      suppliers: ['Petronas Lubricants', 'SK Lubricants']
    },
    'India': {
      plants: ['Castrol Silvassa'],
      skus: ['Industrial Gear Oil 80W-90', 'Hydraulic Oil ISO 46', 'Grease NLGI 2'],
      suppliers: ['HPCL Mumbai', 'Indian Oil Corporation', 'Bharat Petroleum']
    }
  },
  'Transmission Fluids (2710.19)': {
    'EMEA': {
      plants: ['Castrol Hamburg'],
      skus: ['Transmission Fluid ATF', 'Transmission Fluid CVT'],
      suppliers: ['Shell Pernis', 'TotalEnergies Additives', 'Infineum International']
    },
    'Americas': {
      plants: ['Castrol Texas'],
      skus: ['Transmission Fluid ATF', 'Transmission Fluid CVT'],
      suppliers: ['ExxonMobil Refinery', 'Chevron Base Oils', 'Afton Chemical']
    },
    'APAC': {
      plants: ['Castrol Singapore'],
      skus: ['Transmission Fluid ATF'],
      suppliers: ['Petronas Lubricants', 'SK Lubricants']
    },
    'India': {
      plants: ['Castrol Silvassa', 'Castrol Patalganga'],
      skus: ['Transmission Fluid ATF', 'Transmission Fluid CVT'],
      suppliers: ['HPCL Mumbai', 'BP Castrol Ltd']
    }
  },
  'Marine Oils (2710.19)': {
    'EMEA': {
      plants: ['Castrol Hamburg'],
      skus: ['Marine Engine Oil 2-Stroke', 'Marine Engine Oil 4-Stroke'],
      suppliers: ['Shell Pernis', 'Neste Corporation']
    },
    'Americas': {
      plants: ['Castrol Texas'],
      skus: ['Marine Engine Oil 4-Stroke'],
      suppliers: ['ExxonMobil Refinery', 'Chevron Base Oils']
    },
    'APAC': {
      plants: ['Castrol Singapore', 'Castrol Kuala Lumpur'],
      skus: ['Marine Engine Oil 2-Stroke', 'Marine Engine Oil 4-Stroke'],
      suppliers: ['Petronas Lubricants', 'Shell Pernis']
    },
    'India': {
      plants: ['Castrol Silvassa'],
      skus: ['Marine Engine Oil 4-Stroke'],
      suppliers: ['HPCL Mumbai', 'Indian Oil Corporation']
    }
  },
  'Additives (3811.21)': {
    'EMEA': {
      plants: ['Castrol Hamburg'],
      skus: ['Coolant Concentrate', 'Brake Fluid DOT 4', 'Chain Lube Spray'],
      suppliers: ['TotalEnergies Additives', 'Infineum International', 'BASF Performance Chemicals']
    },
    'Americas': {
      plants: ['Castrol Texas'],
      skus: ['Coolant Concentrate', 'Brake Fluid DOT 4'],
      suppliers: ['Lubrizol Corporation', 'Afton Chemical']
    },
    'APAC': {
      plants: ['Castrol Singapore'],
      skus: ['Chain Lube Spray', 'Brake Fluid DOT 4'],
      suppliers: ['Petronas Lubricants']
    },
    'India': {
      plants: ['Castrol Silvassa'],
      skus: ['Coolant Concentrate', 'Brake Fluid DOT 4'],
      suppliers: ['BP Castrol Ltd', 'Indian Oil Corporation']
    }
  },
  'Base Oils (2710.12)': {
    'EMEA': {
      plants: ['Castrol Hamburg'],
      skus: ['Base Oil Group II', 'Base Oil Group III'],
      suppliers: ['Shell Pernis', 'Neste Corporation', 'TotalEnergies Additives']
    },
    'Americas': {
      plants: ['Castrol Texas'],
      skus: ['Base Oil Group II', 'Base Oil Group III'],
      suppliers: ['ExxonMobil Refinery', 'Chevron Base Oils']
    },
    'APAC': {
      plants: ['Castrol Singapore'],
      skus: ['Base Oil Group II'],
      suppliers: ['Petronas Lubricants', 'SK Lubricants']
    },
    'India': {
      plants: ['Castrol Silvassa'],
      skus: ['Base Oil Group II'],
      suppliers: ['HPCL Mumbai', 'Indian Oil Corporation', 'Bharat Petroleum']
    }
  }
};

// Get filtered plants based on product and region
export const getFilteredPlants = (product: string, region: string): string[] => {
  if (product === 'All Products' || region === 'All Regions') {
    return ['All Plants', 'Castrol Silvassa', 'Castrol Hamburg', 'Castrol Texas', 'Castrol Singapore', 
            'Castrol Berlin', 'Castrol Ohio', 'Castrol Kuala Lumpur', 'Castrol Patalganga'];
  }
  
  const plants = hierarchicalData[product]?.[region]?.plants || [];
  return ['All Plants', ...plants];
};

// Get filtered SKUs based on product and region
export const getFilteredSKUs = (product: string, region: string): string[] => {
  if (product === 'All Products' || region === 'All Regions') {
    return [
      'All SKUs',
      'Premium Motor Oil 5W-30',
      'Premium Motor Oil 5W-40',
      'Synthetic Blend 10W-40',
      'Synthetic Blend 10W-30',
      'High Mileage 5W-20',
      'High Mileage 10W-30',
      'Diesel Engine Oil 15W-40',
      'Diesel Engine Oil 10W-40',
      'Marine Engine Oil 2-Stroke',
      'Marine Engine Oil 4-Stroke',
      'Industrial Gear Oil 80W-90',
      'Industrial Gear Oil 75W-90',
      'Hydraulic Oil ISO 46',
      'Hydraulic Oil ISO 68',
      'Transmission Fluid ATF',
      'Transmission Fluid CVT',
      'Motorcycle Oil 10W-50',
      'Motorcycle Oil 20W-50',
      'Racing Oil 0W-20',
      'Racing Oil 5W-50',
      'Grease NLGI 2',
      'Grease NLGI 3',
      'Coolant Concentrate',
      'Brake Fluid DOT 4',
      'Chain Lube Spray',
      'Base Oil Group II',
      'Base Oil Group III'
    ];
  }
  
  const skus = hierarchicalData[product]?.[region]?.skus || [];
  return ['All SKUs', ...skus];
};

// Get filtered suppliers based on product and region
export const getFilteredSuppliers = (product: string, region: string): string[] => {
  if (product === 'All Products' || region === 'All Regions') {
    return [
      'All Suppliers',
      'ExxonMobil Refinery',
      'Shell Pernis',
      'HPCL Mumbai',
      'Chevron Base Oils',
      'TotalEnergies Additives',
      'Lubrizol Corporation',
      'Infineum International',
      'Afton Chemical',
      'BASF Performance Chemicals',
      'Evonik Specialty Chemicals',
      'BP Castrol Ltd',
      'Motul Tech',
      'Valvoline International',
      'Petronas Lubricants',
      'Indian Oil Corporation',
      'Bharat Petroleum',
      'Neste Corporation',
      'SK Lubricants',
      'FUCHS Petrolub SE'
    ];
  }
  
  const suppliers = hierarchicalData[product]?.[region]?.suppliers || [];
  return ['All Suppliers', ...suppliers];
};
