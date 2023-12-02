const form = document.querySelector('form');
const input = document.querySelector('input');
const button = document.getElementById('discord');

function autosaveCheck() {
    //autosave bs
    if (getCookie("autosave") != "") {
        var lastAutosave = 0;
        if (getCookie("lastAutosave") === "") {
            lastAutosave = 0;
        } else {
            lastAutosave = parseInt(getCookie("lastAutosave"));
        }
        if (getCookie("autosave") === "daily") {
            if ((Date.now() - lastAutosave) > 86400000) {
                autosave();
            }
        } else if (getCookie("autosave") === "weekly") {
            if ((Date.now() - lastAutosave) > 604800000) {
                autosave();
            }
        } else if (getCookie("autosave") === "never") {
            //nothing happens
        }
        console.log("cookie found (as)");
    } else {
        console.log("cookie found no (as)");
    }
}

function autosave() {
    function getLocalStorageAsJson() {
        const localStorageData = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            localStorageData[key] = value;
        }
        return JSON.stringify(localStorageData, null, 2);
    }

    function saveStringAsFile(content, filename) {
        const blob = new Blob([content], {
            type: "text/plain"
        });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = filename;

        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    const saved = saveStringAsFile(getLocalStorageAsJson(), new Date().toLocaleDateString('en-US').split('/').join('-'));
    document.cookie = "lastAutosave=" + Date.now() + "; expires=8 Dec 2027 12:00:00 UTC; path=/";
    console.log("saved")
}

form.addEventListener('submit', async event => {
    event.preventDefault();
    console.log("check a");
    uuid = null;
    if (getCookie("uuid") == '') {
        console.log("check b");
        uuid = crypto.randomUUID();
        document.cookie = "uuid=" + uuid + "; expires=8 Dec 2027 12:00:00 UTC; path=/";
    } else {
        console.log("checl c");
        uuid = getCookie("uuid");
    }

    window.navigator.serviceWorker.register('./uv/sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        setTimeout(() => {
            let url = input.value.trim();
            if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url;
            else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;


            window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
        }, 10)
    });
});

function isUrl(val = '') {
    if (/^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ') return true;
    return false;
};

button.addEventListener("click", function() {
    document.getElementById("search-bar").value = "https://discord.com/login";
    document.getElementById("sub").click();
    console.log("aaaaaa");
});
//document.getElementById("spotify").addEventListener("click", function() {
//document.getElementById("search-bar").value = "https://open.spotify.com/";
//    document.getElementById("sub").click();
//    console.log("aaaaaa");
//});
document.getElementById("reddit").addEventListener("click", function() {
    document.getElementById("search-bar").value = "https://old.reddit.com/";
    document.getElementById("sub").click();
    console.log("aaaaaa");
});
document.getElementById("feedback").addEventListener("click", function() {
    document.getElementById("search-bar").value = "https://forms.gle/8ZHpuPQtrCPYgkKa6";
    document.getElementById("sub").click();
    console.log("aaaaaa");
});
document.getElementById("mathway").addEventListener("click", function() {
    document.getElementById("search-bar").value = "https://www.mathway.com/Algebra";
    document.getElementById("sub").click();
    console.log("aaaaaa");
});
document.getElementById("blog").addEventListener("click", function() {
    window.location.href = window.location.href + "blog/"
});
document.getElementById("chatgpt").addEventListener("click", function() {
    document.getElementById("search-bar").value = "https://claude.ai/";
    document.getElementById("sub").click();
    console.log("aaaaaa");
});
document.getElementById("settings").addEventListener("click", function() {
    window.location.href = window.location.href + "settings"
});
/*
document.getElementById("data-out").addEventListener("click", function() {
function getLocalStorageAsJson() {
  const localStorageData = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    localStorageData[key] = value;
  }
  return JSON.stringify(localStorageData, null, 2);
}

function saveStringAsFile(content, filename) {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
const saved = saveStringAsFile(getLocalStorageAsJson(), "test.dump");
console.log("saved")
});
*/

//cloaking beta
/*
document.getElementById("cloak").addEventListener("click", function() {
      const url = 'about:blank';
      const win = window.open(url);
      win.document.body.innerHTML = `<iframe style="position:absolute;width:100%;height:100%;border:none;top:0;left:0;right:0;bottom:0;" src="${window.location.href}"></iframe>`;
});
*/
function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    } else {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
            end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
}