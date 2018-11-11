



// // a generic shuffle function ("mezclar" is "to mix" in spanish?)
// Array.prototype.mezclar = function () {
//     var n = this.length;
//     while (n--) {
//         var i = Math.floor(n * Math.random());
//         var tmp = this[i];
//         this[i] = this[n];
//         this[n] = tmp;

//     }
//     return this;
// }

// same thing, compressed loop into for declaration
export function mezclar2 (arr) {
    for (var i, tmp, n = arr.length; n; i = Math.floor(Math.random() * n), tmp = arr[--n], arr[n] = arr[i], arr[i] = tmp);
    return arr;
}


// same as mezclar2, only as prototype fn
export function mezclar3(arr) {
    for (var i, tmp, n = arr.length; n--; i = Math.floor(Math.random() * n), tmp = arr[i], arr[i] = arr[n], arr[n] = tmp);
    return arr;
}

// yet another generic implementation, from http://jsperf.com/shuffle-optimization-00129393
export function shuffle1(arr) {
    var l = arr.length + 1;
    while (l--) {
        var r = ~~(Math.random() * l),
            o = arr[r];

        arr[r] = arr[0];
        arr[0] = o;
    }

    return arr;
}

// again, another generic implementation that almost the same from http://jsperf.com/shuffle-optimization-00129393
export function shuffle2(arr) {
    var len = arr.length;
    var i = len;
    while (i--) {
        var p = parseInt(Math.random() * len + "");
        var t = arr[i];
        arr[i] = arr[p];
        arr[p] = t;
    }

    return arr;
};

// http://www.codinghorror.com/blog/2007/12/the-danger-of-naivete.html
export function NaiveShuffle(arr) {
    var i, temp, j, len = arr.length;
    for (i = 0; i < len; i++) {
        j = ~~(Math.random() * len);
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

// http://www.codinghorror.com/blog/2007/12/the-danger-of-naivete.html
export function knuthfisheryates(arr) {
    var i, temp, j, len = arr.length;
    for (i = 0; i < len; i++) {
        j = ~~(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

// http://stackoverflow.com/a/2450976/1037948
export function knuthfisheryates2<T>(arr:T[]) {
    var temp, j, i = arr.length;
    while (i>1 && --i) {
        j = ~~(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    return arr;
}



// same as above, moved +1 outside loop
export function knuthfisheryates2b(arr) {
    var temp, j, i = arr.length+1;
    while (--i) {
        j = ~~(Math.random() * i);
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    return arr;
}


export function knuthfisheryatesES6(arr) {
    var i = arr.length;
    while (--i) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}