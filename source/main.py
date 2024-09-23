# -*- coding: utf-8 -*-
from namazvakti import namazvakti
import sys
import os

def main():
    klasor = os.path.join(os.getcwd(), 'MagicMirror', 'modules', 'MMM-NamazVakitleri', 'source')
    #print(klasor)
    namaz = namazvakti(mainKlasor= klasor)

    location = 9349 # Biga
    #location = 9351 # Çan
    
    args = sys.argv
    if len(args) > 1:
        location = args[1]
    
    try:
        print(namaz.vakit(location))
    except Exception as e:
        print("{'durum': 'hata', 'veri': {}, 'msg': 'İstenilen şehre ait veri bulunamadı.'}")
    
if __name__ == '__main__':
    main()