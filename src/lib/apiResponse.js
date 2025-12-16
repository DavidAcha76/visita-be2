export function ok(res, data, meta) {
  return res.json({ ok: true, data, meta });
}
export function created(res, data) {
  return res.status(201).json({ ok: true, data });
}
export function noContent(res) {
  return res.status(204).send();
}
export function badRequest(res, msg) {
  return res.status(400).json({ ok: false, error: msg });
}
export function notFound(res) {
  return res.status(404).json({ ok: false, error: "Not Found" });
}
