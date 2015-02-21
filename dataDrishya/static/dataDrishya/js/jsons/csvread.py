import csv
import json

infile = csv.DictReader(open("education.csv"))

outfile = open("pciout.csv", "w")

l  = []
for row in infile:
    d = dict()
    enable = 1
    for key in row:
        if  len(key)==0:
            continue
        if key =="Category" and row[key]!="Per capita income":
            enable = 0
            break

        d[key] = row[key]
    
    if(enable):
        l.append(d)


data = {}
data['title'] = "PCI per district"
data['data'] = l

config = json.dumps(data, indent=4)
open("pci.json", "w").write(config)

for count in l:
    string = ""
    for key in count:
        string += count[key] + ", "

    print(string)
    outfile.write(string + "\n")


