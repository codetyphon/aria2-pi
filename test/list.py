import aria2p

# initialization, these are the default values
aria2 = aria2p.API(
    aria2p.Client(
        host="http://localhost",
        port=6800,
        secret=""
    )
)

# list downloads
downloads = aria2.get_downloads()

for download in downloads:
    print(download.name, download.download_speed)