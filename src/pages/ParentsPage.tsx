import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getParents } from "../api/parentApi";
import type { Parent } from "../types/parent";
import { useAuth } from "../contexts/AuthContext";
import { FaEdit } from "react-icons/fa";

const ParentsPage = () => {
  const [parents, setParents] = useState<Parent[]>([]);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getParents(token)
        .then((res) => setParents(res.data))
        .catch((err) => console.error("Parent listesi alınamadı:", err));
    }
  }, [token]);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Parent Listesi</h5>
              <span className="badge bg-light text-dark">{parents.length} kişi</span>
            </div>
            <div className="card-body p-0">
              {parents.length > 0 ? (
                <ul className="list-group list-group-flush">
                  {parents.map((parent) => (
                    <li
                      key={parent.id}
                      className="list-group-item position-relative"
                    >
                      <div className="d-flex align-items-center">
                        <div>
                          <strong>
                            {parent.name} {parent.surname}
                          </strong>
                          <div className="text-muted small">ID: {parent.id}</div>
                        </div>
                      </div>

                      <FaEdit
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          cursor: "pointer",
                          color: "#0d6efd",
                        }}
                        size={18}
                        onClick={() => navigate(`/parents/${parent.id}`)}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center text-muted">
                  Hiç parent bulunamadı.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentsPage;