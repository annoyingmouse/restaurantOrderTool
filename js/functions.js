function empty(data) {
    if (typeof(data) == 'number' || typeof(data) == 'boolean') {
        return false;
    }
    if (typeof(data) == 'undefined' || data === null) {
        return true;
    }
    if (typeof(data.length) != 'undefined') {
        return data.length == 0;
    }
    var count = 0;
    for (var i in data) {
        if (data.hasOwnProperty(i)) {
            count ++;
        }
    }
    return count == 0;
}

function getAge(d1, d2){
    d2 = d2 || new Date();
    var diff = d2.getTime() - d1.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}
// FROM: http://stackoverflow.com/questions/498970/how-do-i-trim-a-string-in-javascript
if (!String.prototype.trim) {
    String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
}
String.prototype.ltrim=function(){
    return this.replace(/^\s+/,'');
};
String.prototype.rtrim=function(){
    return this.replace(/\s+$/,'');
};
String.prototype.fulltrim=function(){
    return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');
};
// FROM: http://jspro.com/raw-javascript/five-php-functions-id-love-to-see-in-javascript/
String.prototype.htmlSpecialChars = function(){
    return this
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
};
String.prototype.htmlSpecialCharsDecode = function(){
    return this
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"');
};
String.prototype.ucwords = function() {
    var words = this.split(/(\s+)/);
    for(var i = 0; i < words.length; i++)
        words[i] = words[i][0].toUpperCase() + words[i].substr(1, words[i].length);
    return words.join('');
};
String.prototype.ucfirst = function() {
    var words = this.split(/(\s+)/);
    if (words[0] != null)
        words[0] = words[0][0].toUpperCase() + words[0].substr(1, words[0].length);
    return words.join('');
};
Array.prototype.unique = function (sort, sortingFunction) {
    var array = [];
    for (var i = 0; i < this.length; i++) {
        if (array.inArray(this[i]) === false)
            array.push(this[i]);
    }
    if (sort === true) {
        if (typeof sortingFunction === 'function')
            array.sort(sortingFunction);
        else
            array.sort();
    }
    return array;
};
// FROM: http://www.sitepoint.com/finding-an-ancestor-node/
function ancestor(node, match){
    if(!node)    {
        return null;
    }else if(!node.nodeType || typeof(match) != 'string'){
        return node;
    }
    if((match = match.split('.')).length === 1){
        match.push(null);
    }else if(!match[0]){
        match[0] = null;
    }
    do{
        if( (!match[0] || match[0].toLowerCase() == node.nodeName.toLowerCase()) && (!match[1] || new RegExp('( |^)(' + match[1] + ')( |$)').test(node.className))){
            break;
        }
    }
    while(node = node.parentNode);
    return node;
}
/**
 *
 *  Base64 encode / decode
 *  http://www.webtoolkit.info/
 *
 **/
var Base64 = {
    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    // public method for encoding
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = Base64._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    },
    // public method for decoding
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = Base64._utf8_decode(output);
        return output;
    },
    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },
    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}
function abbreviate(str, max, suffix){
    if((str = str.replace(/^\s+|\s+$/g, '').replace(/[\r\n]*\s*[\r\n]+/g, ' ').replace(/[ \t]+/g, ' ')).length <= max){
        return str;
    }
    var abbr = '',
        str = str.split(' '),
        suffix = (typeof suffix !== 'undefined' ? suffix : ' ...'),
        max = (max - suffix.length);
    for(var len = str.length, i = 0; i < len; i ++){
        if((abbr + str[i]).length < max){
            abbr += str[i] + ' ';
        } else {
            break;
        }
    }
    return abbr.replace(/[ ]$/g, '') + suffix;
}
/**
 * ReplaceAll by Fagner Brack (MIT Licensed)
 * Replaces all occurrences of a substring in a string
 */
String.prototype.replaceAll = function (token, newToken, ignoreCase) {
    var _token;
    var str = this + "";
    var i = -1;
    if (typeof token === "string") {
        if (ignoreCase) {
            _token = token.toLowerCase();
            while ((
                i = str.toLowerCase().indexOf(
                    token, i >= 0 ? i + newToken.length : 0
                )) !== -1
                ) {
                str = str.substring(0, i) +
                    newToken +
                    str.substring(i + token.length);
            }
        } else {
            return this.split(token).join(newToken);
        }
    }
    return str;
};
// From: http://www.sitepoint.com/creating-an-iso-datestamp/
function datestamp(date){
    if(isNaN((date = typeof(date) !== 'undefined' ? new Date(date) : new Date()).getTime())){
        return null;
    }
    var pad2 = function(n) {
            return (n < 10 ? '0' : '') + n;
        },
        tokens = [[['FullYear'], ['Month', 1], ['Date']], [['Hours'], ['Minutes'], ['Seconds']]];
    for(var a = tokens.length, i = 0; i < a; i ++){
        for(var b = tokens[i].length, j = 0; j < b; j ++){
            tokens[i][j] = pad2(date['getUTC' + tokens[i][j][0]]() + (tokens[i][j][1] || 0));
        }
    }
    return tokens[0].join('-') + 'T' + tokens[1].join(':') + 'Z';
}

function createDateStamp(dateString){
    return datestamp(
        new Date(
            dateString.split('/')[2].split(' ')[0],
            dateString.split('/')[1] - 1,
            dateString.split('/')[0],
            dateString.split('/')[2].split(':')[0].split(' ')[1],
            dateString.split('/')[2].split(':')[1],
            dateString.split('/')[2].split(':')[2]
        )
    );
}

function addPostLinks(k, link, title){
    if(k == 0){
        $("#siteLinks").append($("<li></li>",{
            "class":"dropdown"
        }).append($("<a></a>",{
                "class":"dropdown-toggle",
                "data-toggle":"dropdown",
                "href":"#",
                "text":"Posts"
            }).append($("<b></b>",{
                    "class":"carat"
                }))).append($("<ul></ul>",{
                "class":"dropdown-menu",
                "id":"postLinks"
            }).append($("<li></li>").append($("<a></a>",{
                    "href":"#" + link,
                    "text":title
                })))));
    }else{
        $("#postLinks").append($("<li></li>").append($("<a></a>",{
            "href":"#" + link,
            "text":title
        })));
    }
}

md5 = function (string) {

    function cmn(q, a, b, x, s, t) {
        a = add32(add32(a, q), add32(x, t));
        return add32((a << s) | (a >>> (32 - s)), b);
    }


    function ff(a, b, c, d, x, s, t) {
        return cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }

    function gg(a, b, c, d, x, s, t) {
        return cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }

    function hh(a, b, c, d, x, s, t) {
        return cmn(b ^ c ^ d, a, b, x, s, t);
    }

    function ii(a, b, c, d, x, s, t) {
        return cmn(c ^ (b | (~d)), a, b, x, s, t);
    }



    function md5cycle(x, k) {
        var a = x[0], b = x[1], c = x[2], d = x[3];

        a = ff(a, b, c, d, k[0], 7, -680876936);
        d = ff(d, a, b, c, k[1], 12, -389564586);
        c = ff(c, d, a, b, k[2], 17,  606105819);
        b = ff(b, c, d, a, k[3], 22, -1044525330);
        a = ff(a, b, c, d, k[4], 7, -176418897);
        d = ff(d, a, b, c, k[5], 12,  1200080426);
        c = ff(c, d, a, b, k[6], 17, -1473231341);
        b = ff(b, c, d, a, k[7], 22, -45705983);
        a = ff(a, b, c, d, k[8], 7,  1770035416);
        d = ff(d, a, b, c, k[9], 12, -1958414417);
        c = ff(c, d, a, b, k[10], 17, -42063);
        b = ff(b, c, d, a, k[11], 22, -1990404162);
        a = ff(a, b, c, d, k[12], 7,  1804603682);
        d = ff(d, a, b, c, k[13], 12, -40341101);
        c = ff(c, d, a, b, k[14], 17, -1502002290);
        b = ff(b, c, d, a, k[15], 22,  1236535329);

        a = gg(a, b, c, d, k[1], 5, -165796510);
        d = gg(d, a, b, c, k[6], 9, -1069501632);
        c = gg(c, d, a, b, k[11], 14,  643717713);
        b = gg(b, c, d, a, k[0], 20, -373897302);
        a = gg(a, b, c, d, k[5], 5, -701558691);
        d = gg(d, a, b, c, k[10], 9,  38016083);
        c = gg(c, d, a, b, k[15], 14, -660478335);
        b = gg(b, c, d, a, k[4], 20, -405537848);
        a = gg(a, b, c, d, k[9], 5,  568446438);
        d = gg(d, a, b, c, k[14], 9, -1019803690);
        c = gg(c, d, a, b, k[3], 14, -187363961);
        b = gg(b, c, d, a, k[8], 20,  1163531501);
        a = gg(a, b, c, d, k[13], 5, -1444681467);
        d = gg(d, a, b, c, k[2], 9, -51403784);
        c = gg(c, d, a, b, k[7], 14,  1735328473);
        b = gg(b, c, d, a, k[12], 20, -1926607734);

        a = hh(a, b, c, d, k[5], 4, -378558);
        d = hh(d, a, b, c, k[8], 11, -2022574463);
        c = hh(c, d, a, b, k[11], 16,  1839030562);
        b = hh(b, c, d, a, k[14], 23, -35309556);
        a = hh(a, b, c, d, k[1], 4, -1530992060);
        d = hh(d, a, b, c, k[4], 11,  1272893353);
        c = hh(c, d, a, b, k[7], 16, -155497632);
        b = hh(b, c, d, a, k[10], 23, -1094730640);
        a = hh(a, b, c, d, k[13], 4,  681279174);
        d = hh(d, a, b, c, k[0], 11, -358537222);
        c = hh(c, d, a, b, k[3], 16, -722521979);
        b = hh(b, c, d, a, k[6], 23,  76029189);
        a = hh(a, b, c, d, k[9], 4, -640364487);
        d = hh(d, a, b, c, k[12], 11, -421815835);
        c = hh(c, d, a, b, k[15], 16,  530742520);
        b = hh(b, c, d, a, k[2], 23, -995338651);

        a = ii(a, b, c, d, k[0], 6, -198630844);
        d = ii(d, a, b, c, k[7], 10,  1126891415);
        c = ii(c, d, a, b, k[14], 15, -1416354905);
        b = ii(b, c, d, a, k[5], 21, -57434055);
        a = ii(a, b, c, d, k[12], 6,  1700485571);
        d = ii(d, a, b, c, k[3], 10, -1894986606);
        c = ii(c, d, a, b, k[10], 15, -1051523);
        b = ii(b, c, d, a, k[1], 21, -2054922799);
        a = ii(a, b, c, d, k[8], 6,  1873313359);
        d = ii(d, a, b, c, k[15], 10, -30611744);
        c = ii(c, d, a, b, k[6], 15, -1560198380);
        b = ii(b, c, d, a, k[13], 21,  1309151649);
        a = ii(a, b, c, d, k[4], 6, -145523070);
        d = ii(d, a, b, c, k[11], 10, -1120210379);
        c = ii(c, d, a, b, k[2], 15,  718787259);
        b = ii(b, c, d, a, k[9], 21, -343485551);

        x[0] = add32(a, x[0]);
        x[1] = add32(b, x[1]);
        x[2] = add32(c, x[2]);
        x[3] = add32(d, x[3]);

    }


    function md51(s) {
        txt = '';
        var n = s.length,
            state = [1732584193, -271733879, -1732584194, 271733878], i;
        for (i=64; i<=n; i+=64) {
            md5cycle(state, md5blk(s.substring(i-64, i)));
        }
        s = s.substring(i-64);
        var tail = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], sl=s.length;
        for (i=0; i<sl; i++) 	tail[i>>2] |= s.charCodeAt(i) << ((i%4) << 3);
        tail[i>>2] |= 0x80 << ((i%4) << 3);
        if (i > 55) {
            md5cycle(state, tail);
            i=16;
            while (i--) { tail[i] = 0 }
            //			for (i=0; i<16; i++) tail[i] = 0;
        }
        tail[14] = n*8;
        md5cycle(state, tail);
        return state;
    }

    /* there needs to be support for Unicode here,
     * unless we pretend that we can redefine the MD-5
     * algorithm for multi-byte characters (perhaps
     * by adding every four 16-bit characters and
     * shortening the sum to 32 bits). Otherwise
     * I suggest performing MD-5 as if every character
     * was two bytes--e.g., 0040 0025 = @%--but then
     * how will an ordinary MD-5 sum be matched?
     * There is no way to standardize text to something
     * like UTF-8 before transformation; speed cost is
     * utterly prohibitive. The JavaScript standard
     * itself needs to look at this: it should start
     * providing access to strings as preformed UTF-8
     * 8-bit unsigned value arrays.
     */
    function md5blk(s) { 		/* I figured global was faster.   */
        var md5blks = [], i; 	/* Andy King said do it this way. */
        for (i=0; i<64; i+=4) {
            md5blks[i>>2] = s.charCodeAt(i)
                + (s.charCodeAt(i+1) << 8)
                + (s.charCodeAt(i+2) << 16)
                + (s.charCodeAt(i+3) << 24);
        }
        return md5blks;
    }

    var hex_chr = '0123456789abcdef'.split('');

    function rhex(n)
    {
        var s='', j=0;
        for(; j<4; j++)	s += hex_chr[(n >> (j * 8 + 4)) & 0x0F]	+ hex_chr[(n >> (j * 8)) & 0x0F];
        return s;
    }

    function hex(x) {
        var l=x.length;
        for (var i=0; i<l; i++)	x[i] = rhex(x[i]);
        return x.join('');
    }

    /* this function is much faster,
     so if possible we use it. Some IEs
     are the only ones I know of that
     need the idiotic second function,
     generated by an if clause.  */

    function add32(a, b) {
        return (a + b) & 0xFFFFFFFF;
    }

    if (hex(md51("hello")) != "5d41402abc4b2a76b9719d911017c592") {
        function add32(x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF),
                msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        }
    }

    return hex(md51(string));
}