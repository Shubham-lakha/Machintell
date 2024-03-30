import React, { useEffect, useState, useRef } from "react";
import styles from "./subAssembly.module.css";
import style from "./Mainassemblies.module.css"

function Mainassemblies({subAssemblyName,fileLocation,}) {
  const [mainFunction, setMainFunction] = useState("");
  const [error, setError] = useState('');
  const [subAssembly, setSubAssembly] = useState({
    subAssemblyName: subAssemblyName,
    fileLocation: fileLocation,
    mainFunction:'',
    secondaryFunction:[], specifications:[],
  });
  const [secondaryFunctions, setSecondaryFunctions] = useState([""]); // State to store secondary functions
  const [selectedRows, setSelectedRows] = useState([]); // State to store selected row indices
  const [selectedRow, setSelectedRow] = useState(null); // State to store selected row index(singular)
  const [subassemblyId, setSubassemblyId] = useState("");
  useEffect( () => {
    generateSubassemblyId(subAssemblyName);
  }, [subAssemblyName]);

  const [isSaveBtnClicked,  setIsSaveBtnClicked] = useState(false); //State  for tracking whether the save button has been clicked or not
  const [issubAssemblyTableExpanded, setIssubAssemblyTableExpanded] = useState(true); // New state for table expansion
  const [isBtnCollapse,  setIsBtnCollapse] = useState(true); // State for button collapse functionality of save/add secondary function buttons
  const [vButtonVisible, setVButtonVisible] = useState(false); // State to control "V" button visibility
  const tableRef = useRef(null); // Reference for the table component

  useEffect(() => {
    if (tableRef.current){
      const tableBody = tableRef.current.querySelector("tbody");
      tableBody.addEventListener("DOMNodeInseted", handleRowInserted); // Add event listener for row insertion
    }

    return () => {
      if (tableRef.current) {
        const tableBody = tableRef.current.querySelector("tbody");
        tableBody.removeEventListener("DOMNodeInserted", handleRowInserted); // Remove event listener on cleanup
      }
    };
  }, [tableRef]); // Run effect only when tableRef changes

  const handleRowInserted = () => {
    const tableBody = tableRef.current.querySelector("tbody");
    const lastRow = tableBody.querySelector("tr:last-child"); // Get the last row
    if (lastRow) {
      lastRow.scrollIntoView({ behavior: "smooth" }); // Scroll to the last row smoothly
    }
  };

  const generateSubassemblyId = (subAssemblyName) => {
    if (subAssemblyName.length >= 2){
      const firstTwoChars = subAssemblyName.substring(0,2).toUpperCase();
      const date = new Date();
      const month = ('0' + ((date.getMonth()+1))).slice(-2);
      const year = date.getFullYear().toString().slice(-2);
      const specialChars = "!@#$%^&*()_[]{}|";
      const specialChar = specialChars.charAt(Math.floor(Math.random() * specialChars.length));
      const orderNumber = ('00' + Math.floor(Math.random() * 1000)).slice(-3);;      
      const generateSubassemblyId = firstTwoChars + month + year + specialChar + orderNumber;
      setSubassemblyId(generateSubassemblyId);
    }
  }
  const handleMainFunctionChange = (event) => {
    setMainFunction(event.target.value);
  };

  const handleAddSecondary = () => {
    setSecondaryFunctions([...secondaryFunctions, ""]); // Add a new empty secondary function to the state
    setSelectedRow(null); // Deselect any previously selected row
  };

  const handleSecondaryFunctionChange = (index, value) => {
    const updatedSecondaryFunctions = [...secondaryFunctions];
    updatedSecondaryFunctions[index] = value;
    setSecondaryFunctions(updatedSecondaryFunctions);
  };

  const handleExpandCollapse = () => {
    setIssubAssemblyTableExpanded(!issubAssemblyTableExpanded);
  };
  
  const handleAddSpecification = () =>{
    setIsBtnCollapse(false); // Collapse the button
  }

  const handleSave = () => {
    console.log('Saving data...', mainFunction, secondaryFunctions);

    // Perform validation
    if (validation()) {
      setIssubAssemblyTableExpanded(false);//Hide all rows except "Name of the Product" Row
      setVButtonVisible(true);
      setIsSaveBtnClicked(true); //Mark  save Button as Clicked
    } else {
      console.log('Validation failed');
    }
  };

  const validation = () => {
    let isValid = true;
    let errorMessage = '';

    // Check if mainFunction is empty
    if (mainFunction.trim() === '') {
      errorMessage += 'Please enter Main Function.\n';
      isValid = false;
    }

    // Check if Secondary Function is empty
    if (secondaryFunctions.some(sf => sf.trim() === '')) {
      errorMessage += 'Please enter  all Secondary Functions.\n';
      isValid = false;
    }

    // Set error message
    setError(errorMessage);

    return isValid;
  };
  const handleDelete = () => {
    let updatedSecondaryFunctions;
    if (selectedRows.length === 0) {
      updatedSecondaryFunctions = [...secondaryFunctions];
      updatedSecondaryFunctions.pop();
    } else {
      updatedSecondaryFunctions = secondaryFunctions.filter(
        (_, index) => !selectedRows.includes(index)
      );
    }
    setSecondaryFunctions(updatedSecondaryFunctions);
    setSelectedRows([]);
  };

  const toggleRowSelection = (index) => {
    const selectedIndex = selectedRows.indexOf(index);
    if (selectedIndex === -1) {
      setSelectedRows([...selectedRows, index]);
    } else {
      const updatedSelectedRows = [...selectedRows];
      updatedSelectedRows.splice(selectedIndex, 1);
      setSelectedRows(updatedSelectedRows);
    }
  };

  const isRowSelected = (index) => {
    return selectedRows.includes(index);
  };

  return (
    <div>
      <div className={style.subAssemblyForm}>
        {issubAssemblyTableExpanded && (
          <div className={`${style.plusMinus} ${style.plusMinusAligned}`}> {/* Apply both classes */}
            <div><button className={style.btn} onClick={handleAddSecondary}>+</button></div>
            <div><button className={style.btn} onClick={handleDelete}>-</button></div>
          </div>
        )}
    <div aria-label="subAssemblyAdded" className={styles.form}>
        <div>
          <table className={style.table1} ref={tableRef}> {/* Attach ref to the table */}
            <thead>
              <tr>
                <th className={styles.th}>Name of sub-assembly</th>
                <td className={styles.td}>{subAssembly.subAssemblyName}</td>
              </tr>
              {issubAssemblyTableExpanded && (
            <>
              <tr>
                <th className={styles.th}>sub-assembly ID</th>
                <td className={styles.td}>{subassemblyId}</td>
              </tr>
              <tr>
                <th className={styles.th}>File location</th>
                <td className={styles.td}>{fileLocation}</td>
              </tr>
              <tr>
                <th className={styles.th}>Is it completely bought up</th>
                <td className={styles.td}>No</td>
              </tr>
              <tr>
                <th className={styles.th}>
                  Do you wish to add its subassemblies/components information?
                </th>
                <td className={styles.td}>Yes</td>
              </tr>
              <tr>
                <th className={styles.th}>Main Functions </th>
                <td className={styles.td}>
                <textarea className={styles.input}
                        value={mainFunction}
                        onChange={handleMainFunctionChange}
                      />
                </td>
              </tr>
              <tr>
                <th className={styles.th} colSpan="2">Add secondary functions</th>
              </tr>
              </>
              )}
            </thead>
            {issubAssemblyTableExpanded && (
            <tbody>
              {secondaryFunctions.map((secondaryFunction, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: isRowSelected(index)
                      ? "lightgray"
                      : "white",
                  }}
                  onClick={() => setSelectedRow(selectedRow === index ? null : index)}
                >
                  <th className={styles.th}>Secondary function {index + 1}</th>
                  <td className={styles.td}>
                    <input
                      type="text"
                      value={secondaryFunction}
                      onChange={(event) =>
                        handleSecondaryFunctionChange(index, event.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            )}
          <div>
      </div>
      {isBtnCollapse && (
        <div className={style.buttonContainer}>
          <div className={style.btn}>
            <button  onClick={handleSave}>Save</button>
          </div>
          <div className={style.btn}>
            <button onClick={handleAddSpecification} disabled={!isSaveBtnClicked}>Add Specification</button>
          </div>
          {error && (
            <div className={styles.error}>
              <pre>{error}</pre>
            </div>
          )}
        </div>
      )}
          </table>
       </div>
       </div>
      {vButtonVisible && ( // Conditionally render "V" button
    <div className={style.btn}>
      <div><button className={style.Vbtn} onClick={handleExpandCollapse}>V</button></div>
    </div>
  )}
    </div>
    </div>
  );
}

export default Mainassemblies;
