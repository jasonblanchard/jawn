export default function updateLocation(method, path, registry) {
  registry.history[method](path);
}
