import React, { useState, useEffect } from "react";
import { getProducts } from "../services/productService";
import {
  registerEntry,
  registerExit,
  getInventoryHistory,
} from "../services/inventoryService";
import { toast } from "react-toastify";

interface Product {
  _id: string;
  name: string;
  quantity: number;
  price: number;
}

interface InventoryMovement {
  _id: string;
  product: {
    _id: string;
    name: string;
  };
  type: "entry" | "exit";
  quantity: number;
  timestamp: string;
}

const Inventory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [history, setHistory] = useState<InventoryMovement[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [fetchedProducts, fetchedHistory] = await Promise.all([
        getProducts(),
        getInventoryHistory(),
      ]);
      setProducts(fetchedProducts);
      setHistory(fetchedHistory);
    } catch (error) {
      toast.error("Failed to fetch inventory data", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setLoading(false);
  };

  const handleEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerEntry(selectedProduct, quantity);
      setSelectedProduct("");
      setQuantity(0);
      fetchData();
      toast.success("Entry registered successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error("Failed to register entry", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleExit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerExit(selectedProduct, quantity);
      setSelectedProduct("");
      setQuantity(0);
      fetchData();
      toast.success("Exit registered successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error("Failed to register exit", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Inventory</h2>
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">Register Movement</h3>
        <form className="flex items-center">
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="mr-2 p-2 border rounded"
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            placeholder="Quantity"
            className="mr-2 p-2 border rounded"
          />
          <button
            onClick={handleEntry}
            className="bg-green-500 text-white p-2 rounded mr-2"
          >
            Register Entry
          </button>
          <button
            onClick={handleExit}
            className="bg-red-500 text-white p-2 rounded"
          >
            Register Exit
          </button>
        </form>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">Current Inventory</h3>
        <table className="w-full mb-8">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>${product.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">Inventory History</h3>
        <table className="w-full">
          <thead>
            <tr>
              <th>Product</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {history.map((movement) => (
              <tr key={movement._id}>
                <td>{movement.product.name}</td>
                <td>{movement.type}</td>
                <td>{movement.quantity}</td>
                <td>{new Date(movement.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
