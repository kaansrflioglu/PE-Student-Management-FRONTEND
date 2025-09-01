import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getParents } from "../api/parentApi";
import type { Parent } from "../types/parent";
import { useAuth } from "../contexts/AuthContext";

const ParentsPage = () => {
  const [parents, setParents] = useState<Parent[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      getParents(token)
        .then((res) => setParents(res.data))
        .catch((err) => console.error("Parent listesi alınamadı:", err));
    }
  }, [token]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Parents Page</h1>
      {parents.length > 0 ? (
        <ul className="space-y-2">
          {parents.map((parent) => (
            <li
              key={parent.id}
              className="p-3 bg-gray-100 rounded shadow flex justify-between"
            >
              <span>
                {parent.name} {parent.surname} ({parent.relation})
              </span>
              <Link
                to={`/parents/${parent.id}`}
                className="text-blue-500 hover:underline"
              >
                Detay
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Hiç parent bulunamadı.</p>
      )}
    </div>
  );
};

export default ParentsPage;