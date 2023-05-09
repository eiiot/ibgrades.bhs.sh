import { Boundary } from "./Course";

interface ChartProps {
  boundaries: Boundary[];
}

const LightChart = ({ boundaries }: ChartProps) => {
  // flex container with 7 boxes, where the widths are determined by the boundaries

  return (
    <>
      <div className="flex flex-row space-x-2">
        {boundaries.map((boundary) => (
          <div
            key={boundary.grade}
            className="border border-white p-2 text-center"
            style={{ width: `${boundary.to - boundary.from}%` }}
          >
            {boundary.grade}
          </div>
        ))}
      </div>
      <div className="flex-row space-x-2 hidden sm:flex">
        {boundaries.map((boundary) => (
          <div
            key={boundary.grade}
            className="border-l border-l-neutral-600 pl-2 !-mt-1 text-neutral-600 text-sm"
            style={{ width: `${boundary.to - boundary.from}%` }}
          >
            {boundary.from}%
          </div>
        ))}
      </div>
    </>
  );
};

export default LightChart;
