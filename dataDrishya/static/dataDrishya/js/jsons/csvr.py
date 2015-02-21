import csv
import json


def main():
    infile = csv.DictReader(open("education.csv"))
    headerlist = ['District','Sub Group','Male /Female','Value']
    dictlist = []
    for row in infile:
        d = {}
        for key in row:
            d[key] = row[key]
        dictlist.append(d)

    newd =[] 
    for x in range(0,len(dictlist),4):
        d = {}
        district = dictlist[x]['District']
        totlit = int(dictlist[x]['Value']) + int(dictlist[x+1]['Value'])
        totpop = int(dictlist[x+2]['Value']) + int(dictlist[x+3]['Value'])
        d['District'] = district
        d['Percentage'] = int( float(totlit)/float(totpop) * 100 + 0.5)
        newd.append(d)
        print(d)

    data = {}
    data['attrX'] = "District"
    data['attrY'] = "Value"
    data['title'] = "Literacy Rate"
    data['data'] = newd

    config = json.dumps(data, indent = 4)
    open("literacy.json", "w").write(config)
        

if __name__=="__main__":
    main()
