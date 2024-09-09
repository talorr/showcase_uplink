import { createApp } from './main'
import { renderToString } from '@vue/server-renderer';
import { renderSSRHead } from '@unhead/ssr'

export async function render(url, manifest, domain) {
  const { app, router, head } = await createApp(domain)

  // Настраиваем роутер перед рендерингом
  await router.push(url ? url[0] != '/' ? '/' + url : url : '/');
  // await router.push(url);
  // Дожидаемся завершения инициализации роутера
  await router.isReady();



  // Рендерим приложение в строку
  const appContent = await renderToString(app);
  const headPayload = await renderSSRHead(head)

  // Возвращаем HTML контент, который сервер отдаст клиенту
  return { headTags: headPayload.headTags, stream : appContent};
}