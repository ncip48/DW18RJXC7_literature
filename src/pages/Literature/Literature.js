import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
//import { useQuery } from "react-query";
import { Navbar, Wrapper, CardBook, TextInput } from "../../components";
import { API } from "../../config/api";
import { BsSearch } from "react-icons/bs";

export const Literature = () => {
  const location = useLocation();

  const [query, setQuery] = useState(location.state.query);
  const [isLoading, setLoading] = useState(true);
  const [result, setResult] = useState([]);
  let year = "";
  //const [year, setYear] = useState("");

  //   const { isLoading, data: literatureData, refetch } = useQuery(
  //     "getDataLiterature",
  //     async () => await API.get(`/literature?title=${query}&public_year=${year}`)
  //   );

  useEffect(() => {
    const fetchData = async (year) => {
      try {
        setLoading(true);
        const res = await API.get(
          `/literature?title=${query}&public_year=${year}`
        );
        setResult(res.data.data.literatures);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData("");
  }, [query]);

  const fetchData = async (year) => {
    try {
      setLoading(true);
      const res = await API.get(
        `/literature?title=${query}&public_year=${year}`
      );
      console.log(res.data.data.literatures);
      setResult(res.data.data.literatures);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = () => {
    //console.log(query);
    //refetch();
    fetchData("");
  };

  console.log(year);

  return (
    <>
      <Navbar />
      <Wrapper>
        <div className="row">
          <div className="col-12 col-md-6">
            <div
              className=" d-flex flex-row"
              style={{ marginTop: 0, marginBottom: 25 }}
            >
              <form
                className="w-100 d-flex"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
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
                  type="submit"
                  className="btn btn-no btn-sign-up"
                  style={{ width: 50 }}
                >
                  <BsSearch />
                </button>
              </form>
            </div>
          </div>
          <div className="col-12 col-md-6"></div>
        </div>
        <div className="row">
          <div className="col-12 col-md-2" style={{ marginTop: 17 }}>
            <select
              className="form-control"
              onChange={(e) => {
                e.preventDefault();
                //setYear(e.target.value);
                fetchData(e.target.value);
                //refetch();
              }}
              //value={year}
            >
              <option value="">All Time</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
            </select>
          </div>
          <div className="col-12 col-md-10">
            {isLoading ? (
              <h3 className="text-white">loading...</h3>
            ) : (
              <CardBook
                loading={isLoading}
                dataBook={result}
                isMeAuthor={false}
              />
            )}
          </div>
        </div>
      </Wrapper>
    </>
  );
};
