export interface UserInfo {
  userName: string
  avatarUrl: string
}

export interface FormDate {
  dateArrival: string
  dateDeparture: string
}

export interface SearchFormData extends FormDate {
  city: string
  maxPriceDay: number
}

export interface FavoriteItems {
  id: number;
  image: string;
  name: string;
}

export interface Place {
  id: number|string;
  image?: string;
  photos?: string[];
  name?: string;
  title?: string;
  description?: string;
  details?: string;
  remoteness: number;
  bookedDates: number[];
  price?: number;
  totalPrice?: number;
  coordinates?: number[];
}

export type WhatDoIt = 'add' | 'get' | 'edit' | 'find' | 'delete' | 'increment' | 'decrement'

export interface Parameters {
  city: string;
  checkInDate: Date;
  checkOutDate: Date;
  priceLimit?: number
}
