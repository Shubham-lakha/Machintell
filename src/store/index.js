import { configureStore, createSlice } from "@reduxjs/toolkit";

function handleChildrenNeed(state) {
    const { currActive, subassemblies } = state;
    if (
        currActive.startsWith("s") &&
        subassemblies[currActive].isChildrenNeeded === "Yes"
    ) {
        subassemblies[currActive].isChildrenNeeded = "added";
    }
}

const initialState = {
    name: "",
    fileLocation: "",
    id: "",
    mainFunction: "",
    secondaryFunctions: [""],
    specifications: [["", "", ""]],
    subassemblies: {
        untitled: { name: "Untitled", parent: "" },
    },
    components: {},
    currActive: "",
    currForm: "",
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProductName(state) {
            state.name = "Untitled project";
        },
        addProduct(state, { payload }) {
            state.name = payload.name;
            state.fileLocation = payload.fileLocation;
            state.id = payload.id;
            state.currActive = payload.id;
            state.currForm = "productDetails";
        },
        addProductDetails(state, { payload }) {
            state.mainFunction = payload.mainFunction;
            state.secondaryFunctions = [...payload.secondaryFunctions];
        },
        addProductSpecifications(state, { payload }) {
            state.specifications = payload.map((specification) => [
                ...specification,
            ]);
        },
        addSubassemblyPlaceholderParent(state) {
            state.subassemblies.untitled.parent = state.currActive;
        },
        addSubassembly(state, { payload }) {
            handleChildrenNeed(state);
            const subassembly = {
                parent: state.currActive,
                name: payload.name,
                isChildrenNeeded: payload.isChildrenNeeded,
                fileLocation: payload.fileLocation,
                isBoughtUp: payload.isBoughtUp,
                mainFunction: "",
                secondaryFunctions: [""],
            };
            state.subassemblies[payload.id] = subassembly;
            state.currActive = payload.id;
            state.currForm = "subAssemblyDetails";
        },
        addSubassemblyDetails(state, { payload }) {
            state.subassemblies[state.currActive].mainFunction =
                payload.mainFunction;
            state.subassemblies[state.currActive].secondaryFunctions = [
                ...payload.secondaryFunctions,
            ];
        },
        addComponents(state, { payload }) {
            handleChildrenNeed(state);
            for (let component of payload) {
                state.components[component[1]] = {
                    parent: state.currActive,
                    name: component[0],
                    isBoughtUp: component[2],
                    fileLocation: component[3],
                };
            }
            state.currForm = "";
            state.currActive = "";
        },
        setActive(state, { payload }) {
            state.currActive = payload;
        },
        setCurrForm(state, { payload }) {
            state.currForm = payload;
        },
        reset(state) {
            Object.assign(state, JSON.parse(JSON.stringify(initialState)));
        },
        set(state, { payload }) {
            const product = JSON.parse(JSON.stringify(payload));
            product.currActive = "";
            product.currForm = "";
            Object.assign(state, product);
        },
    },
});

const backendSlice = createSlice({
    name: "backend",
    initialState: { products: [] },
    reducers: {
        addProduct(state, { payload }) {
            const product = JSON.parse(JSON.stringify(payload));
            const index = state.products.findIndex(
                (prod) => prod.id === product.id
            );
            if (index === -1) state.products.push(product);
            else state.products[index] = product;
        },
        deleteProduct(state, { payload }) {
            state.products = state.products.filter(
                (product) => product.id !== payload
            );
        },
    },
});

const store = configureStore({
    reducer: {
        product: productSlice.reducer,
        backend: backendSlice.reducer,
    },
});

export default store;

export const productActions = productSlice.actions;
export const backendActions = backendSlice.actions;
