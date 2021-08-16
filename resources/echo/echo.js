import axios from 'axios';
import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');
let token =  document.querySelector('input[name="jwtToken"]').value;
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    forceTLS: false,
    wsHost: window.location.hostname,
    // wsHost: 'crypto.loc/websockets', //window.location.hostname,
    wsPort: 6001,
    auth: {
        headers: {
            Authorization: 'Bearer' +   token
        },
    },
});
/*crmStatistic*/
window.Echo.join('sumsub').listen('SumsubWebhooks', (event) => {
    console.log('event', event);
});


let btn = document.getElementById('testWS')

btn.addEventListener('click', function () {
    axios.get('/websockets-test').then(response => {
        console.log('ffff', response.data);
    })

})


