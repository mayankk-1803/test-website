import axios from "axios";

export const sendOrderEmail = async (order) => {
  const response = await axios.post(
    "https://api.brevo.com/v3/smtp/email",
    {
sender: {
  name: "TrendyShop",
  email: "mayankmathur1804@gmail.com",
},

      to: [
        {
          email: process.env.OWNER_EMAIL,
          name: "Store Owner",
        },
      ],
      subject: "🛒 New Order Received",
      htmlContent: `
        <h2>New Order</h2>

        <p><b>Name:</b> ${order.name}</p>
        <p><b>Email:</b> ${order.email}</p>
        <p><b>Phone:</b> ${order.phone}</p>
        <p><b>Address:</b> ${order.address}</p>

        <hr />

        <p><b>Product:</b> ${order.productName}</p>
        <p><b>Quantity:</b> ${order.quantity}</p>
        <p><b>Payment Method:</b> ${order.paymentMethod}</p>
      `,
    },
    {
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
        accept: "application/json",
      },
    }
  );

  return response.data;
};
