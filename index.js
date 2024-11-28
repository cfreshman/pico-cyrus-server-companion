const PICO_ADDRESSES = ['http://192.168.0.7', 'http://192.168.0.16']

const main = async () => {
  while (1) {
    try {
      const online = await fetch('https://freshman.dev/api/online').then(r => r.json())
      const online_accounts = online.filter(x => x.length <= 8)
      console.log(online_accounts.length, 'accounts online', online_accounts)
      await Promise.allSettled(PICO_ADDRESSES.map(async PICO_ADDRESS => {
        await fetch(PICO_ADDRESS + '/online?x=' + online_accounts.length)
      }))
    } catch (e) {
      console.error(e)
    }
    await new Promise(r => setTimeout(r, 10_000))
  }
}
main()
