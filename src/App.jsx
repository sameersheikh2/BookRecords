import { useEffect, useState } from "react";
import BookRecords from "./components/BookRecords";
import Header from "./components/Header";
import Search from "./components/Search";
import Pagination from "./components/Pagination";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    let timeout;

    const fetchData = async () => {
      if (searchQuery) {
        setLoading(true);
        try {
          const query = searchQuery.toLowerCase().split(" ").join("%");
          const res = await fetch(
            `https://openlibrary.org/search.json?q=${query}&page=${page}&limit=${limit}`
          );
          const data = await res.json();

          const fetchDetailedResults = async () => {
            let detailedResults = [];
            for (let book of data.docs) {
              const authorKey = book.author_key[0];
              const authorRes = await fetch(
                `https://openlibrary.org/authors/${authorKey}.json`
              );
              const authorData = await authorRes.json();

              const topWork = authorData.name.split(" ").join("%");
              const topWorkRes = await fetch(
                `https://openlibrary.org/search.json?author=${topWork}&limit=${limit}`
              );
              const topWorkData = await topWorkRes.json();
              const topWorkTitle = topWorkData.docs[0]?.title || "N/A";

              detailedResults.push({
                ...book,
                author_birth_date: authorData.birth_date || "N/A",
                top_work: topWorkTitle,
              });
            }
            return detailedResults;
          };

          const detailedResults = await fetchDetailedResults();
          setResult(detailedResults);
          setTotalRecords(data.numFound);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      fetchData();
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchQuery, page, limit]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(totalRecords / limit);

  return (
    <>
      <Header />
      <Search
        value={searchQuery}
        placeholder="search by author"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {loading ? (
        <p className="w-full text-center">Loading...</p>
      ) : (
        <>
          <select
            onChange={(e) => setLimit(e.target.value)}
            name="recordsShowing"
            id="recordsPerPage"
          >
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <BookRecords
            records={result}
            page={page}
            limit={limit}
            totalRecords={totalRecords}
            onPageChange={handlePageChange}
          />
        </>
      )}
      {result.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default App;
