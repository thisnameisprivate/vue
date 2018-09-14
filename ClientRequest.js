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