export function removeStringExtension(string) {
  return string.split('.').slice(0, -1).join('.')
}