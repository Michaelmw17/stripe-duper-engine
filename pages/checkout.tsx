import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
);
export default function Checkout() {
  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log(
        'Order canceled -- continue to shop around and checkout when you’re ready.'
      );
    }
  }, []);

  return (
    <form action="/api/checkout/session" method="POST">
      <section>
        <button type="submit" role="link">
          Checkout
        </button>
      </section>
      <style jsx>
        {`
          section {
            background: #ffffff;
            display: flex;
            flex-direction: column;
            width: 400px;
            height: 112px;
            border-radius: 6px;
            justify-content: space-between;
          }
          button {
            height: 36px;
            background: #556cd6;
            border-radius: 4px;
            color: white;
            border: 0;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
          }
          button:hover {
            opacity: 0.8;
          }
        `}
      </style>
    </form>
  );
}
// import { NextPage } from 'next';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe(
//   `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHBLE_KEY}`
// );

// export default function Checkout() {
//   const handleClick = async (event) => {
//     const { sessionId } = await fetch('/api/checkout/session', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//       },
//       body: JSON.stringify({ quantity: 1 }),
//     }).then((res) => res.json());
//     const stripe = await stripePromise;
//     const { error } = await stripe.redirectToCheckout({
//       sessionId,
//     });
//   };
//   return (
//     <div>
//       <h1>Checkout</h1>
//       <button role="link" onClick={handleClick}>
//         Checkout
//       </button>
//     </div>
//   );
// }
