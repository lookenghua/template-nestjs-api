import * as dayjs from 'dayjs'

export const TODAY = dayjs().format('YYYY-MM-DD')

export const SEVEN_DAYS_BEFORE_TODAY = dayjs()
  .subtract(7, 'day')
  .format('YYYY-MM-DD')
