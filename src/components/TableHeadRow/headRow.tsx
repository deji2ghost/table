import { HeadRowProps } from "../../data/data";

const HeadRow = ({id, element}: HeadRowProps) => {
  return (
    <th key={id} className="px-2 py-1 w-full">
      {element}
    </th>
  );
};

export default HeadRow;
