import { Pie, PieChart, Label } from "recharts";
import CountsLabel from "./CountsLabel";
import processStatus from "./ProcessStatus";

const PieDiagram = ({ data, total }) => {
  console.log("the data: ", data, total);
  return (
    <div className="mx-auto aspect-square max-h-[250px]">
      <PieChart width={250} height={250}>
        <Pie
          data={data}
          dataKey={"counts"}
          nameKey={"name"}
          innerRadius={50}
          outerRadius={80}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => CountsLabel({ ...viewBox, total })}
          />
        </Pie>
      </PieChart>
    </div>
  );
};

export default PieDiagram;
