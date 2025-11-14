/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')
const BusinessHallsController = () => import('#controllers/business/halls_controller')
const CustomerHallsController = () => import('#controllers/customer/halls_controller')
const CustomerPaymentsController = () => import('#controllers/customer/payments_controller')
const WebhooksController = () => import('#controllers/webhooks_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// Auth routes (public)
router.group(() => {
  router.post('/register', [AuthController, 'register'])
  router.post('/login', [AuthController, 'login'])
}).prefix('/api/auth')

// Business routes - for hall owners
router
  .group(() => {
    // Hall management
    router.get('/halls', [BusinessHallsController, 'index'])
    router.get('/halls/:id', [BusinessHallsController, 'show'])
    router.post('/halls', [BusinessHallsController, 'store'])
    router.put('/halls/:id', [BusinessHallsController, 'update'])
    router.patch('/halls/:id', [BusinessHallsController, 'update'])
    router.delete('/halls/:id', [BusinessHallsController, 'destroy'])
    router.patch('/halls/:id/status', [BusinessHallsController, 'updateStatus'])
  })
  .prefix('/api/business')

// Customer routes - for browsing and booking
router
  .group(() => {
    // Browse halls
    router.get('/halls', [CustomerHallsController, 'index'])
    router.get('/halls/search', [CustomerHallsController, 'search'])
    router.get('/halls/:id', [CustomerHallsController, 'show'])

    // Payment routes
    router.get('/payments/config', [CustomerPaymentsController, 'getConfig'])
    router.post('/bookings/:bookingId/payments/deposit', [CustomerPaymentsController, 'createDepositPayment'])
    router.post('/bookings/:bookingId/payments/remaining', [CustomerPaymentsController, 'createRemainingPayment'])
    router.get('/payments/:transactionId/status', [CustomerPaymentsController, 'getPaymentStatus'])
  })
  .prefix('/api/customer')
  .middleware([middleware.auth(), middleware.customer()])

// Webhook routes (public - no authentication)
router.post('/api/webhooks/moyasar', [WebhooksController, 'moyasar'])
