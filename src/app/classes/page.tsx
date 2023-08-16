'use client'
import React, { useState, useEffect } from "react";

type Group = {
  id: number;
  type_id: number;
  name: string;
};

export default function Groups() {
  const API = 'http://127.0.0.1:3333';

  async function fetchGroups(): Promise<Group[]> {
    const response = await fetch(`${API}/groups`);
    return response.json();
  }

  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    fetchGroups()
      .then((data) => setGroups(data))
      .catch((error) => console.error("Error fetching groups:", error));
  }, []);

  return (
    <>
      <h1 className="py-6 text-xl">Grupos</h1>
      <ol>
        {groups.map((res) => (
          <li key={res.id} value={res.id}>
            {res.name}
          </li>
        ))}
      </ol>
    </>
  );
}
