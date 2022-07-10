import {Provider} from "../../domain/provider.js";
import {SearchFilter} from "../../domain/search-filter.js";
import {HttpHelper} from "../../utils/http-helper.js";
import {PlaceListResponse, PlaceResponse, Place as HomyPlace} from "./response.js";
import {Place} from "../../domain/place.js";


export class HomyProvider implements Provider {
  public static provider = 'homy';
  public static coordinates = '59.9386,30.3141';
  private static apiUrl = 'http://127.0.0.1:3030';

  // @ts-ignore
  public find(filter: SearchFilter): Promise<Place[]> {
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
  };

  private convertPlaceListResponse(response: PlaceListResponse): Place[] {
    return response.items.map((item) => {
      return this.convertPlaceResponse(item);
    })
  };

  private convertPlaceResponse(item: HomyPlace): Place {
    return new Place(
      HomyProvider.provider,
      String(item.id),
      item.name
    )
  };

}
