import { useEffect, useState } from "react";
import "./AdminEnquiries.css";

interface Enquiry {
  _id: string;
  productName: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

const AdminEnquiries = () => {

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);


  const fetchEnquiries = async () => {

    try {

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/enquiries`
      );

      const data = await res.json();

      setEnquiries(data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };


  const deleteEnquiry = async (id: string) => {

    if (!confirm("Delete this enquiry?")) return;

    await fetch(
      `${import.meta.env.VITE_API_URL}/api/enquiries/${id}`,
      {
        method: "DELETE"
      }
    );

    fetchEnquiries();

  };


  useEffect(() => {

    fetchEnquiries();

  }, []);


  if (loading)
    return <div>Loading enquiries...</div>;


  return (

    <div className="admin-enquiries">

      <h2>Customer Enquiries</h2>

      <table>

        <thead>
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>


        <tbody>

          {enquiries.map((e) => (

            <tr key={e._id}>

              <td>{e.productName}</td>

              <td>{e.name}</td>

              <td>{e.email}</td>

              <td>{e.phone}</td>

              <td>{e.message}</td>

              <td>
                {new Date(e.createdAt)
                  .toLocaleDateString()}
              </td>

              <td>

                <button
                  onClick={() =>
                    deleteEnquiry(e._id)
                  }
                  className="delete-btn"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

};

export default AdminEnquiries;
