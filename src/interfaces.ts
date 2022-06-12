export interface UserInfo {
  userName: string
  avatarUrl: string
}

export interface SearchFormData {
  city: string
  dateArrival: string
  dateDeparture: string
  maxPriceDay: number
}

export interface FavoriteItems {
  id: number;
  image: string;
  name: string;
}

export interface Place {
  id: number;
  image: string;
  name: string;
  description: string;
  remoteness: number;
  bookedDates: number[];
  price: number;
}

export type WhatDoIt = 'add' | 'get' | 'edit' | 'find' | 'delete' | 'increment' | 'decrement'
