import { atom } from "recoil";

export const uiState = atom({
  key: "uiState",
  default: {
    openLoginPopup: false,
  },
});
