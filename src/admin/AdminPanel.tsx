import { useState, useEffect } from "react";
import "./Admin.css";

import BurstConfetti from "../components/BurstConfetti";
import "../components/BuyNowForm.css";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const AdminPanel = () => {

  const [activeTab, setActiveTab] =
    useState<"dashboard" | "add">("dashboard");

  const [products, setProducts] =
    useState<Product[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] =
    useState<File | null>(null);


  // EDIT STATES
  const [editProduct, setEditProduct] =
    useState<Product | null>(null);

  const [editName, setEditName] =
    useState("");

  const [editDescription, setEditDescription] =
    useState("");

  const [editPrice, setEditPrice] =
    useState("");

  const [editImage, setEditImage] =
    useState<File | null>(null);


  // SUCCESS UI STATES
  const [successMessage, setSuccessMessage] =
    useState("");

  const [showSuccess, setShowSuccess] =
    useState(false);

  const [showBurst, setShowBurst] =
    useState(false);



  // FETCH PRODUCTS
  const fetchProducts = async () => {

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/products`
    );

    const data = await res.json();

    setProducts(data);

  };

  useEffect(()=>{
    fetchProducts();
  },[]);



  // SUCCESS HANDLER
  const showSuccessUI = (message: string) => {

    setSuccessMessage(message);
    setShowSuccess(true);
    setShowBurst(true);

    setTimeout(()=>{

      setShowSuccess(false);
      setShowBurst(false);

    },2500);

  };



  // ADD PRODUCT
  const handleAddProduct = async () => {
    

    if(!name || !description || !price || !image){

      return;

    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);

    if(image)
      formData.append("image", image);

    const res = await fetch(

      `${import.meta.env.VITE_API_URL}/api/products`,

      {
        method:"POST",
        body: formData
      }

    );

    if(res.ok){

      setName("");
      setDescription("");
      setPrice("");
      setImage(null);

      fetchProducts();

      setActiveTab("dashboard");

      showSuccessUI("Product Added Successfully 🎉");

    }

  };



  // DELETE PRODUCT
  const handleDelete = async (id:string) => {

    await fetch(

      `${import.meta.env.VITE_API_URL}/api/products/${id}`,

      { method:"DELETE" }

    );

    fetchProducts();

    showSuccessUI("Product Deleted Successfully 🗑️");

  };



  // OPEN EDIT MODAL
  const openEditModal = (product:Product) => {

    setEditProduct(product);

    setEditName(product.name);
    setEditDescription(product.description);
    setEditPrice(product.price.toString());

  };



  // UPDATE PRODUCT
  const handleUpdateProduct = async () => {

    if(!editProduct) return;

    const formData = new FormData();

    formData.append("name", editName);
    formData.append("description", editDescription);
    formData.append("price", editPrice);

    if(editImage)
      formData.append("image", editImage);

    const res = await fetch(

      `${import.meta.env.VITE_API_URL}/api/products/${editProduct._id}`,

      {
        method:"PUT",
        body: formData
      }

    );

    if(res.ok){

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
          className={
            activeTab==="dashboard"
            ? "active"
            : ""
          }
          onClick={()=>setActiveTab("dashboard")}
        >
          Dashboard
        </button>

        <button
          className={
            activeTab==="add"
            ? "active"
            : ""
          }
          onClick={()=>setActiveTab("add")}
        >
          Add Product
        </button>

      </div>



      {/* DASHBOARD */}

      {activeTab==="dashboard" && (

        <div className="admin-grid">

          {products.map(product => (

            <div
              key={product._id}
              className="admin-card"
            >

              <img src={product.image} />

              <h3>{product.name}</h3>

              <p>₹{product.price}</p>

              <div className="admin-card-buttons">

                <button
                  className="edit-btn"
                  onClick={()=>openEditModal(product)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={()=>handleDelete(product._id)}
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}



      {/* ADD FORM */}

      {activeTab==="add" && (

        <div className="admin-form-wrapper">

          <div className="admin-form">

            <input
              placeholder="Product Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
            />

            <input
              type="file"
              onChange={(e)=>
                setImage(
                  e.target.files?.[0] || null
                )
              }
            />

            <button onClick={handleAddProduct}>
              Add Product
            </button>

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
              onChange={(e)=>setEditName(e.target.value)}
            />

            <textarea
              value={editDescription}
              onChange={(e)=>
                setEditDescription(e.target.value)
              }
            />

            <input
              type="number"
              value={editPrice}
              onChange={(e)=>setEditPrice(e.target.value)}
            />

            <input
              type="file"
              onChange={(e)=>
                setEditImage(
                  e.target.files?.[0] || null
                )
              }
            />

            <div className="admin-modal-buttons">

              <button onClick={handleUpdateProduct}>
                Update
              </button>

              <button onClick={()=>setEditProduct(null)}>
                Cancel
              </button>

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
