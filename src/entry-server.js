import { renderToWebStream } from 'vue/server-renderer'
import { createApp } from './main'
import { renderToString } from '@vue/server-renderer';

export async function render(url, manifest) {
  const { app, router } = await createApp()

  // Настраиваем роутер перед рендерингом
  router.push(url);
  // Дожидаемся завершения инициализации роутера
  await router.isReady();

  // Рендерим приложение в строку
  const appContent = await renderToString(app);

  // Возвращаем HTML контент, который сервер отдаст клиенту
  return appContent;
}
