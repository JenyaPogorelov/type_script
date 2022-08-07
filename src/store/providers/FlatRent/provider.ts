import {Provider} from "../../domain/provider";
import {SearchFilter} from "../../domain/search-filter";
import {Place} from "../../domain/place";
import {HttpHelper} from "../../utils/http-helper";
import {Place as HomyPlace, PlaceListResponse, PlaceResponse} from "../Homy/response";


export class FlatRentProvider implements Provider {
  public static provider = 'homy';
  public static coordinates = '59.9386,30.3141';
  private static apiUrl = 'http://127.0.0.1:3040';

  public find(filter: SearchFilter): Promise<Place[]> {
    console.log('filter', filter);
    return HttpHelper.fetchAsJson<PlaceListResponse>(
      FlatRentProvider.apiUrl + '/places?' +
      this.convertFilterToQueryString(filter)
    )
      .then((response) => {
        this.assertIsValidResponse(response)
        return this.convertPlaceListResponse(response)
      })
  };

  private assertIsValidResponse(response: PlaceListResponse | PlaceResponse): void {
    if (response.errorMessage != null) {
      throw new Error(response.errorMessage);
    }
  };

  private convertFilterToQueryString(filter: SearchFilter): string {
    return `coordinates=${FlatRentProvider.coordinates}&` +
      `checkInDate=${filter.checkInDate}&` +
      `checkOutDate=${filter.checkOutDate}&` +
      `maxPrice=${filter.priceLimit}`
    // `maxPrice=${2800}`
  };

  private convertPlaceListResponse(response: PlaceListResponse): Place[] {
    console.log(response);

    // @ts-ignore
    return response.map((item) => {
      console.log(item)
      // @ts-ignore
      return this.convertPlaceResponse(item);
    })
  };

  private convertPlaceResponse(item: HomyPlace): Place {
    console.log(item)
    console.log(new Place(
      FlatRentProvider.provider,
      String(item.id),
      item.name,
      +item.price
    ))
    return new Place(
      FlatRentProvider.provider,
      String(item.id),
      item.name,
      +item.price
    )
  };

}
