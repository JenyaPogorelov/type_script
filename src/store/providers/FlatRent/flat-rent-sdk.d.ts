import {Parameters, Place} from '../../../interfaces.js'

export function cloneDate(date: Date): Date;
export function addDays(date: Date, dates: number): Date;
export class FlatRentSdk {
    get (id: string | number): Promise<Object|null>;
    // search (city: string, checkInDate: Date, checkOutDate: Date, priceLimit?: number): Object[];
    search (parameters: Parameters): Promise<Place[]>;
    book (flatId: number | string, checkInDate: Date, checkOutDate: Date): Promise<number>;

    protected _assertDatesAreCorrect (checkInDate: Date, checkOutDate: Date): void;
    protected _resetTime(date: Date): void;
    protected _calculateDifferenceInDays(startDate: Date, endDate: Date): number;
    protected _generateDateRange(from: Date, to: Date): Date[];
    protected _generateTransactionId(): number;
    protected _areAllDatesAvailable(flat: Date, dateRange: Date): Date;
    protected _formatFlatObject(flat: Date, nightNumber:number): string;
    protected _readDatabase(): Promise<Date>;
    protected _writeDatabase(database: Object): void;
    protected _syncDatabase(database: Object): void;
}


