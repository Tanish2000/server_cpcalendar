import requests
import sys
from bs4 import BeautifulSoup

URL = 'https://www.hackerearth.com/challenges/'
page = requests.get(URL)

soup = BeautifulSoup(page.content, 'html.parser')

data = []

for i in soup.select('#challenge-container > div.upcoming.challenge-list > .challenge-card-modern > a > div.challenge-content.align-center > div.challenge-name.ellipsis.dark > span'):
    temp = {}
    temp["title"] = i.text.strip()
    data.append(temp)

j=0

for i in soup.select('#challenge-container > div.upcoming.challenge-list > .challenge-card-modern > a > div.challenge-content.align-center > div.challenge-list-meta.challenge-card-wrapper > div > div.date.less-margin.dark'):
   temp = i.text.split(",")
   data[j]["start"] = temp[0].strip()+" 2021"
   data[j]["end"] = temp[0].strip()+" 2021"
   data[j]["start_time"] = temp[1].strip()
   data[j]["platform"] = "Hackerearth"
   data[j]["hex_color"] = "#6f42c1"
   data[j]["link"] = "https://www.hackerearth.com/challenges/"
   j = j+1


    
print(data)
sys.stdout.flush()

#> a > div.challenge-content.align-center > div.challenge-name.ellipsis.dark > span
##challenge-container > div.upcoming.challenge-list > .challenge-card-modern > a > div.challenge-content.align-center > div.challenge-list-meta.challenge-card-wrapper > div > div.date.less-margin.dark

