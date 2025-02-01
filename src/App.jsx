import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import Card from "./components/Card";
import axios from "axios";
import { RevolvingDot } from "react-loader-spinner";

export const context = createContext();
const App = () => {
  const [favorites, setFavorites] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [scrollvisible, setVisiblle] = useState(false);
  const Access = "c9xOBCj2vs7PQBjrbkwBiwycqaclU2LFZBhG0y30ygc";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isSearching, searching] = useState(false);

  const searchImage = () => {
    setPage(1);

    axios
      .get(
        `https://api.unsplash.com/search/photos?page=${page}&query=${search}&client_id=c9xOBCj2vs7PQBjrbkwBiwycqaclU2LFZBhG0y30ygc`
      )
      .then((e) => {
        setData((prev) => [...prev, ...e.data.results]);

        setLoading(false);
      })
      .catch((err) => {
        alert(`error occured`);
      });
  };
  const fetchData = () => {
    axios
      .get(
        `https://api.unsplash.com/photos?page=${page}&client_id=c9xOBCj2vs7PQBjrbkwBiwycqaclU2LFZBhG0y30ygc`
      )
      .then((res) => {
        setData((prev) => [...prev, ...res.data]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (isSearching) {
      searchImage();
    } else {
      fetchData();
    }
  }, [page, isSearching]);

  const loadMore = () => {
    console.log("called");
    // console.log(document.documentElement.scrollHeight);
    // console.log("inner heigh" + window.innerHeight);
    // console.log("scroll top" + document.documentElement.scrollTop);
    if (document.documentElement.scrollTop > 0) {
      setVisiblle(true);
    } else {
      setVisiblle(false);
    }
    console.log(document.documentElement.scrollTop);
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight
    ) {
      console.log(document.documentElement.scrollTop);
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", loadMore);
  }, []);

  return (
    <context.Provider values={(favorites, setFavorites)}>
      <div className="bg-zinc-800  w-full flex items-center justify-center ">
        <div className="container h-full w-full ">
          <nav
            className="logo flex items-center justify-center h-16 cursor-pointer  "
            onClick={() => {
              searching(false);
              setPage(1);
            }}
          >
            <h1 className="text-3xl">Lensa</h1>
            <img
              className="h-10"
              src="https://png.pngtree.com/png-vector/20220225/ourmid/pngtree-vibrant-camera-shutter-on-a-background-of-white-isolation-vector-png-image_16125212.png"
            ></img>
          </nav>
          <div className="w-full  flex items-center justify-center ">
            <input
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  searchImage();
                  searching(true);
                  setData([]);
                }
              }}
              placeholder="Search through the lens."
              type="text"
              className="bg-white outline-4  outline-white bg-zinc-600 h-10 lg:w-100 w-80 rounded hover:bg-zinc-800 focus:bg-zinc-800"
            />
            <select
              className="bg-white h-10 outline-4 outline-white self-end op bg-zinc-200 cursor-pointer hidden lg:flex"
              onChange={(e) => {
                setSearch(e.target.value);
                searchImage();
                searching(true);
                setData([]);
              }}
            >
              <option>Random</option>
              <option value="cars">Cars</option>
              <option value="dogs">Dogs</option>
              <option value="beaches">beachs</option>
              <option value="mountains">mountains</option>
              <option value="technology">Technologies</option>
            </select>
          </div>

          <div className={` list   overflow-scroll`}>
            {loading ? (
              <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                <RevolvingDot
                  visible={true}
                  height="80"
                  width="80"
                  color="#fafafa"
                  ariaLabel="revolving-dot-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            ) : data ? (
              data.map((e, i) => {
                // console.log(e);
                return <Card key={e.id} alt={i} data={e.urls.regular}></Card>;
              })
            ) : (
              <h1>not found</h1>
            )}
            <Card></Card>
          </div>
        </div>
        <div
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`scroll-top hover:bg-zinc-950 cursor-pointer ${
            scrollvisible ? "flex" : "hidden"
          } fixed bottom-10 left-10 bg-zinc-500 rounded-full`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="white"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-up"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 5l0 14" />
            <path d="M18 11l-6 -6" />
            <path d="M6 11l6 -6" />
          </svg>
        </div>
      </div>
    </context.Provider>
  );
};

export default App;
