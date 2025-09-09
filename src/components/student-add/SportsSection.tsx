import React from "react";
import type { Student } from "../../types/student";
import type { Sports } from "../../types/sports";

interface Props {
    formData: Student;
    setFormData: (data: Student) => void;
    allSports: Sports[];
}

const SportsSection: React.FC<Props> = ({ formData, setFormData, allSports }) => {
    const toggleSport = (field: "preferredSports" | "suitableSports", sport: Sports) => {
        let updated: Sports[] = formData[field] ? [...formData[field]!] : [];
        const exists = updated.some((s) => s.id === sport.id);

        if (exists) updated = updated.filter((s) => s.id !== sport.id);
        else updated.push(sport);

        setFormData({ ...formData, [field]: updated });
    };

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-header bg-light">
                <h4 className="mb-0">Sporlar</h4>
            </div>
            <div className="card-body">
                <p><strong>Tercih Edilen Sporlar:</strong></p>
                <div className="d-flex flex-wrap gap-2">
                    {allSports.map((sport) => {
                        const isSelected = formData.preferredSports?.some((s) => s.id === sport.id);
                        return (
                            <div
                                key={sport.id}
                                className={`badge ${isSelected ? "bg-danger" : "bg-secondary"} p-2`}
                                style={{ cursor: "pointer", borderRadius: "0.2rem" }}
                                onClick={() => toggleSport("preferredSports", sport)}
                            >
                                {sport.name} {isSelected ? "✔️" : ""}
                            </div>
                        );
                    })}
                </div>

                <p className="mt-3"><strong>Uygun Sporlar:</strong></p>
                <div className="d-flex flex-wrap gap-2">
                    {allSports.map((sport) => {
                        const isSelected = formData.suitableSports?.some((s) => s.id === sport.id);
                        return (
                            <div
                                key={sport.id}
                                className={`badge ${isSelected ? "bg-success" : "bg-secondary"} p-2`}
                                style={{ cursor: "pointer", borderRadius: "0.2rem" }}
                                onClick={() => toggleSport("suitableSports", sport)}
                            >
                                {sport.name} {isSelected ? "✔️" : ""}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SportsSection;