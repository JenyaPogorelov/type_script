import {Place} from "../../interfaces.js";


export class Search {
  constructor(
    private readonly provider: string,
  ) {
  }

  public isProviderBy(providerName: string): boolean {
    return this.provider === providerName;
  }
}
