export const queryKey = {
  getGroups(page: number, limit: number) {
    return ["groups", page, limit];
  },
};
