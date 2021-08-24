import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public image: string

  @column()
  public caption: string

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public myDiffTime(time: DateTime): string {
    const
      diffSeconds = time.diffNow('seconds').seconds * (-1),
      diffMinutes = time.diffNow('minutes').minutes * (-1),
      diffHours = time.diffNow('hours').hours * (-1),
      diffDays = time.diffNow('days').days * (-1),
      diffMonths = time.diffNow('months').months * (-1),
      diffYears = time.diffNow('years').years * (-1)

    let ext: string

    if (diffSeconds < 60) {
      if (diffSeconds > 1)
        ext = ' seconds a go'
      else
        ext = ' second a go'
      return diffSeconds.toFixed(0) + ext
    }
    else if (diffMinutes < 60) {
      if (diffMinutes > 1)
        ext = ' minutes a go'
      else
        ext = ' minute a go'
      return diffMinutes.toFixed(0) + ext
    }
    else if (diffHours < 24) {
      if (diffHours > 1)
        ext = ' hours a go'
      else
        ext = ' hour a go'
      return diffHours.toFixed(0) + ext
    }
    else if (diffDays < 31) {
      if (diffDays > 1)
        ext = ' days a go'
      else
        ext = ' day a go'
      return diffDays.toFixed(0) + ext
    }
    else if (diffMonths < 12) {
      if (diffMonths > 1)
        ext = ' months a go'
      else
        ext = ' month a go'
      return diffMonths.toFixed(0) + ext
    }
    else {
      if (diffYears > 1)
        ext = ' years a go'
      else
        ext = ' year a go'
      return diffYears.toFixed(0) + ext
    }
  }
}
