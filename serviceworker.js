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
    '/vendor/',
    'index.html',


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