export type DemandContext =
  | "late_night"
  | "morning"
  | "rainy"
  | "festival"
  | "always";

export type TrialSku = {
  name: string;
  price: number;
};

export type DemandItem = {
  id: string;
  category: string;
  orders: number;
  window: string;
  top_product: string;
  contexts: DemandContext[];
  triggers: string[];
  sentence: string;
  trial_sku: TrialSku;
};

export type CatalogItem = {
  name: string;
  category: string;
  price: number;
  rating: number;
  owned: boolean;
  image: string;
  tags: string[];
};

export type CartItem = {
  name: string;
  category: string;
  price: number;
  qty: number;
  viaAaspaas: boolean;
  image: string;
};

export type Screen = "home" | "search" | "cart" | "order";
