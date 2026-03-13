# 🤝 Contribuer

Merci d'aider ce projet. Voici un guide simple pour vous aider à facilement contribuer.

## ✅ Avant de commencer

1. Ouvrir une issue pour décrire le problème ou l'amélioration.
2. Expliquer brièvement le contexte et votre idée.
3. Attendre un retour avant un gros chantier.

## 🧰 Démarrer (commandes)

```bash
# forker sur GitHub, puis cloner votre fork
git clone <url-du-fork>
cd <repo>

# créer une branche
git checkout -b feat/ma-amelioration

# installer les dépendances
cd backend
npm install
cd ../frontend
npm install
```

## 💻 Développer

```bash
# backend
cd backend
npm start

# frontend (dans un autre terminal)
cd frontend
npm run dev
```

## 🚀 Proposer vos changements

```bash
git status
git add .
git commit -m "feat: description courte"
git push origin feat/ma-amelioration
```

Ensuite, ouvrez une Pull Request et décrivez ce que vous avez fait.

## ✨ Qualité

- Garder le code lisible et cohérent avec le style existant.
- Ajouter ou mettre à jour les tests si nécessaire.
- Vérifier que le projet démarre correctement après vos changements.

## 🔒 Sécurité

Merci de ne pas publier de vulnérabilités en public. Contactez le mainteneur directement si besoin.
