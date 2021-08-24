import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import publicPath from "@ioc:Adonis/Core/AssetsManager";
import User from 'App/Models/User'
import Post from 'App/Models/Post';

let img = {
    Insveltagram: publicPath.assetPath("assets/img/Insveltagram.png"),
}

export default class HomeController {
    public async index({ auth, inertia }: HttpContextContract) {
        let fullUser: User | null = null
        if (auth.user !== undefined) {
            fullUser = await User.findBy('username', auth.user.username)
        }

        if (fullUser) {
            await auth.user?.load('followings')
            let userIds: number[],
                Posts: Post[] = []

            if (auth.user !== undefined) {
                const followings = auth.user?.followings.map(d => d.followingId)
                userIds = [auth.user?.id, ...followings]
                Posts = await Post.query()
                    .whereIn('userId', userIds)
                    .select(['image', 'caption', 'createdAt', 'userId'])
                    .orderBy('createdAt', 'desc')
                    .preload('user')
            }
            //     .with('users', builder => {
            //         builder
            //             .select(['name', 'username', 'avatar'])
            //             .from('users')
            //     })
            // return Posts

            const filteredPosts = Posts.map(function (d: any) {
                const post = new Post()
                return {
                    image: d.image,
                    caption: d.caption,
                    createdAt: d.createdAt,
                    user: {
                        name: d.user.name,
                        username: d.user.username,
                        avatar: d.user.avatar,
                        auth: auth.user?.username,
                        createdAt: post?.myDiffTime(d.createdAt)
                    }
                };
            })

            const user = {
                name: fullUser.name,
                username: fullUser.username,
                avatar: fullUser.avatar
            }
            return inertia.render('Home', {
                img,
                isAuthenticated: auth.isAuthenticated,
                auth: {
                    username: auth.user?.username,
                    avatar: auth.user?.avatar
                },
                user,
                posts: filteredPosts
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
}
