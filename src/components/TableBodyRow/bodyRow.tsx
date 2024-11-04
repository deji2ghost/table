import { HeadRowProps } from "../../data/data";

const BodyRow = ({ id, element}: HeadRowProps) => {
  return (
    <>
    <td key={id} className="px-2 py-1 w-full flex flex-col">
    
      <p>{element}</p>
    </td>
    </>
  );
};

export default BodyRow;
