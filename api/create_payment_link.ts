import Razorpay from 'razorpay';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    console.error("Razorpay API keys are missing");
    return res.status(500).json({ message: 'Server configuration error' });
  }

  const razorpay = new Razorpay({
    key_id: key_id,
    key_secret: key_secret,
  });

  const { registrationId, name, email, phone, amount, contestName, password, referralCode } = req.body;

  if (!registrationId || !amount) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const paymentLinkRequest: any = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      accept_partial: false,
      description: `Registration for Global Talent Hunt (${contestName || registrationId})`,
      customer: {
        name: name || "Contestant",
        email: email || "",
        contact: phone || ""
      },
      notify: {
        sms: true,
        email: true
      },
      reminder_enable: true,
      reference_id: registrationId, // Used in webhook to match
      callback_url: "https://fundfy.app/register/success",
      callback_method: "get",
      // Store ALL registration data in notes so webhook can create the DB record
      // without needing a pre-written PENDING row.
      notes: {
        registrationId,
        contestName: contestName || '',
        name: name || '',
        email: email || '',
        phone: phone || '',
        password: password || '',
        referralCode: referralCode || '',
      }
    };

    const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);

    return res.status(200).json({ 
      short_url: paymentLink.short_url,
      id: paymentLink.id
    });
    
  } catch (error: any) {
    console.error("Error creating payment link:", error);
    return res.status(500).json({ 
      message: 'Failed to create payment link',
      error: error.message || String(error)
    });
  }
}
