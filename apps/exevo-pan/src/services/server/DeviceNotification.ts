import webpush, { WebPushError } from 'web-push'
import { prisma } from 'lib/prisma'
import type { NotificationDevice } from '@prisma/client'

type Notification = {
  title: string
  body: string
  url?: string
}

type NotifyDeviceArgs = {
  device: NotificationDevice
  notification: Notification
  deleteInvalidDevices?: boolean
}

export default class DeviceNotificationClient {
  static async notify({
    device: { endpoint, auth, p256dh },
    notification,
    deleteInvalidDevices = true,
  }: NotifyDeviceArgs) {
    webpush.setVapidDetails(
      'https://www.exevopan.com/',
      process.env.NEXT_PUBLIC_VAPID_KEY as string,
      process.env.PRIVATE_VAPID_KEY as string,
    )

    if (deleteInvalidDevices) {
      return webpush
        .sendNotification(
          {
            endpoint,
            keys: { auth, p256dh },
          },
          JSON.stringify(notification),
        )
        .catch(async (e: WebPushError) => {
          await prisma.notificationDevice.deleteMany({
            where: { endpoint: e.endpoint },
          })
        })
    }

    return webpush.sendNotification(
      {
        endpoint,
        keys: { auth, p256dh },
      },
      JSON.stringify(notification),
    )
  }
}
