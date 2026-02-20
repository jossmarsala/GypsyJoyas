# Vercel Deployment Guide

Follow these steps to deploy your full application to Vercel for free.

## 1. Push to GitHub
Commit all your changes and push to your repository.
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push
```

## 2. Import Project in Vercel
1.  Go to [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **Add New...** > **Project**.
3.  Import your `GypsyJoyas` repository.

## 3. Configure Project Settings
In the "Configure Project" screen, scroll down to **Build and Output Settings**:

*   **Build Command**: Paste this command:
    ```bash
    bash vercel-build.sh
    ```
*   **Output Directory**: Enable Override and set to `public`.

Click **Deploy**.

## 4. Add Storage (Database & Images)
Once deployed (it might fail first run due to missing DB), go to the project dashboard.

1.  Click the **Storage** tab.
2.  **Database**: Click **Connect Store** > **Postgres** > **Create New**.
    *   Name it `GypsyJoyasDB`.
    *   Select Region (e.g., US East).
    *   Click **Connect**.
3.  **Images**: Click **Connect Store** > **Blob** > **Create New**.
    *   Name it `GypsyJoyasImages`.
    *   Click **Connect**.

## 5. Seed the Cloud Database
To make your dashboard work, we need to upload your product data to the new cloud database.

1.  In Vercel -> Storage -> Postgres, click **.env.local** tab.
2.  Copy all the environment variables.
3.  Paste them into your local `admin-dashboard/server/.env` file.
4.  Also copy the `BLOB_READ_WRITE_TOKEN` from the Blob store settings and add it to your `.env`.
5.  Run the seed script locally:
    ```bash
    cd admin-dashboard/server
    npx prisma db push  # Creates tables in cloud DB
    node scripts/seed.js # Uploads data
    ```

## 6. Final Redeploy
Go back to Vercel "Deployments" tab and **Redeploy** the latest commit to ensure all environment variables are picked up.

## Access Your Site
*   **Public Site**: `https://your-project.vercel.app/`
*   **Admin Dashboard**: `https://your-project.vercel.app/admin/`
*   **API**: `https://your-project.vercel.app/api/products`
