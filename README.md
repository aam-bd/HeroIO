# Hero.IO – App Store Demo

A fully responsive React application that simulates an app marketplace where users can browse, search, sort, install, and uninstall apps. The app demonstrates modern front-end practices including client-side routing, state management, local storage persistence, and dynamic data visualization.

## ✨ Features

- **Home Page** – Hero section with gradient background, call-to-action buttons, and a statistics section (using `react-countup` and scroll‑spy animation).
- **Apps Page** – Displays all apps in a responsive grid with live search (case‑insensitive) and sorting by download count (High‑Low / Low‑High). Each card shows title, image, download count, and average rating.
- **Trending Apps** – Computes a trending score based on downloads, reviews, and rating. Shows the top 8 apps in a separate section.
- **App Details** – Individual app view with image, detailed information, rating distribution chart (Recharts), and an install/uninstall button. Install status persists via localStorage.
- **My Installation Page** – Lists all installed apps with the option to uninstall. Includes sorting by downloads and a toast notification on uninstall.
- **Error Page** – Custom 404 page with a friendly message and a “Go Back Home” button.
- **Responsive Design** – Tailwind CSS ensures a seamless experience across mobile, tablet, and desktop devices.
- **LocalStorage Integration** – Installed apps are stored locally, so the state persists after page reload.

## 🛠️ Technologies Used

| Technology       | Purpose                                      |
|------------------|----------------------------------------------|
| **React**        | Front-end library for building the UI        |
| **React Router** | Client-side routing (nested routes, navigation) |
| **Tailwind CSS** | Utility-first CSS framework for styling      |
| **Recharts**     | Charting library for rating distribution     |
| **React CountUp**| Animated number counters in the stats section|
| **FontAwesome**  | Icons for buttons and download/rating badges |
| **localStorage** | Browser storage to persist installed apps    |

## 📦 Installation & Setup

1. Clone the repository  
   ```bash
   git clone https://github.com/aam-bd/HeroIO.git
   npm install
   npm run dev