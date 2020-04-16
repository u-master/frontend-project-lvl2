[![Maintainability](https://api.codeclimate.com/v1/badges/2a1bc0ce49db5472000d/maintainability)](https://codeclimate.com/github/u-master/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/2a1bc0ce49db5472000d/test_coverage)](https://codeclimate.com/github/u-master/frontend-project-lvl2/test_coverage)
![test coverage](https://github.com/u-master/frontend-project-lvl2/workflows/test%20coverage/badge.svg)


# Differences generator

Compares two configuration files and shows a difference.

### How to use

    gendiff [options] <firstConfig> <secondConfig>
    
        firstConfig, secondConfig - paths to files that need to compare
        options:
        -V, --version        output the version number
        -h, --help           output usage information
        -f, --format [type]  output format: nested(default), plain, json
        
### Visual representation
 - Flat JSON
 [![asciicast](https://asciinema.org/a/311948.svg)](https://asciinema.org/a/311948)

 - Nested JSON
 [![asciicast](https://asciinema.org/a/313640.svg)](https://asciinema.org/a/313640)

 - Flat YAML
 [![asciicast](https://asciinema.org/a/312616.svg)](https://asciinema.org/a/312616)
 
 - Nested YAML
 [![asciicast](https://asciinema.org/a/313616.svg)](https://asciinema.org/a/313616)
 
 - Flat INI
 [![asciicast](https://asciinema.org/a/312618.svg)](https://asciinema.org/a/312618)
 
 - Nested INI
 [![asciicast](https://asciinema.org/a/313635.svg)](https://asciinema.org/a/313635)
 
 - Different output formats
 [![asciicast](https://asciinema.org/a/314320.svg)](https://asciinema.org/a/314320)
