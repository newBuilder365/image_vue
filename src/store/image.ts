import { defineStore } from "pinia";
import { IImage } from "../types/image";
export const useUserStore = defineStore("images", {
  state() {
    return {
      imageList: [] as IImage[],
    };
  },
  actions: {
    updateImageList(images: IImage[]) {
      this.imageList = [...this.imageList, ...images];
    },
  },
});
