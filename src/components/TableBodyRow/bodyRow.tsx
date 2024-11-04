import { HeadRowProps } from "../../data/data";

const BodyRow = ({ id, element}: HeadRowProps) => {
  return (
    <>
    <td key={id} className="md:px-3 w-full flex flex-col">
    
      <p>{element}</p>
    </td>
    </>
  );
};

export default BodyRow;
