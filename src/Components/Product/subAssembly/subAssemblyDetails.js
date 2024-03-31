import React, { useState, useRef } from "react";
import styles from "../product.module.css";
import { productActions } from "../../../store";
import { useDispatch, useSelector } from "react-redux";

function SubAssemblyDetails() {
    const { subassemblies, currActive } = useSelector((state) => state.product);
    const {
        name,
        fileLocation,
        isBoughtUp,
        isChildrenNeeded,
        mainFunction,
        secondaryFunctions,
    } = subassemblies[currActive];
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const [secondaryFunctionsState, setSecondaryFunctionsState] =
        useState(secondaryFunctions);
    const [selectedRows, setSelectedRows] = useState([]);
    const mainFunctionRef = useRef();

    const handleAddSecondary = () => {
        setSecondaryFunctionsState((prevState) => [...prevState, ""]); // Add a new empty secondary function to the state
    };

    const handleSecondaryFunctionsStateChange = (value, index) => {
        setSecondaryFunctionsState((prevState) => {
            const updatedSecondaryFunctionsState = [...prevState];
            updatedSecondaryFunctionsState[index] = value;
            return updatedSecondaryFunctionsState;
        });
    };

    const handleDelete = () => {
        if (
            window.confirm(
                "Are you sure you want to delete selected secondary functions?"
            )
        ) {
            setSecondaryFunctionsState((prevState) => {
                return selectedRows.length
                    ? prevState.filter(
                          (_, index) => !selectedRows.includes(index)
                      )
                    : prevState.slice(0, -1);
            });
            setSelectedRows([]);
        }
    };

    const toggleRowSelection = (selectedIndex) => {
        setSelectedRows((prevState) => {
            return prevState.includes(selectedIndex)
                ? prevState.filter((index) => index != selectedIndex)
                : [...prevState, selectedIndex];
        });
    };

    const validation = () => {
        let isValid = true;
        let errorMessage = "";

        // Check if mainFunction is empty
        if (mainFunctionRef.current.value.trim() === "") {
            errorMessage += "Please enter Main Function.\n";
            isValid = false;
        }

        // Check if Secondary Function is empty
        if (secondaryFunctionsState.some((sf) => sf.trim() === "")) {
            errorMessage += "Please enter  all Secondary Functions.\n";
            isValid = false;
        }

        // Set error message
        setError(errorMessage);

        return isValid;
    };

    const handleSave = () => {
        console.log(
            "Saving data...",
            mainFunctionRef.current.value,
            secondaryFunctionsState
        );

        // Perform validation
        if (validation()) {
            dispatch(
                productActions.addSubassemblyDetails({
                    mainFunction: mainFunctionRef.current.value,
                    secondaryFunctions: [...secondaryFunctionsState],
                })
            );
            alert("Subassembly details saved successfully!");
            // add subassembly details (main function) data to backend
            // add subassembly secondary functions data to backend
        } else {
            console.log("Validation failed");
        }
    };

    return (
        <div aria-label="SubAssemblyAdded" className={styles.form}>
            <div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>Name of sub-assembly</th>
                            <td className={styles.td}>{name}</td>
                        </tr>
                        <tr>
                            <th className={styles.th}>sub-assembly ID</th>
                            <td className={styles.td}>{currActive}</td>
                        </tr>
                        <tr>
                            <th className={styles.th}>File location</th>
                            <td className={styles.td}>{fileLocation}</td>
                        </tr>
                        <tr>
                            <th className={styles.th}>
                                Is it completely bought up
                            </th>
                            <td className={styles.td}>{isBoughtUp}</td>
                        </tr>
                        <tr>
                            <th className={styles.th}>
                                Do you wish to add its subassemblies/components
                                information?
                            </th>
                            <td className={styles.td}>{isChildrenNeeded}</td>
                        </tr>
                        <tr>
                            <th className={styles.th}>Main Functions </th>
                            <td className={styles.td}>
                                <textarea
                                    className={styles.input}
                                    defaultValue={mainFunction}
                                    ref={mainFunctionRef}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th className={styles.th} colSpan="2">
                                Add secondary function
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {secondaryFunctionsState.map(
                            (secondaryFunctionState, index) => (
                                <tr
                                    key={index}
                                    style={{
                                        backgroundColor: selectedRows.includes(
                                            index
                                        )
                                            ? "lightgray"
                                            : "white",
                                    }}
                                    onClick={() => toggleRowSelection(index)}
                                >
                                    <th className={styles.th}>
                                        Secondary function {index + 1}
                                    </th>
                                    <td className={styles.td}>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            value={secondaryFunctionState}
                                            onChange={(event) =>
                                                handleSecondaryFunctionsStateChange(
                                                    event.target.value,
                                                    index
                                                )
                                            }
                                        />
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
                <div>
                    <button
                        className={styles.btn2}
                        onClick={handleAddSecondary}
                    >
                        Add Secondary Function
                    </button>
                    <button className={styles.btn2} onClick={handleDelete}>
                        Delete Selected Secondary Functions
                    </button>
                    <button
                        className={styles.btn2}
                        type="button"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
            {error && (
                <div className={styles.error}>
                    <pre>{error}</pre>
                </div>
            )}
        </div>
    );
}

export default SubAssemblyDetails;
