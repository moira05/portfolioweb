import type { BenchmarkRow } from "@/types/case";

interface Props {
  cols: string[];
  highlightCol: number;
  rows: BenchmarkRow[];
}

export default function BenchmarkTable({ cols, highlightCol, rows }: Props) {
  return (
    <div className="overflow-x-auto rounded-[20px] border border-[#d9d4ee] bg-white">
      <table className="w-full min-w-[820px] border-collapse text-[0.85rem]">
        <caption className="sr-only">
          Benchmark de funcionalidades en transferencias entre {cols.length} apps
        </caption>
        <thead>
          <tr>
            <th scope="col" className="py-4 pl-5 pr-3 text-left font-manrope text-[0.8rem] font-semibold text-[#5e5c80]">
              Funcionalidad
            </th>
            {cols.map((col, i) => (
              <th
                key={col}
                scope="col"
                className={`px-3 py-4 text-center font-manrope text-[0.8rem] font-semibold text-[#5e5c80] ${i === highlightCol ? "bg-[#eeedf5]" : ""}`}
              >
                {col}
              </th>
            ))}
            <th scope="col" className="py-4 pl-3 pr-5 text-right font-manrope text-[0.8rem] font-semibold text-[#5e5c80]">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-t border-[#d9d4ee]">
              <th scope="row" className="py-3 pl-5 pr-3 text-left font-manrope font-medium text-[#171717]">
                {row.label}
              </th>
              {row.values.map((val, ci) => (
                <td
                  key={ci}
                  className={`px-3 py-3 text-center ${ci === highlightCol ? "bg-[#eeedf5]" : ""}`}
                  aria-label={val === "y" ? "Sí" : "No"}
                >
                  <span
                    className={`inline-block size-3.5 rounded-full ${val === "y" ? "bg-[#b0aaf2]" : "bg-[#d9d4ee]"}`}
                    aria-hidden="true"
                  />
                </td>
              ))}
              <td className="py-3 pl-3 pr-5 text-right font-manrope font-semibold text-[#171717]">
                {row.total}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="px-5 py-3 font-manrope text-[0.8rem] text-[#5e5c80]">
        <span className="mr-2 inline-block size-3 rounded-full bg-[#b0aaf2] align-middle" aria-hidden="true" />
        Punto violeta: la app ofrece la funcionalidad.{" "}
        <span className="mx-2 inline-block size-3 rounded-full bg-[#d9d4ee] align-middle" aria-hidden="true" />
        Punto gris: no la ofrece.
      </p>
    </div>
  );
}
