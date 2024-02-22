
import React from 'react';

const CustomTable = ({ thead, tbody }) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-red-500 text-white">
          {thead}
        </tr>
      </thead>
      <tbody>{tbody}</tbody>
    </table>
  );
};

export default CustomTable;
