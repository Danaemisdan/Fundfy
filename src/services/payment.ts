export interface PaymentOrder {
  orderId: string;
  amount: number;
  currency: string;
}

export interface PaymentDetails {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface PaymentProvider {
  initializePayment(order: PaymentOrder, options: any): Promise<PaymentDetails>;
  verifyPayment(details: PaymentDetails): Promise<boolean>;
}

export interface PaymentGateway {
  createOrder(amount: number, currency: string, receiptId: string): Promise<PaymentOrder>;
}

/**
 * Placeholder implementation of the PaymentService.
 * This class abstracts the Razorpay integration.
 * For now, it mocks the network requests and returns successful promises.
 */
export class PaymentService implements PaymentProvider, PaymentGateway {
  
  // Mocks creating an order on the backend (e.g., calling Razorpay API)
  async createOrder(amount: number, currency: string, receiptId: string): Promise<PaymentOrder> {
    console.log(`[PaymentService] Creating order for ${amount} ${currency} (Receipt: ${receiptId})`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      orderId: `order_mock_${Math.random().toString(36).substring(7)}`,
      amount,
      currency
    };
  }

  async initializePayment(order: PaymentOrder, options: any): Promise<PaymentDetails> {
    console.log(`[PaymentService] Redirecting to direct payment link...`);
    
    // Instead of using the Razorpay API SDK which requires domain verification,
    // we simply redirect the user to a pre-generated Razorpay Payment Link/Page!
    // We can use a standard link or dynamically choose based on the amount.
    
    const PAYMENT_LINK = order.amount === 100 
      ? "https://rzp.io/rzp/xIyzuCr" 
      : "https://rzp.io/rzp/JqDi7itA";
    
    // Redirect the browser to the payment link
    window.location.href = PAYMENT_LINK;
    
    // Return a pending promise that never resolves, so the UI stays in "loading" state 
    // while the browser redirects the user away.
    return new Promise(() => {});
  }

  // Mocks verifying the signature on the backend (not used in direct link flow unless redirect back is set up)
  async verifyPayment(details: PaymentDetails): Promise<boolean> {
    return true;
  }
}

// Export a singleton instance for use across the application
export const paymentService = new PaymentService();
