import React, { useState } from "react";

export default function TableRows() {
  const [rows, setRows] = useState([{}])
  const handleChange = idx => e => {
    // const { name, value } = e.target;
    const name = e.target.name;
    const value = e.target.value;
    const rowss = [...rows];
    rowss[idx] = {
      [name]: value
    };
    setRows(
      rowss
    );
  };
  const handleAddRow = () => {
    const item = [{
      name: "fr",
      mobile: "fr"
    }];
    setRows([...rows, item]);
  };
  const handleRemoveRow = () => {
    setRows(rows.slice(0, -1));
  };
  const handleRemoveSpecificRow = (idx) => () => {
    const rowss = [...rows]
    rowss.splice(idx, 1)
    setRows([ rowss ])
  }
    return (
      <div>
        <div className="container">
          <div className="row clearfix">
            <div className="col-md-12 column">
              <table
                className="table table-bordered table-hover"
                id="tab_logic"
              >
                <thead>
                  <tr>
                    <th className="text-center"> # </th>
                    <th className="text-center"> Name </th>
                    <th className="text-center"> Mobile </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {rows.map((item, idx) => (
                    <tr id="addr0" key={idx}>
                      <td>{idx}</td>
                      <td>
                        <input
                          type="text"
                          name="name"
                          value={rows[idx].name}
                          onChange={handleChange(idx)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="mobile"
                          value={rows[idx].mobile}
                          onChange={handleChange(idx)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={handleRemoveSpecificRow(idx)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={handleAddRow} className="btn btn-primary">
                Add Row
              </button>
              <button
                onClick={handleRemoveRow}
                className="btn btn-danger float-right"
              >
                Delete Last Row
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }