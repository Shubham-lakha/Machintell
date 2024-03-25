import React, { useState } from "react";
import ProductDetails from "./ProductDetails";
import styles from "../product.module.css";

function AddNewProduct() {
  const [product, setProduct] = useState({
    productName: "",
    fileLocation: "",
    mainFunction: "",
    secondaryFunction: [],
    specifications: [],
  });

  const [form, setForm] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log(value);
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saving data...", product);

    // Perform validation
    if (validation()) {
      setForm("productAdded"); // Set the form state to 'productAdded' to display ProductDetails
    } else {
      console.log("Validation failed");
    }
  };

  const validation = () => {
    let isValid = true;
    let errorMessage = "";

    // Check if productName is empty
    if (product.productName.trim() === "") {
      errorMessage += "Please enter product name.\n";
      isValid = false;
    }

    // Check if fileLocation is empty
    if (product.fileLocation.trim() === "") {
      errorMessage += "Please enter file location.\n";
      isValid = false;
    }

    // Set error message
    setError(errorMessage);

    return isValid;
  };

  return (
    <div aria-label="Product Form" className={styles.form}>
      {form === "productAdded" ? (
        <ProductDetails product={product} handleInputChange={handleInputChange} />
      ) : (
        <form>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Name of the Product</th>
                  <td className={styles.td}>
                    <input
                      className={styles.input}
                      type="text"
                      value={product.productName}
                      onChange={handleInputChange}
                      name="productName"
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
                      value={product.fileLocation}
                      onChange={handleInputChange}
                      name="fileLocation"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className={styles.buttonGroup}>
              <button
                type="button"
                className={styles.btn2}
                onClick={handleSave}
              >
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
  );
}

export default AddNewProduct;
