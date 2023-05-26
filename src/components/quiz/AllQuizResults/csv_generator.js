export function CsvGenerator(dataArray, headers, keys, fileName) {
    this.dataArray = dataArray;
    this.headers = headers;
    this.keys = keys;
    this.fileName = fileName;


    this.getDownloadLink = function () {

        var rows = this.dataArray.map(function (row) {
            var rowData = "";

            for (let idx in keys) {
                rowData += row[keys[idx]];
                if (idx != keys.length - 1) {
                    rowData += ',';
                }
            }

            return rowData;
        });
        rows.unshift(headers.join(','));

        var type = 'data:text/csv;charset=utf-8';
        var data = rows.join('\n');

        if (typeof btoa === 'function') {
            type += ';base64';
            data = btoa(data);
        } else {
            data = encodeURIComponent(data);
        }

        return this.downloadLink = this.downloadLink || type + ',' + data;
    };

    this.getLinkElement = function (linkText) {
        var downloadLink = this.getDownloadLink();
        var fileName = this.fileName;
        this.linkElement = this.linkElement || (function () {
            var a = document.createElement('a');
            a.innerHTML = linkText || '';
            a.href = downloadLink;
            a.download = fileName;
            return a;
        }());
        return this.linkElement;
    };

    // call with removeAfterDownload = true if you want the link to be removed after downloading
    this.download = function (removeAfterDownload) {
        var linkElement = this.getLinkElement();
        linkElement.style.display = 'none';
        document.body.appendChild(linkElement);
        linkElement.click();
        if (removeAfterDownload) {
            document.body.removeChild(linkElement);
        }
    };
}