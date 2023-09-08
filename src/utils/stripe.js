import { loadStripe } from "@stripe/stripe-js";

const pubKey = import.meta.env.VITE_PUBLISHING_KEY_STRIPE

export const stripePromise = loadStripe(pubKey) 