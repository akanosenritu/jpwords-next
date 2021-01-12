import {APITranslation} from "./Translation"

export type WordNote = {
  uuid: string,
  title: APITranslation[],
  description?: string,
};