A Next.js application demonstrating paginated views of the Met Museum of Art. When the app first loads, we fetches a list of objects and then, for each selected page, fetches the data for the corresponding object.

## Table of Contents

- [Prerequisites](#prerequisites)  
- [Installation](#installation)  
- [Running in Development](#running-in-development)  
- [Building for Production](#building-for-production)  
- [API Endpoints](#api-endpoints)  

---

## Prerequisites

1. **Git** – To clone the repository.  
2. **Node.js v22 LTS** (or later) – The application requires Node v22 LTS. You can verify your version with:  
   ```bash
   node --version
   ```  
   If you don’t have it installed, download it from [nodejs.org](https://nodejs.org/en/download/) or use a version manager like nvm.

3. **npm** (bundled with Node.js) – Used to install dependencies and run scripts. If you prefer, you may use yarn or pnpm, but all commands below assume npm.

---

## Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/hawkinsideOut/highpoint-codingchallenge.git
   ```  

2. **Change into the project directory**  
   ```bash
   cd highpoint-codingchallenge
   ```

3. **Install dependencies**  
   ```bash
   npm i
   ```  
   This will install all required packages, including Next.js 15, React, MUI core, and any other dependencies listed in `package.json`.

## Running in Development

1. **Verify Node version**  
   Ensure you’re using Node v22:
   ```bash
   node --version
   # → v22.x.x
   ```

2. **Start the development server**  
   ```bash
   npm run dev
   ```
   By default, Next.js will start on [http://localhost:3000](http://localhost:3000).  
   You should see a simple page with a selected image and a pagination indicator underneath the image. On first load, it will fetch all objects, then render page 1’s objects.

3. **Open in your browser**  
   Navigate to [http://localhost:3000](http://localhost:3000).  
   - While the API data is loading, you’ll see text that says "Loading”  
   - Once the API data arrives, a Pagination bar appears.  
   - Selecting pages causes fetches to `objects/[objectId]`, and the results display within the selected image component.

---

## Building for Production

1. **Build**  
   ```bash
   npm run build
   ```
   This compiles the Next.js application for production and generates the `.next` folder.

2. **Start (production mode)**  
   After a successful build, run:
   ```bash
   npm run start
   ```
   By default, the server will listen on port 3000 (`http://localhost:3000`). In production mode, all API routes and the front-end will serve optimized, minified code.

---

## API Endpoints

The application includes two simple API routes under `pages/api`:

1. **`GET /api/v1/objects`**  
   Returns an object with the following structures.  
   ```json
   { 
      "total": 12345,
      "objectsIDs": [1, 2, 3, 4, 5, …] 
   }
   ```

2. **`GET /api/v1/objects/:objectId`**  
   Returns the full object data for the given `objectId`. The shape can be whatever you define, for example:
   ```json
   {
     "objectID": 3,
     "isHighlight": false,
     "accessionNumber": "1234"
   }
   ```

   ## Notes

   A few things I would have like to implement if I had enough time is caching, as well as a more fleshed out process to view images.
   One thing I noticed about the API was that I was restricted to making singular API calls since the /objects route only returns objectIDs. If time permitted, I would've liked to implement an "items per page" feature, where I would limit the number of showable items to a certin number (let's say 12). In doing so, I would also limit the data that needs to be rendered (increasing performance speed). As far as caching, I would implement it to prevent re-fetching duplicate API calls. Once an entire page of 12 items is viewed, that data would be cached, so that if a user comes back to the same page, the data will already be readily available without the need for another expensive API call.