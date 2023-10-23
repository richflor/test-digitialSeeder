# test-digitalSeeder

Réalisation d'un test technique pour un entretien avec digitalSeeder.

Installez les packages :
```
npm i
```

Lancez d'abord le serveur API:
```
npm run dev-server
```

Puis lancez le serveur client : 
```
npm run dev-client
```

Le serveur API tourne par défaut sur le port 3000 et le serveur client sur le port 5173.

Si besoin est de changer les ports :

- Pour le serveur API ajoutez un fichier .env :
```
PORT=3000
```

- Pour le serveur client ajouter au fichier vite.config.ts le paramètre server :
```
export default defineConfig({
  // ...some configs
  server: {
    port: 5173,
  },
});
```
