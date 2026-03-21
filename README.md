# Portfolio – Paolo Antonini

Bienvenue sur mon site personnel !

Ce portfolio présente mon parcours, mes projets, et un peu de ma personnalité. J'ai voulu un site simple, moderne, animé et agréable à parcourir, que ce soit sur mobile ou ordinateur.

Le site est développé avec React, Vite et Framer Motion pour les animations, mais l'essentiel reste le contenu :

- Une page d'accueil pour se présenter
- Une section projets pour découvrir ce que j'ai réalisé
- Un espace contact pour échanger facilement
- Un mode clair/sombre et une navigation fluide

Tout est pensé pour être rapide, accessible et vivant.

---

## 🚀 Installation & Développement

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ⚙️ Configuration

Before deployment, create a `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
# Edit .env and set your contact email
```

## 🐳 Docker Deployment

```bash
# Build Docker image
docker build -t paolo-portfolio .

# Run container
docker run -p 80:8080 paolo-portfolio
```

## 🔒 Security Features

✅ Content Security Policy (CSP)  
✅ Security headers (X-Frame-Options, X-Content-Type-Options, etc)  
✅ Email validation & header injection prevention  
✅ Non-root Docker user  
✅ Health checks  
✅ WCAG AA accessibility compliance  
✅ Zero npm vulnerabilities  

## 📋 Deployment Checklist

Before deploying to production:

- [ ] Set `VITE_CONTACT_EMAIL` in `.env`
- [ ] Configure HTTPS/SSL certificates (Let's Encrypt recommended)
- [ ] Update nginx.conf with your domain
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices
- [ ] Verify CSP headers don't block resources
- [ ] Run accessibility audit (axe DevTools)
- [ ] Test form submission

## 📖 Technologies

- **React 18** - UI library
- **Vite 8** - Build tool
- **Framer Motion** - Animations
- **Nginx** - Web server
- **Docker** - Containerization

## 📝 License

© 2026 Paolo Antonini. All rights reserved.

---

**Paolo Antonini**  
Étudiant en informatique & passionné de dev  
Contact : paolo.antonini.dev@gmail.com
