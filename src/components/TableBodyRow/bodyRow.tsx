import { HeadRowProps } from "../../data/data";

const BodyRow = ({ id, element}: HeadRowProps) => {
  return (
    <td key={id} className="px-3 w-full">
      {element}
    </td>
  );
};

export default BodyRow;
