import aria2p

# initialization, these are the default values
aria2 = aria2p.API(
    aria2p.Client(
        host="http://localhost",
        port=6800,
        secret=""
    )
)

download = aria2.add("https://www.fosshub.com/Waterfox.html?dwl=WaterfoxClassic2021.07Setup.exe")
