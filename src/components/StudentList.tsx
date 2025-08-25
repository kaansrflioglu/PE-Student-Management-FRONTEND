import React from "react";
import type { Student } from "../types/student";

interface Props {
  students: Student[];
}

const StudentList: React.FC<Props> = ({ students }) => {
  return (
    <ul>
      {students.map((s) => (
        <li key={s.id}>
          {s.picture && (
            <div>
              <img src={s.picture} alt={`${s.name} ${s.surname}`} style={{ width: '100px', height: '100px', objectFit: 'cover'}} />
            </div>
          )}
          
          <strong>{s.name} {s.surname}</strong>
          {s.gradeLevel && s.gradeSection && (
            <span> - {s.gradeLevel}{s.gradeSection}</span>
          )}

          {s.weight && (
            <div>
              <strong>Kilo:</strong> {s.weight} kg
            </div>
          )}

          {s.height && (
            <div>
              <strong>Boy:</strong> {s.height} cm
            </div>
          )}

          {s.pace && (
            <div>
              <strong>Hız:</strong> {s.pace}
            </div>
          )}

          {s.flexibility && (
            <div>
              <strong>Esneklik:</strong> {s.flexibility}
            </div>
          )}

          {s.leap && (
            <div>
              <strong>Sıçrama:</strong> {s.leap}
            </div>
          )}

          {s.armStrength && (
            <div>
              <strong>Kol Kuvveti:</strong> {s.armStrength}
            </div>
          )}

          {s.legStrength && (
            <div>
              <strong>Bacak Kuvveti:</strong> {s.legStrength}
            </div>
          )}

          {s.muscleAnatomy && (
            <div>
              <strong>Kas Anatomisi:</strong> {s.muscleAnatomy}
            </div>
          )}

          {s.preferredSports && s.preferredSports.length > 0 && (
            <div>
              <strong>Tercih ettiği sporlar:</strong> {s.preferredSports.map(ps => ps.name).join(', ')}
            </div>
          )}

          {s.suitableSports && s.suitableSports.length > 0 && (
            <div>
              <strong>Uyumlu sporlar:</strong> {s.suitableSports.map(ps => ps.name).join(', ')}
            </div>
          )}

          {s.parents && s.parents.length > 0 && (
            <div>
              <strong>Ebeveynler:</strong> {s.parents.map(p => `${p.name} ${p.surname}`).join(', ')}
            </div>
          )}
          <br />
        </li>
      ))}
    </ul>
  );
};


export default StudentList;