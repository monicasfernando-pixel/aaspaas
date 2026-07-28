export type DemandItem = {
  id: string;
  category: string;
  orders: number;
  window: string;
  sentence: string;
  entryOffer: string;
};

export type CatalogItem = {
  name: string;
  category: string;
  price: number;
  rating: number;
  owned: boolean;
  emoji: string;
  tags: string[];
};

export type CartItem = {
  name: string;
  category: string;
  price: number;
  qty: number;
  viaAaspaas: boolean;
};

export type Screen = "home" | "search" | "cart" | "order";
