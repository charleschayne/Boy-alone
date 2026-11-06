"use client";
/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import type { Product } from "@/data/products";
import type { ProductRecord, StoreSettings } from "@/lib/shiningroom/server";
import "./room.css";
import { preparePhoto } from "./photo-upload";
const client =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ? createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      )
    : null;
const emptyProduct = (): Product => ({
  id: crypto.randomUUID(),
  slug: "",
  name: "",
  price: "$100.00",
  images: [],
  colors: [
    {
      name: "Black",
      sizes: ["Small", "Medium", "Large", "X-Large", "2X-Large", "3X-Large"],
    },
  ],
  collection: "Shining Through The Pain — Fall ’26 Collection",
  details: [],
  discountEligible: false,
});
type Report = {
  since: string;
  until: string;
  reports: Record<string, Record<string, string | number>[]>;
};
export default function Dashboard() {
  const [signedIn, setSignedIn] = useState(false),
    [ready, setReady] = useState(false);
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");
  const [products, setProducts] = useState<ProductRecord[]>([]),
    [settings, setSettings] = useState<StoreSettings | null>(null);
  const [tab, setTab] = useState("Products"),
    [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null),
    [order, setOrder] = useState(0),
    [search, setSearch] = useState("");
  const editorDialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (editing) editorDialog.current?.showModal();
  }, [!!editing]);
  const [days, setDays] = useState(7),
    [report, setReport] = useState<Report | null>(null);
  useEffect(() => {
    if (!client) {
      setReady(true);
      return;
    }
    const { data } = client.auth.onAuthStateChange((_event, session) => {
      setSignedIn(!!session);
      setReady(true);
      if (!session) {
        setProducts([]);
        setSettings(null);
        setEditing(null);
        setReport(null);
      }
    });
    return () => data.subscription.unsubscribe();
  }, []);
  const api = useCallback(async (path = "", body?: unknown) => {
    const session = await client?.auth.getSession();
    const response = await fetch(`/api/shiningroom${path}`, {
      method: body ? "POST" : "GET",
      headers: {
        Authorization: `Bearer ${session?.data.session?.access_token || ""}`,
        ...(body instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
      },
      body: body
        ? body instanceof FormData
          ? body
          : JSON.stringify(body)
        : undefined,
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Request failed.");
    return result;
  }, []);
  const refresh = useCallback(async () => {
    const result = await api();
    setProducts(result.products);
    setSettings(result.settings);
  }, [api]);
  useEffect(() => {
    if (signedIn) refresh().catch((e) => setError(e.message));
  }, [signedIn, refresh]);
  async function run(work: () => Promise<void>) {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await work();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }
  function change(patch: Partial<Product>) {
    setEditing((p) => (p ? { ...p, ...patch } : p));
  }
  const field = (
    label: string,
    key: "name" | "slug" | "collection" | "description" | "tagline",
    multiline = false,
  ) => (
    <label>
      {label}
      {multiline ? (
        <textarea
          value={editing?.[key] || ""}
          onChange={(e) => change({ [key]: e.target.value })}
          rows={key === "description" ? 7 : 2}
        />
      ) : (
        <input
          value={editing?.[key] || ""}
          onChange={(e) => change({ [key]: e.target.value })}
        />
      )}
    </label>
  );
  if (!ready)
    return (
      <main className="room">
        <p>Loading Shining Room…</p>
      </main>
    );
  return (
    <main className="room">
      <header>
        <a href="/shiningroom" className="brand">
          BOY ALONE <span>SHINING ROOM</span>
        </a>
        <div className="actions">
          <a href="/" target="_blank" rel="noreferrer">
            View store ↗
          </a>
          {signedIn && (
            <button
              onClick={() =>
                run(async () => {
                  await client?.auth.signOut();
                })
              }
            >
              Sign out
            </button>
          )}
        </div>
      </header>
      {!signedIn ? (
        <section className="login panel">
          <p className="eyebrow">OWNER ACCESS</p>
          <h1>
            Your brand.
            <br />
            Your room.
          </h1>
          <p>Sign in to manage the store.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              run(async () => {
                if (!client) throw new Error("Supabase is not configured.");
                const { error } = await client.auth.signInWithPassword({
                  email,
                  password,
                });
                if (error) throw error;
                setPassword("");
              });
            }}
          >
            <label>
              Email
              <input
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button className="primary" disabled={busy}>
              Sign in
            </button>
          </form>
          {error && (
            <p role="alert" className="error">
              {error}
            </p>
          )}
        </section>
      ) : (
        <>
          <div className="intro">
            <div>
              <p className="eyebrow">THE CONTROL ROOM</p>
              <h1>Make your next move.</h1>
            </div>
            <span className={`status ${settings?.is_open ? "open" : ""}`}>
              {settings
                ? settings.is_open
                  ? "● Store open"
                  : "● Store closed"
                : "Connecting…"}
            </span>
          </div>
          <nav>
            {["Products", "Store controls", "Analytics"].map((item) => (
              <button
                key={item}
                className={tab === item ? "active" : ""}
                onClick={() => {
                  setTab(item);
                  setError("");
                }}
              >
                {item}
              </button>
            ))}
          </nav>
          {error && (
            <p role="alert" className="error">
              {error}
            </p>
          )}
          {notice && (
            <p role="status" className="notice">
              {notice}
            </p>
          )}
          {tab === "Products" && (
            <>
              <div className="toolbar">
                <div>
                  <h2>
                    Collection lineup <small>{products.length} items</small>
                  </h2>
                  <p>Save a draft. Publish when you’re ready.</p>
                </div>
                <div className="actions">
                  <input
                    aria-label="Search products"
                    placeholder="Search items…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button disabled={busy} onClick={() => run(refresh)}>
                    Refresh
                  </button>
                  <button
                    className="primary"
                    disabled={busy || !settings}
                    onClick={() => {
                      setEditing(emptyProduct());
                      setOrder(-10);
                    }}
                  >
                    + New item
                  </button>
                </div>
              </div>
              {settings && !products.length && (
                <section className="panel">
                  <h2>Bring your current collection in.</h2>
                  <p>
                    Import the six existing items, including their photos and
                    pricing. This does not open the store.
                  </p>
                  <button
                    disabled={busy}
                    onClick={() =>
                      run(async () => {
                        await api("", { action: "import" });
                        await refresh();
                        setNotice("Current collection imported.");
                      })
                    }
                  >
                    Import existing products
                  </button>
                </section>
              )}
              <div className="product-grid">
                {products
                  .filter((row) =>
                    row.data.name.toLowerCase().includes(search.toLowerCase()),
                  )
                  .map((row) => (
                    <article className="product panel" key={row.id}>
                      {row.data.images[0] && (
                        <img src={row.data.images[0]} alt={row.data.name} />
                      )}
                      <div>
                        <span className="eyebrow">
                          {row.status} · order {row.sort_order}
                        </span>
                        <h3>{row.data.name}</h3>
                        <p>
                          {row.data.price} ·{" "}
                          {row.data.isSoldOut ? "Sold out" : "Available"} ·{" "}
                          {row.data.discountEligible === false
                            ? "Full price"
                            : "Promos enabled"}
                        </p>
                        <div className="actions">
                          <button
                            disabled={busy}
                            onClick={() => {
                              setEditing(structuredClone(row.data));
                              setOrder(row.sort_order);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            disabled={busy}
                            onClick={() => {
                              setEditing({
                                ...structuredClone(row.data),
                                id: crypto.randomUUID(),
                                slug: `${row.data.slug}-copy`,
                                name: `${row.data.name} — COPY`,
                              });
                              setOrder(row.sort_order + 1);
                            }}
                          >
                            Duplicate
                          </button>
                          {row.status !== "archived" && (
                            <button
                              disabled={busy}
                              onClick={() => {
                                if (
                                  confirm(
                                    "Archive this item and remove it from the live store? You can publish it again later.",
                                  )
                                )
                                  run(async () => {
                                    await api("", {
                                      action: "archive",
                                      id: row.id,
                                      expectedUpdatedAt: row.updated_at,
                                    });
                                    await refresh();
                                  });
                              }}
                            >
                              Archive
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
              </div>
            </>
          )}
          {tab === "Store controls" && settings && (
            <section className="panel controls">
              <h2>The doors are {settings.is_open ? "open" : "closed"}.</h2>
              <p>
                Closing shows the community signup page and stops new checkouts.
                You can always access this room.
              </p>
              <button
                className="primary"
                disabled={busy}
                onClick={() => {
                  if (
                    confirm(
                      `${settings.is_open ? "Close" : "Open"} the live storefront now?`,
                    )
                  )
                    run(async () => {
                      await api("", {
                        action: "settings",
                        ...settings,
                        is_open: !settings.is_open,
                      });
                      await refresh();
                      setNotice("Store status updated.");
                    });
                }}
              >
                {settings.is_open ? "Close storefront" : "Open storefront"}
              </button>
              <label>
                Message on the closed page
                <textarea
                  maxLength={500}
                  rows={3}
                  value={settings.closed_message}
                  onChange={(e) =>
                    setSettings({ ...settings, closed_message: e.target.value })
                  }
                />
              </label>
              <button
                disabled={busy}
                onClick={() =>
                  run(async () => {
                    await api("", { action: "settings", ...settings });
                    await refresh();
                    setNotice("Message saved.");
                  })
                }
              >
                Save message
              </button>
            </section>
          )}
          {tab === "Analytics" && (
            <>
              <div className="toolbar">
                <div>
                  <h2>Traffic, straight from Vercel.</h2>
                  <p>
                    Reports refresh up to every five minutes. Reporting history
                    depends on your plan.
                  </p>
                </div>
                <div className="actions">
                  <select
                    aria-label="Date range"
                    value={days}
                    onChange={(e) => {
                      setDays(Number(e.target.value));
                      setReport(null);
                    }}
                  >
                    {[7, 30, 90].map((d) => (
                      <option key={d} value={d}>
                        Last {d} days
                      </option>
                    ))}
                  </select>
                  <button
                    disabled={busy}
                    onClick={() =>
                      run(async () => {
                        setReport(null);
                        setReport(await api(`/analytics?days=${days}`));
                      })
                    }
                  >
                    Load analytics
                  </button>
                </div>
              </div>
              {report && (
                <>
                  <p>
                    {report.since} — {report.until} (UTC)
                  </p>
                  <div className="report-grid">
                    {Object.entries(report.reports).map(([key, rows]) => (
                      <section className="panel" key={key}>
                        <h3>
                          {
                            {
                              day: "Daily traffic",
                              requestPath: "Top pages",
                              referrerHostname: "Referrers",
                              country: "Countries",
                              deviceType: "Devices",
                            }[key]
                          }
                        </h3>
                        {!rows?.length ? (
                          <p>No traffic in this period.</p>
                        ) : (
                          <table>
                            <thead>
                              <tr>
                                <th>{key === "day" ? "Date" : "Source"}</th>
                                <th>Views</th>
                                <th>Visitors</th>
                              </tr>
                            </thead>
                            <tbody>
                              {rows.map((r, i) => (
                                <tr key={i}>
                                  <td>
                                    {String(
                                      r[key] ||
                                        r.timestamp ||
                                        "Direct / unknown",
                                    ).replace("T00:00:00.000Z", "")}
                                  </td>
                                  <td>{r.pageviews}</td>
                                  <td>{r.visitors}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </section>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
          {editing && (
            <dialog
              ref={editorDialog}
              className="editor"
              aria-labelledby="editor-title"
              onCancel={(e) => {
                e.preventDefault();
                if (
                  !busy &&
                  confirm("Close the editor? Unsaved changes will be lost.")
                )
                  setEditing(null);
              }}
            >
              <div className="toolbar">
                <h2 id="editor-title">Edit item</h2>
                <button
                  disabled={busy}
                  onClick={() => {
                    if (
                      confirm("Close the editor? Unsaved changes will be lost.")
                    )
                      setEditing(null);
                  }}
                >
                  Close
                </button>
              </div>
              <fieldset disabled={busy}>
                {field("Product name", "name")}
                <div className="two-col">
                  {field("URL slug", "slug")}
                  <label>
                    Price ($)
                    <input
                      type="number"
                      min="0.50"
                      step="0.01"
                      value={editing.price.replace("$", "")}
                      onChange={(e) => change({ price: `$${e.target.value}` })}
                      onBlur={() =>
                        change({
                          price: `$${Number(editing.price.slice(1)).toFixed(2)}`,
                        })
                      }
                    />
                  </label>
                </div>
                {field("Collection label", "collection")}
                {field("Description", "description", true)}
                {field("Tagline", "tagline", true)}
                <label>
                  Details — one per line
                  <textarea
                    rows={5}
                    value={editing.details?.join("\n") || ""}
                    onChange={(e) =>
                      change({ details: e.target.value.split("\n") })
                    }
                  />
                </label>
                <label>
                  Display order (lower numbers appear first)
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                  />
                </label>
                <div className="actions">
                  <label className="check">
                    <input
                      type="checkbox"
                      checked={!!editing.isSoldOut}
                      onChange={(e) => change({ isSoldOut: e.target.checked })}
                    />{" "}
                    Sold out
                  </label>
                  <label className="check">
                    <input
                      type="checkbox"
                      checked={editing.discountEligible !== false}
                      onChange={(e) =>
                        change({ discountEligible: e.target.checked })
                      }
                    />{" "}
                    Allow promo discounts
                  </label>
                </div>
                <p>Free shipping applies to every item.</p>
                <h3>Colors & sizes</h3>
                {editing.colors.map((color, i) => (
                  <div className="panel" key={i}>
                    <label>
                      Color
                      <input
                        value={color.name}
                        onChange={(e) =>
                          change({
                            colors: editing.colors.map((c, index) =>
                              index === i ? { ...c, name: e.target.value } : c,
                            ),
                          })
                        }
                      />
                    </label>
                    <label>
                      Sizes, separated by commas
                      <input
                        value={color.sizes.join(",")}
                        onChange={(e) =>
                          change({
                            colors: editing.colors.map((c, index) =>
                              index === i
                                ? { ...c, sizes: e.target.value.split(",") }
                                : c,
                            ),
                          })
                        }
                      />
                    </label>
                    <button
                      onClick={() =>
                        change({
                          colors: editing.colors.filter(
                            (_, index) => index !== i,
                          ),
                        })
                      }
                    >
                      Remove color
                    </button>
                  </div>
                ))}
                <button
                  onClick={() =>
                    change({
                      colors: [
                        ...editing.colors,
                        { name: "", sizes: ["Small", "Medium", "Large"] },
                      ],
                    })
                  }
                >
                  Add color
                </button>
                <h3>Photos</h3>
                <p>
                  The first photo is the cover. Uploads are optimized to WebP.
                </p>
                <input
                  aria-label="Upload product photos"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    run(async () => {
                      for (const file of files) {
                        const prepared = await preparePhoto(file);
                        const form = new FormData();
                        form.append("file", prepared);
                        const result = await api("/upload", form);
                        setEditing((p) =>
                          p ? { ...p, images: [...p.images, result.url] } : p,
                        );
                      }
                    });
                    e.target.value = "";
                  }}
                />
                <div className="photos">
                  {editing.images.map((url, i) => (
                    <div key={`${url}-${i}`}>
                      <img src={url} alt={`Product photo ${i + 1}`} />
                      <span>{i === 0 ? "Cover" : `Photo ${i + 1}`}</span>
                      <div className="actions">
                        <button
                          disabled={i === 0}
                          onClick={() => {
                            const images = [...editing.images];
                            [images[i - 1], images[i]] = [
                              images[i],
                              images[i - 1],
                            ];
                            change({
                              images,
                              colors: editing.colors.map((c) => ({
                                ...c,
                                featuredImage: images[0],
                              })),
                            });
                          }}
                        >
                          ←
                        </button>
                        <button
                          disabled={i === editing.images.length - 1}
                          onClick={() => {
                            const images = [...editing.images];
                            [images[i + 1], images[i]] = [
                              images[i],
                              images[i + 1],
                            ];
                            change({
                              images,
                              colors: editing.colors.map((c) => ({
                                ...c,
                                featuredImage: images[0],
                              })),
                            });
                          }}
                        >
                          →
                        </button>
                        <button
                          onClick={() => {
                            const images = editing.images.filter(
                              (_, index) => index !== i,
                            );
                            change({
                              images,
                              colors: editing.colors.map((c) => ({
                                ...c,
                                featuredImage: images[0],
                              })),
                            });
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </fieldset>
              <footer className="actions">
                <button
                  disabled={busy}
                  onClick={() =>
                    run(async () => {
                      await api("", {
                        action: "save",
                        product: editing,
                        sort_order: order,
                        expectedUpdatedAt: products.find(
                          (row) => row.id === editing.id,
                        )?.updated_at,
                      });
                      await refresh();
                      setNotice("Draft saved.");
                      setEditing(null);
                    })
                  }
                >
                  Save draft
                </button>
                <button
                  className="primary"
                  disabled={busy}
                  onClick={() =>
                    run(async () => {
                      const product = {
                        ...editing,
                        colors: editing.colors.map((c) => ({
                          ...c,
                          sizes: c.sizes.map((s) => s.trim()).filter(Boolean),
                        })),
                        details: editing.details?.filter(Boolean),
                      };
                      await api("", {
                        action: "publish",
                        product,
                        sort_order: order,
                        expectedUpdatedAt: products.find(
                          (row) => row.id === editing.id,
                        )?.updated_at,
                      });
                      await refresh();
                      setNotice("Item published.");
                      setEditing(null);
                    })
                  }
                >
                  {busy ? "Working…" : "Publish item"}
                </button>
              </footer>
              {error && (
                <p role="alert" className="error">
                  {error}
                </p>
              )}
            </dialog>
          )}
        </>
      )}
    </main>
  );
}
