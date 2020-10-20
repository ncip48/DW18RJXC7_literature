import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextInput } from "../../components";
import { BsSearch } from "react-icons/bs";

export const SearchBar = (props) => {
  const [query, setQuery] = useState("");
  const history = useHistory();
  return (
    <div className=" d-flex flex-row" style={{ marginTop: 50, ...props.css }}>
      <TextInput
        name="literature"
        type="text"
        placeholder="Search for literature"
        css={{ margin: 0, marginRight: 10, width: "90%" }}
        style={{ height: 50, margin: 0 }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="btn btn-no btn-sign-up"
        style={{ width: 50 }}
        onClick={() =>
          history.push({
            pathname: "/literature",
            state: {
              query: query,
            },
          })
        }
      >
        <BsSearch />
      </button>
    </div>
  );
};
