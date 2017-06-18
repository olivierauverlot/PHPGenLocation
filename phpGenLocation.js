/*
This code is under MIT licence, you can find the complete file here: https://github.com/olivierauverlot/PHPGenLocation/blob/master/LICENSE
*/

"use strict;"

var PHPGenLocation = function() {
    this.protocol = null;
    this.page = null;
    this.args = [];

    this.parseLocation();
}

PHPGenLocation.prototype.parseLocation = function() {
    let _this = this;

    // remove the last character and extract the protocol
    this.protocol = document.location.protocol.slice(0, -1);
    // extract the page name
    this.page = document.location.pathname.match(/\w+\.php/g)[0];
    // extract arguments in an associative array
    document.location.search.substr(1).split('&').forEach(function(arg) {
        let argKeyAndValue = arg.split('=');
        _this.args[argKeyAndValue[0]] = argKeyAndValue[1];
    });
}

// answer true if the argument is a primary key
PHPGenLocation.prototype.isPK = function(argName) {
    let result = argName.match(/pk\d+/);
    return(result != null);
}

// answer true if the protocol is HTTPS
PHPGenLocation.prototype.isSecure = function() {
    return (this.protocol == 'https');
}

// answer the page name
PHPGenLocation.prototype.getPageName = function() { 
    return this.page;
}

// return an argument value
PHPGenLocation.prototype.getArgument = function(name) {
    return this.args[name];
}

// How many primary keys ?
PHPGenLocation.prototype.getPKCount = function() {
    let n = 0;
    for (var key in this.args) {
        if (this.args.hasOwnProperty(key)) {
            if(this.isPK(key))
                n++;
        }
    }
    return n;
}

