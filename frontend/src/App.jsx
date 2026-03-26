import { useEffect, useMemo, useState } from "react"

const API_BASE = import.meta.env.VITE_API_BASE || "/api"

export default function App() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [authLoading, setAuthLoading] = useState(false)
  const [userId, setUserId] = useState(null)
  const [authError, setAuthError] = useState("")

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState("Document")
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const [lastUpload, setLastUpload] = useState(null)
  const [uploads, setUploads] = useState([])

  const isLoggedIn = Boolean(userId)

  useEffect(() => {
    let ignore = false

    async function fetchMe() {
      try {
        const res = await fetch(API_BASE + "/auth/me", {
          credentials: "include",
        })
        if (res.ok === false) return
        const data = await res.json()
        if (ignore === false && data?.id) setUserId(data.id)
      } catch (_) {
        // ignore on initial load
      }
    }

    fetchMe()
    return () => {
      ignore = true
    }
  }, [])

  async function handleLogin(event) {
    event.preventDefault()
    setAuthError("")
    setAuthLoading(true)

    try {
      const res = await fetch(API_BASE + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json().catch(() => ({}))
      if (res.ok === false) {
        throw new Error(data?.message || "Connexion échouée")
      }

      setUserId(data?.user || null)
      setPassword("")
    } catch (err) {
      setAuthError(err.message || "Impossible de se connecter")
    } finally {
      setAuthLoading(false)
    }
  }

  async function handleLogout() {
    setAuthError("")
    try {
      await fetch(API_BASE + "/auth/logout", {
        method: "POST",
        credentials: "include",
      })
    } catch (_) {
      // ignore
    }

    setUserId(null)
  }

  async function handleUpload(event) {
    event.preventDefault()
    setUploadError("")

    if (file == null) {
      setUploadError("Veuillez choisir un fichier à uploader.")
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("description", description)
      formData.append("type", type)
      formData.append("file", file)

      const res = await fetch(API_BASE + "/admin/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      })

      const data = await res.json().catch(() => ({}))
      if (res.ok === false) {
        throw new Error(data?.message || "Upload échoué")
      }

      setLastUpload(data)
      setUploads((prev) => [data, ...prev])
      setTitle("")
      setDescription("")
      setType("Document")
      setFile(null)
    } catch (err) {
      setUploadError(err.message || "Upload impossible")
    } finally {
      setUploading(false)
    }
  }

  const preview = lastUpload?.qrcode || null
  const previewMeta = lastUpload?.file
  const previewToken = lastUpload?.qr?.token

  const historyItems = useMemo(() => uploads.slice(0, 6), [uploads])

  return (
    <div className="min-h-screen noise">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-6 pb-16 pt-10">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#0f172a] text-white shadow-lg">
              <span className="font-display text-lg">FS</span>
            </div>
            <div>
              <p className="font-display text-xl font-bold">FileShare Admin</p>
              <p className="text-sm text-slate-600">Uploads sécurisés + QR instantané</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            {isLoggedIn ? (
              <>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">Connecté</span>
                <button
                  onClick={handleLogout}
                  className="rounded-full border border-slate-900/10 bg-white px-4 py-2 text-sm shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  Se déconnecter
                </button>
              </>
            ) : (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-700">Hors ligne</span>
            )}
          </div>
        </header>

        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <div className="glass rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-700">Connexion</p>
                <span className="text-xs text-slate-500">Session via cookie</span>
              </div>

              <form onSubmit={handleLogin} className="mt-4 grid gap-4">
                <div className="grid gap-2">
                  <label className="text-xs font-semibold text-slate-600">Email</label>
                  <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    placeholder="admin@fileshare.com"
                    className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-xs font-semibold text-slate-600">Mot de passe</label>
                  <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                    required
                  />
                </div>
                {authError ? (
                  <p className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-xs text-rose-700">
                    {authError}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={authLoading}
                  className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-slate-900/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {authLoading ? "Connexion…" : "Se connecter"}
                </button>
              </form>
            </div>

            <div className="glass rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-700">Upload fichier</p>
                <span className="text-xs text-slate-500">Admin uniquement</span>
              </div>

              <form onSubmit={handleUpload} className="mt-4 grid gap-4">
                <div className="grid gap-2">
                  <label className="text-xs font-semibold text-slate-600">Titre</label>
                  <input
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    type="text"
                    placeholder="Mon fichier"
                    className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                    required
                    disabled={isLoggedIn === false}
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-xs font-semibold text-slate-600">Description</label>
                  <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    rows={3}
                    placeholder="Résumé du contenu, usage, destinataires…"
                    className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                    required
                    disabled={isLoggedIn === false}
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-xs font-semibold text-slate-600">Type</label>
                  <select
                    value={type}
                    onChange={(event) => setType(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                    disabled={isLoggedIn === false}
                  >
                    <option>Document</option>
                    <option>Contrat</option>
                    <option>Image</option>
                    <option>Archive</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <label className="text-xs font-semibold text-slate-600">Fichier</label>
                  <input
                    type="file"
                    onChange={(event) => setFile(event.target.files?.[0] || null)}
                    className="w-full rounded-2xl border border-dashed border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-600"
                    disabled={isLoggedIn === false}
                    required
                  />
                </div>

                {uploadError ? (
                  <p className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-xs text-rose-700">
                    {uploadError}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={isLoggedIn === false || uploading}
                  className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-slate-900/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {uploading ? "Upload en cours…" : "Uploader et générer le QR"}
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass rounded-3xl p-6">
              <p className="text-sm font-semibold text-slate-700">QR & détails</p>
              <p className="mt-2 text-xs text-slate-500">Généré après upload réussi.</p>
              <div className="mt-4 grid gap-4 rounded-2xl border border-slate-200 bg-white/80 p-4">
                <div className="grid place-items-center rounded-2xl border border-slate-200 bg-white p-4">
                  {preview ? (
                    <img src={preview} alt="QR code" className="h-44 w-44 object-contain" />
                  ) : (
                    <div className="grid h-44 w-44 place-items-center text-xs text-slate-400">QR en attente</div>
                  )}
                </div>
                <div className="grid gap-3 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="uppercase tracking-wide text-slate-400">Token</span>
                    <span className="font-semibold text-slate-800">{previewToken || "—"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="uppercase tracking-wide text-slate-400">Fichier</span>
                    <span className="font-semibold text-slate-800">{previewMeta?.title || "—"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="uppercase tracking-wide text-slate-400">Type</span>
                    <span className="font-semibold text-slate-800">{previewMeta?.file_type || "—"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-6">
              <p className="text-sm font-semibold text-slate-700">Historique</p>
              <div className="mt-4 grid gap-3">
                {historyItems.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 p-4 text-xs text-slate-500">
                    Aucun upload dans cette session.
                  </div>
                ) : (
                  historyItems.map((item, index) => (
                    <div key={item?.file?.id_file || index} className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-800">{item?.file?.title || "Fichier"}</p>
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold text-emerald-700">Actif</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                        <span>{item?.file?.file_type || "Type inconnu"}</span>
                        <span>Token: {item?.qr?.token || "—"}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
