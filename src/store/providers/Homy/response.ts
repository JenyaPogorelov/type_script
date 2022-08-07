/**
 * Ответ с несколькими отелями
 */
export interface PlaceListResponse {
  errorMessage?: string;
  items: Place[];
}

export interface PlaceResponse {
  errorMessage?: string;
  item: Place;
}

export interface Place {
  id: number,
  image: string,
  name: string,
  price: string,
  remoteness: string,
  description: string,
  bookedDates: string[]
}
