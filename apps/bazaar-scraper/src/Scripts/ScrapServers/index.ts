import { ServerList } from 'Helpers'
import { ServerData } from 'Data'
import { broadcast } from 'logging'
import { fetchServerPage, fetchActiveServers } from './utils'

const main = async (): Promise<void> => {
  const helper = new ServerList()
  const serverData = new ServerData()

  await serverData.load()
  const currentServerNames = serverData.getServerNamesSet()

  broadcast('Fetching server data...', 'neutral')
  const serverPageHtml = await fetchServerPage()

  const newServerData = helper.servers(serverPageHtml)

  newServerData.forEach((newServer) => {
    if (!currentServerNames.has(newServer.serverName)) {
      serverData.registerServer(newServer)
    }
  })

  broadcast('Fetching active server list...', 'neutral')
  const activeServerList = await fetchActiveServers()
  await serverData.saveActiveServers(activeServerList)
}

export default main
