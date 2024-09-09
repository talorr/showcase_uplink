import { renderToWebStream } from 'vue/server-renderer'
import { createApp } from './main'
import { renderToString } from '@vue/server-renderer';

export async function render(url, manifest) {
  const { app, router, meta } = await createApp()
  // Настраиваем роутер перед рендерингом
  await router.push(url ? url[0] != '/' ? '/' + url : url : '/');
  // await router.push(url);
  // Дожидаемся завершения инициализации роутера
  await router.isReady();
  // Рендерим приложение в строку
  const appContent = await renderToString(app);
  // console.log(metaHtml)
// console.log(meta.target.context) 

  // Возвращаем HTML контент, который сервер отдаст клиенту
  return appContent;
}
