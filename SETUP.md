# Nutrition Tools - Setup Guide

This guide will help you get your nutrition calculator website up and running with all the new features: analytics, navigation, email lead magnet, and more.

## What's New

✅ **Vercel Analytics** - Track page views, engagement, and Web Vitals
✅ **Navigation Bar** - Mobile-responsive navigation with 4 sections
✅ **Email Lead Magnet** - Users can email themselves a PDF of their results
✅ **Lead Storage** - Capture and store email leads for marketing
✅ **Privacy Policy** - GDPR-friendly privacy policy page
✅ **Meet the Coaches** - Showcase your coaching team
✅ **Placeholder Pages** - Tools and Education pages ready for content

---

## Prerequisites

- Node.js installed (v18 or higher)
- A Vercel account (free tier works great)
- A Resend account (free tier: 3,000 emails/month)

---

## Step 1: Install Dependencies

First, install the new packages:

```bash
npm install
```

This will install:
- `@vercel/analytics` - Usage tracking
- `@vercel/kv` - Lead storage (Redis)
- `resend` - Email sending
- `@react-pdf/renderer` - PDF generation

---

## Step 2: Set Up Resend (Email Service)

1. Go to [resend.com](https://resend.com) and sign up (free)
2. Verify your email address
3. Go to **API Keys** in the dashboard
4. Click **Create API Key**
5. Copy the API key (starts with `re_`)

---

## Step 3: Configure Environment Variables

1. Copy the example environment file:

```bash
cp .env.local.example .env.local
```

2. Edit `.env.local` and add your Resend API key:

```env
RESEND_API_KEY=re_your_actual_api_key_here
```

**Note:** The KV (database) variables will be auto-configured by Vercel in production. Leave them blank for now.

---

## Step 4: Test Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Test the Calculator

1. Fill out the calculator form
2. Complete all 3 steps
3. Enter your email in Step 4
4. Click "Send My Results"
5. Check your email for the PDF

**Important:** Email sending requires the `RESEND_API_KEY` to be set. Without it, you'll see an error.

---

## Step 5: Deploy to Vercel

### A. Push to GitHub

```bash
git add .
git commit -m "Add analytics, navigation, and email lead magnet"
git push origin main
```

### B. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New Project**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Click **Deploy**

### C. Add Environment Variables in Vercel

1. Go to your project in Vercel
2. Click **Settings** → **Environment Variables**
3. Add:
   - `RESEND_API_KEY` = your Resend API key
4. Click **Save**

### D. Set Up Vercel KV (Lead Storage)

1. In your Vercel project, go to **Storage** tab
2. Click **Create Database** → **KV**
3. Give it a name (e.g., "nutrition-leads")
4. Click **Create**
5. Connect it to your project

Vercel will automatically add the `KV_REST_API_URL` and `KV_REST_API_TOKEN` environment variables.

### E. Redeploy

After adding environment variables:

1. Go to **Deployments** tab
2. Click the **...** menu on the latest deployment
3. Click **Redeploy**

---

## Step 6: Verify Everything Works

### Analytics

1. Visit your live site
2. Navigate through a few pages
3. Go to Vercel Dashboard → **Analytics**
4. You should see page views within a few minutes

### Email Lead Magnet

1. Complete the calculator on your live site
2. Enter your email
3. Click "Send My Results"
4. Check your inbox for the PDF

### Lead Storage

To view collected leads, you can query the Vercel KV database:

1. Go to Vercel Dashboard → **Storage** → Your KV database
2. Click **Data Browser**
3. Search for keys starting with `lead:`

---

## Customization Guide

### Update Coach Information

Edit [app/coaches/page.tsx](app/coaches/page.tsx):

1. Replace placeholder coach data with real names, photos, bios
2. Add coach photos to `/public/coaches/` folder
3. Update the photo paths in the coach objects

### Change Email Template

Edit [app/api/send-results/route.ts](app/api/send-results/route.ts):

- Line 92-115: Update the email HTML
- Line 89: Change the subject line
- Line 88: Update "from" address (requires verified domain in Resend)

### Customize PDF

Edit [lib/generate-pdf.tsx](lib/generate-pdf.tsx):

- Update styles to match your brand
- Add/remove sections
- Change footer text

### Update Privacy Policy

Edit [app/privacy/page.tsx](app/privacy/page.tsx):

- Add your actual contact email
- Update company name
- Adjust policies to match your practices

---

## Production Checklist

Before going live, make sure to:

- [ ] Add real coach information and photos
- [ ] Verify domain with Resend (for professional sender email)
- [ ] Test email sending from production site
- [ ] Verify analytics tracking is working
- [ ] Update privacy policy with your email/company details
- [ ] Test on mobile devices
- [ ] Add a custom domain to Vercel (optional)
- [ ] Set up Google Search Console (optional)

---

## Email Sending with Custom Domain

The default Resend sender is `onboarding@resend.dev`. To use your own domain:

1. Go to Resend Dashboard → **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., nutritiontools.com)
4. Add the DNS records Resend provides to your domain registrar
5. Wait for verification (usually < 1 hour)
6. Update the "from" field in `app/api/send-results/route.ts`:

```typescript
from: 'Nutrition Tools <results@yourdomain.com>',
```

---

## Viewing Lead Data

### Option 1: Vercel KV Data Browser

1. Vercel Dashboard → Storage → Your KV database
2. Click **Data Browser**
3. Browse keys manually

### Option 2: API Endpoint (Advanced)

Create an admin secret and query via API:

1. Add `ADMIN_SECRET` to Vercel environment variables
2. Use the GET endpoint at `/api/store-lead`:

```bash
curl -H "Authorization: Bearer YOUR_ADMIN_SECRET" \
  https://yourdomain.com/api/store-lead
```

### Option 3: Export to CSV (Coming Soon)

We can add a simple admin dashboard to export leads to CSV if needed.

---

## Troubleshooting

### Email Not Sending

- Check that `RESEND_API_KEY` is set in Vercel env vars
- Verify API key is active in Resend dashboard
- Check Vercel function logs for errors
- Ensure you're under Resend free tier limits (3,000/month)

### Analytics Not Showing

- Analytics data can take 5-10 minutes to appear
- Ensure `@vercel/analytics` is installed
- Check that `<Analytics />` is in your layout.tsx
- Verify deployment succeeded without errors

### KV Database Not Working

- Ensure KV database is created and connected in Vercel
- Check that env vars are set (auto-added by Vercel)
- Lead storage failures won't prevent email sending

---

## Next Steps

Now that everything is set up, you can:

1. **Add content** to the Education page
2. **Build more tools** (macro calculator, meal planner)
3. **Create email sequences** for leads (use Resend or email service)
4. **Add coach booking** functionality
5. **Implement user accounts** to save results

---

## Support

If you run into issues:

1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify all environment variables are set
4. Review this setup guide

Good luck with your nutrition coaching business! 🎉
