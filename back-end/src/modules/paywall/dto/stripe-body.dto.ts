export class StripeWebhookBody {
  id: string;
  object: string;
  api_version: string;
  created: number;
  data: {
    object: {
      id: string;
      object: string;
      after_expiration: any | null;
      allow_promotion_codes: boolean | null;
      amount_subtotal: number;
      amount_total: number;
      automatic_tax: any; // You can define a more specific type if available
      billing_address_collection: any | null;
      cancel_url: string;
      client_reference_id: any | null;
      consent: any | null;
      consent_collection: any | null;
      created: number;
      currency: string;
      currency_conversion: any | null;
      custom_fields: any[]; // You can define a more specific type if available
      custom_text: any; // You can define a more specific type if available
      customer: any | null;
      customer_creation: string;
      customer_details: any; // You can define a more specific type if available
      customer_email: any | null;
      expires_at: number;
      invoice: any | null;
      invoice_creation: any; // You can define a more specific type if available
      livemode: boolean;
      locale: any | null;
      metadata: Record<string, any>;
      mode: string;
      payment_intent: string;
      payment_link: any | null;
      payment_method_collection: string;
      payment_method_options: any; // You can define a more specific type if available
      payment_method_types: string[];
      payment_status: string;
      phone_number_collection: any; // You can define a more specific type if available
      recovered_from: any | null;
      setup_intent: any | null;
      shipping_address_collection: any | null;
      shipping_cost: any | null;
      shipping_details: any | null;
      shipping_options: any[]; // You can define a more specific type if available
      status: string;
      submit_type: any | null;
      subscription: any | null;
      success_url: string;
      total_details: any; // You can define a more specific type if available
      url: any | null;
    };
  };
  livemode: boolean;
  pending_webhooks: number;
  request: {
    id: string | null;
    idempotency_key: string | null;
  };
  type: string;
}
