import {SearchFilter} from './search-filter.js'
import {Place} from "./place";
// import {Place} from "../../interfaces";

/**
 * Каждый источник должен уметь искать по фильтрам и получить книгу по ID
 */
export interface Provider {
  /**
   * Источник получает фильтр в общем виде и сам должен преобразовать его в свой формат
   * Источник также должен конвертировать свой ответ в объекты отелей
   */
  find(filter: SearchFilter): Promise<Place[]>

  // getById(id: string): Promise<Place>
}