import React from "react";
import type { Student } from "../../types/student";

interface Props {
    formData: Student;
    setFormData: (data: Student) => void;
}

const StudentHeader: React.FC<Props> = ({ formData, setFormData }) => {
    return (
        <div className="card shadow-sm mb-4">
            <div className="card-header bg-light">
                <h4 className="mb-0">Öğrenci Bilgileri</h4>
            </div>

            <div className="row g-0 align-items-center">
                <div className="col-3 text-center">
                    {formData.picture ? (
                        <img
                            src={formData.picture}
                            alt={`${formData.name} ${formData.surname}`}
                            className="img-fluid rounded-start p-3"
                            style={{ maxHeight: "256px", objectFit: "contain" }}
                        />
                    ) : (
                        <div
                            className="border rounded p-3 text-muted"
                            style={{ height: "256px", display: "flex", alignItems: "center", justifyContent: "center" }}
                        >
                            Resim Önizlemesi
                        </div>
                    )}
                    <input
                        type="text"
                        className="form-control form-control-sm mt-2"
                        placeholder="Resim URL'si"
                        value={formData.picture}
                        onChange={(e) => setFormData({ ...formData, picture: e.target.value })}
                    />
                </div>

                <div className="col-9">
                    <div className="card-body">
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="İsim"
                        />
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={formData.surname}
                            onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                            placeholder="Soyisim"
                        />
                        <div className="d-flex gap-2 mb-2">
                            <input
                                type="number"
                                className="form-control"
                                value={formData.gradeLevel || ""}
                                onChange={(e) => {
                                    let val = parseInt(e.target.value);
                                    if (!isNaN(val)) {
                                        val = Math.max(1, Math.min(12, val));
                                        setFormData({ ...formData, gradeLevel: val });
                                    } else {
                                        setFormData({ ...formData, gradeLevel: undefined });
                                    }
                                }}
                                placeholder="Sınıf Seviyesi"
                                min={1}
                                max={12}
                            />
                            <input
                                type="text"
                                className="form-control"
                                value={formData.gradeSection}
                                onChange={(e) => {
                                    let val = e.target.value.replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 2);
                                    setFormData({ ...formData, gradeSection: val });
                                }}
                                placeholder="Şube"
                                maxLength={2}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentHeader;