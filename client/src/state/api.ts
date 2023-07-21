import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetKpisResponse } from "./types";

/**boilerplate code
 * createApi() allows to make endpoints that we can use to call and grab data from our backend
 */
export const api = createApi({
  // baseQuery: use fetchBaseQuery() func from Redux, passing in the environment var VIT_BASE_URL
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  //   `reducerPath` property is set to the string value "main". This is the unique key that identifies the service in the Redux store.
  reducerPath: "main",
  //   Tag types are optional and used for caching and invalidation. By providing an empty array, no tag types are defined
  tagTypes: ["Kpis"],
  //    a simple API endpoint named getKpis that makes a GET request to "kpi/kpis/" URL and provides the "Kpis" tag for caching and invalidation purposes
  endpoints: (build) => ({
    getKpis: build.query<Array<GetKpisResponse>, void>({
      //'query()' makes a GET request to the "kpi/kpis/" URL
      query: () => "kpi/kpis/",
      // By setting the providesTags property to ["Kpis"], this endpoint provides the "Kpis" tag,  it can trigger cache invalidation or cache updates when data related to this endpoint changes
      providesTags: ["Kpis"],
    }),
  }),
});

export const { useGetKpisQuery } = api;

/* 
    EXPLANATION:
    The api above will set up a function that grabs our kpis which is 'key performance indicators' and save it into 'Kpis' tag
    We're using the endpoint to get kpis: making a call using the VITE_BASE_URL (localhost:1337)
    Then we're making an API call to the particular URL 'VITE_BASE_URL/kpi/kpis', grabbing kpis and saving it into 'Kpis' tag

*/
