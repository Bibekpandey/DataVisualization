import json

# read files
pcifile = open('pci.json','r')
litfile = open('literacy.json', 'r')
corfile = open('correlation.json', 'w')

pci = pcifile.read()
lit = litfile.read()

pci = json.loads(pci)
lit = json.loads(lit)

def printlist(l):
    for x in l:
        if type(x)==list:
            printlist(x)
        elif type(x)==dict:
            printdic(x)
        else:
            print x

def printdic(d):
    for x in d:
        if type(d[x])==list:
            printlist(d[x])
        elif type(d[x])==dict:
            printdic(d[x])
        else:
            print x, d[x]


pcilist = pci['data']
litlist = lit['data']

finallist = []

for x in pcilist:
    k = x['Districts']
    d = {}
    for y in litlist:
        if k==y['District']: # process
            d['District'] = k
            d['PCI'] = int(x['Value'])
            d['Literacy'] = y['Percentage']
            litlist.remove(y)
            break
    if not len(d.keys())==0:
        finallist.append(d)

finaldict = {}
finaldict['data'] = finallist
finaldict['attrX'] = 'PCI'
finaldict['attrY'] = 'Literacy'
finaldict['title'] = 'Literacy Vs PCI'
corfile.write(json.dumps(finaldict))
