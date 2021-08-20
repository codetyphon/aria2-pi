# download manager for raspberry pi

1. install aria2

```
apt install aria2
pip3 install aria2p flask flask-cors
```

2. run aria2 as rpc server
```
aria2c --enable-rpc --rpc-listen-all
```

3. run webui
```
./run.sh
```
or in cmd(windows)
```
run.bat
```