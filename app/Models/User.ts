import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, beforeSave } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Mail from '@ioc:Adonis/Addons/Mail'
import { nanoid } from 'nanoid'
import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'
import Post from 'App/Models/Post'
import Following from './Following'

export default class User extends BaseModel {
  @hasMany(() => Post, {
    foreignKey: 'userId', // defaults to userId
    localKey: 'id', // defaults to id
  })
  public posts: HasMany<typeof Post>

  @hasMany(() => Following, {
    foreignKey: 'userId', // defaults to userId
    localKey: 'id', // defaults to id
  })
  public followings: HasMany<typeof Following>

  @hasMany(() => Following, {
    foreignKey: 'followingId', // defaults to userId
    localKey: 'id', // defaults to id
  })
  public followers: HasMany<typeof Following>

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public username: string

  @column()
  public avatar: string

  @column()
  public details: string

  @column.dateTime()
  public email_verified_at: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  public async sendVerificationEmailOld(session) {
    const token = nanoid()
    session.put(`token-${this.id}`, token)
    const url = `${Env.get('APP_URL')}/confirm-email/${this.id}/${token}`
    await Mail.send((message) => {
      message
        .from('verify@insveltagram.com')
        .to(this.email)
        .subject('Please verify your email!')
        .htmlView('emails/verify', { name: this.name, url })
    })
  }

  public async sendVerificationEmail() {
    const url = Env.get('APP_URL') + Route.makeSignedUrl('verifyEmail', {
      params: { email: this.email },
      expiresIn: '30m'
    })
    await Mail.send((message) => {
      message
        .from('verify@insveltagram.com')
        .to(this.email)
        .subject('Please verify your email!')
        .htmlView('emails/verify', { name: this.name, url })
    })
  }
}
