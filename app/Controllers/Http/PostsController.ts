import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import publicPath from "@ioc:Adonis/Core/AssetsManager";
import Application from '@ioc:Adonis/Core/Application'
import Post from 'App/Models/Post';
import { schema } from '@ioc:Adonis/Core/Validator'

let img = {
  Insveltagram: publicPath.assetPath("assets/img/Insveltagram.png"),
  ipa: publicPath.assetPath("assets/img/ipa.jpg")
}

export default class PostsController {
  public async index({ }: HttpContextContract) {
  }

  public async create({ auth, inertia }: HttpContextContract) {
    const user = {
      avatar: auth.user?.avatar,
      details: auth.user?.details,
      email: auth.user?.email,
      username: auth.user?.username,
      name: auth.user?.name
    }
    return inertia.render('posts/Create', {
      auth: {
        isAuthenticated: auth.isAuthenticated,
        username: auth.user?.username,
        avatar: auth.user?.avatar
      },
      user,
      img
    })
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const req = await request.validate({
      schema: schema.create({
        caption: schema.string({}),
        image: schema.file({
          size: '2mb',
          extnames: ['jpg', 'jpeg', 'png', 'svg']
        })
      }),
      messages: {
        "caption.required": "Caption field is required",
        "image.required": "Image field is required"
      }
    })
    if (auth.user !== undefined) {
      if (req.image) {
        const imageName = new Date().getTime() + `.${req.image.extname}`
        await req.image.move(Application.publicPath('images'),
          {
            name: imageName
          })
        const post = new Post()
        post.image = `/images/${auth.user.id}${imageName}`
        post.caption = req.caption
        post.userId = auth.user.id
        await post?.save()
      }
      return response.redirect(`/${auth.user.username}`)
    } else {
      return response.redirect('/login')
    }
  }

  public async show({ }: HttpContextContract) {
  }

  public async edit({ }: HttpContextContract) {
  }

  public async update({ }: HttpContextContract) {
  }

  public async destroy({ }: HttpContextContract) {
  }
}
