# Visual Page Hierarchy Editor

**Submitted by:** Ankur Verma
**Role:** Frontend Developer Assessment

---

## 🔗 Live Demo & Walkthrough
[cite_start]**⚠️ Important:** Please review the following links as part of the submission[cite: 93, 94]:

* **🚀 Deployed App:** [Insert your Vercel/Netlify Link Here]
* **🎥 Video Walkthrough:** [Insert your Loom/YouTube Link Here]

---

##  Overview
This project is a visual tool that allows users to manage a 3-level website hierarchy. It was built to satisfy the requirements of the **Frontend Developer Technical Assessment**.

The application visualizes a static tree of pages (Home -> Main Pages -> Subpages) and allows for complex interactions like drag-and-drop reordering of internal page sections.

##  Features
This application implements 100% of the requested functionality:

### [cite_start]1. Visual Hierarchy (React Flow + Dagre) [cite: 40]
* **Auto-Layout:** automatically arranges nodes in a vertical tree structure using Dagre.
* **Distinct Levels:** Visually differentiates Level 1 (Home), Level 2 (Main Pages), and Level 3 (Subpages) using distinct colors and styles.

### [cite_start]2. Draggable Home Sections (DndKit) [cite: 44]
* The **Home Node** is a custom component containing 5 internal sections: *Hero, Features, Testimonials, CTA, Footer*.
* Users can drag and reorder these sections within the node using `DndKit`.
* Changes to the section order are strictly persisted.

### [cite_start]3. Persistence & Export [cite: 57]
* **Save:** Persists the current layout and section order to `localStorage`.
* **Load:** Restores the saved state from `localStorage` (persists across page reloads).
* **Export:** Downloads the current state as a `hierarchy.json` file.

---

## [cite_start]🛠️ Tech Stack [cite: 63]
* **Framework:** React.js (Vite)
* **Visualization:** React Flow
* **Layout Engine:** Dagre
* **Drag & Drop:** @dnd-kit/core, @dnd-kit/sortable
* **Styling:** Tailwind CSS
* **Testing:** Vitest

---

## [cite_start]🚀 How to Run Locally [cite: 95]

Follow these steps to run the application on your local machine:

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-link>
    cd visual-hierarchy-editor
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Running Tests
[cite_start]This project includes unit tests for the Layout Engine, Data Integrity, and Persistence Logic using **Vitest**[cite: 80].

To run the test suite:
```bash
npm run test