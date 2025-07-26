# AWS Setup Guide for Wedding Camera App

This guide will help you set up AWS S3 for storing wedding photos securely.

## 🚀 Quick Setup (5 minutes)

### Step 1: Create S3 Bucket

1. Go to [AWS S3 Console](https://console.aws.amazon.com/s3/)
2. Click "Create bucket"
3. **Bucket name**: `christylo-wedding-photos` (or your preferred name)
4. **Region**: Choose closest to your wedding location
5. **Block Public Access**: Keep all settings enabled (we'll use presigned URLs)
6. Click "Create bucket"

### Step 2: Configure CORS

1. Select your bucket
2. Go to "Permissions" tab
3. Scroll down to "Cross-origin resource sharing (CORS)"
4. Click "Edit" and paste this configuration:

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

5. Click "Save changes"

### Step 3: Create IAM User

1. Go to [AWS IAM Console](https://console.aws.amazon.com/iam/)
2. Click "Users" → "Create user"
3. **User name**: `wedding-camera-uploader`
4. **Access type**: Programmatic access
5. Click "Next: Permissions"

### Step 4: Attach Policy

**Option A: Quick Setup (Full S3 Access)**
- Search for "AmazonS3FullAccess"
- Select it and click "Next"
- Click "Create user"

**Option B: Secure Setup (Limited Access)**
- Click "Create policy"
- Use JSON editor and paste:

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

- Name it "WeddingCameraS3Access"
- Attach to your user

### Step 5: Save Credentials

1. After creating the user, you'll see:
   - **Access Key ID**
   - **Secret Access Key**
2. **IMPORTANT**: Save these securely - you won't see the secret key again!

### Step 6: Configure App

1. Copy `env.example` to `.env.local`
2. Fill in your credentials:

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
AWS_S3_BUCKET=christylo-wedding-photos
```

## 🔒 Security Best Practices

### 1. Use Limited IAM Policy
Instead of full S3 access, use the custom policy above.

### 2. Rotate Credentials Regularly
- Change access keys every 90 days
- Use AWS Secrets Manager for production

### 3. Monitor Usage
- Set up CloudWatch alerts for unusual activity
- Review S3 access logs

### 4. Backup Strategy
- Enable S3 versioning
- Set up cross-region replication if needed

## 📊 Cost Estimation

### S3 Storage Costs (US East)
- **Standard Storage**: $0.023 per GB per month
- **1000 photos (5MB each)**: ~$0.12/month
- **10,000 photos**: ~$1.15/month

### Data Transfer
- **Upload**: Free
- **Download**: $0.09 per GB (if you download photos)

### Estimated Monthly Cost
- **Small wedding (500 photos)**: ~$0.50
- **Large wedding (5000 photos)**: ~$2.50

## 🧪 Testing Your Setup

### 1. Test Upload
```bash
npm run dev
```
- Open the app
- Take a test photo
- Check S3 bucket for the uploaded file

### 2. Verify Permissions
- Check that photos appear in your S3 bucket
- Verify file names follow the pattern: `wedding-uploads/{timestamp}-{randomId}.jpg`

### 3. Test Error Handling
- Temporarily change the bucket name to something wrong
- Verify you get a proper error message

## 🚨 Troubleshooting

### "Access Denied" Error
- Check IAM user permissions
- Verify bucket name in environment variables
- Ensure CORS is configured correctly

### "No Such Bucket" Error
- Check bucket name spelling
- Verify bucket exists in the correct region
- Ensure AWS_REGION matches bucket region

### Upload Timeout
- Check internet connection
- Verify presigned URL hasn't expired (5 minutes)
- Try uploading a smaller image

## 📱 Production Checklist

- [ ] S3 bucket created with proper name
- [ ] CORS configured correctly
- [ ] IAM user with limited permissions
- [ ] Environment variables set in deployment platform
- [ ] Test uploads working
- [ ] Monitor S3 costs
- [ ] Set up backup strategy
- [ ] Test on multiple devices

## 🎯 Wedding Day Monitoring

### Before the Event
- Test uploads from multiple devices
- Verify S3 bucket has sufficient space
- Check that environment variables are set correctly

### During the Event
- Monitor S3 bucket for new uploads
- Check CloudWatch for any errors
- Have a backup photo sharing method ready

### After the Event
- Download all photos from S3
- Review and organize photos
- Consider archiving to cheaper storage

## 💡 Pro Tips

1. **Use CloudFront** for faster photo delivery if you plan to view photos online
2. **Set up S3 Lifecycle** to move old photos to cheaper storage after 30 days
3. **Enable S3 Analytics** to track usage patterns
4. **Use AWS Budgets** to set spending alerts

## 🆘 Need Help?

If you encounter issues:
1. Check AWS CloudWatch logs
2. Verify all environment variables are set
3. Test with a simple S3 upload script
4. Contact AWS support if needed

---

**Happy Wedding Planning! 💕📸** 