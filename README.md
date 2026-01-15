# userscripts

A curated collection of Tampermonkey userscripts for cleaning up modern websites and restoring sane UX.

These scripts remove UI clutter, dark patterns, AI spam, and other annoyances from popular websites — giving you back control over how the web behaves.

---

## 🧩 Scripts

- **Google — Hide AI Overview**  
  Removes Google’s AI Overview module from search results.  
  Folder: `google-hide-ai-overview/`

  One-click install:
  https://raw.githubusercontent.com/andrewjosephharrison/userscripts/main/google-hide-ai-overview/google-hide-ai-overview.user.js

---

## 🐵 What is Tampermonkey?

Tampermonkey is a browser extension that lets you run custom JavaScript on specific websites.  
It allows you to modify, hide, or enhance parts of a site after it loads — without needing to fork or host anything.

Think of it as:

> “Adblock for UI and behavior.”

---

## 📥 Install Tampermonkey

Install the Tampermonkey browser extension first:

- Chrome, Edge, Brave  
  https://www.tampermonkey.net/

- Firefox  
  https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/

Once installed, Tampermonkey will intercept `.user.js` files and offer to install them automatically.

---

## ⚙️ Tampermonkey Requirements

To allow userscripts to run correctly, make sure Tampermonkey is configured properly:

1. Open the **Tampermonkey Dashboard**
2. Go to **Settings → General**
3. Ensure these options are enabled:
   - **Enabled**
   - **Allow access to file URLs**
4. (Optional but recommended) Enable **Developer Mode**

These permissions are required for userscripts to run on Google and other modern web apps.

See Tampermonkey FAQ:  
https://www.tampermonkey.net/faq.php#Q209

---

## 🚀 How to Install a Script

Each script folder contains a `.user.js` file.

To install:

1. Click the **raw** `.user.js` file
2. Tampermonkey will open an install screen
3. Click **Install**
4. Refresh the target website

That’s it — the script is now running automatically.

---

## 🧠 Philosophy

Modern websites increasingly:

- Inject AI summaries
- Hide real content
- Push ads and dark patterns
- Remove user control

These userscripts exist to reverse that trend — giving power users tools to shape the web they actually want to use.

---

## ⚠️ Disclaimer

Websites change frequently.  
If a script stops working, it may need updated selectors or logic.

Pull requests and fixes are welcome.
