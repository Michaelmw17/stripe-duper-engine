import { NextApiRequest, NextApiResponse } from 'next';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        // line_items: [
        //   {
        //     price_data: {
        //       unit_amount: 2000,
        //       currency: 'usd',
        //       product_data: {
        //         name: 'My Awesome Plan',
        //       },
        //     },
        //     quantity: 1,
        //   },
        // ],

        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: process.env.PRICE_ID,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
        automatic_tax: { enabled: true },
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
// import { NextApiRequest, NextApiResponse } from 'next';
// import Stripe from 'stripe';
// const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
//   apiVersion: '2020-08-27',
// });

// export default (req: NextApiRequest, res: NextApiResponse) => {
//   const {quantity} = req.body
//   const session = stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     line_items: [
//       {
//         price: process.env.PRICE_ID,
//         quantity,
//       },
//     ],
//     mode: 'payment',
//     success_url: `${req.headers.origin}/results?session_id={CHECKOUT_SESSION.id}`,
//     cancel_url: `${req.headers.origin}/checkout`,
//   });
//   res.status(200).json(sessionId: session.id);
// };
//# sourceMappingURL=session.js.map
