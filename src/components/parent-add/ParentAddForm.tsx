import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

export interface Sport {
  id: string;
  name: string;
}

export interface ParentFormData {
  name: string;
  surname: string;
  phone: string;
  relation: string;
  height: number | "";
  sportsBackground: Sport[];
}

interface Props {
  onSave: (formData: ParentFormData) => void;
}

const ParentAddForm: React.FC<Props> = ({ onSave }) => {
  const { token } = useAuth();
  const [allSports, setAllSports] = useState<Sport[]>([]);
  const [formData, setFormData] = useState<ParentFormData>({
    name: "",
    surname: "",
    phone: "",
    relation: "",
    height: "",
    sportsBackground: [],
  });

  useEffect(() => {
    if (!token) return;

    const fetchSports = async () => {
      try {
        const res = await axios.get("/api/sports", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (Array.isArray(res.data)) setAllSports(res.data);
      } catch (err) {
        console.error("Sporlar alınamadı", err);
        setAllSports([]);
      }
    };

    fetchSports();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "height" ? (value === "" ? "" : Number(value)) : value,
    });
  };

  const toggleSport = (sport: Sport) => {
    let updated = [...formData.sportsBackground];
    const exists = updated.some((s) => s.id === sport.id);

    if (exists) {
      updated = updated.filter((s) => s.id !== sport.id);
    } else {
      updated.push(sport);
    }

    setFormData({ ...formData, sportsBackground: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const isSelected = (sport: Sport) =>
    formData.sportsBackground.some((s) => s.id === sport.id);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-light">
        <h4 className="mb-0">Veli Bilgileri</h4>
      </div>

      <div className="card-body">
        <form id="parent-add-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Ad</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Soyad</label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Telefon</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={(e) => {
                let val = e.target.value.replace(/\D/g, "");

                if (val.startsWith("0")) {
                  val = val.slice(1);
                }

                if (val.startsWith("5")) {
                  if (val.length > 10) val = val.slice(0, 10);
                  val = val.replace(
                    /^(\d{3})(\d{3})(\d{2})(\d{2})$/,
                    "$1-$2-$3-$4"
                  );
                }

                setFormData({ ...formData, phone: val });
              }}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Boy (cm)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="form-control"
              min={0}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Yakınlık</label>
            <div className="d-flex flex-wrap gap-2">
              {["Anne", "Baba", "Abla", "Abi"].map((rel) => {
                const selected = formData.relation === rel;
                return (
                  <span
                    key={rel}
                    className={`badge ${selected ? "bg-primary" : "bg-secondary"} p-2`}
                    style={{ cursor: "pointer", borderRadius: "0.2rem" }}
                    onClick={() => setFormData({ ...formData, relation: rel })}
                  >
                    {rel} {selected ? "✔️" : ""}
                  </span>
                );
              })}
            </div>
          </div>


          <div className="mb-3">
            <label className="form-label">Spor Geçmişi</label>
            <div className="d-flex flex-wrap gap-2">
              {allSports.map((sport) => {
                const selected = isSelected(sport);
                return (
                  <span
                    key={sport.id}
                    className={`badge ${selected ? "bg-success" : "bg-secondary"} p-2`}
                    style={{ cursor: "pointer", borderRadius: "0.2rem" }}
                    onClick={() => toggleSport(sport)}
                  >
                    {sport.name} {selected ? "✔️" : ""}
                  </span>
                );
              })}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ParentAddForm;