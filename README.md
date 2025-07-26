# Christy & Jimmy's Wedding Camera 📸

A beautiful, web-based disposable camera app for wedding guests to capture and share memories instantly. Built with Next.js, React, and AWS S3.

## ✨ Features

- **No App Download Required** - Works directly in any mobile browser
- **QR Code Access** - Guests scan QR code to open the camera
- **Retro Camera UI** - Beautiful disposable camera design with wedding theming
- **Photo Capture** - Take photos using phone camera (when available)
- **Gallery Upload** - Upload existing photos from device gallery
- **Automatic S3 Storage** - Photos saved directly to Amazon S3
- **Wedding Theme** - Matches your ice cream wedding aesthetic
- **Responsive Design** - Works perfectly on all devices
- **Camera Optional** - Works even if camera hardware is disabled

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up AWS S3

1. **Create S3 Bucket**
   - Go to AWS S3 Console
   - Create a new bucket named `christylo-wedding-photos`
   - Enable CORS for browser uploads:

```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["PUT", "POST", "GET"],
        "AllowedOrigins": ["*"],
        "ExposeHeaders": []
    }
]
```

2. **Create IAM User**
   - Go to AWS IAM Console
   - Create a new user with programmatic access
   - Attach the `AmazonS3FullAccess` policy (or create a custom policy)
   - Save the Access Key ID and Secret Access Key

### 3. Configure Environment Variables

Copy `env.example` to `.env.local` and fill in your AWS credentials:

```bash
cp env.example .env.local
```

Edit `.env.local`:
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
AWS_S3_BUCKET=christylo-wedding-photos
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the camera app!

## 📱 How It Works

1. **QR Code Access**: Guests scan a QR code that opens the app in their browser
2. **Camera Interface**: Beautiful retro camera UI with shutter button (if camera available)
3. **Photo Upload**: Take photos with camera or upload from gallery
4. **Automatic Upload**: Photos are instantly saved to S3 with timestamps
5. **Thank You Message**: Confirmation with wedding-themed animations

## 🎨 Design Features

- **Wedding Theme**: Pastel colors matching your ice cream wedding site
- **Fonts**: Playfair Display (serif) + Inter (sans-serif)
- **Colors**: 
  - Cream: `#FDF3F0`
  - Beige: `#E4D8C4`
  - Peach: `#FFEFE8`
  - Coral: `#DDB7A0`
  - Pink: `#F4C2C2`
  - Mint: `#B8D4BA`
  - Lavender: `#D4C5F9`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app works on any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📋 AWS Setup Details

### S3 Bucket Configuration

1. **Bucket Name**: `christylo-wedding-photos`
2. **Region**: Choose your preferred region
3. **CORS Configuration**:
```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["PUT", "POST", "GET"],
        "AllowedOrigins": ["*"],
        "ExposeHeaders": []
    }
]
```

### IAM Policy (Optional - More Secure)

Instead of full S3 access, create a custom policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject"
            ],
            "Resource": "arn:aws:s3:::christylo-wedding-photos/*"
        }
    ]
}
```

## 🎯 QR Code Setup

1. Deploy your app to get a public URL
2. Use the QR code feature in the app to generate a QR code
3. Print the QR code and place on wedding tables/signs
4. Guests scan to access the camera instantly

## 📸 Photo Organization

Photos are automatically organized in S3:
- **Path**: `wedding-uploads/`
- **Filename**: `{timestamp}-{randomId}.jpg`
- **Example**: `wedding-uploads/1703123456789-abc123def.jpg`

## 🔧 Customization

### Colors
Edit `tailwind.config.js` to change the wedding color palette.

### Text
Update text content in the component files:
- `app/page.tsx` - Main header and footer
- `app/components/ThankYouMessage.tsx` - Thank you message
- `app/components/CameraInterface.tsx` - Instructions

### Styling
Modify `app/globals.css` for custom animations and effects.

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📱 Mobile Testing

Test on real devices to ensure:
- Camera permissions work correctly
- Touch interactions are smooth
- Upload functionality works
- QR code scanning works

## 🔒 Privacy & Legal

The app includes a privacy notice: "By using this app, you agree your photos may be shared in our wedding album."

## 🎉 Wedding Day Setup

1. **Deploy the app** to a public URL
2. **Test thoroughly** on multiple devices
3. **Print QR codes** and place on tables
4. **Have a backup plan** (consider a simple photo sharing app as backup)
5. **Monitor uploads** during the event

## 💡 Tips for Wedding Day

- **WiFi**: Ensure good WiFi coverage at your venue
- **Backup**: Have a backup photo sharing method
- **Instructions**: Include simple instructions with QR codes
- **Testing**: Test with a few guests before the main event
- **Monitoring**: Check S3 bucket during the event to ensure uploads are working

## 🐛 Troubleshooting

### Camera Not Working
- Ensure HTTPS (required for camera access)
- Check browser permissions
- Test on different devices

### Upload Failures
- Verify AWS credentials
- Check S3 bucket permissions
- Ensure CORS is configured correctly

### QR Code Issues
- Test QR code scanning on multiple devices
- Ensure the URL is publicly accessible
- Consider using a URL shortener for easier scanning

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Verify AWS configuration
3. Test on different devices and browsers
4. Check browser console for errors

---

**Happy Wedding Day! 💕📸**

*Built with love for Christy & Jimmy's special day* 