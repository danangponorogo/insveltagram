import Route from '@ioc:Adonis/Core/Route'
import Application from '@ioc:Adonis/Core/Application'
import Env from '@ioc:Adonis/Core/Env'

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

Route.get('/uploads/images/:filename', async ({ response, params }) => {
  response.download(Application.makePath(Env.get('UPLOADS_URL'), params.filename))
})
Route.get('/:username', 'ProfilesController.index').middleware('auth')