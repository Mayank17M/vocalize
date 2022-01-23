import requests

res = requests.get('''audio data''')
with open('''specify folder possibly''') as fp:
    fp.write(res.text)