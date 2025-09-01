import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getParentById } from "../api/parentApi";
import type { Parent } from "../types/parent";
import { useAuth } from "../contexts/AuthContext";

const ParentDetailPage = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [parent, setParent] = useState<Parent | null>(null);

  useEffect(() => {
    if (id && token) {
      getParentById(id, token)
        .then((res) => setParent(res.data))
        .catch((err) => console.error("Parent detayı alınamadı:", err));
    }
  }, [id, token]);

  if (!parent) return <p>Yükleniyor...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">
        {parent.name} {parent.surname}
      </h2>
      <p>Yakınlık: {parent.relation}</p>
      <p>Telefon: {parent.phone}</p>
      <p>Boy: {parent.height} cm</p>

      <h3 className="text-lg font-semibold mt-4">Spor Geçmişi:</h3>
      {parent.sportsBackground && parent.sportsBackground.length > 0 ? (
        <div className="flex flex-wrap gap-2 mt-2">
          {parent.sportsBackground.map((sport) => (
            <span
              key={sport.id}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
            >
              {sport.name}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">Spor geçmişi yok</p>
      )}
    </div>
  );
};

export default ParentDetailPage;