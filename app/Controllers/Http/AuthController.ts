import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import publicPath from "@ioc:Adonis/Core/AssetsManager"
import User from 'App/Models/User'
// import { Inertia } from '@inertiajs/inertia'
// import Mail from '@ioc:Adonis/Addons/Mail';

let img = {
    Insveltagram: publicPath.assetPath("assets/img/Insveltagram.png")
}

export default class AuthController {
    public async index({ inertia }: HttpContextContract) {
        return inertia.render('auth/Signup', { img })
    }

    public async store({ request, response }: HttpContextContract) {
        const req = await request.validate({
            schema: schema.create({
                name: schema.string(),
                email: schema.string({}, [
                    rules.email()
                ]),
                username: schema.string({}),
                password: schema.string({})
            }),
            messages: {
                'name.required': 'Full Name is required to Sign Up',
                'email.required': 'Email is required to Sign Up',
                'username.required': 'Username is required to Sign Up',
                'password.required': 'Password is required to Sign Up',
            }
        })

        const user = new User()
        user.name = req.name
        user.email = req.email
        user.username = req.username
        user.password = req.password
        await user.save()

        await user?.sendVerificationEmail()

        // send verification email
        // await Mail.send((message) => {
        //     message
        //         .from('verify@insveltagram.com')
        //         .to(user.email)
        //         .subject('Please verify your email!')
        //         .htmlView('emails/verify', { name: user.name })
        // })

        return response.redirect('/login')
    }

    public async showLoginForm({ inertia, session }) {

        // show error message from failed login
        const errMsg = session.flashMessages.get('errMsg')

        return inertia.render('auth/Login', { img, errMsg })
    }

    public async getLogin({ auth, request, response, session }: HttpContextContract) {

        const req = await request.validate({
            schema: schema.create({
                email: schema.string({}, [
                    rules.email()
                ]),
                password: schema.string({}, [
                    rules.minLength(8)
                ])
            }),
            messages: {
                'email.required': 'Email is required to login',
                'password.required': 'Password is required to login',
                'password.minLength': 'Password must be at least 8 characters',
            }
        })
        console.log(req);

        try {
            const user = await auth.use('web').attempt(req.email, req.password)
            response.redirect(`/${user.username}`)
        } catch {

            // set error message after failed login
            session.flash({ 'errMsg': 'Invalid credentials' })
            return response.redirect('/login')
        }
    }

    public async getLogout({ auth, response }: HttpContextContract) {
        await auth.logout()
        return response.redirect('/login')
    }

}
