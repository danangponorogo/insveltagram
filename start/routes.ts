/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/test', async ({ inertia }) => {
  return inertia.render('Test', { nama: 'Danang in Route render' })
})

Route.get('/', async ({ response }) => { return response.redirect('/login') })
Route.get('/login', 'AuthController.showLoginForm').middleware('guest')
Route.post('/login', 'AuthController.getLogin')
Route.post('/logout', 'AuthController.getLogout')

Route.get('/signup', 'AuthController.index').middleware('guest')
Route.post('/signup', 'AuthController.store')

Route.get('/verify-email/:email', 'EmailVerifiesController.confirm').as('verifyEmail')
Route.post('/verify-email', 'EmailVerifiesController.index').middleware('auth')

Route.get('/home', 'HomeController.index')

Route.get('/accounts/edit', 'ProfilesController.edit').middleware('auth')
Route.post('/accounts/edit', 'ProfilesController.update').middleware('auth')

Route.get('/post/create', 'PostsController.create').middleware('auth')
Route.post('/post/store', 'PostsController.store').middleware('auth')

Route.delete('/follow/:userId', 'FollowsController.destroy').middleware('auth')
Route.post('/follow/:userId', 'FollowsController.store').middleware('auth')

Route.get('/:username', 'ProfilesController.index').middleware('auth')