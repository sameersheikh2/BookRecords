import { useState } from "react";

const BookRecords = ({ records }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "" });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedRecords = [...records].sort((a, b) => {
    if (sortConfig.direction === "asc") {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    }
    if (sortConfig.direction === "desc") {
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    }
    return 0;
  });

  return (
    <>
      {records.length > 0 ? (
        <div className="p-4">
          <table className="min-w-full border-collapse bg-white table-auto text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4" onClick={() => handleSort("title")}>
                  Title
                </th>
                <th
                  className="py-2 px-4"
                  onClick={() => handleSort("author_name")}
                >
                  Author Name
                </th>
                <th
                  className="py-2 px-4"
                  onClick={() => handleSort("first_publish_year")}
                >
                  First Publish Year
                </th>
                <th className="py-2 px-4" onClick={() => handleSort("subject")}>
                  Subject
                </th>
                <th
                  className="py-2 px-4"
                  onClick={() => handleSort("ratings_average")}
                >
                  Average Rating
                </th>
                <th
                  className="py-2 px-4"
                  onClick={() => handleSort("author_birth_date")}
                >
                  Author Birth Date
                </th>
                <th
                  className="py-2 px-4"
                  onClick={() => handleSort("top_work")}
                >
                  Top Work
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedRecords.map((record, index) => (
                <tr key={index}>
                  <td className="border border-slate-200 py-2 px-4">
                    {record.title}
                  </td>
                  <td className="border border-slate-200 py-2 px-4">
                    {record.author_name.join(", ")}
                  </td>
                  <td className="border border-slate-200 py-2 px-4">
                    {record.first_publish_year}
                  </td>
                  <td className="border border-slate-200 py-2 px-4">
                    {record.subject
                      ? record.subject.slice(0, 4).join(", ") +
                        (record.subject.length > 4 ? "..." : "")
                      : "N/A"}
                  </td>
                  <td className="border border-slate-200 py-2 px-4">
                    {record.ratings_average
                      ? record.ratings_average.toFixed(1)
                      : 0}
                  </td>
                  <td className="border border-slate-200 py-2 px-4">
                    {record.author_birth_date}
                  </td>
                  <td className="border border-slate-200 py-2 px-4">
                    {record.top_work}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-2xl text-slate-600">
          <h2>Search for a book</h2>
        </div>
      )}
    </>
  );
};

export default BookRecords;
