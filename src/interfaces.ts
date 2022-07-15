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
  id: number;
  image: string;
  name: string;
  description: string;
  remoteness: number;
  bookedDates: number[];
  price: number;
}

export type WhatDoIt = 'add' | 'get' | 'edit' | 'find' | 'delete' | 'increment' | 'decrement'
