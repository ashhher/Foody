import { useSearchRestaurants } from "@/api/RestaurantApi";
import {
  SearchBar,
  CuisineFilter,
  PaginationSelector,
  SearchResultCard,
  SearchResultInfo,
  SortOptionDropDown,
} from "@/components";
import { SearchForm } from "@/components/SearchBar";
import { Layout } from "@/layouts";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams();

  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });

  const { results, isLoading } = useSearchRestaurants(searchState, city);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleClickExpand = () =>
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  if (isLoading) {
    return <span>Loading ...</span>;
  }

  if (!results?.data || !city) {
    return <span>No results found</span>;
  }

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-5">
        <div id="cuisines-list">
          <CuisineFilter
            selectedCuisines={searchState.selectedCuisines}
            onChange={setSelectedCuisines}
            isExpanded={isExpanded}
            onExpandedClick={handleClickExpand}
          />
        </div>
        <div id="main-content" className="flex flex-col gap-5">
          <SearchBar
            onSubmit={setSearchQuery}
            placeHolder="Search by Cuisine or Restaurant Name"
            onReset={resetSearch}
            searchQuery={searchState.searchQuery}
          />
          <div className="px-2 flex justify-between items-center flex-col gap-3 md:flex-row">
            <SearchResultInfo total={results.pagination.total} city={city} />
            <SortOptionDropDown
              sortOption={searchState.sortOption}
              onChange={(value) => setSortOption(value)}
            />
          </div>
          {results.data.map((restaurant) => (
            <SearchResultCard restaurant={restaurant} />
          ))}
          <div className="flex-1 flex items-end">
            <PaginationSelector
              page={results.pagination.page}
              pages={results.pagination.pages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
