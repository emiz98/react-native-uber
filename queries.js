import { gql } from "@apollo/client";

export const GET_VEHICLES = gql`
  query GetVehicles {
    allVehicles {
      featured {
        name
        image
        description
        price
        estimated
      }
      wheels {
        name
        image
        description
        price
        estimated
      }
      extra {
        name
        image
        description
        price
        estimated
      }
    }
  }
`;

export const GET_SUGGESTIONS = gql`
  query GetSuggestions($searchString: String!) {
    suggestions(search: $searchString) {
      display_name
      lat
      lon
      place_id
    }
  }
`;
