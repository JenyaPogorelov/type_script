declare module 'flat-rent-sdk' {
  export class FlatRentSdk {
    get (id: string): Promise<Object|null>;
    search (city: string, checkInDate: Date, checkOutDate: Date, priceLimit?: number): Object[];
    book (flatId: number, checkInDate: Date, checkOutDate: Date): number;
  }

}
