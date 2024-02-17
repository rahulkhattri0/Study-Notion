import React, { createContext, useContext } from 'react';

//compound component and render props pattern to build a reusable table component
const TableContext = createContext();
const Table = ({ columns, children }) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <div className="border-2 border-richblack-200 rounded-md">{children}</div>
    </TableContext.Provider>
  );
};
const Header = ({ children }) => {
  const { columns } = useContext(TableContext);
  return (
    <div className={`text-bold grid ${columns} rounded-md bg-richblack-500 text-richblack-5 p-2`}>
      {children}
    </div>
  );
};

const Row = ({ children }) => {
  const { columns } = useContext(TableContext);
  return <div className={`grid ${columns} text-richblack-50 p-2`}>{children}</div>;
};

const Body = ({ data, render }) => {
  return (
    <div className="flex flex-col gap-y-2">
      {data.length === 0 ? <p className="text-white">No Courses Found!</p> : data.map(render)}
    </div>
  );
};
Table.Header = Header;
Table.Row = Row;
Table.Body = Body;

export default Table;
