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

export interface Place {
  id: number;
  image: string;
  name: string;
  description: string;
  remoteness: number;
  bookedDates: number[];
  price: number;
}
