# 🚀 Deployment Guide

## Summary of Security Fixes Applied

### Critical Issues Fixed ✅
- **7 npm vulnerabilities** (ReDoS, DoS, CSRF) → **0 vulnerabilities**
- **CSP Headers** - Added Content Security Policy
- **Security Headers** - X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, etc
- **Email Header Injection** - Input sanitization + proper URL encoding
- **Email Validation** - Regex + length validation
- **Hardcoded Secrets** - Moved to environment variables
- **Docker Security** - Non-root user, health checks
- **Color Contrast** - Fixed WCAG AA compliance in light mode
- **React Anti-patterns** - Fixed array index keys, modal cleanup

## Pre-Deployment Steps

### 1. Environment Configuration
```bash
# Copy example file
cp .env.example .env

# Edit with your email
nano .env
# Set: VITE_CONTACT_EMAIL=your-email@example.com
```

### 2. SSL/TLS Certificate (Required for HTTPS)

For Let's Encrypt on a VPS:

```bash
# Install certbot (on VPS)
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --standalone -d your-domain.com

# Paths will be something like:
# /etc/letsencrypt/live/your-domain.com/fullchain.pem
# /etc/letsencrypt/live/your-domain.com/privkey.pem
```

### 3. Update nginx.conf

Replace the nginx.conf template with HTTPS enabled:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name your-domain.com;
    root /usr/share/nginx/html;
    index index.html;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security Headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'wasm-unsafe-eval'; style-src 'self' 'unsafe-inline' https://api.fontshare.com; font-src 'self' https://api.fontshare.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self' mailto:" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Caching
    location ~* \.(js|css|svg|png|jpg|webp|woff|woff2|ttf|eot)$ {
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location = /index.html {
        add_header Cache-Control "public, max-age=3600, must-revalidate";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
}
```

### 4. Docker Build & Deploy

```bash
# Build image
docker build -t paolo-portfolio:latest .

# Test locally
docker run -p 8080:8080 paolo-portfolio:latest
# Visit: http://localhost:8080

# Push to registry (if using Docker Hub)
docker tag paolo-portfolio:latest your-username/paolo-portfolio:latest
docker push your-username/paolo-portfolio:latest

# On VPS - Pull and run
docker pull your-username/paolo-portfolio:latest
docker run -d \
  --name paolo-portfolio \
  -p 80:8080 \
  -p 443:8080 \
  -v /etc/letsencrypt:/etc/letsencrypt:ro \
  your-username/paolo-portfolio:latest
```

## Post-Deployment Verification

### 1. Security Headers Test
```bash
curl -I https://your-domain.com

# Check for these headers:
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
# Content-Security-Policy: ...
# Strict-Transport-Security: ...
```

### 2. SSL Certificate Test
```bash
# Check certificate validity
openssl s_client -connect your-domain.com:443

# Or use online tool:
# https://www.ssllabs.com/ssltest/
```

### 3. Accessibility Test
- Use axe DevTools browser extension
- Test keyboard navigation (Tab key)
- Test in light and dark modes
- Verify color contrast (use WebAIM Contrast Checker)

### 4. Mobile Testing
- Test on iPhone Safari
- Test on Android Chrome
- Verify responsive layout
- Test touch interactions

### 5. Performance Check
```bash
# Build size should be split:
# - vendor: ~133KB (React)
# - motion: ~111KB (Framer Motion)
# - main: ~40KB

# Gzip should be:
# Total: ~90KB gzip (acceptable for portfolio)
```

## Monitoring

### Health Check
```bash
curl https://your-domain.com/
# Should return HTML with status 200
```

### Logs
```bash
# Docker logs
docker logs paolo-portfolio

# Nginx logs in container
docker exec paolo-portfolio cat /var/log/nginx/access.log
docker exec paolo-portfolio cat /var/log/nginx/error.log
```

## Certificate Renewal

Let's Encrypt certificates expire after 90 days. Set up auto-renewal:

```bash
# Test renewal (dry-run)
sudo certbot renew --dry-run

# Enable auto-renewal
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

# Check status
sudo systemctl status certbot.timer
```

## Troubleshooting

### Email Not Sending
- Check `.env` file has correct email address
- Verify mailto: link opens in email client
- Email data should not be logged (sanitization working)

### CSP Errors
- Check browser console for CSP violations
- Update CSP policy if needed resources are blocked
- Common: fonts, images, scripts

### Mobile Issues
- Clear cache and hard refresh (Ctrl+Shift+R)
- Test in private/incognito mode
- Check viewport meta tag is set

### Docker Container Won't Start
```bash
docker logs paolo-portfolio
# Check error message
docker run -it paolo-portfolio /bin/sh
# Debug interactively
```

## Final Checklist

- [ ] Environment variables configured (.env)
- [ ] SSL certificates obtained and configured
- [ ] nginx.conf updated for your domain
- [ ] Docker image builds successfully
- [ ] Container runs without errors
- [ ] HTTPS certificate is valid
- [ ] Security headers present
- [ ] No CSP violations in console
- [ ] Form submission works
- [ ] All pages load correctly
- [ ] Mobile layout works
- [ ] Accessibility features work (focus, contrast)
- [ ] Performance acceptable
- [ ] Certificate auto-renewal set up

## Support

If you encounter issues:
1. Check Docker logs: `docker logs paolo-portfolio`
2. Verify nginx config: `docker exec paolo-portfolio nginx -t`
3. Test SSL: Use [SSL Labs](https://www.ssllabs.com/ssltest/)
4. Check CSP: Open browser console (F12) for errors

---

**Last Updated**: March 21, 2026  
**Version**: 1.0.0 (Security Edition)
