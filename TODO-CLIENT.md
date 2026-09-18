# TODO — information needed from Noman

Everything on this list is a gap only the client can fill. Nothing here has
been invented or guessed: where a fact was missing, the site renders an honest
placeholder rather than plausible-looking fake data.

Work through the **Blocking** section before the site goes to production.

---

## 1. Blocking — must be resolved before production

### 1.1 Registered office address
The old site published **another company's address** (`HARISCO SAUDI LTD, King
Fahd Industrial Area, Al Jubail`). It has been deleted everywhere.

- **Needed:** Noman's own registered street address.
- **Currently renders as:** a dashed "Registered street address to be confirmed"
  chip on `/contact`.
- **Also unblocks:** the map embed (deliberately removed — the old one pointed at
  fabricated coordinates), and the `PostalAddress` JSON-LD.

### 1.2 Working hours
- **Needed:** confirmed opening hours.
- The old site said Sun–Thu 09:30–17:30 and Sat 09:00–15:00. **Not republished**
  until confirmed.
- **Currently renders as:** a "To be confirmed" chip on `/contact`.

### 1.3 Contact form delivery
The form at `/contact` posts to `/api/contact` and sends via Resend. It needs
environment variables set in Vercel before it will deliver:

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | from resend.com — **never commit this** |
| `CONTACT_TO` | `info@nomanksa.com` (default if unset) |
| `CONTACT_FROM` | e.g. `Noman Website <website@nomanksa.com>` — the sending domain must be verified in Resend first |

Until `RESEND_API_KEY` is set the form returns an honest error telling the
visitor to call or email instead. It never fakes success — which is what the old
form did.

### 1.4 Photography
14 development placeholders are in use. See [PLACEHOLDERS.md](PLACEHOLDERS.md).
`npm run build` fails on Vercel production while any remain.

> **Best possible outcome:** Noman has 24+ completed projects. Ten decent
> photographs from their own sites would beat every stock image and make the
> site unmistakably theirs.

### 1.5 Logo file
`logo.jpeg` is a JPEG with a baked-in white background. It sits on a white
navbar so it reads acceptably, but it will show a visible box on any tinted or
dark surface.

- **Needed:** the logo as **SVG**, or a transparent PNG at 2× (min 600px wide).

### 1.6 Rotate the exposed GitHub token
`website/.git/config` stores the `origin` remote URL with a **GitHub Personal
Access Token in plain text**. Anyone who can read the folder can push as you.

1. Revoke it: GitHub → Settings → Developer settings → Personal access tokens.
2. Reset the remote:
   `git remote set-url origin https://github.com/alfkim92-bit/Noman-Maintenance.git`
3. Authenticate with Git Credential Manager or an SSH key instead.

Nothing in this rebuild commits that config (`.git/config` is never tracked),
but the token is live until it is revoked.

---

## 2. Claims to verify before they stay live

These are carried over from Noman's own current website, but they are **supplier
claims**. Each needs confirming, or removing.

| Page | Claim | Action |
|---|---|---|
| `/solutions/modular-floating-cover` | "Covers 99% of the surface" | Confirm the coverage figure |
| `/solutions/modular-floating-cover` | "10-year warranty, service life up to 20 years" | Confirm warranty terms |
| `/solutions/venturi-steam-traps` | "20-year warranty" | Confirm warranty terms |
| `/solutions/venturi-steam-traps` | "1–2 year return on investment" | Confirm the basis, or drop the figure |
| `/solutions/venturi-steam-traps` | "20–30% steam energy reduction" | Confirm the measurement basis |
| `/solutions/venturi-steam-traps` | "10–30% reduction in steam cost" | Confirm the measurement basis |

### Claims deliberately NOT published

Two figures from the reference site were **left out** because they are not
Noman's data and cannot be evidenced:

- **"Structures up to 100 m high."** The scaffold page says "substantial
  heights" instead. Supply the maximum height Noman will actually warrant and it
  can be stated precisely.
- **"50% faster assembly."** The suspended scaffold page says "materially
  faster" instead. Supply evidence and the figure can go back in.

---

## 3. Content gaps (non-blocking, but the pages are thinner without them)

### 3.1 Project details
`/projects` publishes the three projects Noman currently lists. Each shows
dashed "to be confirmed" chips for:

- Client · Site · Year · Scope value

Supply these and the cards become real case studies. More projects are welcome —
the grid scales.

### 3.2 Certificates
`/certificates` publishes the one document we can evidence: **CR 7032690815**.

Skeleton cards are already built and waiting for:

- ISO 9001 (quality)
- ISO 45001 (health & safety)
- ISO 14001 (environment)
- Client pre-qualifications / operator approvals

Send the certificates (PDF or image) and they publish. **No certification will be
listed before the document exists.**

### 3.3 Downloads
Two disabled download cards are in place, labelled "Data sheet coming soon":

- Frame scaffold data sheet → `/solutions/construction-scaffolds`
- Suspended scaffold technical info → `/solutions/suspended-scaffolds`

### 3.4 Domain
The site currently assumes `https://www.nomanksa.com` for canonical URLs,
sitemap and JSON-LD (`SITE.url` in `content/site.ts`). Confirm the final domain.

---

## 4. Decisions already taken (for the record)

- **EPC/LSTK page removed** at the client's request. Its full scope list is
  preserved in [content/_archive-epc.md](content/_archive-epc.md) and
  `/epc-lstk` permanently redirects to `/services`.
- **Acoustic Pyrometers removed** at the client's request. `/acoustic-pyrometers`
  redirects to `/solutions`.
- **No Scafom-rux product names** (`FRAMESCAFF`, `SUPER 65/100`, `RINGSCAFF`) or
  slogans are used anywhere. Those are another manufacturer's registered marks.
  Noman's pages describe the systems generically.
