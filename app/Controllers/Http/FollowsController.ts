import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Following from 'App/Models/Following'

export default class FollowsController {
    public async store({ params, auth, response }: HttpContextContract) {
        // store follow user id with auth user id
        const follow = new Following
        if (auth.user !== undefined)
            follow.userId = auth.user.id
        follow.followingId = params.userId
        await follow.save()
        return response.redirect().back()
    }

    public async destroy({ params, auth, response }: HttpContextContract) {
        if (auth.user !== undefined) {
            const follow = Following.query()
                .where('user_id', auth.user?.id)
                .where('following_id', params.userId)
            await follow.delete()
        }
        return response.redirect().back()
    }
}
