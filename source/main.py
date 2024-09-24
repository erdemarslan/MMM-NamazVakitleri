# -*- coding: utf-8 -*-
from namazvakti import namazvakti
import sys
import os
import json

def main():
    klasor = os.path.join(os.getcwd(), 'modules', 'MMM-NamazVakitleri', 'source')
    #print(klasor)
    namaz = namazvakti(mainKlasor= klasor)

    location = 9349 # Biga
    #location = 9351 # Çan
    
    args = sys.argv
    if len(args) > 1:
        location = args[1]
    
    try:
        print(json.dumps(namaz.vakit(location)))
    except Exception as e:
        sonuc = {'durum': 'hata', 'veri': {}, 'msg': 'İstenilen şehre ait veri bulunamadı.'}
        print(json.dumps(sonuc))
    
if __name__ == '__main__':
    main()