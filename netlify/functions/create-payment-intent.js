require("dotenv").config();

const scrtKey = process.env.VITE_SECRET_KEY_STRIPE;

const stripe = require("stripe")(scrtKey);

exports.handler =  async (event) => {
  try {
    const { amount } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log(error);

    return {
      status: 400,
      body: JSON.stringify({ error }),
    };
  }
};
