import React, { useState } from "react";
import axios from "axios";
import debounce from "lodash.debounce";

const AddressFetcher = () => {
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Function to fetch address data for Oyo State, Nigeria based on user input
  const fetchAddressSuggestions = async (input) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?state=Oyo&country=Nigeria&q=${input}&format=json&limit=10`
      );
      const data = response.data;

      // Map results to display names (streets, house addresses, etc.)
      const filteredSuggestions = data.map((item) => ({
        displayName: item.display_name,
      }));

      setSuggestions(filteredSuggestions);
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
    }
  };

  // Debounced function to avoid too many API calls on every keystroke
  const debouncedFetchAddressSuggestions = debounce((input) => {
    if (input.length > 2) {
      fetchAddressSuggestions(input);
    }
  }, 300); // 300ms debounce delay

  // Handle input change and fetch suggestions
  const handleInputChange = (e) => {
    const input = e.target.value;
    setLocation(input);
    debouncedFetchAddressSuggestions(input);
  };

  return (
    <div>
      <input
        type="text"
        value={location}
        onChange={handleInputChange}
        placeholder="Enter street or house number"
      />

      {suggestions.length > 0 && (
        <ul className="suggestion-list">
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion.displayName}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressFetcher;
