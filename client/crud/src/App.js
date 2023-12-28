import "./App.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
function App() {
  const [form, setForm] = useState({
    name: "",
    desc: " ",
    id: "",
  });
  const [movieList, setMovieList] = useState([]);
  const [autoFocus, setAutoFoucs] = useState(false);
  const initialRef = useRef();
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const hanleSubmit = async (e) => {
    e.preventDefault();

    if (form.name && form.desc) {
      if (autoFocus) {
        try {
          const res = await axios.put("http://localhost:3001/", form);
          console.log(res);
          setForm({
            name: "",
            desc: "",
          });
          setAutoFoucs(false);
          getData();
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const res = await axios.post("http://localhost:3001", form);
          setForm({
            name: "",
            desc: "",
          });
          getData();
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/");
      setMovieList(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (e, m) => {
    try {
      const res = await axios.delete(`http://localhost:3001/delete/${m.id}`);
      if (res.status === 200) {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      <h1>Movies and Desc</h1>
      <form className="form">
        <div className="formFieldWrapper">
          <label htmlFor="name" className="label">
            Movie Name
          </label>{" "}
          <input
            id="name"
            className="input"
            name="name"
            placeholder="Enter Movie Name"
            onChange={(e) => handleChange(e)}
            value={form.name}
            ref={initialRef}
          />
        </div>
        <div className="formFieldWrapper">
          <label htmlFor="esc" className="label">
            Description
          </label>
          <input
            className="input"
            placeholder="Enter Description"
            id="desc"
            name="desc"
            onChange={(e) => handleChange(e)}
            value={form.desc}
          />
        </div>

        <button type="submit" className="submitButton" onClick={hanleSubmit}>
          Submit
        </button>
      </form>

      <div className="searchBar">
        <input
          className="input"
          placeholder="Search Movie Name"
          id="Search"
          name="search"
        />
        <button className="submitButton">Search</button>
        {movieList.length > 0 && (
          <table className="table">
            <tbody>
              <tr>
                <th className="col1">Sr. No</th>
                <th className="col2">Movie Name</th>
                <th className="col3">Movie Description</th>
              </tr>
              {movieList.length > 0 &&
                movieList.map((m, i) => {
                  return (
                    <tr key={i}>
                      <th className="col1">{i + 1}</th>
                      <th className="col2">{m.movieName}</th>
                      <th className="col3">{m.movieDescription}</th>
                      <th className="col3">
                        <button
                          onClick={(e) => {
                            setForm({
                              name: m.movieName,
                              desc: m.movieDescription,
                              id: m.id,
                            });
                            setAutoFoucs(true);
                            initialRef.current.focus();
                            window.scrollTo(0, 0);
                          }}
                        >
                          Update
                        </button>
                      </th>
                      <th className="col3">
                        <button
                          onClick={(e) => {
                            handleDelete(e, m);
                          }}
                        >
                          Delete
                        </button>
                      </th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
