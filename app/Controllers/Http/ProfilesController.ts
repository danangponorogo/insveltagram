import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import publicPath from "@ioc:Adonis/Core/AssetsManager";
import Application from '@ioc:Adonis/Core/Application'
// import { UserFactory } from 'Database/factories';


let img = {
    Insveltagram: publicPath.assetPath("assets/img/Insveltagram.png"),
}


export default class ProfilesController {
    public async index({ inertia, auth, params }: HttpContextContract) {

        // await UserFactory.with('posts', 5).createMany(10)

        const user = await User.findBy('username', params.username)
        if (user) {
            await user.load('posts')
            await user.load('followings')
            await user.load('followers')
            if (auth.user !== undefined) {
                await auth.user.load('followings')
            }

            const isFollowings = auth.user?.followings.map(d => d.followingId).includes(user.id)
            // code above is equal with code below
            // const isFollowings = auth.user?.followings.map(d => {
            //     return d.followingId
            // }).includes(user.id)

            return inertia.render('Profile', {
                img,
                isAuthenticated: auth.isAuthenticated,
                auth: {
                    username: auth.user?.username,
                    avatar: auth.user?.avatar,
                    isFollowings
                },
                user: {
                    auth: auth.user?.username,
                    id: user.id,
                    posts: user.posts,
                    name: user.name,
                    username: user.username,
                    avatar: user.avatar,
                    details: user.details,
                    followings: user.followings.length,
                    followers: user.followers.length,
                    email: user.email,
                    email_verified_at: user.email_verified_at
                }
            })
        } else {
            return inertia.render('_404', {
                isAuthenticated: auth.isAuthenticated,
                user: {
                    name: auth.user?.name,
                    email: auth.user?.email,
                    email_verified_at: auth.user?.email_verified_at
                }
            })
        }
    }

    public async edit({ inertia, auth }: HttpContextContract) {
        return inertia.render('accounts/Edit', {
            img,
            auth: {
                isAuthenticated: auth.isAuthenticated,
                username: auth.user?.username,
                avatar: auth.user?.avatar
            },
            user: {
                name: auth.user?.name,
                username: auth.user?.username,
                avatar: auth.user?.avatar,
                details: auth.user?.details,
                email: auth.user?.email,
                email_verified_at: auth.user?.email_verified_at
            }
        })
    }

    public async update({ auth, request, response }: HttpContextContract) {
        if (auth.user !== undefined) {
            const details = request.input('details')
            if (details) {
                auth.user.details = details
            }

            const avatar = request.file('avatar', {
                size: '2mb',
                extnames: ['jpg', 'jpeg', 'png', 'svg']
            })

            if (avatar) {
                const imageName = new Date().getTime() + `.${avatar.extname}`
                await avatar.move(Application.publicPath('images'),
                    {
                        name: imageName
                    })
                auth.user.avatar = `/images/${auth.user.id}${imageName}`
            }

            await auth.user.save()
            return response.redirect(`/${auth.user.username}`)
        } else {
            return response.redirect('/login')
        }
    }
}
