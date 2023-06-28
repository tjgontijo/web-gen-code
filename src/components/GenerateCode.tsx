'use client'
import { useState, useEffect } from "react";
import { Trash  } from "@phosphor-icons/react";

type Type = {
  id: number;
  name: string;
};
type Group = {
  id: number;
  type_id: number;
  name: string;
};
type Class = {
  id: number;
  group_id: number;
  name: string;
};
type Item = {
  id: number;
  class_id: number;
  name: string;
  cod_senasp: string;
};

async function fetchTypes(): Promise<Type[]> {
  const response = await fetch("http://localhost:3333/types");
  return response.json();
}

async function fetchGroupsByType(typeId: number): Promise<Group[]> {
  const response = await fetch(`http://localhost:3333/group-type/${typeId}`);
  return response.json();
}

async function fetchClassesByGroup(groupId: number): Promise<Class[]> {
  const response = await fetch(`http://localhost:3333/class-group/${groupId}`);
  return response.json();
}

async function fetchItemsByClass(classId: number): Promise<Item[]> {
  const response = await fetch(`http://localhost:3333/item-class/${classId}`);
  return response.json();
}

async function fetchItemCodById(itemId: number): Promise<string> {
  const response = await fetch(`http://localhost:3333/items/${itemId}`);
  const jsonData = await response.json();
  return jsonData[0].cod_senasp;
}

interface Selection {
  type: string;
  group: string;
  class: string;
  item: string;
}

export default function GenerateCode() {
  const [types, setTypes] = useState<Type[]>([]);
  const [selection, setSelection] = useState<Selection>({
    type: "",
    group: "",
    class: "",
    item: ""
  });
  const [groups, setGroups] = useState<Group[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [codigoSenasp, setCodigoSenasp] = useState<string>("");
  const [isGenerateButtonDisabled, setGenerateButtonDisabled] = useState(true);
  const [showCodigoSenasp, setShowCodigoSenasp] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const typesData = await fetchTypes();
      setTypes(typesData);
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchGroups() {
      if (selection.type) {
        const groupsData = await fetchGroupsByType(parseInt(selection.type));
        setGroups(groupsData);
        setSelection((prevState) => ({
          ...prevState,
          group: ""
        }));
        setClasses([]);
      } else {
        setGroups([]);
      }
    }

    fetchGroups();
  }, [selection.type]);

  useEffect(() => {
    async function fetchClasses() {
      if (selection.group) {
        const classesData = await fetchClassesByGroup(parseInt(selection.group));
        setClasses(classesData);
        setSelection((prevState) => ({
          ...prevState,
          class: ""
        }));
      } else {
        setClasses([]);
      }
    }

    fetchClasses();
  }, [selection.group]);

  useEffect(() => {
    async function fetchItems() {
      if (selection.class) {
        const itemsData = await fetchItemsByClass(parseInt(selection.class));
        setItems(itemsData);
      } else {
        setItems([]);
      }
    }

    fetchItems();
  }, [selection.class]);

  useEffect(() => {
    if (selection.item) {
      setGenerateButtonDisabled(false);
    } else {
      setGenerateButtonDisabled(true);
    }
  }, [selection.item]);

  const handleSelectionChange = (key: keyof Selection) => (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelection((prevState) => ({
      ...prevState,
      [key]: value
    }));

    if (key === "type") {
      setSelection((prevState) => ({
        ...prevState,
        group: "",
        class: "",
        item: ""
      }));
    } else if (key === "group") {
      setSelection((prevState) => ({
        ...prevState,
        class: "",
        item: ""
      }));
    } else if (key === "class") {
      setSelection((prevState) => ({
        ...prevState,
        item: ""
      }));
    }
  };

  const handleCodigoSenaspClick = () => {
    if (codigoSenasp) {
      // Copiar o texto para a área de transferência
      navigator.clipboard.writeText(codigoSenasp)
        .then(() => {
          console.log("Texto copiado para a área de transferência!");
        })
        .catch((error) => {
          console.error("Erro ao copiar o texto:", error);
        });
    }
  };

  const handleGenerateCode = async () => {
    try {
      const codigoSenasp = await fetchItemCodById(parseInt(selection.item));
      setCodigoSenasp(codigoSenasp);
      setShowCodigoSenasp(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClear = () => {
    setSelection({
      type: "",
      group: "",
      class: "",
      item: ""
    });
    setCodigoSenasp("");
    setShowCodigoSenasp(false);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8 text-zinc-100 bg-zinc-800 rounded-xl w-11/12 p-8 max-w-2xl sm:w-11/12 sm:p-12 lg:w-2/3 lg:p-12 lg:max-w-2xl">
      <h1>Gerador de Código SENASP</h1>
      <select
        className="bg-zinc-600 p-3 rounded w-full text-zinc-300"
        value={selection.type}
        onChange={handleSelectionChange("type")}
      >
        <option value="">Escolha o Tipo</option>
        {types.map((res) => (
          <option key={res.id} value={res.id}>
            {res.name}
          </option>
        ))}
      </select>
      <select
        id="group"
        className="bg-zinc-600 p-3 rounded w-full text-zinc-300"
        value={selection.group}
        onChange={handleSelectionChange("group")}
        disabled={!selection.type}
      >
        <option value="">Escolha o Grupo</option>
        {groups.map((res) => (
          <option key={res.id} value={res.id}>
            {res.name}
          </option>
        ))}
      </select>
      <select
        className="bg-zinc-600 p-3 rounded w-full text-zinc-300"
        value={selection.class}
        onChange={handleSelectionChange("class")}
        disabled={!selection.group}
      >
        <option value="">Escolha a Classe</option>
        {classes.map((res) => (
          <option key={res.id} value={res.id}>
            {res.name}
          </option>
        ))}
      </select>
      <select
        className="bg-zinc-600 p-3 rounded w-full text-zinc-300"
        disabled={!selection.class}
        value={selection.item}
        onChange={handleSelectionChange("item")}
      >
        <option className="w-24" value="">
          Escolha o Item
        </option>
        {items.map((res) => (
          <option key={res.id} value={res.id}>
            {res.name}
          </option>
        ))}
      </select>

      <div className="flex gap-5 w-full">
        <button
          className="w-1/5 bg-zinc-200 p-4 rounded text-zinc-700 text-center flex justify-between"
          onClick={handleClear}
        >Limpar <Trash  size={22} />
        </button>
        <button
          className="w-4/5 bg-green-400 p-2 rounded text-zinc-700"
          style={{ opacity: isGenerateButtonDisabled ? 0.5 : 1 }}
          onClick={handleGenerateCode}
          disabled={isGenerateButtonDisabled}
        >
          Gerar Código
        </button>
      </div>

      {showCodigoSenasp && (
        <p
          className="text-xl w-full text-center border-2 p-6 rounded cursor-pointer"
          onClick={handleCodigoSenaspClick}
          title="Clique para Copiar"
        >
          {codigoSenasp}
        </p>
      )}
    </div>
  );
}
