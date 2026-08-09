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

  // Initialize the real Razorpay checkout overlay
  async initializePayment(order: PaymentOrder, options: any): Promise<PaymentDetails> {
    console.log(`[PaymentService] Initializing Razorpay Checkout...`);
    
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      
      script.onload = () => {
        const rzpOptions = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder', // User must provide this in .env
          amount: (order.amount * 100).toString(), // Razorpay expects amount in paise (subunits)
          currency: order.currency,
          name: "Global Talent Hunt",
          description: "Contest Registration Fee",
          // We can't pass order_id here since we don't have a secure backend to generate it, 
          // but for simple capture without a backend, this basic integration works.
          handler: function (response: any) {
            resolve({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id || order.orderId,
              razorpay_signature: response.razorpay_signature || 'no_signature_needed'
            });
          },
          prefill: {
            name: options.name,
            email: options.email,
            contact: options.contact
          },
          theme: {
            color: "#9333ea" // Match brand purple
          },
          modal: {
            ondismiss: function() {
              reject(new Error("Payment cancelled by user."));
            }
          }
        };
        
        const rzp = new (window as any).Razorpay(rzpOptions);
        
        rzp.on('payment.failed', function (response: any) {
          reject(new Error(response.error.description || "Payment failed"));
        });
        
        rzp.open();
      };
      
      script.onerror = () => {
        reject(new Error("Failed to load Razorpay SDK. Please check your connection."));
      };
      
      document.body.appendChild(script);
    });
  }

  // Mocks verifying the signature on the backend (not used in direct link flow unless redirect back is set up)
  async verifyPayment(details: PaymentDetails): Promise<boolean> {
    return true;
  }
}

// Export a singleton instance for use across the application
export const paymentService = new PaymentService();
