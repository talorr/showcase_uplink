export const getImageOptimized = url => {
  if (url) {
    return import.meta.env.VITE_API_BASE_URL.replace('/api', '') + (url[0] == '/' ? '' : '/') + url 
  }
}