# Google — Hide AI Overview

This Tampermonkey userscript removes Google’s **AI Overview** panel from search results.

Google injects the AI Overview dynamically after page load. This script detects it, removes the entire module, and keeps watching the page so it stays gone even if Google tries to re-insert it.

Clean SERPs. No AI summary box.

---

## ✨ What it does

- Detects Google’s **AI Overview** module using stable attributes and visible labels
- Removes the entire block, not just the text
- Uses a live DOM observer so it stays removed as Google updates the page
- Works across Google Search variants and A/B tests

---

## 🧩 Requirements (Tampermonkey Setup)

Before installing this script, make sure Tampermonkey is properly configured.

1. **Install Tampermonkey**

   - https://www.tampermonkey.net/

2. **Enable user scripts**

   - Open the **Tampermonkey Dashboard**
   - Go to **Settings → General**
   - Make sure the following are ON:
     - **Enabled**
     - **Allow access to file URLs**

3. **Developer Mode (optional but recommended)**
   - In the Tampermonkey settings, turn on **Developer Mode**
   - This makes updating and debugging scripts easier

> These steps follow the official Tampermonkey permission requirements:  
> https://www.tampermonkey.net/faq.php#Q209

---

## 🚀 Install

1. Install Tampermonkey from  
   https://www.tampermonkey.net/

2. Open the raw userscript file:  
   **google-hide-ai-overview.user.js**

3. Tampermonkey will open an install screen — click **Install**

4. Visit Google Search and the **AI Overview** panel will be removed automatically

---

## 🛠 How it works

Google inserts the AI Overview after the page loads using JavaScript.

This script:

- Scans the page for AI Overview containers
- Removes the parent module block
- Watches the DOM using a `MutationObserver`
- Deletes the module again if Google reinjects it

This keeps your search results clean even during live updates.

---

## 🧪 Compatibility

- Chrome + Tampermonkey
- Edge + Tampermonkey
- Firefox + Tampermonkey
- Works on all Google Search domains (`google.com`, `google.co.uk`, etc.)

---

## ⚠️ Disclaimer

Google frequently changes their internal HTML and class names.  
If the AI Overview stops being removed, the selectors may need to be updated.

Feel free to open an issue or submit a patch.

---

## 💬 Why this exists

The AI Overview panel often:

- Pushes real search results down the page
- Summarizes incorrectly
- Reduces visibility of original sources

This script restores classic Google Search behavior.

---
