# Vercel Deployment Guide

Follow these steps to push your new portfolio code to GitHub and host it live on Vercel.

---

## 1. Push to GitHub

Since you have an empty GitHub repository at `git@github.com:ILLANGASINGHE-AMB/im_anjana.git`, run the following commands in your terminal (inside the `/Users/anjana/Desktop/im_anjana` folder) to upload the code:

```bash
# Add the remote repository URL
git remote add origin git@github.com:ILLANGASINGHE-AMB/im_anjana.git

# Set your branch name to main
git branch -M main

# Stage and commit all changes
git add .
git commit -m "feat: initialize modern personal portfolio website with Next.js & Vanilla CSS"

# Push to your GitHub repository
git push -u origin main
```

*Note: If you have already initialized another branch or remote, make sure to resolve conflicts or run `git push -u origin main --force` if you want to overwrite it with this clean build.*

---

## 2. Deploy on Vercel

Once your code is pushed to GitHub, hosting it on Vercel is simple and free:

1. **Sign Up / Log In**:
   - Go to [Vercel](https://vercel.com) and log in with your GitHub account.

2. **Create a New Project**:
   - On the Vercel dashboard, click **Add New** > **Project**.

3. **Import Your Repository**:
   - Locate the repository `im_anjana` from the list of your GitHub projects and click **Import**.

4. **Configure Settings**:
   - Vercel will automatically detect **Next.js** as your framework.
   - You can leave all default settings (Build Command, Output Directory, and Install Command) as they are.
   - Click **Deploy**.

5. **Done!**:
   - Within 1 minute, Vercel will build and host your portfolio at a custom `.vercel.app` URL (e.g. `im-anjana.vercel.app`).
   - Any time you commit and push new changes to your `main` branch, Vercel will automatically trigger a new deployment.

---

## 3. Customize Your Social Media Links

The social links are defined inside the code:
- **GitHub**: Points to your username `https://github.com/ILLANGASINGHE-AMB`
- **LinkedIn, Reddit, Instagram**: Point to standard templates/placeholders that you can customize in [SocialFloatingBar.tsx](file:///Users/anjana/Desktop/im_anjana/src/components/SocialFloatingBar.tsx#L12-L65) and [Hero.tsx](file:///Users/anjana/Desktop/im_anjana/src/components/Hero.tsx#L8-L61). Simply replace those URLs with your actual profile links, commit, and push!
