import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { INDIAN_CITIES } from "../../constants/indianCities"; // import your 400+ city list

export default function LocationComboBox({ value, onChange }) {
  const [query, setQuery] = useState("");

  // Filter locations by user input
  const filtered =
    query === ""
      ? []
      : INDIAN_CITIES.filter((loc) =>
          loc.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <Combobox as="div" value={value} onChange={onChange}>
      <div className="relative flex-1 min-w-[120px] max-w-[200px]">
        <div className="flex items-center bg-slate-50 rounded-xl px-3 h-12 border border-transparent focus-within:border-indigo-400">
          <FaMapMarkerAlt className="text-indigo-400 mr-2" />
          <Combobox.Input
            className="w-full bg-transparent border-none outline-none placeholder-slate-400 text-base"
            placeholder="Location"
            displayValue={v => v}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        {filtered.length > 0 && (
          <Combobox.Options className="absolute z-30 mt-1 w-full rounded-xl bg-white py-1 text-base shadow-xl ring-1 ring-black/5 focus:outline-none">
            {filtered.slice(0, 8).map((loc, i) => (
              <Combobox.Option
                key={loc}
                value={loc}
                className={({ active }) =>
                  `cursor-pointer select-none px-4 py-2 ${active ? "bg-indigo-100 text-indigo-900" : "text-slate-700"}`
                }
              >
                {loc}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
