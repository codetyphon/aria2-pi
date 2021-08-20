from flask import Flask, jsonify, render_template,request
from flask_cors import CORS
import aria2p

aria2 = aria2p.API(
    aria2p.Client(
        host="http://localhost",
        port=6800,
        secret=""
    )
)

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/new", methods=['POST'])
def download_new():
    content = request.get_json()
    print('content:')
    print(content)
    url = content['url']
    if "magnet:?xt=" in url:
        aria2.add_magnet(url)
    else:
        aria2.add(url)
    return jsonify(True)

@app.route("/api/list", methods=['GET'])
def download_list():
    arr = []
    downloads = aria2.get_downloads()
    for download in downloads:
        # print(download.control_file_path)
        # print(download.root_files_paths)
        item = {}
        item['id'] = download.gid
        item['name'] = download.name

        item['status'] = download.status
        item['is_active'] = download.is_active
        item['is_waiting'] = download.is_waiting
        item['is_paused'] = download.is_paused
        item['has_failed'] = download.has_failed
        item['is_complete'] = download.is_complete
        item['is_removed'] = download.is_removed

        item['total'] = download.total_length
        item['complete'] = download.completed_length

        item['download_speed'] = download.download_speed
        item['upload_speed'] = download.upload_speed

        arr.append(item)
    return jsonify(arr)
