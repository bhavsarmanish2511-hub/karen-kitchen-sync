import { RefrigeratorItem, KitchenItem, InventoryItem, AIGeneratedItem } from '@/types/inventory';

export const refrigeratorItems: RefrigeratorItem[] = [
  { id: 'r1', name: 'Milk', quantity: '200', unit: 'ml', freshness: 20, expiryDays: 1, category: 'Dairy', price: 4.99, nutritionalValue: 'Calcium, Protein, Vitamin D' },
  { id: 'r2', name: 'Eggs', quantity: '2', unit: 'pieces', freshness: 85, expiryDays: 7, category: 'Dairy', price: 6.99, nutritionalValue: 'High Protein, Vitamin B12' },
  { id: 'r3', name: 'Carrots', quantity: '500', unit: 'g', freshness: 60, expiryDays: 10, category: 'Vegetables', price: 3.49, nutritionalValue: 'Beta Carotene, Fiber' },
  { id: 'r4', name: 'Apples', quantity: '1.2', unit: 'kg', freshness: 90, expiryDays: 14, category: 'Fruits', price: 5.99, nutritionalValue: 'Vitamin C, Fiber' },
  { id: 'r5', name: 'Lab-Grown Chicken Breast', quantity: '800', unit: 'g', freshness: 95, expiryDays: 3, category: 'Protein', price: 18.99, nutritionalValue: 'High Protein, B Vitamins' },
  { id: 'r6', name: 'Greek Yogurt', quantity: '1', unit: 'container', freshness: 75, expiryDays: 5, category: 'Dairy', price: 7.49, nutritionalValue: 'Probiotics, Protein' },
  { id: 'r7', name: 'Butter', quantity: '250', unit: 'g', freshness: 80, expiryDays: 21, category: 'Dairy', price: 4.99, nutritionalValue: 'Vitamin A, Healthy Fats' },
  { id: 'r8', name: 'Fresh Herbs', quantity: '50', unit: 'g', freshness: 40, expiryDays: 3, category: 'Vegetables', price: 2.99, nutritionalValue: 'Antioxidants, Minerals' },
  { id: 'r9', name: 'Cheese', quantity: '300', unit: 'g', freshness: 85, expiryDays: 12, category: 'Dairy', price: 8.99, nutritionalValue: 'Calcium, Protein' },
  { id: 'r10', name: 'Tomatoes', quantity: '600', unit: 'g', freshness: 70, expiryDays: 6, category: 'Vegetables', price: 4.49, nutritionalValue: 'Lycopene, Vitamin C' },
  { id: 'r11', name: 'Lettuce', quantity: '200', unit: 'g', freshness: 50, expiryDays: 4, category: 'Vegetables', price: 2.99, nutritionalValue: 'Folate, Vitamin K' },
  { id: 'r12', name: 'Spinach', quantity: '150', unit: 'g', freshness: 45, expiryDays: 3, category: 'Vegetables', price: 3.99, nutritionalValue: 'Iron, Folate' },
  { id: 'r13', name: 'Juice Boxes', quantity: '6', unit: 'pieces', freshness: 100, expiryDays: 30, category: 'Beverages', price: 8.99, nutritionalValue: 'Vitamin C, Natural Sugars' },
  { id: 'r14', name: 'Plant-Based Milk', quantity: '1', unit: 'L', freshness: 90, expiryDays: 10, category: 'Dairy', price: 5.49, nutritionalValue: 'Plant Protein, Vitamins' }
];

export const kitchenItems: KitchenItem[] = [
  { id: 'k1', name: 'Basmati Rice', quantity: '5', unit: 'kg', stockLevel: 85, weeksRemaining: 2, category: 'Grains', price: 15.99, nutritionalValue: 'Carbohydrates, B Vitamins' },
  { id: 'k2', name: 'Cooking Oil', quantity: '1', unit: 'L', stockLevel: 40, weeksRemaining: 1, category: 'Cooking', price: 8.99, nutritionalValue: 'Healthy Fats, Vitamin E' },
  { id: 'k3', name: 'Whole Wheat Flour', quantity: '2.5', unit: 'kg', stockLevel: 70, weeksRemaining: 3, category: 'Baking', price: 9.99, nutritionalValue: 'Fiber, Protein' },
  { id: 'k4', name: 'Kids Snacks', quantity: '15', unit: 'packs', stockLevel: 95, weeksRemaining: 4, category: 'Snacks', price: 24.99, nutritionalValue: 'Balanced Nutrition for Kids' },
  { id: 'k5', name: 'Pasta', quantity: '800', unit: 'g', stockLevel: 60, weeksRemaining: 2, category: 'Grains', price: 4.99, nutritionalValue: 'Carbohydrates, Iron' },
  { id: 'k6', name: 'Lentils', quantity: '1.5', unit: 'kg', stockLevel: 90, weeksRemaining: 6, category: 'Legumes', price: 7.99, nutritionalValue: 'Plant Protein, Fiber' },
  { id: 'k7', name: 'Spices', quantity: '12', unit: 'containers', stockLevel: 80, weeksRemaining: 8, category: 'Seasoning', price: 18.99, nutritionalValue: 'Antioxidants, Minerals' },
  { id: 'k8', name: 'Sugar', quantity: '1', unit: 'kg', stockLevel: 55, weeksRemaining: 3, category: 'Baking', price: 3.99, nutritionalValue: 'Quick Energy' },
  { id: 'k9', name: 'Salt', quantity: '500', unit: 'g', stockLevel: 75, weeksRemaining: 10, category: 'Seasoning', price: 2.49, nutritionalValue: 'Sodium, Trace Minerals' },
  { id: 'k10', name: 'Honey', quantity: '500', unit: 'ml', stockLevel: 65, weeksRemaining: 4, category: 'Natural Sweetener', price: 12.99, nutritionalValue: 'Natural Antioxidants' },
  { id: 'k11', name: 'Sauces', quantity: '8', unit: 'bottles', stockLevel: 50, weeksRemaining: 2, category: 'Condiments', price: 22.99, nutritionalValue: 'Flavor Enhancement' },
  { id: 'k12', name: 'Baking Powder', quantity: '200', unit: 'g', stockLevel: 40, weeksRemaining: 2, category: 'Baking', price: 4.49, nutritionalValue: 'Leavening Agent' },
  { id: 'k13', name: 'Tea', quantity: '100', unit: 'bags', stockLevel: 70, weeksRemaining: 5, category: 'Beverages', price: 9.99, nutritionalValue: 'Antioxidants, Caffeine' },
  { id: 'k14', name: 'Coffee', quantity: '500', unit: 'g', stockLevel: 30, weeksRemaining: 1, category: 'Beverages', price: 16.99, nutritionalValue: 'Caffeine, Antioxidants' }
];

export const inventoryData = {
  vegetables: [
    { id: 'v1', name: 'Tomatoes', quantity: '1.2', unit: 'kg', stockLevel: 60, category: 'Fresh', value: 4.80, price: 4.80, nutritionalValue: 'Lycopene, Vitamin C' },
    { id: 'v2', name: 'Spinach', quantity: '500', unit: 'g', stockLevel: 40, category: 'Leafy', value: 2.50, price: 3.99, nutritionalValue: 'Iron, Folate, Vitamin K' },
    { id: 'v3', name: 'Broccoli', quantity: '800', unit: 'g', stockLevel: 70, category: 'Cruciferous', value: 5.60, price: 6.99, nutritionalValue: 'Vitamin C, Fiber, Antioxidants' },
    { id: 'v4', name: 'Potatoes', quantity: '2', unit: 'kg', stockLevel: 85, category: 'Root', value: 3.20, price: 4.49, nutritionalValue: 'Potassium, Vitamin B6' },
    { id: 'v5', name: 'Onions', quantity: '1.5', unit: 'kg', stockLevel: 90, category: 'Aromatic', value: 2.80, price: 3.49, nutritionalValue: 'Quercetin, Vitamin C' },
    { id: 'v6', name: 'Garlic', quantity: '200', unit: 'g', stockLevel: 75, category: 'Aromatic', value: 3.99, price: 4.99, nutritionalValue: 'Allicin, Manganese' },
    { id: 'v7', name: 'Avocados', quantity: '4', unit: 'pieces', stockLevel: 50, category: 'Fruit', value: 7.99, price: 8.99, nutritionalValue: 'Healthy Fats, Potassium' },
    { id: 'v8', name: 'Bell Peppers', quantity: '600', unit: 'g', stockLevel: 65, category: 'Fresh', value: 6.49, price: 7.99, nutritionalValue: 'Vitamin C, Antioxidants' },
    { id: 'v9', name: 'Mushrooms', quantity: '400', unit: 'g', stockLevel: 55, category: 'Fungi', value: 4.99, price: 5.99, nutritionalValue: 'B Vitamins, Selenium' }
  ],
  groceries: [
    { id: 'g1', name: 'Bread', quantity: '2', unit: 'loaves', stockLevel: 40, category: 'Bakery', value: 5.98, price: 6.99, nutritionalValue: 'Carbohydrates, B Vitamins' },
    { id: 'g2', name: 'Cereal', quantity: '3', unit: 'boxes', stockLevel: 70, category: 'Breakfast', value: 14.97, price: 18.99, nutritionalValue: 'Fortified Vitamins, Fiber' },
    { id: 'g3', name: 'Rice', quantity: '5', unit: 'kg', stockLevel: 85, category: 'Grains', value: 15.99, price: 15.99, nutritionalValue: 'Carbohydrates, Iron' },
    { id: 'g4', name: 'Oats', quantity: '1.5', unit: 'kg', stockLevel: 60, category: 'Breakfast', value: 8.99, price: 9.99, nutritionalValue: 'Beta-glucan, Fiber' },
    { id: 'g5', name: 'Chips', quantity: '6', unit: 'bags', stockLevel: 80, category: 'Snacks', value: 18.99, price: 22.99, nutritionalValue: 'Quick Energy (Moderate)' },
    { id: 'g6', name: 'Cookies', quantity: '4', unit: 'packets', stockLevel: 45, category: 'Snacks', value: 12.99, price: 15.99, nutritionalValue: 'Quick Energy, Some Protein' }
  ],
  babycare: [
    { id: 'b1', name: 'Organic Baby Powder', quantity: '2', unit: 'containers', stockLevel: 60, category: 'Care', value: 15.98, price: 16.99, nutritionalValue: 'Gentle, Organic Formula' },
    { id: 'b2', name: 'Nutrient Snacks', quantity: '12', unit: 'packs', stockLevel: 75, category: 'Food', value: 24.99, price: 28.99, nutritionalValue: 'Age-appropriate Nutrients' },
    { id: 'b3', name: 'Baby Formula', quantity: '3', unit: 'cans', stockLevel: 40, category: 'Food', value: 89.97, price: 95.99, nutritionalValue: 'Complete Infant Nutrition' },
    { id: 'b4', name: 'Baby Juice Packs', quantity: '18', unit: 'packs', stockLevel: 85, category: 'Beverages', value: 22.99, price: 24.99, nutritionalValue: 'Vitamin C, Natural Sugars' }
  ],
  cleaning: [
    { id: 'c1', name: 'Smart Cleaning Pods', quantity: '24', unit: 'pods', stockLevel: 50, category: 'Multi-surface', value: 18.49, price: 19.99, nutritionalValue: 'Eco-friendly Formula' },
    { id: 'c2', name: 'Plasma Cleaning Spray', quantity: '2', unit: 'bottles', stockLevel: 35, category: 'Disinfectant', value: 16.99, price: 18.99, nutritionalValue: 'Advanced Sanitization' },
    { id: 'c3', name: 'Dishwash Liquid', quantity: '1.5', unit: 'L', stockLevel: 45, category: 'Kitchen', value: 8.99, price: 9.99, nutritionalValue: 'Grease-cutting Formula' }
  ],
  nutrition: [
    { id: 'n1', name: 'Probiotic Yogurt Cubes', quantity: '20', unit: 'cubes', stockLevel: 70, category: 'Health', value: 12.99, price: 14.99, nutritionalValue: 'Live Probiotics, Protein' },
    { id: 'n2', name: 'Neural Enhancement Vitamins', quantity: '60', unit: 'tablets', stockLevel: 80, category: 'Supplements', value: 24.99, price: 29.99, nutritionalValue: 'Brain Health, B-Complex' },
    { id: 'n3', name: 'Nano-Enhanced Apples', quantity: '8', unit: 'pieces', stockLevel: 55, category: 'Enhanced Fruits', value: 15.99, price: 18.99, nutritionalValue: 'Enhanced Vitamin C, Antioxidants' },
    { id: 'n4', name: 'Hydroponic Carrots', quantity: '1', unit: 'kg', stockLevel: 65, category: 'Enhanced Vegetables', value: 7.49, price: 8.99, nutritionalValue: 'Enhanced Beta Carotene' }
  ]
} as const;

export const aiGeneratedItems: AIGeneratedItem[] = [
  { id: 'ai1', name: 'Vertical Farm Broccoli', reason: 'High in nutrients, perfect for your family', price: 7.99, icon: '🥦', category: 'Vegetables', priority: 'medium', nutritionalValue: 'Vitamin C, Fiber, Antioxidants' },
  { id: 'ai2', name: 'Sustainable Rice Pack', reason: 'Running low on rice, eco-friendly option', price: 16.99, icon: '🌾', category: 'Grains', priority: 'high', nutritionalValue: 'Complex Carbs, Sustainable Sourcing' },
  { id: 'ai3', name: 'Freeze-Dried Bananas', reason: 'Great healthy snack for your 5-year-old', price: 8.99, icon: '🍌', category: 'Snacks', priority: 'low', nutritionalValue: 'Potassium, Natural Sugars' },
  { id: 'ai4', name: 'Hydroponic Kale', reason: 'Missing from your smart refrigerator', price: 9.99, icon: '🌱', category: 'Vegetables', priority: 'high', nutritionalValue: 'Vitamin K, Iron, Antioxidants' },
  { id: 'ai5', name: 'Quantum Baby Formula', reason: 'Advanced nutrition for growing minds', price: 35.99, icon: '🍼', category: 'Baby', priority: 'medium', nutritionalValue: 'Complete Infant Nutrition, Enhanced DHA' },
  { id: 'ai6', name: 'Bio-Engineered Strawberries', reason: 'Peak season, enhanced with vitamins', price: 12.99, icon: '🍓', category: 'Fruits', priority: 'low', nutritionalValue: 'Enhanced Vitamin C, Antioxidants' },
  { id: 'ai7', name: 'Smart Cleaning Pods', reason: 'Household maintenance due soon', price: 19.99, icon: '🧽', category: 'Cleaning', priority: 'medium', nutritionalValue: 'Eco-friendly, Effective Cleaning' },
  { id: 'ai8', name: 'Lab-Grown Salmon', reason: 'Omega-3 for brain development', price: 28.99, icon: '🐟', category: 'Protein', priority: 'low', nutritionalValue: 'Omega-3 Fatty Acids, High Protein' }
];