# AntSwarmingChecker

Ce bot Discord français et Open-Source vous permet de trouver les espèces de fourmi qui essaiment dans votre département.

## Comment utiliser ce bot

1. Cloner ce repository
2. Installez les dépendances avec `npm install`
3. Créez un fichier `.env` à la racine de votre projet avec les informations suivantes:
```.env
#.env
TOKEN=//le_token_de_votre_bot_discord//
CLIENT_ID=//uuid_de_votre_client_discord//
```
4. Compilez les fichiers TypeScript en Javascript avec la commande `npx tsc`, l'option --watch permet de lancer la compilation en démon.
5. Lancer le bot avec `npm run start`

## Contribution

Les contributions au code seront analysées, n'hésitez pas à faire des pull requests si vous avez la moindre suggestion ou fix de bugs.
Vous pouvez aussi ajouter des informations aux datas concernant les dates d'essaimages.

## License

Ce projet est sous la licence MIT License - regardez le fichier [LICENSE](LICENSE) pour plus de détails.
