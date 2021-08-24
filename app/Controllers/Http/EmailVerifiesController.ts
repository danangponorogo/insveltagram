import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class EmailVerifiesControllerOld {
    // public async index({ auth }: HttpContextContract) {
    public async indexOld({ response, auth }: HttpContextContract) {
        // public async index({ inertia }: HttpContextContract) {
        // let sts = 'Verified'
        // return inertia.render('email/verify', { sts })
        // console.log('email',
        //     auth.user?.email
        // );
        // return response.redirect().back()
        // return auth.user?.email
        // return auth.user?.name

        // let email: string, name: string
        // email = auth.user?.email ? auth.user?.email : ''
        // name = auth.user?.name ? auth.user?.name : ''

        await auth.user?.sendVerificationEmail()
        // await Mail.send((message) => {
        //     message
        //         .from('verify@insveltagram.com')
        //         .to(email)
        //         .subject('Please verify your email!')
        //         .htmlView('emails/verify', { name })
        // })

        return response.redirect().back()

    }

    public async confirmOld({ response, params, session }: HttpContextContract) {
        const userid = params.userid
        const token = params.token
        const user = await User.findOrFail(userid)
        const sesssionToken = session.get(`token-${userid}`)
        if (sesssionToken === token) {
            user.email_verified_at = DateTime.local()
            user.save()
            session.forget(`token-${userid}`)
            return response.redirect('/profile')
        } else {
            return 'Invalid Token'
        }
        // user.email_verify_at = new Date
        // return user
        // return session.get(`token-${userid}`)
    }

    public async index({ response, auth }: HttpContextContract) {
        await auth.user?.sendVerificationEmail()
        return response.redirect().back()
    }

    public async confirm({ request, response, params }: HttpContextContract) {
        if (request.hasValidSignature()) {
            const user = await User.findByOrFail('email', params.email)
            user.email_verified_at = DateTime.local()
            user.save()
            return response.redirect(`/${user.username}`)
        } else {
            return 'Invalid Token'
        }
    }
}
