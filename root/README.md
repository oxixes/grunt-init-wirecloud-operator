# {%= project_name %} operator

The {%= project_name %} operator is a WireCloud operator that provides ...

## Build dependencies

Be sure to have installed [Node.js](https://nodejs.org/){% if (bower) { %} and [Bower](http://bower.io){% }%} in your system. For example, you can install it on Ubuntu and Debian running the following commands:

```bash
sudo apt update; sudo apt install curl gnupg
curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
sudo apt install nodejs npm {% if (bower) { %}
sudo npm install -g bower{% }%}
```

You also have to install the [Grunt](https://gruntjs.com/)'s command line interface (CLI):

```bash
sudo npm install -g grunt-cli
```

The remaining dependencies are installed using npm (you have to run this command
inside the folder where you downloaded this repository):

```bash
npm install
```


## Build

Once installed all the build dependencies you can build this operator by using grunt:

```bash
grunt
```

If everything goes well, you will find a wgt file in the `dist` folder.


## Documentation

Documentation about how to use this operator is available on the
[User Guide](src/doc/userguide.md). Anyway, you can find general information
about how to use operators on the
[WireCloud's User Guide](https://wirecloud.readthedocs.io/en/stable/user_guide/)
available on Read the Docs.

## Copyright and License

Copyright (c) {%= grunt.template.today('yyyy') %} {%= vendor_title %}
Licensed under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.
