# MMM-NamazVakitleri
This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/tree/develop) smart mirror project.

This module provides getting Prayer Times from TC Diyanet İşleri Başkanlığı.

| Status  | Version | Date       | Maintained? | Minimum MagicMirror² Version |
|:------- |:------- |:---------- |:----------- |:---------------------------- |
| Working | `0.2.0` | 24.09.2024 | Yes         |`2.1.0`                       |

## Screenshots

![MMM-NamazVakitleri Running](screenshots/screenshot.png?raw=true "Screenshot")


## Dependencies

- [python-shell] (https://www.npmjs.com/package/python-shell)

- [requests] (https://pypi.org/project/requests/)
- [BeautifSoup4] (https://pypi.org/project/beautifulsoup4/)
- [convertdate] (https://pypi.org/project/convertdate/)

## Installation

To install the module, use your terminal to:

1. Navigate to your MagicMirror's `modules` folder. If you are using the default installation directory, use the command: 
```
cd ~/MagicMirror/modules
```

2. Clone the module to your computer by executing the following command:
```
git clone https://github.com/erdemarslan/MMM-NamazVakitleri.git
```

3. Install the `python-shell` library by executing the following command:
```
npm install python-shell
```

4. Install the `request`, `BeautifulSoup4` and `convertdate` libraries by executing the following command:
```
sudo apt install python3-requests
sudo apt install python3-bs4
sudo apt install python3-convertdate
```

* Configure the module in your `config.js` file.

## Using the module

### MagicMirror² Configuration

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        ...
        {
          module: "MMM-NamazVakitleri",
          position: 'top_right',
          header: 'Namaz Vakitleri',
          config: {
            locationId: 9349
          }
    		},
        ...
    ]
}
```

## License

### The MIT License (MIT)

Copyright © 2024 Erdem ARSLAN

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

**The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.**