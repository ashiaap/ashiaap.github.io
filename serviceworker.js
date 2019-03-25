var CACHE_NAME = 'my-pwa-cache-v1';

var urlToCache = [
    '/',
    '/css/main.css',
    '/css/util.css',
    '/fonts/font-awesome-4.7.0',
    '/fonts/iconic',
    '/fonts/poppins',
    '/images/icons/favicon.ico',
    '/images/bg-01/jpg',
    '/js/jquery.min.js',
    '/js/main.js',
    '/vendor/bootstrap/css/bootstrap.min.css',
    '/vendor/animate/animate.css',
    '/vendor/css-hamburgers/hamburgers.min.css',
    '/vendor/animsition/css/animsition.min.css',
    '/vendor/select2/select2.min.css',
    '/vendor/daterangepicker/daterangepicker.css',
    '/vendor/jquery/jquery-3.2.1.min.js',
    '/vendor/animsition/js/animsition.min.js',
    '/vendor/bootstrap/js/popper.js',
    '/vendor/bootstrap/js/bootstrap.min.js',
    '/vendor/select2/select2.min.js',
    '/vendor/daterangepicker/moment.min.js',
    '/vendor/daterangepicker/daterangepicker.js',
    '/vendor/countdowntime/countdowntime.js'


]

//install service worker
self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
                console.log('service worker do install..',cache);
                return cache.addAll(urlToCache);
            })
    );
});

//aktivasi cache
self.addEventListener('activate',function(event){
    event.waitUntil(
        caches.keys().then(function(cacheName){
            return Promise.all(
                //delete cache jika da versi yang lebih baru
                cacheName.filter(function(cacheName){
                    return cacheName !== CACHE_NAME;
                }).map(function(cacheName){
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

if(navigator.serviceWorker){
    window.addEventListener('load', function(){
        navigator.serviceWorker.register('/serviceworker.js').then(function(reg){
            console.log('SW regis sukses dgn skop', reg.scope);
        }, function(err){
            console.log("SW regis failed", err);
        });
    });
}