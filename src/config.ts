import env from 'sugar-env'

export const config = {
  telegram: {
    token: env.get('TELEGRAM_TOKEN', '')
  },
  mongodb: {
    uri: env.get('MONGODB_URI', 'mongodb://localhost:27017/rachacontabot'),
    dbName: env.get('MONGODB_DBNAME', 'rachacontabot')
  },
  webhook: {
    url: env.get('WEBHOOK_URL', 'http://localhost:3000')
  }
}

export type Config = typeof config