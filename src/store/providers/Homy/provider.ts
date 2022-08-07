import {Provider} from "../../domain/provider.js";
import {SearchFilter} from "../../domain/search-filter.js";
import {HttpHelper} from "../../utils/http-helper.js";
import {PlaceListResponse, PlaceResponse, Place as HomyPlace} from "./response.js";
import {Place} from "../../domain/place.js";


export class HomyProvider implements Provider {
  public static provider = 'homy';
  public static coordinates = '59.9386,30.3141';
  private static apiUrl = 'http://127.0.0.1:3030';

  public find(filter: SearchFilter): Promise<Place[]> {
    console.log('filter', filter);
    return HttpHelper.fetchAsJson<PlaceListResponse>(
      HomyProvider.apiUrl + '/places?' +
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
    return `coordinates=${HomyProvider.coordinates}&` +
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
      HomyProvider.provider,
      String(item.id),
      item.name,
      +item.price
    ))
    return new Place(
      HomyProvider.provider,
      String(item.id),
      item.name,
      +item.price
    )
  };

}
