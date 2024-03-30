import React, { useState } from "react";
import styles from "./subAssembly.module.css"
import Mainassemblies from "./Mainassemblies";

const SubAssembly = () => {
  const [subAssemblyName, setSubAssemblyName] = useState("");
  const [fileLocation, setfileLocation] = useState("");
  const [form, setForm] = useState("");
  const [error, setError] = useState('');

  const handleSubAssemblyNameChange = (event) => {
    setSubAssemblyName(event.target.value);
  };

  const handlefileLocationChange = (event) => {
    setfileLocation(event.target.value);
  };

  const handleSave = () => {
    // validation();
    console.log("Saving data...", subAssemblyName, fileLocation);

    // Perform validation
    if (validation() === true) {
      setForm("subAssemblyAdded"); // Set the form state to 'subassemblyAdded' to display SubAssembly Details
    } else {
      console.log("Validation failed");
    }};

  const validation = () => {
    let isValid = true;
    let errorMessage = '';

    // Check if productName is empty
    if (subAssemblyName.trim() === '') {
      errorMessage += 'Please enter sub-assembly name.\n';
      isValid = false;
    }

    // Check if fileLocation is empty
    if (fileLocation.trim() === '') {
      errorMessage += 'Please enter file location.\n';
      isValid = false;
    }

     // Set error message
    setError(errorMessage);

    return isValid;
  };
  const [issubAssembliesComponents, setIssubAssembliesComponents] =
    useState("No");
  const [isBoughtUp, setIsBoughtUp] = useState("No");

  return (
    <>
      <div aria-label="Subassembly" className={styles.form}>
        {form === "subAssemblyAdded" ? (
          <Mainassemblies
            subAssemblyName={subAssemblyName}
            fileLocation={fileLocation}
          />
        ) : (
          <form>
            <div className={styles.tableContainer}>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Name of sub-assembly</th>
                  <td className={styles.td}>
                    <input
                      className={styles.input}
                      type="text"
                      value={subAssemblyName}
                      onChange={handleSubAssemblyNameChange}
                      required
                    />
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className={styles.th}>File location</th>
                  <td className={styles.td}>
                    <input
                      className={styles.input}
                      type="text"
                      value={fileLocation}
                      onChange={handlefileLocationChange}
                      required
                      />
                  </td>
                </tr>
                <tr>
                  <th className={styles.th}>Is it completely bought up</th>
                  <td className={styles.td}>
                    <select
                      className={styles.dropdown}
                      value={isBoughtUp} // ...force the select's value to match the state variable...
                      onChange={(e) => setIsBoughtUp(e.target.value)} // ... and update the state variable on any change!
                      >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th className={styles.th}>
                    Do you wish to add its subassemblies/components information?
                  </th>
                  <td className={styles.td}>
                    <select
                      className={styles.dropdown}
                      value={issubAssembliesComponents} // ...force the select's value to match the state variable...
                      onChange={(e) =>
                        setIssubAssembliesComponents(e.target.value)
                      } // ... and update the state variable on any change!
                      >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className={styles.buttonGroup}>
              <button type="button" className={styles.btn} onClick={handleSave}>
                Save
              </button>
            </div>
           </div>
          </form>
        )}
        {error && (
        <div className={styles.error}>
          <pre>{error}</pre>
        </div>
      )}
      </div>
    </>
  );
};

export default SubAssembly;
