import { useState, useEffect } from "react";
import "./Admin.css";

import BurstConfetti from "../components/BurstConfetti";
import "../components/BuyNowForm.css";

interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
}

interface Enquiry {
  _id: string;
  productName: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<"dashboard" | "add" | "enquiries">(
    "dashboard",
  );

  const [products, setProducts] = useState<Product[]>([]);

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  // EDIT STATES
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const [editName, setEditName] = useState("");

  const [editDescription, setEditDescription] = useState("");

  const [editImage, setEditImage] = useState<File | null>(null);

  // SUCCESS UI STATES
  const [successMessage, setSuccessMessage] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);

  const [showBurst, setShowBurst] = useState(false);

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);

    const data = await res.json();

    setProducts(data);
  };

  // FETCH ENQUIRIES
  const fetchEnquiries = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/enquiries`);

    const data = await res.json();

    setEnquiries(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchEnquiries();
  }, []);

  // SUCCESS HANDLER
  const showSuccessUI = (message: string) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setShowBurst(true);

    setTimeout(() => {
      setShowSuccess(false);
      setShowBurst(false);
    }, 2500);
  };

  // ADD PRODUCT
  const handleAddProduct = async () => {
    if (!name || !description || !image) return;

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setName("");
      setDescription("");
      setImage(null);

      fetchProducts();

      setActiveTab("dashboard");

      showSuccessUI("Product Added Successfully 🎉");
    }
  };

  // DELETE PRODUCT
  const handleDelete = async (id: string) => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
      method: "DELETE",
    });

    fetchProducts();

    showSuccessUI("Product Deleted Successfully 🗑️");
  };

  // DELETE ENQUIRY
  const handleDeleteEnquiry = async (id: string) => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/enquiries/${id}`, {
      method: "DELETE",
    });

    fetchEnquiries();

    showSuccessUI("Enquiry Deleted Successfully 🗑️");
  };

  // OPEN EDIT MODAL
  const openEditModal = (product: Product) => {
    setEditProduct(product);

    setEditName(product.name);
    setEditDescription(product.description);
  };

  // UPDATE PRODUCT
  const handleUpdateProduct = async () => {
    if (!editProduct) return;

    const formData = new FormData();

    formData.append("name", editName);
    formData.append("description", editDescription);

    if (editImage) formData.append("image", editImage);

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/products/${editProduct._id}`,
      {
        method: "PUT",
        body: formData,
      },
    );

    if (res.ok) {
      setEditProduct(null);

      fetchProducts();

      showSuccessUI("Product Updated Successfully ✨");
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>

      {/* TABS */}

      <div className="admin-tabs">
        <button
          className={activeTab === "dashboard" ? "active" : ""}
          onClick={() => setActiveTab("dashboard")}
        >
          Products
        </button>

        <button
          className={activeTab === "add" ? "active" : ""}
          onClick={() => setActiveTab("add")}
        >
          Add Product
        </button>

        <button
          className={activeTab === "enquiries" ? "active" : ""}
          onClick={() => setActiveTab("enquiries")}
        >
          Enquiries
        </button>
      </div>

      {/* PRODUCTS DASHBOARD */}

      {activeTab === "dashboard" && (
        <div className="admin-grid">
          {products.map((product) => (
            <div key={product._id} className="admin-card">
              <img src={product.image} />

              <h3>{product.name}</h3>

              <div className="admin-card-buttons">
                <button
                  className="edit-btn"
                  onClick={() => openEditModal(product)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD PRODUCT */}

      {activeTab === "add" && (
        <div className="admin-form-wrapper">
          <div className="admin-form">
            <input
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="file"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />

            <button onClick={handleAddProduct}>Add Product</button>
          </div>
        </div>
      )}

      {/* ENQUIRIES DASHBOARD */}
      {/* ENQUIRIES DASHBOARD */}

      {activeTab === "enquiries" && (
        <div className="admin-enquiry-wrapper">
          <div className="admin-table-card">
            <div className="admin-table-header">
              <h2>Customer Enquiries</h2>

              <span>{enquiries.length} total enquiries</span>
            </div>

            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Product</th>

                    <th>Customer</th>

                    <th>Contact</th>

                    <th>Message</th>

                    <th>Date</th>

                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {enquiries.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="empty-row">
                        No enquiries yet
                      </td>
                    </tr>
                  ) : (
                    enquiries.map((e) => (
                      <tr key={e._id}>
                        <td>
                          <div className="product-cell">{e.productName}</div>
                        </td>

                        <td>
                          <div className="customer-cell">{e.name}</div>
                        </td>

                        <td>
                          <div className="contact-cell">
                            <div>{e.email}</div>

                            <div className="phone">{e.phone}</div>
                          </div>
                        </td>

                        <td className="message-cell">{e.message}</td>

                        <td className="date-cell">
                          {new Date(e.createdAt).toLocaleDateString()}
                        </td>

                        <td>
                          <button
                            className="delete-btn-modern"
                            onClick={() => handleDeleteEnquiry(e._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}

      {editProduct && (
        <div className="admin-modal">
          <div className="admin-modal-content">
            <h2>Edit Product</h2>

            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />

            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />

            <input
              type="file"
              onChange={(e) => setEditImage(e.target.files?.[0] || null)}
            />

            <div className="admin-modal-buttons">
              <button onClick={handleUpdateProduct}>Update</button>

              <button onClick={() => setEditProduct(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}

      {showSuccess && (
        <div className="buy-modal-overlay">
          <div className="buy-modal">
            <div className="success-container">
              {showBurst && <BurstConfetti />}

              <div className="success-content">
                <div className="success-check">✓</div>

                <h2>{successMessage}</h2>

                <p>Changes saved successfully</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
