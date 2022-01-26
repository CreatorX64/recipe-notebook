interface Filters {
  searchText?: string;
  hideMissing?: boolean;
}

const filters: Filters = {
  searchText: "",
  hideMissing: false
};

// Expose filters to outside modules.
export const getFilters = (): Filters => filters;

// Update filters with the given updates.
export const setFilters = (updates: Filters): void => {
  if (typeof updates.searchText === "string") {
    filters.searchText = updates.searchText.toLowerCase();
  }
  if (typeof updates.hideMissing === "boolean") {
    filters.hideMissing = updates.hideMissing;
  }
};
