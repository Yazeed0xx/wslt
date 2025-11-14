import env from '#start/env'

export const moyasarConfig = {
  /**
   * API Key for server-side requests
   */
  apiKey: env.get('MOYASAR_API_KEY'),

  /**
   * Secret Key for server-side requests
   */
  secretKey: env.get('MOYASAR_SECRET_KEY'),

  /**
   * Publishable Key for client-side (mobile app)
   */
  publishableKey: env.get('MOYASAR_PUBLISHABLE_KEY'),

  /**
   * Callback URL for payment webhooks
   */
  callbackUrl: env.get('MOYASAR_CALLBACK_URL', 'https://yourdomain.com/api/webhooks/moyasar'),

  /**
   * API Base URL
   */
  baseUrl: 'https://api.moyasar.com/v1',

  /**
   * Supported payment methods
   */
  supportedMethods: ['creditcard', 'applepay', 'stcpay'],

  /**
   * Currency (SAR for Saudi Riyal)
   */
  currency: 'SAR',
}


