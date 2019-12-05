if (workbox) {
  console.log(`Yay! Workbox is loaded!`);
} else {
  console.log(`Boo! Workbox didn't load!`);
}

// 设置缓存前缀和后缀，请根据实际项目名修改
workbox.core.setCacheNameDetails({
  prefix: 'easy-front-vue-cli3',
  suffix: 'v1.0.0'
});
// have our sw update and control a web page as soon as possible.
workbox.core.skipWaiting();
workbox.core.clientsClaim();

// vue-cli3.0 supports pwa with the help of workbox-webpack-plugin, we need to get the precacheing list through this sentence.
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

workbox.routing.registerRoute(
  // Cache CSS files
  /.*\.css/,
  // 使用缓存，但尽快在后台更新
  workbox.strategies.staleWhileRevalidate({
    // 使用自定义缓存名称
    cacheName: 'css-cache'
  })
);
workbox.routing.registerRoute(
  // 缓存JS文件
  /.*\.js/,
  // 使用缓存，但尽快在后台更新
  workbox.strategies.staleWhileRevalidate({
    // 使用自定义缓存名称
    cacheName: 'js-cache'
  })
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
      })
    ]
  })
);

// 获取oss上的资源，支持跨域
// workbox.routing.registerRoute(
//   /^https:\/\/images\.lancky\.com\/.*\.(jpe?g|png|gif|svg)/,
//   workbox.strategies.staleWhileRevalidate({
//     cacheName: 'oss-images',
//     plugins: [
//       new workbox.expiration.Plugin({
//         maxEntries: 60,
//         maxAgeSeconds: 5 * 24 * 60 * 60 // 5 Days
//       })
//     ],
//     fetchOptions: {
//       credentials: 'include'
//     }
//   })
// );

// api缓存，优选从网络获取，网络异常时再使用缓存，请根据实际api url配置RegExp
workbox.routing.registerRoute(
  new RegExp('https://m.hellomrbigbigshot.xyz/api'),
  workbox.strategies.networkFirst({
    cacheName: 'api'
  })
);
