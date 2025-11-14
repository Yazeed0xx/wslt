import type { HttpContext } from '@adonisjs/core/http'
import { PaymentService } from '#services/payment_service'

export default class WebhooksController {
  /**
   * Handle Moyasar webhook callbacks
   * POST /api/webhooks/moyasar
   */
  async moyasar({ request, response }: HttpContext) {
    const webhookData = request.body()
    const paymentService = new PaymentService()

    try {
      const result = await paymentService.handleWebhook(webhookData)

      return response.ok({
        message: 'Webhook processed successfully',
        data: result,
      })
    } catch (error) {
      // Log error but return 200 to acknowledge receipt
      console.error('Webhook processing error:', error)

      return response.ok({
        message: 'Webhook received',
      })
    }
  }
}
