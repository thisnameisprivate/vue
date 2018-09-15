const getJSON = url => {
    const promise = new Promise ((resolve, reject) => {
        const handler = () => {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status === 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        };
        const client = new XMLHttpRequest();
        client.open("GET", url);
        client.setRequestHeader('Accpet', 'application/json');
        client.responseType('json');
        client.send();
        client.onreadystatechange = handler;
    });
    return Promise;
};
getJSON('testLink.php').then(resolveValue => {
    console.log("Content: " + resolveValue);
}, rejectError => {
    console.log("Error: " + rejectError);
})

const getXml = url => {
    const promise = new Promise((resolve, reject) => {
        const Client = new XMLHttpRequest();
        Client.open("GET", url);
        Client.setRequestHeader('Accpet', 'application/XML');
        Client.responseType("XML");
        Client.send();
        Client.onreadystatechange = () => {
            if (Client.readyState !== 4) {
                return;
            }
            if (Client.status === 200) {
                resolve(Client.response);
            } else {
                reject(new Error("Get XML Error"));
            }
        }
        return Promise;
    })
}
getXML('urltest.php').then(resolve => {
    console.log("Get Content: " + resolve);
}, resject => {
    console.log("Catch Error: " + reject);
});