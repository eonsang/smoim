import { atom } from "recoil";

export const uiState = atom({
  key: `uiState/${Math.random()}`,
  default: {
    openLoginPopup: false,
  },
});
