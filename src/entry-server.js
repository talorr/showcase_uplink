import { renderToWebStream } from 'vue/server-renderer'
import { createApp } from './main'
import { renderToString } from '@vue/server-renderer';
// import {useMeta} from 'vue-meta';
// import * as pkg from 'vue-meta/ssr'

export async function render(url, manifest) {
  const { app, router, meta } = await createApp()
  // console.log(pkg)
  // Настраиваем роутер перед рендерингом
  router.push(url);
  // Дожидаемся завершения инициализации роутера
  await router.isReady();
  // console.log(pkg)
  // Рендерим приложение в строку
  const appContent = await renderToString(app);
  // console.log(metaHtml)
// console.log(meta.target.context) 

  // Возвращаем HTML контент, который сервер отдаст клиенту
  return appContent;
}
